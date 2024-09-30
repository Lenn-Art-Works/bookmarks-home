$(document).ready(function() {

// ###############################################
// #                Set Grid Size                #
// ###############################################

    $("body").css("display","none");
   
    searchbarsuperclick = true;
    setTimeout(setup, 100);


// ###############################################
// #                   wizard                   #
// ###############################################

// open wizard

    $(document).on('mouseenter', '.wizard-off .item-searchbar .item-searchbar-element:first-child():not(.searchbar-minimized):not(searchbar-maximized) .gi-box', function() {
        searchbarsuperclick = false;
        $(this).find('img').css("display","none");
        $(this).find('img').after('<svg id="turnwizardOn" style="height: 60%; width: auto;" width="40" height="54" viewBox="0 0 40 54" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20.3667 11.5268C21.1951 10.0919 23.0299 9.60028 24.4648 10.4287L32.1106 14.843C33.5454 15.6714 34.0371 17.5062 33.2086 18.9411L18.6899 44.0883C18.3573 44.6644 17.8426 45.1136 17.2268 45.3653L10.5554 48.0918C8.74034 48.8336 6.7132 47.6632 6.44806 45.7204L5.47359 38.5796C5.38363 37.9205 5.51533 37.2501 5.84796 36.674L20.3667 11.5268Z" class="smain-c-icon-accent"/><rect x="26.9639" y="0.0998535" width="14.8286" height="8.34109" rx="3" transform="rotate(30 26.9639 0.0998535)" class="smain-c-icon-accent"/></svg>');
        $(".smain-c-icon-accent").css("fill", $(this).parent().parent().attr("data-gi-background-color") );
        
    });

    $(document).on('mouseleave', '.wizard-off .item-searchbar .item-searchbar-element .gi-box', function() {
        $(this).find('img').css("display","block");
        $('#turnwizardOn').remove();
        searchbarsuperclick = true;
    });


    $(document).on('click', '.wizard-off .gi-box:has(#turnwizardOn)', function() {
        $(this).parent().parent().find('img').css("display","block");
        $('#turnwizardOn').remove();

        setTimeout(function() {
            searchbarsuperclick = true;
        }, 10);
        
        enterWizardMode();
    });



// Add Elements Bar
    var wizardAddBarV = "<div class='wizard-add-bar-v wizard-add-bar light-mode' style='z-index:1000 !important'><p>+</p><div class='wizard-add-bar-elements'><img id='wizard-add-bar-element-banner' src='config/on-page-res/graphics/icons/wizard-add-bar/wizard-addElementsBar-banner.svg'><img id='wizard-add-bar-element-card' src='config/on-page-res/graphics/icons/wizard-add-bar/wizard-addElementsBar-card.svg'><img id='wizard-add-bar-element-tag' src='config/on-page-res/graphics/icons/wizard-add-bar/wizard-addElementsBar-tag.svg'><img id='wizard-add-bar-element-icon_big' src='config/on-page-res/graphics/icons/wizard-add-bar/wizard-addElementsBar-icon_big.svg'><img id='wizard-add-bar-element-icon_small' src='config/on-page-res/graphics/icons/wizard-add-bar/wizard-addElementsBar-icon_small.svg'></div></div>";
    var wizardAddBarH = "<div class='wizard-add-bar-h wizard-add-bar light-mode' style='z-index:1000 !important'><p>+</p><div class='wizard-add-bar-elements'><img id='wizard-add-bar-element-banner' src='config/on-page-res/graphics/icons/wizard-add-bar/wizard-addElementsBar-banner.svg'><img id='wizard-add-bar-element-card' src='config/on-page-res/graphics/icons/wizard-add-bar/wizard-addElementsBar-card.svg'><img id='wizard-add-bar-element-tag' src='config/on-page-res/graphics/icons/wizard-add-bar/wizard-addElementsBar-tag.svg'><img id='wizard-add-bar-element-icon_big' src='config/on-page-res/graphics/icons/wizard-add-bar/wizard-addElementsBar-icon_big.svg'><img id='wizard-add-bar-element-icon_small' src='config/on-page-res/graphics/icons/wizard-add-bar/wizard-addElementsBar-icon_small.svg'></div></div>";

    $(document).on('mouseenter', '.wizard-on .grid-item', function() {
        removeWizardAddBar();
        if ( !$(".grid-container").hasClass("drag-mode") && $(".grid-container").find(".editing-segments").length === 0 ) {
            $(".grid-item").removeAttr("draggable");
            $(this).addClass("show-wizard-add-bar");
            if ($(this).hasClass("type-banner") || $(this).hasClass("type-card")) {
                $(this).prepend(wizardAddBarV);
            } else if ($(this).hasClass("type-tag") || $(this).hasClass("type-icon-big") || $(this).hasClass("type-icon-small")) {
                $(this).prepend(wizardAddBarH);
            }
            checkButtonAccessibility();
        }
    });

    $(document).on('mouseleave', '.show-wizard-add-bar', function() {
        removeWizardAddBar();
    });

// Add Items

    // Banner
    $(document).on('click', '#wizard-add-bar-element-banner', function() {
        $(this).closest('.grid-item').after('\n'+GIbaseBannerElement);
        updateGrid();
        scaleGridContainer();

        closeWETOverlayer();

        // um grid items wieder anklickbar zu machen
        $(".wizard-add-bar").trigger("mouseenter"); // "Hover" starten
        $(".wizard-add-bar").trigger("mouseleave"); // "Hover" beenden
    });

    // Card
    $(document).on('click', '#wizard-add-bar-element-card', function() {
        $(this).closest('.grid-item').after('\n'+GIbaseCardElement);
        updateGrid();
        scaleGridContainer();

        closeWETOverlayer();

        // um grid items wieder anklickbar zu machen
        $(".wizard-add-bar").trigger("mouseenter"); // "Hover" starten
        $(".wizard-add-bar").trigger("mouseleave"); // "Hover" beenden
    });

    // Tag
    $(document).on('click', '#wizard-add-bar-element-tag', function() {
        $(this).closest('.grid-item').after('\n'+GIbaseTagElement);
        updateGrid();
        scaleGridContainer();

        closeWETOverlayer();

        // um grid items wieder anklickbar zu machen
        $(".wizard-add-bar").trigger("mouseenter"); // "Hover" starten
        $(".wizard-add-bar").trigger("mouseleave"); // "Hover" beenden
    });

    // Icon Big
    $(document).on('click', '#wizard-add-bar-element-icon_big', function() {
        $(this).closest('.grid-item').after('\n'+GIbaseIconBigElement);
        updateGrid();
        scaleGridContainer();

        closeWETOverlayer();

        // um grid items wieder anklickbar zu machen
        $(".wizard-add-bar").trigger("mouseenter"); // "Hover" starten
        $(".wizard-add-bar").trigger("mouseleave"); // "Hover" beenden
    });

    // Icon Small
    $(document).on('click', '#wizard-add-bar-element-icon_small', function() {
        $(this).closest('.grid-item').after('\n'+GIbaseIconSmallElement);
        updateGrid();
        scaleGridContainer();

        closeWETOverlayer();

        // um grid items wieder anklickbar zu machen
        $(".wizard-add-bar").trigger("mouseenter"); // "Hover" starten
        $(".wizard-add-bar").trigger("mouseleave"); // "Hover" beenden
    });


// drag and drop elements
// muss über dragmode geregelt werden

    var editingAllowed = 1;

    $(document).on('mouseenter', '.wizard-add-bar', function() {
        editingAllowed = 0;
        $(".show-wizard-add-bar").addClass("no-scale");

        var $sortableContainer = $('.wizard-on .grid-container');
        Sortable.get($sortableContainer[0]).destroy();
    });

    $(document).on('mouseleave', '.wizard-add-bar', function() {
        editingAllowed = 1;
        $(".show-wizard-add-bar").removeClass("no-scale");

        createDragMode();
    });

    
// wizard Editing Tools

    // close wizard mode
    $(document).on('click', '#wet-icon-close', function() {
        location.reload();
    });
    
    // move to top or bottom
    $(document).on('click', '#wet-icon-updown', function() {
        if ( $(".wizard-editing-tool").hasClass("wet-position-bottom") ) {
            $(".wizard-editing-tool").removeClass("wet-position-bottom");
            $(".wizard-editing-tool").addClass("wet-position-top");
            $("#wet-icon-updown").css("transform","rotate(180deg)");

            closeWETOverlayer();

        } else if ( $(".wizard-editing-tool").hasClass("wet-position-top") ) {
            $(".wizard-editing-tool").removeClass("wet-position-top");
            $(".wizard-editing-tool").addClass("wet-position-bottom");
            $("#wet-icon-updown").css("transform","rotate(0deg)");

            closeWETOverlayer();

        }
    });

    // minimize
    $(document).on('click', '#wet-icon-minimize', function() {
        $(".wizard-editing-tool").removeClass("wet-status-opened");
        $(".wizard-editing-tool").addClass("wet-status-closed");
        $(".wet-icons svg").css("display","none");
        $("#wet-icon-maximize").css("display","inline");

        closeWETOverlayer();
    });

    // maximize
    $(document).on('click', '#wet-icon-maximize', function() {
        $(".wizard-editing-tool").removeClass("wet-status-closed");
        $(".wizard-editing-tool").addClass("wet-status-opened");
        $(".wet-icons svg").css("display","inline");
        $("#wet-icon-maximize").css("display","none");
    });

    // open save
    $(document).on('click', '#wet-icon-save', function() {
        $(".wet-overlayer-icons").removeClass("wet-overlayer-opened-columns");
        $(".wet-overlayer-icons").removeClass("wet-overlayer-opened-bookmarks");
        $(".wet-overlayer-icons").removeClass("wet-overlayer-opened-backup");
        $(".wet-overlayer-icons").addClass("wet-overlayer-opened-save");
    });

    // open bookmarks
    $(document).on('click', '#wet-icon-bookmarks', function() {
        $(".wet-overlayer-icons").removeClass("wet-overlayer-opened-save");
        $(".wet-overlayer-icons").removeClass("wet-overlayer-opened-columns");
        $(".wet-overlayer-icons").removeClass("wet-overlayer-opened-backup");
        $(".wet-overlayer-icons").addClass("wet-overlayer-opened-bookmarks");
    });

    // open backup
    $(document).on('click', '#wet-icon-backup', function() {
        $(".wet-overlayer-icons").removeClass("wet-overlayer-opened-save");
        $(".wet-overlayer-icons").removeClass("wet-overlayer-opened-bookmarks");
        $(".wet-overlayer-icons").removeClass("wet-overlayer-opened-columns");
        $(".wet-overlayer-icons").addClass("wet-overlayer-opened-backup");
    });

    // open columns
    $(document).on('click', '#wet-icon-columns', function() {
        $(".wet-overlayer-icons").removeClass("wet-overlayer-opened-save");
        $(".wet-overlayer-icons").removeClass("wet-overlayer-opened-bookmarks");
        $(".wet-overlayer-icons").removeClass("wet-overlayer-opened-backup");
        $(".wet-overlayer-icons").addClass("wet-overlayer-opened-columns");
    });

    // open general settings
    $(document).on('click', '#wet-icon-settings', function(event) {
        $(".wet-overlayer-icons").removeClass("wet-overlayer-opened-save");
        $(".wet-overlayer-icons").removeClass("wet-overlayer-opened-bookmarks");
        $(".wet-overlayer-icons").removeClass("wet-overlayer-opened-columns");

        event.stopPropagation();
        showSettings();
    });

    // close overlayer
    $(document).on('click', '.wet-overlayer-close', function() {
        closeWETOverlayer();
    });

    $(document).on('click', function(event) {
        if ( !$(event.target).closest('.wet-overlayer-icons').length && !$(event.target).closest('.wizard-editing-tool').length ) {
            closeWETOverlayer();
        }
    });

    // export
    $(document).on('click', '#wet-backup-export', function() {
        closeWETOverlayer();
        alertMessage("exported");

        // rest is in wizard-extension/main.js
    });  

    // import   

        // Klick-Handler für den Import-Button
    $(document).on('click', '#wet-backup-import', function(event) {
        event.stopPropagation(); // Verhindert das Event-Bubbling, damit der Click-Outside-Handler nicht sofort feuert
        showImportBox(); // Zeige die Import-Box an
    });


    $(document).on('click', '#wet-import-box-submit', function() {
        $(".wet-import-box").css("display","none");
        var fileInput = $('#wet-import-box-file')[0];
        var file = fileInput.files[0]; // Nimmt die erste ausgewählte Datei

        if (file) {
            var reader = new FileReader();

            // Event-Handler für das erfolgreiche Lesen der Datei
            reader.onload = function(event) {
                var content = event.target.result;

                $(".grid-container").remove();
                $(".grid").prepend(content);
            };

            // Event-Handler für Fehler beim Lesen der Datei
            reader.onerror = function(event) {
                console.error("Fehler beim Lesen der Datei:", event.target.error);
            };

            // Lese die Datei als Text
            reader.readAsText(file);
        } else {
            $(".grid-container").remove();
            $(".grid").prepend( $("#wet-import-box-input").val() );
        }

        // Check for too big elements
        if ( $(".grid-container").attr("data-column-amount") < 5 && $(".grid-container").find(".type-banner").length >= 1 ) {
            $(".grid-container").attr( "data-column-amount", 5 );
        }

        if ( $(".grid-container").attr("data-column-amount") < 3 && $(".item-searchbar").hasClass("searchbar-size-big") ) {
            $(".grid-container").attr( "data-column-amount", 3 );
        }
        
        if ($(".grid-container").attr("data-column-amount") < 2 && $(".item-searchbar").hasClass("searchbar-size-medium")) {
            $(".grid-container").attr( "data-column-amount", 2 );
        }

        alertMessage("imported");

        $(".grid-container").css( "grid-template-columns" , "repeat("+$(".grid-container").attr('data-column-amount')*18+",7.5px)" );
        updateGrid();
    });

    // add column
    $(document).on('click', '#wet-columns-add', function() {
        $(".grid-container").attr( "data-column-amount", $(".grid-container").attr("data-column-amount")*1+1 );
        $(".grid-container").css( "grid-template-columns" , "repeat("+$(".grid-container").attr('data-column-amount')*18+",7.5px)" );
        updateGrid();
        
    });

    // remove column
    $(document).on('click', '#wet-columns-remove', function() {
        $(".grid-container").attr( "data-column-amount", $(".grid-container").attr("data-column-amount")-1 );
        $(".grid-container").css( "grid-template-columns" , "repeat("+$(".grid-container").attr('data-column-amount')*18+",7.5px)" );

        if ($(".grid-container").attr("data-column-amount") <= 2 && $(".grid-container").attr("data-column-amount") > 1 && $(".item-searchbar").hasClass("searchbar-size-big")) {
            $(".item-searchbar").removeClass("searchbar-size-big");
            $(".item-searchbar").addClass("searchbar-size-medium");
        } else if ($(".grid-container").attr("data-column-amount") <= 1 && $(".item-searchbar").hasClass("searchbar-size-medium")) {
            $(".item-searchbar").removeClass("searchbar-size-medium");
            $(".item-searchbar").addClass("searchbar-size-small");
        }

        updateGrid();

    });


// ###############################################
// #                  Edit Items                 #
// ###############################################

$(document).on('click', '.wizard-on .grid-item', function(event) {
    closeWETPanelBox();

    removeWizardAddBar();
    if ( !$(event.target).closest('.editing-wrapper *').length ) {
        
        if ( editingAllowed == 1 && !$(event.target).closest('.searchbar-picker').length) {

            closeSearchbarPicker();
            saveElementEdits();
            exitElementEditmode();

            closeWETOverlayer();

            var $this = $(this);

            $(".grid-item").css("filter","blur(5px) opacity(0.6)");
            $(this).css("filter","blur(0px) opacity(1)");

            var $wrapper;
            if ( $this.hasClass("type-banner") ) {
                var $wrapper = $('<div class="grid-item type-banner editing-wrapper"></div>');
                
            } else if ( $this.hasClass("type-card") ) {
                var $wrapper = $('<div class="grid-item type-card editing-wrapper"></div>');

            } else if ( $this.hasClass("item-searchbar") ) {
                var $wrapper = $('<div class="grid-item type-tag item-searchbar editing-wrapper"></div>');

            } else if ( $this.hasClass("type-tag") ) {
                var $wrapper = $('<div class="grid-item type-tag editing-wrapper"></div>');
                
            } else if ( $this.hasClass("type-icon-small") ) {
                var $wrapper = $('<div class="grid-item type-icon-small editing-wrapper"></div>');
                $this.append("<div class='gi-title-temp' style='background-color: "+$this.attr("data-gi-background-color")+"'><p class='gi-title'>"+$this.attr("data-gi-title")+"</p></div>");

            } else if ( $this.hasClass("type-icon-big") ) {
                var $wrapper = $('<div class="grid-item type-icon-big editing-wrapper"></div>');
                $this.append("<div class='gi-title-temp' style='background-color: "+$this.attr("data-gi-background-color")+"'><p class='gi-title'>"+$this.attr("data-gi-title")+"</p></div>");

            }
            
            if ( !$this.hasClass("item-searchbar") ) {
                $(".searchbar-maximized").removeClass("searchbar-maximized");
                $(".searchbar-minimized").removeClass("searchbar-minimized");
            }

            $(this).css("position","absolut");
            $(this).addClass("editmode");
            $(this).wrap($wrapper);



        /* Testen ob Editing Tools top oder bottom werden */
            // Berechne die Position des Elements relativ zum Dokument
            var boxOffset = $this.offset();

            // Berechne die Größe des Fensters (Viewport)
            var viewportHeight = $(window).height();
            var scrollTop = $(window).scrollTop();

            // Berechne die Entfernungen von 'top' und 'bottom'
            var distanceFromTop = boxOffset.top - scrollTop;
            var distanceFromBottom = (scrollTop + viewportHeight) - (boxOffset.top + $this.outerHeight());

            if (distanceFromTop > distanceFromBottom) {
                if ( $this.hasClass("type-tag") || $this.hasClass("type-icon-small") || $this.hasClass("type-icon-big") ) {
                    $(".editing-wrapper").addClass("editing-ontop");
                }
            }
            if ( $this.hasClass("type-banner") || $this.hasClass("type-card")) {
                $(".editing-wrapper").addClass("editing-ontop");
            }

        /* Editing Segments */
            createSegementContainer();

            addSegment("advanced");
            if ( !$this.hasClass("item-searchbar") ) { addSegment("url") }
            if ( $this.hasClass("item-searchbar") ) { addSegment("searchbar") }
            addSegment("color");

            
            if ( !$this.hasClass("item-searchbar") ) {
                // Base Element
                var $giTitle = $('.editing-wrapper').find(".gi-title");

                var $input = $('<textarea>', {
                    text: $giTitle.text(),               // Kopiere den Text des <p>-Elements in das Input
                    id: $giTitle.attr('id'),              // Behalte die ID des <p>-Elements bei
                    class: $giTitle.attr('class')         // Behalte die Klasse des <p>-Elements bei
                });

                $giTitle.css("display","none");
                $input.addClass("gi-title-input");
                $giTitle.after($input);
                $(".gi-title-input").css("display","flex");
            }

            $(".es-open-colorpicker::after").addClass(".smain-c-text");

            // smain -> styles main | c -> color | smain-squared -> box mit 34x34px
            $(".smain-c-bg").css( "background-color", $this.attr("data-gi-background-color") );
            $(".smain-c-text").css( "color", $this.attr("data-gi-background-color") );
            $(".smain-c-bg-accent").css("background-color", $this.attr("data-gi-background-color"));     
            $(".smain-c-icon-accent").css("fill", $this.attr("data-gi-background-color"));           
       

            // general styles
            //$(".editing-segments").css( "color", $this.attr("data-gi-background-color") );
            $('.editing-wrapper').find(".gi-title").css( "color", $this.attr("data-gi-background-color") );


            var luminance = checkifdarkorlightmode();
            if ( luminance <= 0.1 || luminance >= 0.95 ) {
                $(".smain-c-bg-accent").css("display","block");
            } else {
                $(".smain-c-bg-accent").css("display","none");
            }

            checkButtonAccessibility();

        /* verhindern, dass edit tools über den Rand gehen */
            checkIfEditingTabsLeaveScreen();

            createDragModeForSearchbar();

        }
    }
});

// close edit mode
$(document).on('click', function(event) {
    if ( $('.wizard-on .editing-wrapper').length > 0  && !$(event.target).closest('.searchbar-picker').length ) {
        if (!$(event.target).closest('.editing-wrapper *').length) {
            $(".searchbar-maximized").removeClass("searchbar-maximized");
            $(".searchbar-minimized").removeClass("searchbar-minimized");

            saveElementEdits();
            exitElementEditmode();
        }
    }   
});




// ###############################################
// #                     Logic                   #
// ###############################################

// open Website on click
    $(document).on('click', '.wizard-off .grid-item.custom-item', function() {
        window.open($(this).attr("data-gi-url"), '_self').focus(); // _self or _blank
    });


// Searchbars

    

    // focus searchbar
    $(document).on('focus', '.wizard-off .grid-item.item-searchbar .item-searchbar-element:not(.searchbar-picker) input, .editing-wrapper .grid-item.item-searchbar .item-searchbar-element:not(.searchbar-picker) input', function() {
        if ( !$("#turnwizardOn").length ) {
        
            $(this).parent().parent().find(".item-searchbar-element").addClass("searchbar-minimized");
            $(this).parent().addClass("searchbar-maximized");

            if ( $(".editing-wrapper").length ) {
                $(document).on('mouseup.openSearchbarPicker', function(event) {
                    appendSearchbarPicker();
                });
            }
        }
    });

    // switch focussed searchbar
    $(document).on('click', '.wizard-off .grid-item.item-searchbar .item-searchbar-element:not(.searchbar-picker), .editing-wrapper .grid-item.item-searchbar .item-searchbar-element:not(.searchbar-picker)', function(event) {
        if ( searchbarsuperclick == true ) {
            if ( !$(event.target).closest('.searchbar-picker').length ) {
                $(this).parent().find(".item-searchbar-element").removeClass("searchbar-minimized");
                $(this).parent().find(".item-searchbar-element").removeClass("searchbar-maximized");

                $(this).find(".gi-title").focus();
            
                if ( $(".wizard-off").length === 0 ) {
                    appendSearchbarPicker();
                }
            }
        }
    });

    // unfocus searchbar
    /*$(document).on('focusout', '.wizard-off .grid-item.item-searchbar input', function() {
        $(".grid-item .item-searchbar-element").removeClass("searchbar-minimized");
        $(".grid-item .item-searchbar-element").removeClass("searchbar-maximized");
    });*/

    // unfocus searchbar
    $(document).on('click', function(event) {
        if ( ( !$(event.target).closest('.grid-item.item-searchbar *').length || $(event.target).closest('.editing-segments').length ) && !$(event.target).closest('.searchbar-picker').length ) {
            $(".grid-item .item-searchbar-element").removeClass("searchbar-minimized");
            $(".grid-item .item-searchbar-element").removeClass("searchbar-maximized");
            
            if ( $(".wizard-off").length === 0 ) {
                closeSearchbarPicker();
                updateGrid();  
            }
        } 
        
    });


// Keyup Listener
    document.addEventListener('keyup', (event) => {

        if ( $('.wizard-on .editing-wrapper').length > 0 ) {
            saveElementEdits();
            reloadColorwheel();
        }
        
    });

});

