



// ###############################################
// #               General Functions             #
// ###############################################

// Funktion für Generierung einer validen itemsetupDataID
function generateValidId( title ) {
    var title2 = title+"";
    return title2.replace(/[^A-Za-z0-9-_]/g, ''); // Ersetze alle Zeichen, die nicht Buchstaben, Zahlen, - oder _ sind, durch _
}


function reloadCSS() {
    // Holen Sie sich das aktuelle Stylesheet-Element
    var link = $('#main-stylesheet');
    
    // Erstellen Sie eine neue URL für das Stylesheet, um den Cache zu umgehen
    var newHref = link.attr('href').split('?')[0] + '?v=' + new Date().getTime();
    
    // Setzen Sie die neue URL im href-Attribut des Stylesheets
    link.attr('href', newHref);
}


function setOpacityToValue(rgba,value) {
    // Regular Expression to match RGBA format
    const rgbaRegex = /^rgba\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*([0-1]|0?\.\d+)\s*\)$/;

    // Check if the input matches the RGBA format
    const match = rgba.match(rgbaRegex);

    if (match) {
        const r = match[1];
        const g = match[2];
        const b = match[3];
        return `rgba(${r}, ${g}, ${b}, ${value})`;
    } else {
        return "invalidcolor"; // Return an error message if the input is not a valid RGBA
    }
}

function invertRgbaColor(rgba) {
    // Regular expression to match rgba color format
    const rgbaPattern = /^rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d*\.?\d+)\s*\)$/;

    // Check if the input matches the rgba pattern
    const match = rgba.match(rgbaPattern);

    if (match) {
        // Extract R, G, B, and A values
        const r = parseInt(match[1], 10);
        const g = parseInt(match[2], 10);
        const b = parseInt(match[3], 10);
        const a = parseFloat(match[4]);

        // Invert R, G, B values
        const invertedR = 255 - r;
        const invertedG = 255 - g;
        const invertedB = 255 - b;

        // Return the inverted rgba color
        return `rgba(${invertedR}, ${invertedG}, ${invertedB}, ${a})`;
    } else {
        // If the input is not a valid rgba color, return an error message
        return 'invalid color';
    }
}

