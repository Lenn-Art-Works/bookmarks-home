// popup.js

var randomWebsiteColor = "#fff";
// ####### set domain as title #######
$(document).ready( function () {
    

    document.addEventListener('keyup', (event) => {

        updatePopup();
        console.log("click");

    });

    getDomainInInput(function(domainName, url) {
        $('.create-title input').val(domainName);
        $('.grid-item .gi-title').val(domainName);
        $(".grid-item").attr("data-gi-title", $('.grid-item .gi-title').val() );
        $('.grid-item').attr('data-gi-url', url );
    });

    // ####### get random color from website #######
    getRandomColor(function(color) {
        randomWebsiteColor = colorToRgba(color);
        $('.grid-item').attr('data-gi-background-color', randomWebsiteColor);
        $('body').css('background-color', setOpacityToValue( colorToRgba( $('body').css('background-color') ) ,0.8));

        updatePopup();
    });

    // ####### Synced Inputs #######
    $('.grid-item .gi-title').on('input', function() {
        $('.create-title input').val( $('.grid-item .gi-title').val() );
        updatePopup();
    });
    
    $('.create-title input').on('input', function() {
        $('.grid-item .gi-title').val( $('.create-title input').val() );
        updatePopup();
    });


// ###############################################
// #                 setup element               #
// ###############################################

    $(document).on('click', '#wizard-add-bar-element-banner', function() {
        
    });

    $(document).on('click', '#wizard-add-bar-element-card', function() {
        
        var getDataTitle = $(".grid-item").attr("data-gi-title");
        var getDataBackgroundColor = $(".grid-item").attr("data-gi-background-color");
        var getDataDisplayMode = $(".grid-item").attr("data-gi-display-mode");
        var getDataURL = $(".grid-item").attr("data-gi-url");
        var getDataID = $(".grid-item").attr("data-gi-id");

        $(".grid-item").remove();
        $(".editing-wrapper").append(GIbaseCardElement);

        makePtoInput();

        $(".grid-item").attr("data-gi-title", getDataTitle);
        $(".grid-item").find(".gi-title-input").val( $(".grid-item").attr("data-gi-title") );
        $(".grid-item").attr("data-gi-background-color", getDataBackgroundColor);
        $(".grid-item").attr("data-gi-display-mode", getDataDisplayMode);
        $(".grid-item").attr("data-gi-url", getDataURL);
        $(".grid-item").attr("data-gi-id", getDataID);

        $('.editing-segments').removeClass("light-mode").removeClass("dark-mode");
        $('.editing-segments').addClass(getDataDisplayMode);

        $(".grid-item").find(".gi-title").text( $(".grid-item").attr("data-gi-title") );

        updatePopup();
    });

    $(document).on('click', '#wizard-add-bar-element-tag', function() {
        
        var getDataTitle = $(".grid-item").attr("data-gi-title");
        var getDataBackgroundColor = $(".grid-item").attr("data-gi-background-color");
        var getDataDisplayMode = $(".grid-item").attr("data-gi-display-mode");
        var getDataURL = $(".grid-item").attr("data-gi-url");
        var getDataID = $(".grid-item").attr("data-gi-id");

        $(".grid-item").remove();
        $(".editing-wrapper").append(GIbaseTagElement);

        makePtoInput();

        $(".grid-item").attr("data-gi-title", getDataTitle);
        $(".grid-item").find(".gi-title-input").val( $(".grid-item").attr("data-gi-title") );
        $(".grid-item").attr("data-gi-background-color", getDataBackgroundColor);
        $(".grid-item").attr("data-gi-display-mode", getDataDisplayMode);
        $(".grid-item").attr("data-gi-url", getDataURL);
        $(".grid-item").attr("data-gi-id", getDataID);

        $('.editing-segments').removeClass("light-mode").removeClass("dark-mode");
        $('.editing-segments').addClass(getDataDisplayMode);

        $(".grid-item").find(".gi-title").text( $(".grid-item").attr("data-gi-title") );

        updatePopup();
    });

    $(document).on('click', '#wizard-add-bar-element-icon_big', function() {

        var getDataTitle = $(".grid-item").attr("data-gi-title");
        var getDataBackgroundColor = $(".grid-item").attr("data-gi-background-color");
        var getDataDisplayMode = $(".grid-item").attr("data-gi-display-mode");
        var getDataURL = $(".grid-item").attr("data-gi-url");
        var getDataID = $(".grid-item").attr("data-gi-id");

        $(".grid-item").remove();
        $(".editing-wrapper").append(GIbaseIconBigElement);

        makePtoInput();

        $(".grid-item").attr("data-gi-title", getDataTitle);
        $(".grid-item").find(".gi-title-input").val( $(".grid-item").attr("data-gi-title") );
        $(".grid-item").attr("data-gi-background-color", getDataBackgroundColor);
        $(".grid-item").attr("data-gi-display-mode", getDataDisplayMode);
        $(".grid-item").attr("data-gi-url", getDataURL);
        $(".grid-item").attr("data-gi-id", getDataID);

        $('.editing-segments').removeClass("light-mode").removeClass("dark-mode");
        $('.editing-segments').addClass(getDataDisplayMode);

        updatePopup();
    });

    $(document).on('click', '#wizard-add-bar-element-icon_small', function() {
        
        var getDataTitle = $(".grid-item").attr("data-gi-title");
        var getDataBackgroundColor = $(".grid-item").attr("data-gi-background-color");
        var getDataDisplayMode = $(".grid-item").attr("data-gi-display-mode");
        var getDataURL = $(".grid-item").attr("data-gi-url");
        var getDataID = $(".grid-item").attr("data-gi-id");

        $(".grid-item").remove();
        $(".editing-wrapper").append(GIbaseIconSmallElement);

        makePtoInput();

        $(".grid-item").attr("data-gi-title", getDataTitle);
        $(".grid-item").find(".gi-title-input").val( $(".grid-item").attr("data-gi-title") );
        $(".grid-item").attr("data-gi-background-color", getDataBackgroundColor);
        $(".grid-item").attr("data-gi-display-mode", getDataDisplayMode);
        $(".grid-item").attr("data-gi-url", getDataURL);
        $(".grid-item").attr("data-gi-id", getDataID);

        $('.editing-segments').removeClass("light-mode").removeClass("dark-mode");
        $('.editing-segments').addClass(getDataDisplayMode);

        updatePopup();
    });


// ###############################################
// #                 load segments               #
// ###############################################

    $(document).on('click', '.create-open-advanced-settings', function() {
        $(".create-editing-segments").append("<div class='editing-segments " + $(".editing-wrapper .grid-item").attr("data-gi-display-mode") + " smain-c-text'></div>");

        $(".create-open-advanced-settings").after('<p class="create-close-advanced-settings create-advanced-settings-text">- close settings</p>')
        $(".create-open-advanced-settings").remove();

        // addSegment("advanced");
        addSegment("url");
        addSegment("color");

        updatePopup();
    });

    $(document).on('click', '.create-close-advanced-settings', function() {
        $(".editing-segments").remove();

        $(".create-close-advanced-settings").after('<p class="create-open-advanced-settings create-advanced-settings-text">+ more settings</p>')
        $(".create-close-advanced-settings").remove();

        updatePopup();
    });

    
// ###############################################
// #                     save                    #
// ###############################################

    // change IDs for Storage Icons to set new functions
    setTimeout(function() {
        // Ändert die IDs der Elemente
        $("#wet-save-1").attr("id", "wet-storage-1");
        $("#wet-save-2").attr("id", "wet-storage-2");
        $("#wet-save-3").attr("id", "wet-storage-3");
        $("#wet-save-cloud").attr("id", "wet-storage-cloud");
    }, 50);

    $(document).on('click', '#wet-storage-1', function() {
        $("#wet-storage-cloud").removeClass("storage-loaded");
        $("#wet-storage-2").removeClass("storage-loaded");
        $("#wet-storage-3").removeClass("storage-loaded");
        $("#wet-storage-1").addClass("storage-loaded");
    });

    $(document).on('click', '#wet-storage-2', function() {
        $("#wet-storage-1").removeClass("storage-loaded");
        $("#wet-storage-cloud").removeClass("storage-loaded");
        $("#wet-storage-3").removeClass("storage-loaded");
        $("#wet-storage-2").addClass("storage-loaded");
    });

    $(document).on('click', '#wet-storage-3', function() {
        $("#wet-storage-1").removeClass("storage-loaded");
        $("#wet-storage-2").removeClass("storage-loaded");
        $("#wet-storage-cloud").removeClass("storage-loaded");
        $("#wet-storage-3").addClass("storage-loaded");
    });

    $(document).on('click', '#wet-storage-cloud', function() {
        $("#wet-storage-1").removeClass("storage-loaded");
        $("#wet-storage-2").removeClass("storage-loaded");
        $("#wet-storage-3").removeClass("storage-loaded");
        $("#wet-storage-cloud").addClass("storage-loaded");
    });

    $(document).on('click', '.create-save #wet-icon-save', function() {

        // change <input> to <p>
        $('.gi-title').each(function() {
            var $input = $(this); // Referenz auf das aktuelle <input>-Element
            var inputValue = $input.val(); // Hole den Wert des <input>-Elements
        
            // Erstelle ein neues <p>-Element
            var $p = $('<p>').text(inputValue);
        
            // Kopiere alle Attribute vom <input> auf das <p>-Element
            $.each(this.attributes, function() {
                $p.attr(this.name, this.value);
            });
        
            // Ersetze das <input>-Element durch das <p>-Element
            $input.replaceWith($p);
        });

        if ( $("#wet-storage-1").hasClass("storage-loaded") ) {

            chrome.storage.local.get('saveStorage1', function(result) {
                var currentContent = result.saveStorage1 || ''; // Falls kein Inhalt vorhanden ist, benutze einen leeren String

                // Klone das Element, dessen HTML-Code hinzugefügt werden soll
                var $wetSave1Clone = $('.editing-wrapper').clone();
                var contentAddTo1 = $wetSave1Clone.html(); // Hol dir den HTML-Inhalt des geklonten Elements
        
                // Lade den aktuellen Inhalt in ein jQuery-Objekt
                var $tempContainer = $('<div>').html(currentContent);
                var $gridContainer = $tempContainer.find('.grid-container');
                
                if ($gridContainer.length) {
                    // Wenn .grid-container vorhanden ist, füge den neuen Inhalt nach dem letzten Kind hinzu
                    $gridContainer.append('\n'+contentAddTo1);
                } else {
                    // Wenn .grid-container nicht vorhanden ist, füge den neuen Inhalt am Ende des gesamten Inhalts hinzu
                    $tempContainer.append('\n'+contentAddTo1);
                }
        
                // Aktualisierter Inhalt wird wieder in den Storage gespeichert
                chrome.storage.local.set({ 'saveStorage1': $tempContainer.html() }, function() {
                    console.log('Storage updated with new content');
                });
            });

        } else if ( $("#wet-storage-2").hasClass("storage-loaded") ) {
            
            chrome.storage.local.get('saveStorage2', function(result) {
                var currentContent = result.saveStorage2 || ''; // Falls kein Inhalt vorhanden ist, benutze einen leeren String
        
                // Klone das Element, dessen HTML-Code hinzugefügt werden soll
                var $wetSave2Clone = $('.editing-wrapper').clone();
                var contentAddTo2 = $wetSave2Clone.html(); // Hol dir den HTML-Inhalt des geklonten Elements
        
                // Lade den aktuellen Inhalt in ein jQuery-Objekt
                var $tempContainer = $('<div>').html(currentContent);
        
                // Finde die .grid-container
                var $gridContainer = $tempContainer.find('.grid-container');
                
                if ($gridContainer.length) {
                    // Wenn .grid-container vorhanden ist, füge den neuen Inhalt nach dem letzten Kind hinzu
                    $gridContainer.append('\n'+contentAddTo2);
                } else {
                    // Wenn .grid-container nicht vorhanden ist, füge den neuen Inhalt am Ende des gesamten Inhalts hinzu
                    $tempContainer.append('\n'+contentAddTo2);
                }
        
                // Aktualisierter Inhalt wird wieder in den Storage gespeichert
                chrome.storage.local.set({ 'saveStorage2': $tempContainer.html() }, function() {
                    console.log('Storage updated with new content');
                });
            });

        } else if ( $("#wet-storage-3").hasClass("storage-loaded") ) {
            
            chrome.storage.local.get('saveStorage3', function(result) {
                var currentContent = result.saveStorage3 || ''; // Falls kein Inhalt vorhanden ist, benutze einen leeren String
        
                // Klone das Element, dessen HTML-Code hinzugefügt werden soll
                var $wetSave3Clone = $('.editing-wrapper').clone();
                var contentAddTo3 = $wetSave3Clone.html(); // Hol dir den HTML-Inhalt des geklonten Elements
        
                // Lade den aktuellen Inhalt in ein jQuery-Objekt
                var $tempContainer = $('<div>').html(currentContent);
        
                // Finde die .grid-container
                var $gridContainer = $tempContainer.find('.grid-container');
                
                if ($gridContainer.length) {
                    // Wenn .grid-container vorhanden ist, füge den neuen Inhalt nach dem letzten Kind hinzu
                    $gridContainer.append('\n'+contentAddTo3);
                } else {
                    // Wenn .grid-container nicht vorhanden ist, füge den neuen Inhalt am Ende des gesamten Inhalts hinzu
                    $tempContainer.append('\n'+contentAddTo3);
                }
        
                // Aktualisierter Inhalt wird wieder in den Storage gespeichert
                chrome.storage.local.set({ 'saveStorage3': $tempContainer.html() }, function() {
                    console.log('Storage updated with new content');
                });
            });

        } else if ( $("#wet-storage-cloud").hasClass("storage-loaded") ) {
            
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

                    console.log(contentCloud);

                    // Erstelle ein neues jQuery-Objekt mit den abgerufenen Daten
                    var currentContent = $(contentCloud);

                    // Klone das Element, dessen HTML-Code hinzugefügt werden soll
                    var $wetSaveCloudClone = $('.editing-wrapper').clone();
                    var contentAddToCloud = $wetSaveCloudClone.html(); // Hol dir den HTML-Inhalt des geklonten Elements
            
                    // Lade den aktuellen Inhalt in ein jQuery-Objekt
                    var $tempContainer = $('<div>').html(currentContent);
            
                    // Finde die .grid-container
                    var $gridContainer = $tempContainer.find('.grid-container');
                    
                    if ($gridContainer.length) {
                        // Wenn .grid-container vorhanden ist, füge den neuen Inhalt nach dem letzten Kind hinzu
                        $gridContainer.append('\n'+contentAddToCloud);
                    } else {
                        // Wenn .grid-container nicht vorhanden ist, füge den neuen Inhalt am Ende des gesamten Inhalts hinzu
                        $tempContainer.append('\n'+contentAddToCloud);
                    }

                    var updatedContent = $tempContainer.html();
                    $tempContainer = updatedContent;
            
                    // Splitte den Inhalt in kleinere Teile
                    const chunkSize = 6000; // Größe der Teile in Bytes
                    let chunks = [];
                    for (let i = 0; i < $tempContainer.length; i += chunkSize) {
                        chunks.push($tempContainer.substring(i, i + chunkSize));
                    }

                    // Speichern der Teile in chrome.storage.sync
                    chunks.forEach((chunk, index) => {
                        chrome.storage.sync.set({ [`saveStorageCloud_part${index}`]: chunk }, function() {
                            if (chrome.runtime.lastError) {
                                console.error(`Error setting part ${index}:`, chrome.runtime.lastError);
                            }
                        });
                    });
                })
                .catch((error) => {

                    var currentContent = "";

                    // Klone das Element, dessen HTML-Code hinzugefügt werden soll
                    var $wetSaveCloudClone = $('.editing-wrapper').clone();
                    var contentAddToCloud = $wetSaveCloudClone.html(); // Hol dir den HTML-Inhalt des geklonten Elements
            
                    // Lade den aktuellen Inhalt in ein jQuery-Objekt
                    var $tempContainer = $('<div>').html(currentContent);
            
                    // Finde die .grid-container
                    var $gridContainer = $tempContainer.find('.grid-container');
                    
                    if ($gridContainer.length) {
                        // Wenn .grid-container vorhanden ist, füge den neuen Inhalt nach dem letzten Kind hinzu
                        $gridContainer.append('\n'+contentAddToCloud);
                    } else {
                        // Wenn .grid-container nicht vorhanden ist, füge den neuen Inhalt am Ende des gesamten Inhalts hinzu
                        $tempContainer.append('\n'+contentAddToCloud);
                    }

                    if (new Blob([$tempContainer]).size > 95 * 1024) { // 95 KB in Bytes
                        console.error('Content exceeds 95 KB limit.');
                        return;
                    }

                    // Splitte den Inhalt in kleinere Teile
                    const chunkSize = 6000; // Größe der Teile in Bytes
                    let chunks = [];
                    for (let i = 0; i < $tempContainer.length; i += chunkSize) {
                        chunks.push($tempContainer.substring(i, i + chunkSize));
                    }

                    // Speichern der Teile in chrome.storage.sync
                    chunks.forEach((chunk, index) => {
                        chrome.storage.sync.set({ [`saveStorageCloud_part${index}`]: chunk }, function() {
                            if (chrome.runtime.lastError) {
                                console.error(`Error setting part ${index}:`, chrome.runtime.lastError);
                            }
                        });
                    });
                });
        }

        setTimeout(function() {
            window.close();
        }, 100);
    });

});