// ############## setup ##############
function setup() {

    checkButtonAccessibility();

    window.addEventListener('resize', scaleGridContainer);

    //const observer = new MutationObserver(scaleGridContainer);
    //observer.observe(document.querySelector('.grid-container'), { childList: true, subtree: true });

    removeWizardAddBar()
    $(".grid-container").css( "grid-template-columns" , "repeat("+$(".grid-container").attr('data-column-amount')*18+",7.5px)" );
    updateGrid();
    adjustGridContainerHeight();
    reloadCSS();

    $(".grid-container").css( "grid-template-columns" , "repeat("+$(".grid-container").attr('data-column-amount')*18+",7.5px)" );
    $("body").css("display","block");

    scaleGridContainer();
    checkButtonAccessibility();

}

function scaleGridContainer(scale) {
    const container = document.querySelector('.grid-container');
    const containerWidth = container.offsetWidth;
    const containerHeight = container.offsetHeight;

    const scaleX = window.innerWidth / containerWidth;
    const scaleY = window.innerHeight / containerHeight;
    scale = Math.min(scaleX, scaleY, 1); // Wähle die kleinere Skalierung, maximal 1 (keine Vergrößerung)

    container.style.transform = `scale(${scale})`;
}

// set grid column amount ( *18 um columns immer um die Größe einer card zu verändern)
function adjustGridContainerHeight() {
    var rowHeight = 11;
    var gap = 8;
    var $gridContainer = $('.grid-container');
    var numColumns = $gridContainer.find('.grid-item').first().css('grid-column-end') - $gridContainer.find('.grid-item').first().css('grid-column-start');
    var numItems = $gridContainer.find('.grid-item').length;
    var numRows = Math.ceil(numItems / numColumns);
    var containerHeight = (rowHeight + gap) * numRows - gap; // Zeilenhöhe + Abstand zwischen Zeilen, letzter Gap nicht berücksichtigen
    $gridContainer.css('height', containerHeight + 'px');
}

