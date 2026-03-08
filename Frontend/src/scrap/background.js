chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete" && tab.url && tab.url.startsWith("http")) {
    console.log("Page finished loading:", tab.url);

    chrome.tabs.sendMessage(tabId, {
      type: "SCRAPE_PAGE",
      url: tab.url
    }, async (response) => {
      if (chrome.runtime.lastError) {
        console.warn("Message failed (this is often normal):", chrome.runtime.lastError.message);
      } else if (response) {
        console.log("Scrape result received, sending to backend:", response);
        try {
          const backendResponse = await fetch("http://localhost:3000/api/scrape/send", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(response),
          });
          const result = await backendResponse.json();
          console.log("Backend response:", result);
        } catch (error) {
          console.error("Failed to send scrape data to backend:", error);
        }
      }
    });
  }
});