console.log("we-content.js loaded")

$(document).ready(function() {

  // validation
  var metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription && metaDescription.getAttribute('content')) {
  var descriptionContent = metaDescription.getAttribute('content'); 
  if (descriptionContent.includes('supercode-mgr-06-law')) {

  // Backup Export
  $(document).on('click', '#wet-backup-export', function() {
    // Überprüfe, ob der Klick auf das Element mit der Klasse "extrahieren" erfolgt ist
    // Finde das Container-Element und extrahiere den Inhalt
    const container = document.querySelector('.grid');

    if (container) {

      // Erstelle eine Kopie des .grid-container Elements
      var $containerClone = $('.grid').clone();

      // Entferne temporär die unerwünschten Elemente und Attribute in der Kopie
      $containerClone.find('.wizard-add-bar').remove();
      $containerClone.find('.grid-container').removeClass('wizard-on');
      $containerClone.find('.grid-item').removeClass('light-mode');
      $containerClone.find('.grid-item').removeClass('dark-mode');
      $containerClone.find('.grid-item').removeClass('customDisplaymode');
      $containerClone.removeAttr('style');
      $containerClone.find('.grid-container').removeAttr('style');
      $containerClone.find('.grid-container *').removeAttr('style');
      $containerClone.find('.grid-item *').removeAttr("draggable");
      $containerClone.find('.grid-item').removeAttr("draggable");

      $containerClone.find('.setup-item').remove();
      $containerClone.find('.gi-img-icon-replacer').remove();

      // Extrahiere den HTML-Inhalt der Kopie
      var content = $containerClone.html();

      // Extrahiere den Inhalt der Kopie
      chrome.runtime.sendMessage({
        action: 'saveContent-mgr-06-law',
        content: content
      }, function(response) {
        // Optional: Verarbeitung der Antwort des Hintergrundskripts, falls benötigt
        console.log('Message sent:', response);
      });
    } else {
      console.error('Container .grid-container.wizard-on nicht gefunden');
    }
  });


// ###############################################
// #               Storage save & load           #
// ###############################################

  chrome.storage.local.get(['activeStorageValue'], function(result) {
    if (result && result.activeStorageValue) {
        var activeStorageValue = result.activeStorageValue;
        loadStorage(activeStorageValue); // Verwende den Wert direkt

        alertMessage("loaded storage: "+activeStorageValue, "openwizard");
    }
  });

  $("#wet-save-1").removeClass("storage-filled");
  $("#wet-save-2").removeClass("storage-filled");
  $("#wet-save-3").removeClass("storage-filled");
  $("#wet-save-cloud").removeClass("storage-filled");

  $("#wet-bookmark-1").removeClass("storage-filled");
  $("#wet-bookmark-2").removeClass("storage-filled");
  $("#wet-bookmark-3").removeClass("storage-filled");
  $("#wet-bookmark-cloud").removeClass("storage-filled");

  checkStorage("1");
  checkStorage("2");
  checkStorage("3");
  checkStorage("cloud");


  // Save In Storage 1
  $(document).on('click', '#wet-save-1', function() {

    $(this).addClass("storage-filled");

    // Erstelle eine Kopie des .grid-container Elements
    var $wetSave1Clone = $('.grid').clone();

    // Entferne temporär die unerwünschten Elemente und Attribute in der Kopie
    $wetSave1Clone.find('.wizard-add-bar').remove();
    $wetSave1Clone.find('.grid-container').removeClass('wizard-on');
    $wetSave1Clone.find('.grid-item').removeClass('light-mode');
    $wetSave1Clone.find('.grid-item').removeClass('dark-mode');
    $wetSave1Clone.removeAttr('style');
    $wetSave1Clone.find('.grid-container').removeAttr('style');
    $wetSave1Clone.find('.grid-container *').removeAttr('style');
    $wetSave1Clone.find('.grid-item *').removeAttr("draggable");
    $wetSave1Clone.find('.grid-item').removeAttr("draggable");
    $wetSave1Clone.find(".show-wizard-add-bar").removeClass("show-wizard-add-bar");

    $wetSave1Clone.find('.gi-img-icon-replacer').remove();

    // Extrahiere den Inhalt der Kopie
    var content1 = $wetSave1Clone.html();

    // Entferne alle HTML Kommentare
    content1 = content1.replace(/<!--[\s\S]*?-->/g, '');

    // Entferne alle leeren Zeilen
    content1 = content1.replace(/^\s*[\r\n]/gm, '');

    // Entfernen von Speicherstand 1
    chrome.storage.local.remove([ 'saveStorage1' ]);

    // Speichern von Daten für Speicherstand 1
    chrome.storage.local.set({ 'saveStorage1': content1 });

    chrome.storage.local.set({ 'activeStorageValue': 1 }, function() {
      if (chrome.runtime.lastError) {
        console.error('Error setting value:', chrome.runtime.lastError);
      }
    });

    alertMessage("saved to storage 1");
    enterSaveMode();

    setTimeout(function() {
      loadStorage("1");
      location.reload();
    }, 1000);
    
  });


  // Save In Storage 2
  $(document).on('click', '#wet-save-2', function() {

    $(this).addClass("storage-filled");

    // Erstelle eine Kopie des .grid-container Elements
    var $wetSave2Clone = $('.grid').clone();

    // Entferne temporär die unerwünschten Elemente und Attribute in der Kopie
    $wetSave2Clone.find('.wizard-add-bar').remove();
    $wetSave2Clone.find('.grid-container').removeClass('wizard-on');
    $wetSave2Clone.find('.grid-item').removeClass('light-mode');
    $wetSave2Clone.find('.grid-item').removeClass('dark-mode');
    $wetSave2Clone.removeAttr('style');
    $wetSave2Clone.find('.grid-container').removeAttr('style');
    $wetSave2Clone.find('.grid-container *').removeAttr('style');
    $wetSave2Clone.find('.grid-item *').removeAttr("draggable");
    $wetSave2Clone.find('.grid-item').removeAttr("draggable");
    $wetSave2Clone.find(".show-wizard-add-bar").removeClass("show-wizard-add-bar");

    $wetSave2Clone.find('.gi-img-icon-replacer').remove();

    // Extrahiere den Inhalt der Kopie
    var content2 = $wetSave2Clone.html();

    // Entferne alle HTML Kommentare
    content2 = content2.replace(/<!--[\s\S]*?-->/g, '');

    // Entferne alle leeren Zeilen
    content2 = content2.replace(/^\s*[\r\n]/gm, '');

    // Entfernen von Speicherstand 2
    chrome.storage.local.remove([ 'saveStorage2' ]);

    // Speichern von Daten für Speicherstand 2
    chrome.storage.local.set({ 'saveStorage2': content2 });

    chrome.storage.local.set({ 'activeStorageValue': 2 }, function() {
      if (chrome.runtime.lastError) {
        console.error('Error setting value:', chrome.runtime.lastError);
      }
    });

    alertMessage("saved to storage 2");
    enterSaveMode();
    
    setTimeout(function() {
      loadStorage("2");
      location.reload();
    }, 1000);
  });


  // Save In Storage 3
  $(document).on('click', '#wet-save-3', function() {

    $(this).addClass("storage-filled");

    // Erstelle eine Kopie des .grid-container Elements
    var $wetSave3Clone = $('.grid').clone();

    // Entferne temporär die unerwünschten Elemente und Attribute in der Kopie
    $wetSave3Clone.find('.wizard-add-bar').remove();
    $wetSave3Clone.find('.grid-container').removeClass('wizard-on');
    $wetSave3Clone.find('.grid-item').removeClass('light-mode');
    $wetSave3Clone.find('.grid-item').removeClass('dark-mode');
    $wetSave3Clone.removeAttr('style');
    $wetSave3Clone.find('.grid-container').removeAttr('style');
    $wetSave3Clone.find('.grid-container *').removeAttr('style');
    $wetSave3Clone.find('.grid-item *').removeAttr("draggable");
    $wetSave3Clone.find('.grid-item').removeAttr("draggable");
    $wetSave3Clone.find(".show-wizard-add-bar").removeClass("show-wizard-add-bar");

    $wetSave3Clone.find('.gi-img-icon-replacer').remove();

    // Extrahiere den Inhalt der Kopie
    var content3 = $wetSave3Clone.html();

    // Entferne alle HTML Kommentare
    content3 = content3.replace(/<!--[\s\S]*?-->/g, '');

    // Entferne alle leeren Zeilen
    content3 = content3.replace(/^\s*[\r\n]/gm, '');

    // Entfernen von Speicherstand 3
    chrome.storage.local.remove([ 'saveStorage3' ]);

    // Speichern von Daten für Speicherstand 3
    chrome.storage.local.set({ 'saveStorage3': content3 });

    chrome.storage.local.set({ 'activeStorageValue': 3 }, function() {
      if (chrome.runtime.lastError) {
        console.error('Error setting value:', chrome.runtime.lastError);
      }
    });

    alertMessage("saved to storage 3");
    enterSaveMode();
    
    setTimeout(function() {
      loadStorage("3");
      location.reload();
    }, 1000);
  });


  // Save In Storage Cloud
  $(document).on('click', '#wet-save-cloud', function() {
    $(this).addClass("storage-filled");

    // Erstelle eine Kopie des .grid-container Elements
    var $wetSaveCloudClone = $('.grid').clone();

    // Entferne temporär die unerwünschten Elemente und Attribute in der Kopie
    $wetSaveCloudClone.find('.wizard-add-bar').remove();
    $wetSaveCloudClone.find('.grid-container').removeClass('wizard-on');
    $wetSaveCloudClone.find('.grid-item').removeClass('light-mode');
    $wetSaveCloudClone.find('.grid-item').removeClass('dark-mode');
    $wetSaveCloudClone.removeAttr('style');
    $wetSaveCloudClone.find('.grid-container').removeAttr('style');
    $wetSaveCloudClone.find('.grid-container *').removeAttr('style');
    $wetSaveCloudClone.find('.grid-item *').removeAttr("draggable");
    $wetSaveCloudClone.find('.grid-item').removeAttr("draggable");
    $wetSaveCloudClone.find(".show-wizard-add-bar").removeClass("show-wizard-add-bar");
    $wetSaveCloudClone.find('.gi-img-icon-replacer').remove();

    // Extrahiere den Inhalt der Kopie
    var contentCloud = $wetSaveCloudClone.html();

    // Entferne alle HTML Kommentare
    contentCloud = contentCloud.replace(/<!--[\s\S]*?-->/g, '');

    // Entferne alle leeren Zeilen
    contentCloud = contentCloud.replace(/^\s*[\r\n]/gm, '');

    // Überprüfe die Größe des Inhalts
    if (new Blob([contentCloud]).size > 95 * 1024) { // 95 KB in Bytes
        console.error('Content exceeds 95 KB limit.');
        return;
    }

    // Entferne alle Teile aus chrome.storage.sync
    chrome.storage.sync.get(null, function(items) {
        var keys = Object.keys(items);
        if (keys.length > 0) {
            chrome.storage.sync.remove(keys, function() {
                if (chrome.runtime.lastError) {
                    console.error('Error removing old parts:', chrome.runtime.lastError);
                } else {
                    console.log('Removed old storage parts');
                    saveContent(); // Jetzt speichern
                }
            });
        } else {
            saveContent(); // Keine alten Teile, direkt speichern
        }
    });

    function saveContent() {
        // Splitte den Inhalt in kleinere Teile
        const chunkSize = 6000; // Größe der Teile in Bytes
        let chunks = [];
        for (let i = 0; i < contentCloud.length; i += chunkSize) {
            chunks.push(contentCloud.substring(i, i + chunkSize));
        }

        // Speichern der Teile in chrome.storage.sync
        chunks.forEach((chunk, index) => {
            chrome.storage.sync.set({ [`saveStorageCloud_part${index}`]: chunk }, function() {
                if (chrome.runtime.lastError) {
                    alertMessage("to many elements!");
                    console.error(`Error setting part ${index}:`, chrome.runtime.lastError);
                }
            });
        });

        chrome.storage.local.set({ 'activeStorageValue': "cloud" }, function() {
            if (chrome.runtime.lastError) {
                console.error('Error setting value:', chrome.runtime.lastError);
            }
        });

        alertMessage("saved to cloud");
        enterSaveMode();
        
        setTimeout(function() {
          loadStorage("cloud");
          location.reload();
        }, 1000);
    }
  });


  // load storage 1
  $(document).on('click', '#wet-bookmark-1', function() {
    chrome.storage.local.set({ 'activeStorageValue': 1 }, function() {
      if (chrome.runtime.lastError) {
        console.error('Error setting value:', chrome.runtime.lastError);
      }
    });

    chrome.storage.local.get(['activeStorageValue'], function(result) {
      if (result && result.activeStorageValue) {
          var activeStorageValue = result.activeStorageValue;
          loadStorage(activeStorageValue); // Verwende den Wert direkt
      }
    });

    location.reload();
  });

  // load storage 2
  $(document).on('click', '#wet-bookmark-2', function() {
    chrome.storage.local.set({ 'activeStorageValue': 2 }, function() {
      if (chrome.runtime.lastError) {
        console.error('Error setting value:', chrome.runtime.lastError);
      }
    });

    chrome.storage.local.get(['activeStorageValue'], function(result) {
      if (result && result.activeStorageValue) {
          var activeStorageValue = result.activeStorageValue;
          loadStorage(activeStorageValue); // Verwende den Wert direkt
      }
    });

    location.reload();
  });

  // load storage 3
  $(document).on('click', '#wet-bookmark-3', function() {
    chrome.storage.local.set({ 'activeStorageValue': 3 }, function() {
      if (chrome.runtime.lastError) {
        console.error('Error setting value:', chrome.runtime.lastError);
      }
    });

    chrome.storage.local.get(['activeStorageValue'], function(result) {
      if (result && result.activeStorageValue) {
          var activeStorageValue = result.activeStorageValue;
          loadStorage(activeStorageValue); // Verwende den Wert direkt
      }
    });

    location.reload();
  });

  // load storage Cloud
  $(document).on('click', '#wet-bookmark-cloud', function() {
    chrome.storage.local.set({ 'activeStorageValue': "cloud" }, function() {
      if (chrome.runtime.lastError) {
        console.error('Error setting value:', chrome.runtime.lastError);
      }
    });

    chrome.storage.local.get(['activeStorageValue'], function(result) {
      if (result && result.activeStorageValue) {
          var activeStorageValue = result.activeStorageValue;
          loadStorage(activeStorageValue); // Verwende den Wert direkt
      }
    });

    location.reload();
  });



  // für manuelle storagewahl
  function setAsActiveStorage ( storage ) {

    chrome.storage.local.remove([ 'activeStorageValue' ]);

    if (storage == "1") {
      chrome.storage.local.set({ 'activeStorageValue': "1" });
      loadStorage("1");
    } else if (storage == "2") {
      chrome.storage.local.set({ 'activeStorageValue': "2" });
      loadStorage("2");
    } else if (storage == "3") {
      chrome.storage.local.set({ 'activeStorageValue': "3" });
      loadStorage("3");
    } else if (storage == "cloud") {
      chrome.storage.local.set({ 'activeStorageValue': "cloud" });
      loadStorage("cloud");
    }

  }

  function checkStorage( storage ) {

    if (storage == "1") {
      chrome.storage.local.get(['saveStorage1'], function(result) {
          const value = result.saveStorage1;
          if (value !== null && value !== '') {
              $("#wet-save-1").addClass("storage-filled");
              $("#wet-bookmark-1").addClass("storage-filled");
          }
      });
    } else if (storage == "2") {
        chrome.storage.local.get(['saveStorage2'], function(result) {
            const value = result.saveStorage2;
            if (value !== null && value !== '') {
                $("#wet-save-2").addClass("storage-filled");
                $("#wet-bookmark-2").addClass("storage-filled");
            }
        });
    } else if (storage == "3") {
        chrome.storage.local.get(['saveStorage3'], function(result) {
            const value = result.saveStorage3;
            if (value !== null && value !== '') {
                $("#wet-save-3").addClass("storage-filled");
                $("#wet-bookmark-3").addClass("storage-filled");
            }
        });
    } else if (storage == "cloud") {
      chrome.storage.sync.get(['saveStorageCloud'], function(result) {
          const value = result.saveStorageCloud;
          if (value !== null && value !== '') {
              $("#wet-save-cloud").addClass("storage-filled");
              $("#wet-bookmark-cloud").addClass("storage-filled");
          }
      });
  }
    
  }

  function loadStorage( storage ) {

    if ( storage == "1" ) {

      chrome.storage.local.get(['saveStorage1'], function(result) {
        // Überprüfen, ob die Daten existieren
        if (result && result.saveStorage1) {
            // Erstelle ein neues jQuery-Objekt mit den abgerufenen Daten
            // Angenommen, die Daten sind HTML-String oder ähnliches
            var $newGrid = $(result.saveStorage1);

            $("#wet-save-3").removeClass("storage-loaded");
            $("#wet-save-2").removeClass("storage-loaded");
            $("#wet-save-cloud").removeClass("storage-loaded");
            $("#wet-save-1").addClass("storage-loaded");

            $("#wet-bookmark-3").removeClass("storage-loaded");
            $("#wet-bookmark-2").removeClass("storage-loaded");
            $("#wet-bookmark-cloud").removeClass("storage-loaded");
            $("#wet-bookmark-1").addClass("storage-loaded");
    
            // Füge den neuen Inhalt in die Seite ein
            $(".grid").prepend($newGrid);
        } else {
          $("#wet-save-1").removeClass("storage-filled");
          $("#wet-bookmark-1").removeClass("storage-filled");
        }
      });

    } else if ( storage == "2" ) {

      chrome.storage.local.get(['saveStorage2'], function(result) {
        // Überprüfen, ob die Daten existieren
        if (result && result.saveStorage2) {
            // Erstelle ein neues jQuery-Objekt mit den abgerufenen Daten
            // Angenommen, die Daten sind HTML-String oder ähnliches
            var $newGrid = $(result.saveStorage2);

            $("#wet-save-3").removeClass("storage-loaded");
            $("#wet-save-1").removeClass("storage-loaded");
            $("#wet-save-cloud").removeClass("storage-loaded");
            $("#wet-save-2").addClass("storage-loaded");

            $("#wet-bookmark-3").removeClass("storage-loaded");
            $("#wet-bookmark-1").removeClass("storage-loaded");
            $("#wet-bookmark-cloud").removeClass("storage-loaded");
            $("#wet-bookmark-2").addClass("storage-loaded");
    
            // Füge den neuen Inhalt in die Seite ein
            $(".grid").prepend($newGrid);
        } else {
          $("#wet-save-2").removeClass("storage-filled");
          $("#wet-bookmark-2").removeClass("storage-filled");
        }
      });

    } else if ( storage == "3" ) {

      chrome.storage.local.get(['saveStorage3'], function(result) {
        // Überprüfen, ob die Daten existieren
        if (result && result.saveStorage3) {
            // Erstelle ein neues jQuery-Objekt mit den abgerufenen Daten
            // Angenommen, die Daten sind HTML-String oder ähnliches
            var $newGrid = $(result.saveStorage3);

            $("#wet-save-1").removeClass("storage-loaded");
            $("#wet-save-2").removeClass("storage-loaded");
            $("#wet-save-cloud").removeClass("storage-loaded");
            $("#wet-save-3").addClass("storage-loaded");

            $("#wet-bookmark-1").removeClass("storage-loaded");
            $("#wet-bookmark-2").removeClass("storage-loaded");
            $("#wet-bookmark-cloud").removeClass("storage-loaded");
            $("#wet-bookmark-3").addClass("storage-loaded");
    
            // Füge den neuen Inhalt in die Seite ein
            $(".grid").prepend($newGrid);
        } else {
          $("#wet-save-3").removeClass("storage-filled");
          $("#wet-bookmark-3").removeClass("storage-filled");
        }
      });
      
    } else if (storage == "cloud") {
  
      // Funktion, die ein Promise für den Abruf eines Teils zurückgibt
      function getPart(index) {
          return new Promise((resolve, reject) => {
              chrome.storage.sync.get([`saveStorageCloud_part${index}`], function(result) {
                  if (chrome.runtime.lastError) {
                      reject(chrome.runtime.lastError);
                  } else {
                      resolve(result[`saveStorageCloud_part${index}`] || '');
                  }
              });
          });
      }
  
      // Dynamisch alle Teile abrufen
      function fetchAllParts() {
          let index = 0;
          let parts = [];
  
          function fetchNextPart() {
              return getPart(index).then(part => {
                  if (part) {
                      parts.push(part);
                      index++;
                      return fetchNextPart(); // Weiter zum nächsten Teil
                  } else {
                      return parts; // Keine weiteren Teile vorhanden
                  }
              });
          }
  
          return fetchNextPart(); // Starten mit dem ersten Teil
      }
  
      fetchAllParts()
        .then((results) => {
          // Ergebnisse zusammenfügen
          let contentCloud = results.join('');

          // Erstelle ein neues jQuery-Objekt mit den abgerufenen Daten
          var $newGrid = $(contentCloud);

          $("#wet-save-1").removeClass("storage-loaded");
          $("#wet-save-2").removeClass("storage-loaded");
          $("#wet-save-3").removeClass("storage-loaded");
          $("#wet-save-cloud").addClass("storage-loaded");

          $("#wet-bookmark-1").removeClass("storage-loaded");
          $("#wet-bookmark-2").removeClass("storage-loaded");
          $("#wet-bookmark-3").removeClass("storage-loaded");
          $("#wet-bookmark-cloud").addClass("storage-loaded");

          // Füge den neuen Inhalt in die Seite ein
          $(".grid").prepend($newGrid);
        })
        .catch((error) => {
          console.error('Error loading parts:', error);
          $("#wet-save-cloud").removeClass("storage-filled");
          $("#wet-bookmark-cloud").removeClass("storage-filled");
        });
    } else {
      console.log("no storage loaded");
    }

    $(".content").removeClass("wizard-on");
    $(".content").addClass("wizard-off");

  }


  // clear storages

  function clearStorage(storage) {

    if ( storage == "1" ) {
      chrome.storage.local.remove([ 'saveStorage1' ]);
      alertMessage("Storage 1 cleared");

    } else if ( storage == "2" ) {
      chrome.storage.local.remove([ 'saveStorage2' ]);
      alertMessage("Storage 2 cleared");

    } else if ( storage == "3" ) {
      chrome.storage.local.remove([ 'saveStorage3' ]);
      alertMessage("Storage 3 cleared");
      
    } else if ( storage == "cloud" ) {
      chrome.storage.sync.remove([ 'saveStorageCloud' ]);
      alertMessage("Storage Cloud cleared");
      
    }

    chrome.storage.local.get(['activeStorageValue'], function(result) {
      if (result && result.activeStorageValue) {
          var activeStorageValue = result.activeStorageValue;

          if ( activeStorageValue == storage ) {
            $(".grid").empty();
            console.log("alles gelöscht")

            alertMessage("active storage ("+storage+") cleared");

            enterSaveMode();
            
            setTimeout(function() {
              location.reload();
            }, 1000);
          }
      }
    });

  }

  $(document).on('click', '#wet-settings-storage-clearstorage1-button', function() {
    clearStorage("1");
  });

  $(document).on('click', '#wet-settings-storage-clearstorage2-button', function() {
    clearStorage("2");
  });

  $(document).on('click', '#wet-settings-storage-clearstorage3-button', function() {
    clearStorage("3");
  });

  $(document).on('click', '#wet-settings-storage-clearstoragecloud-button', function() {
    clearStorage("cloud");
  });


  // ###############################################
  // #              Sent search to AI              #
  // ###############################################

  var tabtype = "_self"; // _self or _blank

  document.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {

        // Prüfe, ob irgendein .searchbar-ai input im Fokus steht
        if ($('.item-searchbar-element input:focus').length > 0) {
            // Finde das spezifische .item-searchbar-element, das das fokussierte input enthält
            var $this = $('.item-searchbar-element input:focus').closest('.item-searchbar-element');

            // Speicher den Wert des Inputs in chrome.storage.local
            chrome.storage.local.set({ 'aisearchrequest': $this.find('input').val() }, function() {
                if (chrome.runtime.lastError) {
                    console.error('Error setting value:', chrome.runtime.lastError);
                }
            });

            // Überprüfe den Wert des data-ai-model Attributs und öffne den entsprechenden Link
            var aiModel = $this.attr('data-engine');

            if (aiModel === "Gemini") {
                window.open("https://gemini.google.com/", tabtype);
                $this.val("");

            } else if (aiModel === "ChatGPT") {
                window.open("https://chatgpt.com/", tabtype);
                $this.val("");

            } else {
                console.log("Dieses Model wird leider noch nicht unterstützt!");
            }
        }
    }
  });

  }}
});
