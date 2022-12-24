chrome.runtime.onInstalled.addListener(async () => {
  chrome.contextMenus.create({
    id: "addpage",
    title: "Add page to ShortLink",
    type: "normal",
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  const link = info.pageUrl;
  const shortcut = prompt("Enter shortcut text");

  chrome.storage.local.get("bookmarks", ({ bookmarks }, err) => {
    if (bookmarks.find((e) => e.shortcut === shortcut)) {
      alert("Shortcut already exists");
      return;
    }

    if (bookmarks.find((e) => e.link === link)) {
      alert("Link already exists");
      return;
    }

    chrome.storage.local.set({ bookmarks: [...bookmarks, { shortcut, link }] });
  });
});

chrome.omnibox.onInputEntered.addListener((text) => {
  chrome.storage.local.get("bookmarks", ({ bookmarks }, err) => {
    const existing = bookmarks.find((e) => e.shortcut === text);
    if (existing) {
      chrome.tabs.update({ url: existing.link });
    }
  });
});