function colorToRgba(color) {
    // Helper function to check if a value is a valid number
    function isValidNumber(value) {
        return !isNaN(parseFloat(value)) && isFinite(value);
    }

    // Convert HEX to RGBA
    function hexToRgba(hex) {
        let r, g, b, a = 1;
        hex = hex.replace(/^#/, '');

        if (hex.length === 3) {
            r = parseInt(hex[0] + hex[0], 16);
            g = parseInt(hex[1] + hex[1], 16);
            b = parseInt(hex[2] + hex[2], 16);
        } else if (hex.length === 6) {
            r = parseInt(hex.substring(0, 2), 16);
            g = parseInt(hex.substring(2, 4), 16);
            b = parseInt(hex.substring(4, 6), 16);
        } else if (hex.length === 8) {
            r = parseInt(hex.substring(0, 2), 16);
            g = parseInt(hex.substring(2, 4), 16);
            b = parseInt(hex.substring(4, 6), 16);
            a = parseInt(hex.substring(6, 8), 16) / 255;
        } else {
            return "invalidcolor";
        }

        return `rgba(${r}, ${g}, ${b}, ${a})`;
    }

    // Convert RGB to RGBA
    function rgbToRgba(rgb) {
        const match = rgb.match(/^rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/);
        if (match) {
            const r = parseInt(match[1], 10);
            const g = parseInt(match[2], 10);
            const b = parseInt(match[3], 10);
            return `rgba(${r}, ${g}, ${b}, 1)`;
        }

        const matchA = rgb.match(/^rgba\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*([0-1]|0?\.\d+)\s*\)$/);
        if (matchA) {
            const r = parseInt(matchA[1], 10);
            const g = parseInt(matchA[2], 10);
            const b = parseInt(matchA[3], 10);
            const a = parseFloat(matchA[4]);
            return `rgba(${r}, ${g}, ${b}, ${a})`;
        }

        return "invalidcolor";
    }

    // Convert HSL to RGBA
    function hslToRgba(hsl) {
        const match = hsl.match(/^hsl\s*\(\s*(\d+)\s*,\s*(\d+)%\s*,\s*(\d+)%\s*\)$/);
        if (match) {
            let h = parseInt(match[1], 10);
            let s = parseInt(match[2], 10) / 100;
            let l = parseInt(match[3], 10) / 100;

            if (s === 0) {
                const value = Math.round(l * 255);
                return `rgba(${value}, ${value}, ${value}, 1)`;
            }

            function hueToRgb(p, q, t) {
                if (t < 0) t += 1;
                if (t > 1) t -= 1;
                if (t < 1 / 6) return p + (q - p) * 6 * t;
                if (t < 1 / 2) return q;
                if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
                return p;
            }

            const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            const p = 2 * l - q;

            h = h / 360;
            const r = Math.round(hueToRgb(p, q, h + 1 / 3) * 255);
            const g = Math.round(hueToRgb(p, q, h) * 255);
            const b = Math.round(hueToRgb(p, q, h - 1 / 3) * 255);

            return `rgba(${r}, ${g}, ${b}, 1)`;
        }

        const matchA = hsl.match(/^hsla\s*\(\s*(\d+)\s*,\s*(\d+)%\s*,\s*(\d+)%\s*,\s*([0-1]|0?\.\d+)\s*\)$/);
        if (matchA) {
            let h = parseInt(matchA[1], 10);
            let s = parseInt(matchA[2], 10) / 100;
            let l = parseInt(matchA[3], 10) / 100;
            let a = parseFloat(matchA[4]);

            if (s === 0) {
                const value = Math.round(l * 255);
                return `rgba(${value}, ${value}, ${value}, ${a})`;
            }

            function hueToRgb(p, q, t) {
                if (t < 0) t += 1;
                if (t > 1) t -= 1;
                if (t < 1 / 6) return p + (q - p) * 6 * t;
                if (t < 1 / 2) return q;
                if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
                return p;
            }

            const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            const p = 2 * l - q;

            h = h / 360;
            const r = Math.round(hueToRgb(p, q, h + 1 / 3) * 255);
            const g = Math.round(hueToRgb(p, q, h) * 255);
            const b = Math.round(hueToRgb(p, q, h - 1 / 3) * 255);

            return `rgba(${r}, ${g}, ${b}, ${a})`;
        }

        return "invalidcolor";
    }

    // Convert HWB to RGBA
    function hwbToRgba(hwb) {
        const match = hwb.match(/^hwb\s*\(\s*(\d+)\s*,\s*(\d+)%\s*,\s*(\d+)%\s*\)$/);
        if (match) {
            let h = parseInt(match[1], 10) / 360;
            let w = parseInt(match[2], 10) / 100;
            let b = parseInt(match[3], 10) / 100;

            const r = Math.round(255 * (1 - w - b) * (1 + 2 * w - 2 * w * b));
            const g = Math.round(255 * (1 - w - b) * (1 + 2 * (1 - w) - 2 * w * b));
            const b2 = Math.round(255 * (1 - w - b) * (1 + 2 * (1 - w) - 2 * w * b));

            return `rgba(${r}, ${g}, ${b2}, 1)`;
        }

        const matchA = hwb.match(/^hwba\s*\(\s*(\d+)\s*,\s*(\d+)%\s*,\s*(\d+)%\s*,\s*([0-1]|0?\.\d+)\s*\)$/);
        if (matchA) {
            let h = parseInt(matchA[1], 10) / 360;
            let w = parseInt(matchA[2], 10) / 100;
            let b = parseInt(matchA[3], 10) / 100;
            let a = parseFloat(matchA[4]);

            const r = Math.round(255 * (1 - w - b) * (1 + 2 * w - 2 * w * b));
            const g = Math.round(255 * (1 - w - b) * (1 + 2 * (1 - w) - 2 * w * b));
            const b2 = Math.round(255 * (1 - w - b) * (1 + 2 * (1 - w) - 2 * w * b));

            return `rgba(${r}, ${g}, ${b2}, ${a})`;
        }

        return "invalidcolor";
    }

    // Main conversion logic
    if (/^#(?:[0-9a-fA-F]{3}){1,2}$/.test(color)) {
        return hexToRgba(color);
    } else if (/^rgb/.test(color)) {
        return rgbToRgba(color);
    } else if (/^hsl/.test(color)) {
        return hslToRgba(color);
    } else if (/^hwb/.test(color)) {
        return hwbToRgba(color);
    }
    
    return "invalidcolor";
}

