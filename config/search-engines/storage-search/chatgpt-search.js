fillTextAndSubmit();

function fillTextAndSubmit() {

    const inputField = document.getElementById('prompt-textarea'); // Die korrekte ID für das Textfeld
    if (inputField) {
        chrome.storage.local.get(['aisearchrequest'], function(result) {
            const promptValue = result.aisearchrequest; // Hole den Wert aus dem Ergebnis

            inputField.focus(); // Fokussiere das Eingabefeld
            inputField.value = promptValue; // Setze den Text

            // Dispatch ein 'input' Event, um Änderungen zu triggern
            inputField.dispatchEvent(new Event('input', { bubbles: true }));

            // Dispatch ein 'keydown' Event für Enter, um das Drücken der Enter-Taste zu simulieren
            const enterEvent = new KeyboardEvent('keydown', { key: 'Enter', keyCode: 13, which: 13, bubbles: true });
            inputField.dispatchEvent(enterEvent);

        });
    } else {
        console.error('Textfeld mit der ID "prompt-textarea" nicht gefunden');
    }

}