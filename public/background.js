console.log("chrome.runtime.onMessage", chrome.runtime.onMessage);

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  if (message.type === "change-color") {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      if (tabs && tabs.length > 0) {
        const tabId = tabs[0].id;
        if (tabId) {
          console.log("chrome?.scripting", chrome?.scripting);
          chrome?.scripting
            ?.executeScript({
              target: { tabId: tabId },
              function: function(color) {
                console.log("scriptColor", color);
                document.body.style.backgroundColor = color;
              },
              args: [message.color],
            })
            .then(() => {
              console.log("Script executed successfully.");
            })
            .catch((error) => {
              console.error("Script execution failed:", error);
            });
        } else {
          console.error("Failed to get tab ID.");
        }
      } else {
        console.error("No active tabs found.");
      }
    });
  }

  if (message.action === "bookmark") {
    console.log("recieved message");

    chrome.tabs.query(
      {
        currentWindow: true,
        active: true,
        url: ["*://*.youtube.com/watch?*"],
      },
      (tabs) => {
        const tab = tabs[0];
        if (tabs.length > 0) {
          chrome.storage.local.get(["bookmarkedVideos"], (res) => {
            const bookmarkedVideosList = res?.bookmarkedVideos ?? [];
            chrome.storage.local.set(
              {
                bookmarkedVideos: [
                  ...bookmarkedVideosList,
                  {
                    url: tab.url,
                    title: tab.title,
                  },
                ],
              },
              () => {
                console.log("sending message");
                sendResponse({ url: tab.url, title: tab.title });
              }
            );
          });
        }
      }
    );
    return true;
  }

  if (message.action === "reset") {
    console.log("Received reset request.");

    chrome.storage?.local.remove("bookmarkedVideos", () => {
      console.log("Bookmarked data reset successfully.");
      sendResponse({ success: true });
    });

    return true; 
  }
});