function updateGrid() {
    updateGI();
    scaleGridContainer();
    adjustGridContainerHeight();
}


// ############## wizard ##############

function removeWizardAddBar() {
    $(".wizard-add-bar").remove();
    $(".show-wizard-add-bar").removeClass("show-wizard-add-bar");
}

// ############## wet panel boxes ##############

// show Import-Box
function showImportBox() {
    closeWETPanelBox();
    $(".wet-import-box").css("display", "flex");

    $(".wet-overlayer-icons").removeClass("wet-overlayer-opened-save wet-overlayer-opened-bookmarks wet-overlayer-opened-backup wet-overlayer-opened-columns");

    // Sicherstellen, dass der Click-Outside-Handler eingerichtet ist
    $(document).on('click', function(event) {
        if ( $('.wizard-on .wet-import-box').length > 0 ) {
            if (!$(event.target).closest('.wet-import-box').length) {
                $(".wet-import-box").css("display", "none");
            }
        }   
    });
}


// show Settings
function showSettings() {
    closeWETPanelBox();
    $(".wet-settings").css("display", "flex");

    $(".wet-overlayer-icons").removeClass("wet-overlayer-opened-save wet-overlayer-opened-bookmarks wet-overlayer-opened-backup wet-overlayer-opened-columns");

    // Sicherstellen, dass der Click-Outside-Handler eingerichtet ist
    $(document).on('click', function(event) {
        if ( $('.wizard-on .wet-settings').length > 0 ) {
            if (!$(event.target).closest('.wet-settings').length) {
                closeWETPanelBox();
            }
        }   
    });
}