// ###############################################
// #                   functions                 #
// ###############################################

// get domain name as title
function getDomainInInput(callback) {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        var currentTab = tabs[0];
        var url = new URL(currentTab.url); // URL des aktuellen Tabs

        // Domain und Subdomain extrahieren
        var hostname = url.hostname; // z.B. 'photos.google.com'

        // Subdomain 'www.' entfernen, falls vorhanden
        if (hostname.startsWith('www.')) {
            hostname = hostname.substring(4);
        }

        // Den Domain-Namen in Teile zerlegen
        var parts = hostname.split('.');

        // Entferne die letzte Teil (TLD)
        if (parts.length > 1) {
            parts.pop();
        }

        var formattedDomainName;
        // Hauptdomain und Subdomain umdrehen
        if (parts.length > 1) {
            var domain = parts.shift(); // Hauptdomain
            var subdomain = parts.join(' '); // Subdomain
            // Den ersten Buchstaben jedes Teils großschreiben
            var formattedSubdomain = subdomain.charAt(0).toUpperCase() + subdomain.slice(1).toLowerCase();
            var formattedDomain = domain.charAt(0).toUpperCase() + domain.slice(1).toLowerCase();
            // Kombination in der Reihenfolge Hauptdomain und Subdomain
            formattedDomainName = formattedSubdomain + ' ' + formattedDomain;
        } else {
            // Falls nur ein Teil vorhanden ist
            formattedDomainName = parts[0].charAt(0).toUpperCase() + parts[0].slice(1).toLowerCase();
        }

        // Callback-Funktion aufrufen und den formatierten Domainnamen sowie die URL übergeben
        callback(formattedDomainName, currentTab.url);
    });
}

