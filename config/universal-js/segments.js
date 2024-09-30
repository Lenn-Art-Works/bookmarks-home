$(document).ready(function() {

    // ###############################################
    // #            Segment Edit Functions           #
    // ###############################################

    // ####### Switch Displaymode #######
    $(document).on('click', '.dark-mode .es-set-lightmode', function() {
        $(".editing-wrapper .grid-item").attr("data-gi-display-mode", "light-mode");
        $(".editing-wrapper .grid-item").removeClass("dark-mode").addClass("light-mode");
        $(".editing-segments").removeClass("dark-mode").addClass("light-mode");
        $(".editing-wrapper .grid-item").removeClass("customDisplaymode").addClass("customDisplaymode");

        saveElementEdits();
    });

    $(document).on('click', '.light-mode .es-set-darkmode', function() {
        $(".editing-wrapper .grid-item").attr("data-gi-display-mode", "dark-mode");
        $(".editing-wrapper .grid-item").removeClass("light-mode").addClass("dark-mode");
        $(".editing-segments").removeClass("light-mode").addClass("dark-mode");
        $(".editing-wrapper .grid-item").removeClass("customDisplaymode").addClass("customDisplaymode");

        saveElementEdits();
    });


    // ####### Show Shortened URL #######
    $(document).on('focus', '#es-url .es-enter-url', function() {
        $("#es-url .es-enter-url").val( $("#es-url .es-enter-url").attr("data-actual-url") );
    });

    $(document).on('focusout', '#es-url .es-enter-url', function() {
        $("#es-url .es-enter-url").attr("data-actual-url", $("#es-url .es-enter-url").val());
        var shortenedURL = getDomainFromUrl( $("#es-url .es-enter-url").attr("data-actual-url") );
        $(".editing-wrapper .grid-item").attr( "data-gi-url", $("#es-url .es-enter-url").attr("data-actual-url") );
        $("#es-url .es-enter-url").val( shortenedURL );
    });
    
    // ####### color segment #######
    // click on color square
    var presetColors = ["rgba(45, 22, 115, 1)", "rgba(152, 128, 255, 1)", "rgba(155, 213, 213, 1)", "rgba(179, 0, 43, 1)", "rgba(255, 199, 133, 1)", "rgba(255, 240, 201, 1)", "rgba(60, 112, 55, 1)", "rgba(167, 255, 125, 1)", "rgba(224, 255, 194, 1)", "rgba(0, 0, 0, 1)", "rgba(37, 38, 43, 1)", "rgba(255, 255, 255, 1)"];

    /*if ( $("#es-color").hasClass("es-colorpicker-opened") ) {
        colorPicker.color.rgbaString = colorToRgba( $(".es-enter-hexcolor").val() );
    }*/

    $(document).on('click', '.wizard-on .editing-segments .es-open-colorpicker', function() {
        if ( !$("#es-color").hasClass("es-colorpicker-opened") ) {
            $("#es-color").addClass("es-colorpicker-opened");

            reloadColorwheel();

            $(".es-presetcolor-square").remove();
            $.each(presetColors, function(index, color) {
                // Erstelle ein neues div-Element
                var colorDiv = $('<div class="es-presetcolor-square"></div>').css({
                    'background-color': color,
                });
            
                // Füge das Div an .es-presetcolors an
                $(".es-presetcolors").append(colorDiv);
            });

        } else {
            $("#es-color").removeClass("es-colorpicker-opened");
        }
    });

    $(document).on('click', '.wizard-on .editing-wrapper .es-presetcolor-square', function() {
        var clickedColor = $(this).css("background-color");

        $('.es-enter-hexcolor').val( clickedColor );
        saveElementEdits();
        reloadColorwheel();
    });


    // ####### Hide GI-Box #######

    $(document).on('click', '.wizard-on .editing-wrapper .gi-box', function() {
        if ( $(".editing-wrapper .grid-item").hasClass("hideGIBox") ) {
            $(".editing-wrapper .grid-item").removeClass("hideGIBox");
        } else {
            $(".editing-wrapper .grid-item").addClass("hideGIBox");
        }

    });


    // ####### Remove Element #######

    $(document).on('click', '.wizard-on .es-delete', function() {
        $(".editing-wrapper").remove();

        alertMessage("element deleted");
        exitElementEditmode();
    });


    // ####### Reset Element #######

    $(document).on('click', '.wizard-on .es-reset', function() {
        $(".es-enter-hexcolor").val(itemsetupDataBackgroundColor);
        $(".gi-title-input").val(itemsetupDataTitle);
        $(".es-enter-url").val(itemsetupDataURL);
        $(".editing-wrapper .grid-item").attr("data-gi-title", itemsetupDataTitle);
        $(".editing-wrapper .grid-item").attr("data-gi-id", itemsetupDataID);
        $(".editing-wrapper .grid-item").attr("data-gi-url", itemsetupDataURL);
        $(".editing-wrapper .grid-item").attr("data-gi-display-mode", itemsetupDataDisplayMode);
        $(".editing-wrapper .grid-item").attr("data-gi-background-color", itemsetupDataBackgroundColor);
        saveElementEdits();
    });

});

