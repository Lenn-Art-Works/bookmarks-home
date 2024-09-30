var standardSearchbarPicker = `
<div class="searchbar-picker">
    <div class="sp-row0 smain-c-bg">
        <svg id="sp-row0-icon-changetoactive" width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg"><path opacity="0.3" fill-rule="evenodd" clip-rule="evenodd" d="M22.5 18C22.5 17.1716 23.1716 16.5 24 16.5H30C30.8284 16.5 31.5 17.1716 31.5 18C31.5 18.8284 30.8284 19.5 30 19.5H24C23.1716 19.5 22.5 18.8284 22.5 18Z" class="smain-c-icon-accent"/><path fill-rule="evenodd" clip-rule="evenodd" d="M4.5 18C4.5 16.6193 5.61929 15.5 7 15.5L18 15.5C19.3807 15.5 20.5 16.6193 20.5 18C20.5 19.3807 19.3807 20.5 18 20.5L7 20.5C5.61929 20.5 4.5 19.3807 4.5 18Z" class="smain-c-icon-accent"/></svg>
        <svg id="sp-row0-icon-check" width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M28.0465 9.8104C28.8275 10.5914 28.8275 11.8578 28.0465 12.6388L15.9246 24.7607C15.1436 25.5417 13.8773 25.5417 13.0962 24.7607L7.0355 18.6999C6.25445 17.9189 6.25445 16.6525 7.0355 15.8715C7.81655 15.0905 9.08288 15.0905 9.86392 15.8715L14.5104 20.518L25.2181 9.8104C25.9991 9.02935 27.2654 9.02935 28.0465 9.8104Z" class="smain-c-icon-accent"/></svg>
        <svg id="sp-row0-icon-delete" width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.1758 15.1763H23.7518V22.7523C23.7518 25.5137 21.5132 27.7523 18.7518 27.7523H16.1758C13.4144 27.7523 11.1758 25.5137 11.1758 22.7523V15.1763Z" class="smain-c-icon-accent"/><rect x="9.78223" y="12.0273" width="14.3329" height="2.54798" rx="1.27399" transform="rotate(-15.0597 9.78223 12.0273)" class="smain-c-icon-accent"/><rect x="13.0417" y="9.75244" width="6.78927" height="3.3536" rx="1.6768" transform="rotate(-15.0597 13.0417 9.75244)" class="smain-c-icon-accent"/></svg>
    </div>
    <div class="sp-scroll smain-c-bg">
        <div class="sp-scroll-area">
            
        </div>
    </div>
    <input type="range" class="sp-scroll-range" min="1" max="2" step="1" value="1"/>
</div>`;

var tabtype = "_self"; // _self or _blank

var availableSearchbars = ["Google", "ChatGPT", "Gemini", "Amazon", "Dribbble", "Spotify", "Ecosia", "Test"];

