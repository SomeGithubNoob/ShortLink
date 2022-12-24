const init = async () => {
  const container = document.getElementById("saved__container");
  chrome.storage.local.get("bookmarks", (data, error) => {
    if (!data || error) {
      const error = document.createElement("span");
      error.textContent = "No saved bookmarks";
      container.appendChild(error);
      return;
    }

    data.bookmarks.forEach((item) => {
      const row = document.createElement("tr");

      const shortcut = document.createElement("td");
      shortcut.textContent = item.shortcut;
      shortcut.classList = "shortcut";

      const bookmark = document.createElement("td");
      bookmark.textContent = item.link;
      shortcut.classList = "link";

      row.appendChild(shortcut);
      row.appendChild(bookmark);

      container.appendChild(row);
    });
  });
};

init();