function checkifdarkorlightmode() {
    var $color = $(".editing-wrapper .grid-item").attr("data-gi-background-color");
    $color = colorToRgba($color);
    const rgbaMatch = $color.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+\.?\d*))?\)$/);

    if (!rgbaMatch) {
        console.error('Ungültiger rgba-Wert:', $color);
        return false; // Ungültiger rgba-Wert, kann nicht bewertet werden
    }

    // Zerlege die Farbe in RGB-Komponenten
    let r = parseInt(rgbaMatch[1], 10);
    let g = parseInt(rgbaMatch[2], 10);
    let b = parseInt(rgbaMatch[3], 10);

    // Überprüfe, ob die RGB-Werte gültig sind
    if (isNaN(r) || isNaN(g) || isNaN(b)) {
        console.error('Fehler beim Parsen der RGB-Werte:', { r, g, b });
        return false;
    }

    // Berechne die relative Luminanz
    const luminance = 0.2126 * (r / 255) + 0.7152 * (g / 255) + 0.0722 * (b / 255);

    return luminance;
}

// make url shorter
function getDomainFromUrl(url) {
    // Prüfe, ob die URL mit etwas anderem als 'http://' oder 'https://' beginnt
    if (!/^https?:\/\//i.test(url)) {
        // Extrahiere das Protokoll (bis zum ersten ':' inkl. '//')
        var protocol = url.split(':')[0] + '://...';
        return protocol;
    }

    var a = document.createElement('a');
    a.href = url;

    var hostname = a.hostname; // Zum Beispiel: 'photos.google.com'

    // Entferne 'www.' falls vorhanden
    hostname = hostname.replace(/^www\./, '');

    // Teile den Hostnamen in Teile auf
    var parts = hostname.split('.');

    // Wenn es mehr als zwei Teile gibt, dann stelle sicher, dass die Subdomain und Hauptdomain angezeigt werden
    if (parts.length > 2) {
        // Füge die letzten zwei Teile des Hostnamens zusammen (Hauptdomain und TLD)
        var domain = parts.slice(-2).join('.'); // 'google.com'
        
        // Füge die Subdomain(en) hinzu
        var subdomain = parts.slice(0, -2).join('.'); // 'photos'
        if (subdomain) {
            return subdomain + '.' + domain; // 'photos.google.com'
        } else {
            return domain; // Fallback für einfache Domains wie 'example.com'
        }
    } else {
        // Für Domains ohne Subdomains, z.B. 'google.com'
        return hostname;
    }
}


// close wizard editing tool overlayer

function closeWETOverlayer() {
    $(".wet-overlayer-icons").removeClass("wet-overlayer-opened-save");
    $(".wet-overlayer-icons").removeClass("wet-overlayer-opened-bookmarks");
    $(".wet-overlayer-icons").removeClass("wet-overlayer-opened-backup");
    $(".wet-overlayer-icons").removeClass("wet-overlayer-opened-columns");
}


// alert messages

function alertMessage(message, specialfunction) {

    $(".wet-overlayer-icons").removeClass("wet-overlayer-opened-save");
    $(".wet-overlayer-icons").removeClass("wet-overlayer-opened-bookmarks");
  
    $(".alert-message").remove();
    $(".wizard-editing-overlay").append("<div class='alert-message'>"+ message +"</div>");
  
    // Starte den Timer und speichere die Timeout-ID
    setTimeout(function() {
        $(".alert-message").remove();
    }, 2300);
  
    // Prüfe auf die spezielle Funktion
    if (specialfunction == "openwizard") {
        $(".alert-message").addClass("openwizard");
  
        // Füge den Mouseenter-Event-Listener hinzu
        $(document).on("mouseenter", ".openwizard.alert-message", function() {
            $(this).text("open wizard mode");
        });
    }
  
}

$(document).on("click", ".openwizard", function() {
    $(".alert-message").remove();
    enterWizardMode();
});


// enter wizard mode

function enterWizardMode() {
    $(".content").removeClass("wizard-off").addClass("wizard-on");
    createDragMode();
}


// create drag mode