$(document).ready(function() {

// ####### scroll event when in .sp-scroll #######
    const SCROLL_THRESHOLD = 50;
    
    $(document).on('mousewheel DOMMouseScroll', '.sp-scroll', function(event) {
        let delta = event.originalEvent.wheelDelta || -event.originalEvent.detail;

        if (Math.abs(delta) > SCROLL_THRESHOLD) {
            // Normalisiere den delta-Wert auf 1 oder -1
            let normalizedDelta = delta > 0 ? 1 : -1;
            let newValue = parseInt($(".sp-scroll-range").val()) - normalizedDelta;

            //console.log(newValue);
            $(".sp-scroll-range").val( newValue );

            checkScrollRange();
        }
    });

// ####### click scroll element to select #######
    $(document).on('click', '.sp-scroll-element', function() {

        var getIndex = $(this).index('.sp-scroll-element') + 1;

        //console.log("wird sind bei: "+ engine + "; mit der nummer: "+geminiIndex)
        $(".sp-scroll-range").val(getIndex);
        checkScrollRange();

    });

// ####### switch state - active/ not active #######
    $(document).on('click', '#sp-row0-icon-changetoactive', function() {
        if ( !$(this).closest(".item-searchbar-element").hasClass("searchbar-active") ) {
            $(".searchbar-active").removeClass("searchbar-active");
            $(this).closest(".item-searchbar-element").addClass("searchbar-active");
        } else {
            $(this).closest(".item-searchbar-element").removeClass("searchbar-active");
        }
    });

// ####### select engine and save #######
    $(document).on('click', '#sp-row0-icon-check.choosable-engine, .sp-scroll-element-selected', function() {
        $(this).closest(".item-searchbar-element").attr("data-engine", $(".sp-scroll-element-selected").text() );
        closeSearchbarPicker();
    });

// ####### delete searchbar element #######
    $(document).on('click', '#sp-row0-icon-delete', function() {
        $(this).closest(".item-searchbar-element").remove();
        $(".searchbar-minimized").removeClass("searchbar-minimized");
        $(".searchbar-maximized").removeClass("searchbar-maximized");
        closeSearchbarPicker();
    });

// ####### Change Searchbar Size #######
    // change to big
    $(document).on('click', '.editing-wrapper:has(.searchbar-size-small) #es-searchbar-size .es-s-biggest, .editing-wrapper:has(.searchbar-size-medium) #es-searchbar-size .es-s-biggest', function() {
        $(this).closest(".editing-wrapper").find(".item-searchbar.editmode").removeClass("searchbar-size-big").removeClass("searchbar-size-medium").removeClass("searchbar-size-small");
        $(this).closest(".editing-wrapper").find(".item-searchbar.editmode").addClass("searchbar-size-big");
    });

    // change to medium
    $(document).on('click', '.editing-wrapper:has(.searchbar-size-small) #es-searchbar-size .es-s-smallest, .editing-wrapper:has(.searchbar-size-big) #es-searchbar-size .es-s-biggest', function() {
        $(this).closest(".editing-wrapper").find(".item-searchbar.editmode").removeClass("searchbar-size-big").removeClass("searchbar-size-medium").removeClass("searchbar-size-small");
        $(this).closest(".editing-wrapper").find(".item-searchbar.editmode").addClass("searchbar-size-medium");
    });

    // change to small
    $(document).on('click', '.editing-wrapper:has(.searchbar-size-medium) #es-searchbar-size .es-s-smallest, .editing-wrapper:has(.searchbar-size-big) #es-searchbar-size .es-s-smallest', function() {
        $(this).closest(".editing-wrapper").find(".item-searchbar.editmode").removeClass("searchbar-size-big").removeClass("searchbar-size-medium").removeClass("searchbar-size-small");
        $(this).closest(".editing-wrapper").find(".item-searchbar.editmode").addClass("searchbar-size-small");
    });

// ####### add searchbar element #######

    // für size-bix max 10;    für size-medium max 5;    für size-small unbeschränkt    -> es wird aber nur ausgeblendet, nicht gelöscht
    $(document).on('click', '.es-s-add', function() {
        var standardSearchbarElement = '<div class="inner-element type-tag item-searchbar-element" data-engine="Google" data-gi-title=""><div class="gi-box"><img class="gi-img-icon" alt=""></div><input class="gi-title" type="text"></div>'
        $(this).closest(".editing-wrapper").find(".item-searchbar.editmode").append(standardSearchbarElement);
    });

});

// ####### read input range value and update scroll level #######
function checkScrollRange() {

    // Hole den aktuellen Wert des Range-Sliders
    var sliderValue = parseInt($(".sp-scroll-range").val());

    // Finde alle Kind-Elemente von .sp-scroll
    var $children = $('.sp-scroll-area').children('.sp-scroll-element');

    // Setze die Opazität aller Kind-Elemente auf 0.5
    $children.removeClass("sp-scroll-element-selected");
    $children.removeClass("sp-scroll-element-selected-nearby");

    // Ändere die Opazität des Kind-Elements, das dem aktuellen Wert des Range-Sliders entspricht, auf 1
    $children.eq(sliderValue).addClass("sp-scroll-element-selected-nearby");
    $children.eq(sliderValue - 1).addClass("sp-scroll-element-selected"); // sliderValue - 1, weil Indizes bei 0 beginnen
    $children.eq(sliderValue - 2).addClass("sp-scroll-element-selected-nearby");

    sliderValue = sliderValue-3;
    $(".sp-scroll .sp-scroll-area").css("margin-top","calc(calc(30px * "+sliderValue+") * -1)");

    // update check svg if chosen engine
    if ( $(".searchbar-picker").parent().attr("data-engine") === $(".sp-scroll-element-selected").text() ) {
        $("#sp-row0-icon-check").removeClass("choosable-engine");
    } else {
        $("#sp-row0-icon-check").addClass("choosable-engine");
    }

}

