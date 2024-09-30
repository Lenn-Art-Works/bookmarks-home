

// Listener für Nachrichten von content.js
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {

  if (message.action === 'saveContent-mgr-06-law') {

    if (message.content) {

      // Erstellen Sie ein Blob aus dem Inhalt
      const content = message.content;
      const blob = new Blob([content], { type: 'text/txt' });
      const reader = new FileReader();

      reader.onloadend = function () {
        // Verwenden Sie reader.result als URL für den Download
        chrome.downloads.download({
          url: reader.result,
          filename: 'grid-content.txt'
        }, () => {
          console.log("Download abgeschlossen");
        });
      };

      // Starten Sie das Lesen des Blob als Data-URL
      reader.readAsDataURL(blob);
    } else {
      console.error('Content nicht gefunden');
    }
  }

  // Rückgabewert für `sendResponse` ist wichtig, um asynchrone Antworten zu ermöglichen
  return true;
});


// click on extension icon