function createDragMode() {
    if ( $(".content").hasClass("wizard-on") ) {
        // Hole das Container-Element mit jQuery
        var $sortableContainer = $('.wizard-on .grid-container');

        // Initialisiere Sortable
        Sortable.create($sortableContainer[0], {
            animation: 150, // Geschwindigkeit der Animation beim Verschieben
            filter: ".not-draggable, .wizard-on .editing-wrapper .item-searchbar",
            ghostClass: 'sortable-ghost',
            dragClass: 'sortable-drag',
            chosenClass: "sortable-chosen",
            onStart: function(evt) {
                $(".grid-container").addClass("drag-mode");
                removeWizardAddBar();
                $(".wizard-editing-tool").addClass("invisible");
                closeWETOverlayer();
                closeSearchbarPicker();

                $(".grid-item.tutorial-mode").attr("data-gi-title","click me");
                $(".grid-item.tutorial-mode .gi-title").text( $(".grid-item.setup-item").attr("data-gi-title") );
            },
            onEnd: function(evt) {
                $(".grid-container").removeClass("drag-mode");
                $(".wizard-editing-tool").removeClass("invisible");
                $(".grid").removeAttr("draggable");
                $(".grid *").removeAttr("draggable");
                scaleGridContainer();
            }
        });
    }
}


// save mode for we-content save in storage

function enterSaveMode() {
    $(".grid-container").css("filter","blur(5px) opacity(0.6)");
    $(".wizard-editing-tool").css("filter","blur(5px) opacity(0.6)");
    $(".content *").css("pointer-events","none");
}


