import { Readability } from "@mozilla/readability";

function cleanDom(root) {
  root
    .querySelectorAll("script, style, noscript, svg, iframe")
    .forEach((el) => el.remove());
}

function extractSections(articleHtml) {
  const container = document.createElement("div");
  container.innerHTML = articleHtml;

  const sections = [];
  let current = null;

  container.querySelectorAll("h1,h2,h3,h4,p,li").forEach((el) => {
    const tag = el.tagName.toLowerCase();

    if (tag.startsWith("h")) {
      if (current) {
        sections.push({
          heading: current.heading,
          content: current.content.join("\n"),
        });
      }

      current = {
        heading: el.textContent?.trim(),
        content: [],
      };
    } else {
      if (!current) current = { content: [] };

      const text = el.textContent?.trim();
      if (text) current.content.push(text);
    }
  });

  if (current) {
    sections.push({
      heading: current.heading,
      content: current.content.join("\n"),
    });
  }

  return sections;
}

export function scrapeDom() {
  const documentClone = document.cloneNode(true);

  if (!documentClone.body) return null;

  cleanDom(documentClone.body);

  const article = new Readability(documentClone).parse();

  if (!article) return null;

  const articleContent = article.content ?? "";

  const links = Array.from(
    documentClone.querySelectorAll("a[href]")
  )
    .map((a) => a.href)
    .slice(0, 200);

  const sections = extractSections(articleContent);

  return {
    url: location.href,
    title: article.title ?? documentClone.title ?? "",
    byline: article.byline || undefined,
    siteName: article.siteName || undefined,
    excerpt: article.excerpt || undefined,
    textContent: (article.textContent ?? "").slice(0, 200000).trim(),
    sections,
    links,
  };
}

chrome.runtime.onMessage.addListener((msg, _sender, sendResponse) => {
  if (msg.type === "SCRAPE_PAGE") {
    const result = scrapeDom();
    sendResponse(result);
  }
});