/* ####### color picker ####### */

var colorPicker;

function createColorWheel() {
    var currentColor = $(".editmode").attr("data-gi-background-color");

    var sliderWidth = 7;

    // Erstellt einen neuen Color-Picker in einem Container
    colorPicker = new iro.ColorPicker(".es-colorwheel", {
        width: 92,
        color: currentColor,
        layoutDirection: 'horizontal',
        borderRadius: 5, // Hier kannst du auch den border-radius anpassen
        layout: [
            {
                component: iro.ui.Wheel,  // Das Rad als Hauptkomponente
                options: {
                    borderWidth: 0, // Entferne den Standard-Rand
                }
            },
            {
                component: iro.ui.Slider,
                options: {
                  sliderType: 'hue',
                  sliderSize: sliderWidth
                }
            },
            {
                component: iro.ui.Slider,
                options: {
                  sliderType: 'saturation',
                  sliderSize: sliderWidth
                }
            },
            {
                component: iro.ui.Slider,
                options: {
                  sliderType: 'value',
                  sliderSize: sliderWidth
                }
            },
            {
                component: iro.ui.Slider,
                options: {
                  sliderType: 'alpha',
                  sliderSize: sliderWidth
                }
            }
        ]
    });

    // Aktualisiert den Text mit der ausgewählten Farbe
    colorPicker.on('color:change', function(color) {
        $('.es-enter-hexcolor').val( color.rgbaString );
        saveElementEdits();
    });
}

function reloadColorwheel() {
    colorPicker = null;
    $(".IroColorPicker").remove();
    createColorWheel();
}


function createSegementContainer() {
    $(".editing-wrapper").append("<div class='editing-segments " + $(".editing-wrapper .grid-item").attr("data-gi-display-mode") + " smain-c-text'></div>");
}