// closing all wet panel boxes
function closeWETPanelBox() {
    $(".wet-panel-box").css("display", "none");
}

// ############## segment functions ##############
function saveElementEdits() {

    $(".editing-wrapper .grid-item").attr( "data-gi-background-color", $(".es-enter-hexcolor").val() );
    $(".editing-wrapper .grid-item").attr( "data-gi-title", $(".gi-title-input").val() );
    $(".editing-wrapper .grid-item").attr( "data-gi-url", $("#es-url .es-enter-url").attr("data-actual-url") );

    var luminance = checkifdarkorlightmode();
    
    if ( (luminance >= 0.5 && !$(".editmode").hasClass("customDisplaymode")) || luminance >= 0.95 ) {
        $(".editmode").attr("data-gi-display-mode", "light-mode");
        $(".editmode").removeClass("dark-mode").addClass("light-mode");
        $(".editing-segments").removeClass("dark-mode").addClass("light-mode");
    } else if ( (luminance < 0.5 && !$(".editmode").hasClass("customDisplaymode")) || luminance <= 0.1 ){
        $(".editmode").attr("data-gi-display-mode", "dark-mode");
        $(".editmode").removeClass("light-mode").addClass("dark-mode");
        $(".editing-segments").removeClass("light-mode").addClass("dark-mode");
    }

    if ( luminance <= 0.1 || luminance >= 0.95 ) {
        $(".smain-c-bg-accent").css("display","block");
        $(".editmode").removeClass("customDisplaymode");
    } else {
        $(".smain-c-bg-accent").css("display","none");
    }

    updateGrid();
}

