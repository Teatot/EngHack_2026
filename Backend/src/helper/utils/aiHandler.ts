import { GoogleGenAI, createUserContent, createPartFromUri } from "@google/genai";
import { Data, Response } from "../../types/gemini_interfaces.js";

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_API_KEY,
});

export async function sendRequest(data: Data) {
  const prompt = data.question;
  const filename = data.file;

  const geminiUpload = await ai.files.upload({
    file: `src/uploads/${filename}`,
  })

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
        "type": "object",
        "properties": {
          "recommendation": {
            "type": "string"
          },
          "links": {
            "type": "array",
            "items": {
              "type": "string",
              "format": "uri"
            }
          },
          "linkNum": {
            "type": "integer",
            "minimum": 0
          }
        },
        "required": ["recommendation", "links", "linkNum"],
        "additionalProperties": false
      },
    },
  });

  const textFn = response.text;
  if (!textFn) {
    throw Error("No response from Gemini");
  }

  return JSON.parse(textFn) as Response;
}