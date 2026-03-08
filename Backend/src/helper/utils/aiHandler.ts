import { GoogleGenAI, createUserContent, createPartFromUri } from "@google/genai";
import { promises as fs } from "fs";
import path from "path";
import { Data, Response } from "../../types/gemini_interfaces.js";

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_API_KEY!,
});

async function getLatestScrapedJson(): Promise<string | null> {
  try {
    const scrapedDir = path.join("src", "scraped");
    const entries = await fs.readdir(scrapedDir, { withFileTypes: true });

    const filesWithStats = await Promise.all(
      entries
        .filter((entry) => entry.isFile() && entry.name.endsWith(".json"))
        .map(async (entry) => {
          const fullPath = path.join(scrapedDir, entry.name);
          const stats = await fs.stat(fullPath);
          return {
            fullPath,
            mtime: stats.mtime.getTime(),
          };
        }),
    );

    if (!filesWithStats.length) {
      return null;
    }

    filesWithStats.sort((a, b) => b.mtime - a.mtime);
    const latestFile = filesWithStats[0];

    return fs.readFile(latestFile.fullPath, "utf-8");
  } catch (error) {
    console.error("Failed to read latest scraped JSON:", error);
    return null;
  }
}

export async function sendRequest(data: Data) {
  const basePrompt = data.question;
  const filename = data.file;

  const latestScrapedJson = await getLatestScrapedJson();

  const prompt =
    latestScrapedJson == null
      ? basePrompt
      : `${basePrompt}
        Here is the most recently scraped page data as JSON. Use it as context when answering:
        ${latestScrapedJson}`;

  const geminiUpload = await ai.files.upload({
    file: `src/uploads/${filename}`,
  });

  const fileUri = geminiUpload.uri ?? "";

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: createUserContent([
      prompt,
      createPartFromUri(fileUri, "application/pdf"),
    ]),
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: "object",
        properties: {
          recommendation: {
            type: "string",
          },
          matchScore: {
            type: "integer",
            minimum: 0,
            maximum: 100,
          },
          have: {
            type: "array",
            items: {
              type: "object",
              properties: {
                name: { type: "string" },
                improvements: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      name: { type: "string" },
                      link: { type: "string" },
                    },
                    required: ["name", "link"],
                    additionalProperties: false,
                  },
                },
              },
              required: ["name", "improvements"],
              additionalProperties: false,
            },
          },
          missing: {
            type: "array",
            items: {
              type: "object",
              properties: {
                name: { type: "string" },
                improvements: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      name: { type: "string" },
                      link: { type: "string" },
                    },
                    required: ["name", "link"],
                    additionalProperties: false,
                  },
                },
              },
              required: ["name", "improvements"],
              additionalProperties: false,
            },
          },
        },
        required: ["recommendation", "matchScore", "have", "missing"],
        additionalProperties: false,
      },
    },
  });

  const textFn = response.text;
  if (!textFn) {
    throw Error("No response from Gemini");
  }

  return JSON.parse(textFn) as Response;
}