function exitElementEditmode() {
    removeWizardAddBar();
    $("#es-url .es-enter-url").val( $(".editmode").attr("data-gi-url") );

    $('.editing-wrapper').find(".gi-title").css("display","flex");
    $(".gi-title-input").remove();

    $(".gi-title-temp").remove();

    $(".grid-item").css("filter","");
    $(".editing-segments").remove();
    $(".editmode").removeClass("editmode");
    $(".editing-wrapper").children().unwrap();

    updateGrid();
}


function checkIfEditingTabsLeaveScreen() {
    var $element = $('.editing-segments');
    var elementOffset = $element.offset();
    var elementRight = elementOffset.left + $element.outerWidth();
    
    var viewportLeft = $(window).scrollLeft();
    var viewportRight = viewportLeft + $(window).width();
    
    var isOutOfRightViewport = elementRight > viewportRight;
    
    if (isOutOfRightViewport) {
        if ( $('.editing-wrapper').hasClass("type-icon-big") ) {
            $('.editing-segments').css("transform","translateX(-141.5px)");
            $(".grid-item.type-icon-small .gi-title-temp").css("margin-left", "calc(calc(131.5px + 14px + 131.5px) * -1)");

        } else if ( $('.editing-wrapper').hasClass("type-icon-small") ) {
            $('.editing-segments').css("transform","translateX(-186px)");
            $(".grid-item.type-icon-small .gi-title-temp").css("margin-left", "calc(calc(178px + 14px + 85px) * -1)");

        }
    } else {
        
        $('.editing-segments').css("transform","translateX(0px)");
    }
}