function makePtoInput() {
    var $giTitle = $('.editing-wrapper').find(".gi-title");

    var $input = $('<input>', {
        text: $giTitle.text(),               // Kopiere den Text des <p>-Elements in das Input
        id: $giTitle.attr('id'),              // Behalte die ID des <p>-Elements bei
        class: $giTitle.attr('class')         // Behalte die Klasse des <p>-Elements bei
    });

    $giTitle.css("display","none");
    $input.addClass("gi-title-input");
    $giTitle.after($input);
    $(".gi-title-input").css("display","flex");
}

// update Popupcolors...
function updatePopup() {

    $(".grid-item").attr( "data-gi-background-color", $(".es-enter-hexcolor").val() );
    $(".grid-item").attr( "data-gi-title", $(".gi-title-input").val() );
    $(".grid-item").attr( "data-gi-url", $("#es-url .es-enter-url").attr("data-actual-url") );
    
    $(".grid-item").attr("data-gi-title", $('.create-title input').val() );

    $('html').css('background-color', $('.grid-item').attr('data-gi-background-color') );

    var luminance = checkifdarkorlightmode();
    
    if ( (luminance >= 0.5 && !$('.grid-item').hasClass("customDisplaymode")) || luminance >= 0.95 ) {
        $('.grid-item').attr("data-gi-display-mode", "light-mode");
        $('.grid-item').removeClass("dark-mode").addClass("light-mode");
    } else if ( (luminance < 0.5 && !$('.grid-item').hasClass("customDisplaymode")) || luminance <= 0.1 ){
        $('.grid-item').attr("data-gi-display-mode", "dark-mode");
        $('.grid-item').removeClass("light-mode").addClass("dark-mode");
    }

    if ( luminance <= 0.1 || luminance >= 0.95 ) {
        $(".smain-c-bg-accent").css("display","block");
        $('.grid-item').removeClass("customDisplaymode");
        $('.grid-item').addClass("fixedDisplaymode");
    } else {
        $(".smain-c-bg-accent").css("display","none");
        $('.grid-item').removeClass("fixedDisplaymode");
    }

    if ( luminance <= 0.1 ) {
        $('.grid-item').attr("data-gi-display-mode", "dark-mode");
        $('.grid-item').removeClass("light-mode").addClass("dark-mode");
    } else if ( luminance >= 0.95 ) {
        $('.grid-item').attr("data-gi-display-mode", "light-mode");
        $('.grid-item').removeClass("dark-mode").addClass("light-mode");
    }

    if ( $('.grid-item').attr("data-gi-display-mode") === "dark-mode" ) {
        $('.editing-segments').removeClass("light-mode").addClass("dark-mode");

    } else if ( $('.grid-item').attr("data-gi-display-mode") === "dark-mode" ) {
        $('.editing-segments').removeClass("dark-mode").addClass("light-mode");
    }

    $('.grid-item').attr('data-gi-title', $('.grid-item .gi-title-input').val() );
    //$('.grid-item').find( ".gi-title" ).val( $('.grid-item').attr('data-gi-title') );

    updateGI();


    
}

// get random color from website
function getRandomColor(callback) {
    if (typeof callback !== 'function') {
        console.error('Callback is not a function');
        return;
    }

    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        var currentTab = tabs[0];
        chrome.scripting.executeScript(
            {
                target: { tabId: currentTab.id },
                func: function() {
                    function getRandomColor() {
                        var colors = [];

                        // Funktion zum Ermitteln der Hintergrundfarbe
                        function getBackgroundColor(element) {
                            return window.getComputedStyle(element).backgroundColor;
                        }

                        document.querySelectorAll('*').forEach(function(element) {
                            var color = getBackgroundColor(element);
                            if (color && color !== 'rgba(0, 0, 0, 0)' && !colors.includes(color)) {
                                colors.push(color);
                            }
                        });

                        if (colors.length > 0) {
                            var randomIndex = Math.floor(Math.random() * colors.length);
                            return colors[randomIndex];
                        } else {
                            return 'No color found';
                        }
                    }
                    return getRandomColor();
                }
            },
            function(result) {
                if (chrome.runtime.lastError) {
                    console.error(chrome.runtime.lastError);
                } else {
                    const color = result[0]?.result || 'No color found';
                    callback(color);
                }
            }
        );
    });
}


function saveElementEdits() {
    updatePopup();
}

