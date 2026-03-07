import { useState } from "react";

interface BackendResult {
  recommendation: string;
  links: string[];
  linkNum: number;
}

export default function App() {
  const [response, setResponse] = useState<BackendResult | null>(null);

  async function handleClick() {
    const res = await fetch("http://localhost:3000/api/prompt-gemini", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        question: "I want to get good skills in web development. Give me a recommendation and provide links to resources I can use.",
      }),
    });

    if (!res.ok) {
      console.error("Request failed", res.status);
      return;
    }

    const data = (await res.json()) as { result: BackendResult };
    console.log("Backend result:", data.result);
    setResponse(data.result);
  }

  return (
    <section>
      <div>Content</div>
    </section>
  );
}