function checkButtonAccessibility() {

    $(".not-usable-button").removeClass("not-usable-button");

    if ( $(".grid-container").attr("data-column-amount") == 1 ) {
        $("#wet-columns-remove").addClass("not-usable-button");
        $(".es-s-biggest").addClass("not-usable-button");
        $("#wizard-add-bar-element-banner").addClass("not-usable-button");
        if ( $(".grid-container").find(".type-banner").length >= 1 ) { $("#wet-columns-remove").addClass("not-usable-button"); }
        

    } else if ( $(".grid-container").attr("data-column-amount") == 2 ) {
        $("#wizard-add-bar-element-banner").addClass("not-usable-button");
        $(".editing-wrapper:has(.searchbar-size-medium) .es-s-biggest").addClass("not-usable-button");
        if ( $(".grid-container").find(".type-banner").length >= 1 ) { $("#wet-columns-remove").addClass("not-usable-button"); }

    } else if ( $(".grid-container").attr("data-column-amount") == 3 ) {
        $("#wizard-add-bar-element-banner").addClass("not-usable-button");
        if ( $(".grid-container").find(".type-banner").length >= 1 ) { $("#wet-columns-remove").addClass("not-usable-button"); }

    } else if ( $(".grid-container").attr("data-column-amount") == 4 ) {
        $("#wizard-add-bar-element-banner").addClass("not-usable-button");
        if ( $(".grid-container").find(".type-banner").length >= 1 ) { $("#wet-columns-remove").addClass("not-usable-button"); }

    } else if ( $(".grid-container").attr("data-column-amount") == 5 ) {
        if ( $(".grid-container").find(".type-banner").length >= 1 ) { $("#wet-columns-remove").addClass("not-usable-button"); }

    } else if ( $(".grid-container").attr("data-column-amount") == 6 ) {
        

    }

    // making websites not editable for system items
    $(".editing-wrapper:has(.grid-item:not(.custom-item)) .es-enter-url").addClass("not-usable-button");
    $(".editing-wrapper:has(.grid-item.custom-item) .es-enter-url").removeClass("not-usable-button");

    // making last grid item not deletable
    if ( $(".grid-container").children('.grid-item').length == 1 ) {
        $(".grid-container .grid-item .es-delete").addClass("not-usable-button");
    }
    
    //  SETUP TUTORIAL + adding special item if no gird items are there
    $(".wizard-off .grid-item.setup-item").attr("data-gi-title","open wizard");
    $(".wizard-off .grid-item.setup-item .gi-title").text( $(".grid-item.setup-item").attr("data-gi-title") );

    if ( $(".grid-container").children('.grid-item').length == 0 || $(".setup-mode").length >= 1 ) {
        if ( $(".setup-mode").length == 0 ) {
            $(".grid").append('<div class="grid-container setup-item setup-mode" data-column-amount="5"><div class="grid-item type-tag setup-item openwizard tutorial-mode" data-gi-id="setup-item" data-gi-background-color="rgba(58, 12, 97, 1)" data-gi-display-mode="light-mode" data-gi-title="open wizard" data-gi-url="https://www.google.com"><p class="gi-title"></p><div class="gi-box"><img class="gi-img-icon" src="res/elements/icons/test.png" alt=""></div></div></div>');
        } else if ( $(".setup-mode").length >= 1 && $(".wizard-on").length >= 1 ) {
            $(".grid-item.setup-item").attr("data-gi-title","hover me");
            $(".grid-item.setup-item .gi-title").text( $(".grid-item.setup-item").attr("data-gi-title") );
        }
    }

    if ( $(".setup-mode").length >= 1 ) {
        $(".wizard-editing-tool").addClass("not-usable-button");
    }

    if ( $(".grid-container").children('.grid-item').length >= 2 && $(".setup-mode").length >= 1) {
        $(".grid-item.setup-item").attr("data-gi-title","drag me");
        $(".grid-item.setup-item .gi-title").text( $(".grid-item.setup-item").attr("data-gi-title") );

        $(".setup-mode").removeClass("setup-mode");
        $(".grid-container.setup-item").removeClass("setup-item");

        checkButtonAccessibility();
    }

    if ( $(".grid-item.setup-item.editmode").length >= 1) {
        $(".grid-item.setup-item").attr("data-gi-title","exit to save");
        $(".grid-item.setup-item .gi-title").text( $(".grid-item.setup-item").attr("data-gi-title") );
    }

    if ( $(".grid-item.setup-item.tutorial-mode.editmode").length >= 1) {
        $(".grid-item.setup-item").attr("data-gi-title","exit to save");
        $(".grid-item.setup-item .gi-title").text( $(".grid-item.setup-item").attr("data-gi-title") );
        $(".tutorial-mode").removeClass("tutorial-mode");

    } else if ( $(".grid-item.tutorial-mode").length <= 0 ) {
        $(".grid-item.setup-item").attr("data-gi-title","open wizard");
        $(".grid-item.setup-item .gi-title").text( $(".grid-item.setup-item").attr("data-gi-title") );
    }

    $('.item-searchbar').each(function() {
        if ( $(this).children('.item-searchbar-element').length >= 10 && $(this).hasClass("searchbar-size-big") ) {
            $(this).parent().find('.es-s-add').addClass("not-usable-button");

        } else if ( $(this).children('.item-searchbar-element').length >= 5 && $(this).hasClass("searchbar-size-medium") ) {
            $(this).parent().find('.es-s-add').addClass("not-usable-button");
        }

        // making searchbars fill bar when less bars exist
        if ( $(this).children('.item-searchbar-element').length == 2 && $(this).children(".searchbar-active").length == 0 ) {
            $(this).children('.item-searchbar-element').addClass("searchbar-active");
        }

        if ( $(this).children('.item-searchbar-element').length >= 3 && $(this).children(".searchbar-active").length == 2 ) {
            $(this).children('.item-searchbar-element').removeClass("searchbar-active");
            $(this).children('.item-searchbar-element:first-child').addClass("searchbar-active");
        }

        if ( $(this).children('.item-searchbar-element').length == 1 ) {
            $(this).children('.item-searchbar-element').addClass("searchbar-active");
            $(this).find("#sp-row0-icon-changetoactive").addClass("not-usable-button");
            $(this).find("#sp-row0-icon-delete").addClass("not-usable-button");
        }

        
    });

    $('.item-searchbar').children('.item-searchbar-element').css( 'display', 'flex' );
    $('.item-searchbar.searchbar-size-medium').children('.item-searchbar-element').slice(5).css( 'display', 'none' );
    $('.item-searchbar.searchbar-size-big').children('.item-searchbar-element').slice(10).css( 'display', 'none' );


    var luminance = checkifdarkorlightmode();
    if ( luminance <= 0.1 || luminance >= 0.95 ) {
        $(".editing-wrapper #es-color .es-set-displaymode").addClass("not-usable-button");
    } else {
        $(".editing-wrapper #es-color .es-set-displaymode").removeClass("not-usable-button");
    }

}