// ####### update slider position #######
function setSliderPosition() {
    var engine = $(".searchbar-picker").parent().attr("data-engine");
    var getIndex = $('#sp-scroll-'+engine).index('.sp-scroll-element') + 1;

    //console.log("wird sind bei: "+ engine + "; mit der nummer: "+geminiIndex)
    $(".sp-scroll-range").val(getIndex);
    checkScrollRange()
}

// ####### create searchbar picker #######
function appendSearchbarPicker() {
    $(".searchbar-picker").remove();
    $(".editing-wrapper .searchbar-maximized").find(".gi-box").before(standardSearchbarPicker);

    availableSearchbars.forEach(function(searchbar) {
        // Konvertiere den Namen in Kleinbuchstaben für die ID
        var searchbarId = searchbar;
    
        // Erstelle das neue DIV-Element
        var newElement = '<div class="sp-scroll-element" id="sp-scroll-' + searchbarId + '"><p class="smain-c-text">' + searchbar + '</p></div>';
    
        // Füge das neue Element zu .sp-scroll-area hinzu
        $('.sp-scroll-area').append(newElement);
    });

    // styles
    $('style#dynamic-thumb-style').remove(); // Falls bereits ein Style-Tag existiert
    $('<style id="dynamic-thumb-style">.sp-scroll-range::-webkit-slider-thumb { background-color: ' + $(".editing-wrapper").find(".grid-item").attr("data-gi-background-color") + '; }</style>').appendTo('head');  

    $(".editing-segment").css("opacity","0.2");
    $(".wizard-editing-tool").addClass("invisible");
    $(".smain-c-icon-accent").css("fill", $(".editing-wrapper").find(".grid-item").attr("data-gi-background-color") );
    removeWizardAddBar();

    setTimeout(function() {
        $(".searchbar-picker").addClass("sp-opened");
    }, 10); 

    // set max range amount
    var childCount = $('.sp-scroll-area').children('.sp-scroll-element').length;
    $('.sp-scroll-range').attr('max', childCount);
    setSliderPosition();
    updateGrid();
}

// ####### delete searchbar picker #######
function closeSearchbarPicker() {
    $(".searchbar-picker").remove();
    $(".wizard-editing-tool").removeClass("invisible");
    $(".editing-segment").css("opacity","1");
    updateGrid();
}


// ####### create dragmode for single searchbars #######
function createDragModeForSearchbar() {
        // Hole das Container-Element mit jQuery
        var $sortableContainer2 = $('.item-searchbar.editmode');

        // Initialisiere Sortable
        Sortable.create($sortableContainer2[0], {
            animation: 150, // Geschwindigkeit der Animation beim Verschieben
            filter: ".not-draggable, .item-searchbar-element:has(.searchbar-picker)",
            ghostClass: 'sortable-ghost',
            dragClass: 'sortable-drag',
            chosenClass: "sortable-chosen",
            onStart: function(evt) {
                $(document).off('mouseup.openSearchbarPicker');
                removeWizardAddBar();
                $(".wizard-editing-tool").addClass("invisible");
                closeWETOverlayer();
                closeSearchbarPicker();
            },
            onEnd: function(evt) {
                $(".grid-container").removeClass("drag-mode");
                $(".wizard-editing-tool").removeClass("invisible");
                $(".grid").removeAttr("draggable");
                $(".grid *").removeAttr("draggable");
            }
        });
}