function addSegment( type ) {

    // advanced Settings
    if ( type == "advanced" ) {
        var deleteIcon = '<svg width="42" height="42" viewBox="0 0 42 42" xmlns="http://www.w3.org/2000/svg"><path d="M13.6489 18.7522H28.6489V28.7522C28.6489 31.5136 26.4104 33.7522 23.6489 33.7522H18.6489C15.8875 33.7522 13.6489 31.5136 13.6489 28.7522V18.7522Z" class="smain-c-icon-accent"/><rect x="11.9868" y="14.9971" width="17.0955" height="3.0391" rx="1.51955" transform="rotate(-15.0597 11.9868 14.9971)" class="smain-c-icon-accent"/><rect x="15.875" y="12.2834" width="8.09789" height="4" rx="2" transform="rotate(-15.0597 15.875 12.2834)" class="smain-c-icon-accent"/></svg>';
        var resetIcon = '<svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M30.0573 17.9373C30.5521 17.7725 30.8372 17.255 30.712 16.7486L28.8628 9.26878C28.6444 8.38525 27.4552 8.22913 27.0161 9.02635L25.3484 12.0543C23.5631 11.1494 21.5608 10.7554 19.5629 10.918C17.4892 11.0868 15.5078 11.8482 13.8548 13.1115C12.2017 14.3749 10.9467 16.0868 10.2393 18.0434C9.53196 20 9.40203 22.1187 9.86503 24.147C10.328 26.1754 11.3644 28.0279 12.8507 29.4837C14.337 30.9396 16.2106 31.9374 18.2481 32.3583C20.2856 32.7792 22.4012 32.6055 24.3427 31.8577C26.2842 31.11 27.9698 29.8198 29.1986 28.141C29.851 27.2497 29.6574 25.9982 28.766 25.3458C27.8747 24.6934 26.6233 24.8871 25.9709 25.7784C25.1951 26.8384 24.1309 27.6529 22.9051 28.125C21.6793 28.5971 20.3437 28.7068 19.0573 28.441C17.771 28.1753 16.5881 27.5453 15.6497 26.6262C14.7114 25.707 14.057 24.5375 13.7647 23.2569C13.4724 21.9763 13.5544 20.6387 14.001 19.4034C14.4476 18.1681 15.24 17.0873 16.2836 16.2897C17.3273 15.4921 18.5782 15.0114 19.8874 14.9048C21.103 14.8058 22.3212 15.0333 23.4169 15.5613L21.5552 18.9415C21.1162 19.7387 21.8838 20.6603 22.7472 20.3727L30.0573 17.9373Z" class="smain-c-icon-accent"/></svg>';
        $(".editing-segments").append("<div class='editing-segment segment-size-standard smain-c-bg' id='es-advanced'><div class='es-advanced-bottompart'><div class='es-delete smain-squared smain-c-bg'>"+ deleteIcon +"</div><p class='es-open-advancedmenu smain-c-text'>+ advanced settings</p><div class='es-reset smain-squared smain-c-bg'>"+ resetIcon +"</div></div></div>");
       
    // URL
    } else if ( type == "url" ) {  
        $("#es-url .es-enter-url").attr("data-actual-url", $(".editing-wrapper .grid-item").attr("data-gi-url") );
  
        var shortenedURL = getDomainFromUrl( $(".editing-wrapper .grid-item").attr("data-gi-url") );
        var urlIcon = '<svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M22.9801 25.7768C22.2967 25.0934 21.1886 25.0934 20.5052 25.7768L18.5249 27.7571C17.3422 28.9398 15.4246 28.9398 14.2418 27.7571C13.0591 26.5744 13.0591 24.6568 14.2418 23.474L16.2221 21.4937C16.9056 20.8103 16.9056 19.7023 16.2221 19.0188V19.0188C15.5387 18.3354 14.4307 18.3354 13.7473 19.0188L11.767 20.9991C9.21739 23.5487 9.21739 27.6824 11.767 30.232C14.3165 32.7815 18.4502 32.7815 20.9998 30.232L22.9801 28.2517C23.6635 27.5683 23.6635 26.4602 22.9801 25.7768V25.7768ZM25.7779 20.5041C25.0945 21.1875 25.0945 22.2956 25.7779 22.979V22.979C26.4613 23.6624 27.5694 23.6624 28.2528 22.979L30.2326 20.9991C32.7822 18.4496 32.7822 14.3159 30.2326 11.7663C27.6831 9.21674 23.5494 9.21674 20.9998 11.7663L19.02 13.7461C18.3365 14.4296 18.3365 15.5376 19.02 16.221V16.221C19.7034 16.9044 20.8114 16.9044 21.4948 16.221L23.4747 14.2412C24.6574 13.0585 26.575 13.0585 27.7578 14.2412C28.9405 15.4239 28.9405 17.3415 27.7578 18.5243L25.7779 20.5041Z" class="smain-c-icon-accent"/><rect x="24.3291" y="15.2949" width="3.2643" height="12.824" rx="1.63215" transform="rotate(45 24.3291 15.2949)" class="smain-c-icon-accent"/></svg>'
        $(".editing-segments").append("<div class='editing-segment segment-size-standard smain-c-bg' id='es-url'><div class='es-url-icon smain-squared'>"+ urlIcon +"</div><input type='text' class='es-enter-url smain-c-text' data-actual-url='" + $(".editing-wrapper .grid-item").attr("data-gi-url") + "' value='"+ shortenedURL +"'/></div>");
        
    // Searchbar
    } else if ( type == "searchbar" ) {  
        var searchbarSmallIcon = '<svg id="searchbar-size-to-small" width="33" height="18" viewBox="0 0 33 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M0 4C0 1.79086 1.79086 0 4 0H29C31.2091 0 33 1.79086 33 4V14C33 16.2091 31.2091 18 29 18H4C1.79086 18 0 16.2091 0 14V4ZM3 12.5C3 11.1193 4.11929 10 5.5 10H27.5C28.8807 10 30 11.1193 30 12.5C30 13.8807 28.8807 15 27.5 15H5.5C4.11929 15 3 13.8807 3 12.5ZM5.5 3C4.11929 3 3 4.11929 3 5.5C3 6.88071 4.11929 8 5.5 8H27.5C28.8807 8 30 6.88071 30 5.5C30 4.11929 28.8807 3 27.5 3H5.5Z" class="smain-c-icon-accent"/></svg>'  
        var searchbarBigIcon = '<svg id="searchbar-size-to-big" width="73" height="11" viewBox="0 0 73 11" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M0 4C0 1.79086 1.79086 0 4 0H69C71.2091 0 73 1.79086 73 4V7C73 9.20914 71.2091 11 69 11H4C1.79086 11 0 9.20914 0 7V4ZM25 5.5C25 4.11929 26.1193 3 27.5 3H67.5C68.8807 3 70 4.11929 70 5.5C70 6.88071 68.8807 8 67.5 8H27.5C26.1193 8 25 6.88071 25 5.5ZM5.5 3C4.11929 3 3 4.11929 3 5.5C3 6.88071 4.11929 8 5.5 8H19.5C20.8807 8 22 6.88071 22 5.5C22 4.11929 20.8807 3 19.5 3H5.5Z" class="smain-c-icon-accent"/></svg>'
        var searchbarMediumIcon = '<svg id="searchbar-size-to-medium" width="73" height="11" viewBox="0 0 73 11" fill="none" xmlns="http://www.w3.org/2000/svg"><path opacity="0.3" fill-rule="evenodd" clip-rule="evenodd" d="M59.9297 11H69C71.2092 11 73 9.20898 73 7V4C73 1.79102 71.2092 0 69 0H59.9297C60.4521 0.90332 60.803 1.91797 60.938 3H67.5C68.8806 3 70 4.11914 70 5.5C70 6.88086 68.8806 8 67.5 8H60.938C60.803 9.08203 60.4521 10.0967 59.9297 11Z" class="smain-c-icon-accent"/><path fill-rule="evenodd" clip-rule="evenodd" d="M0 4C0 1.79086 1.79086 0 4 0H53C55.2091 0 57 1.79086 57 4V7C57 9.20914 55.2091 11 53 11H4C1.79086 11 0 9.20914 0 7V4ZM25 5.5C25 4.11929 26.1193 3 27.5 3H51.5C52.8807 3 54 4.11929 54 5.5C54 6.88071 52.8807 8 51.5 8H27.5C26.1193 8 25 6.88071 25 5.5ZM5.5 3C4.11929 3 3 4.11929 3 5.5C3 6.88071 4.11929 8 5.5 8H19.5C20.8807 8 22 6.88071 22 5.5C22 4.11929 20.8807 3 19.5 3H5.5Z" class="smain-c-icon-accent"/></svg>';
        $(".editing-segments").append("<div class='editing-segment segment-size-standard' id='es-searchbar-size'><div class='es-s-smallest smain-c-bg'>"+ searchbarSmallIcon + searchbarMediumIcon +"</div><div class='es-s-add smain-c-bg'><p class='smain-c-text'>+</p></div><div class='es-s-biggest smain-c-bg'>"+ searchbarBigIcon + searchbarMediumIcon +"</div></div>"); 

    // Color
    } else if ( type == "color" ) {
        var lightmodeIcon = '<svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M21.4818 9C14.5883 9 9 14.5883 9 21.4818C9 28.3753 14.5883 33.9636 21.4818 33.9636C28.3753 33.9636 33.9636 28.3753 33.9636 21.4818C33.9636 14.5883 28.3753 9 21.4818 9ZM21.4818 17.024C19.0198 17.024 17.024 19.0198 17.024 21.4818C17.024 23.9437 19.0198 25.9396 21.4818 25.9396C23.9437 25.9396 25.9396 23.9437 25.9396 21.4818C25.9396 19.0198 23.9437 17.024 21.4818 17.024Z" class="smain-c-icon-accent"/></svg>';
        var darkmodeIcon = '<svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M19.1077 9.21973C17.7911 11.1977 17.0239 13.5727 17.0239 16.1269C17.0239 23.0204 22.6122 28.6087 29.5057 28.6087C30.3175 28.6087 31.1112 28.5312 31.8798 28.3832C29.6432 31.7435 25.8211 33.9578 21.4818 33.9578C14.5883 33.9578 9 28.3695 9 21.476C9 15.3943 13.3496 10.3285 19.1077 9.21973Z" class="smain-c-icon-accent"/></svg>';
        var colorpickerSegment = "<div class='es-color-top editing-segment'><div class='es-colorwheel'></div><div class='es-presetcolors'></div></div>"
        $(".editing-segments").append("<div class='editing-segment segment-size-standard smain-c-bg' id='es-color'>"+ colorpickerSegment +"<div class='es-color-bottom editing-segment'><div class='smain-c-bg-accent es-open-colorpicker-border'></div><div class='es-open-colorpicker smain-c-bg'></div><input type='text' class='es-enter-hexcolor smain-c-text' value='" + $(".editing-wrapper .grid-item").attr("data-gi-background-color") + "'/><div class='es-set-displaymode'><div class='es-set-lightmode smain-squared smain-c-bg'>"+ lightmodeIcon +"</div><div class='es-set-darkmode smain-squared smain-c-bg'>"+ darkmodeIcon +"</div></div></div></div>");

    }

}


