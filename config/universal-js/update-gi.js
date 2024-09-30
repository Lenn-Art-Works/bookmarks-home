var iconGeneralFileType = ".png";
var iconSearchbarFileType = ".png";
var wallpaperGeneralFileType = ".jpg";

var DATAcolor, DATAdisplaymode, DATAtitle, DATAid;

function updateGI() {

    $(".buffer-element").removeClass("buffer-element");

    $(".grid-item").each(function() {

        var $this = $(this);

        DATAcolor = colorToRgba( $this.attr('data-gi-background-color') );
        DATAdisplaymode = $this.attr('data-gi-display-mode');
        DATAtitle = $this.attr('data-gi-title');

        if ( $(this).attr("data-gi-id") === "" ) {
            DATAid = generateValidId(DATAtitle);
        } else {
            DATAid = $this.attr('data-gi-id');
        }

        if ( DATAtitle == "*buffer*" ) {
            

            $this.removeClass("buffer-element");
            $this.addClass("buffer-element");
        }

        if ( DATAcolor == "invalidcolor" && DATAdisplaymode == "light-mode" ) {
            $this.attr('data-gi-background-color',"#fff")
            DATAcolor = "rgba(255,255,255,1)";
        } else if ( DATAcolor == "invalidcolor" && DATAdisplaymode == "dark-mode" ) {
            $this.attr('data-gi-background-color',"#000")
            DATAcolor = "rgba(0,0,0,1)";
        } 

        $this.removeClass( "light-mode" );
        $this.removeClass( "dark-mode" );

        $this.css( "background-color" , DATAcolor );
        $this.addClass( DATAdisplaymode );
        if ( $(".editing-wrapper").length === 0 ) {
            $this.find( ".gi-title" ).text( DATAtitle );
        }

        if ( $this.hasClass("type-card") ) {
            $this.find( ".inner-element.type-tag .gi-box" ).css( "background-color" , DATAcolor );

            $this.css('background', 'linear-gradient(to top, ' + DATAcolor + ', ' + setOpacityToValue(DATAcolor,0) + ' 50%), url("res/elements/wallpapers/'+DATAid+wallpaperGeneralFileType+'"), ' + DATAcolor );           
        } else if ( $this.hasClass("type-banner") ) {
            $this.find( ".inner-element.type-tag" ).css( "background-color" , DATAcolor );

            $this.css('background', 'linear-gradient(to top left, ' + DATAcolor + ', ' + setOpacityToValue(DATAcolor,0) + ' 60%), url("res/elements/wallpapers/'+DATAid+wallpaperGeneralFileType+'"), ' + DATAcolor );           
        }
        

        $this.find( ".gi-title" ).css( "color" , DATAcolor );
        $this.find( ".gi-title-temp" ).css( "background-color" , DATAcolor);
                  
        
        $this.find( ".gi-img-icon" ).attr('src', 'res/elements/icons/'+DATAid+iconGeneralFileType);


        // searchbar specific styles
        if ( $this.hasClass("item-searchbar") ) {

            $this.find(".gi-title").css("display", "block");

            $this.css( "background-color" , DATAcolor );

            var searchbarcounter = 0
            $(".item-searchbar-element").each(function() {
                searchbarcounter++;
                //$this.find( ".inner-element.type-tag" ).css( "background-color" , $this.attr('data-gi-inner-background-color') );
                
                if ( $(this).attr("data-gi-title") === "" ) {
                    $(this).find( ".gi-title" ).attr( "placeholder", $(this).attr("data-engine")+"..." );
                } else {
                    $(this).find( ".gi-title" ).attr( "placeholder", $(this).attr("data-gi-title") );
                }

                $(":root").attr("style", `--placeholder-color: ${DATAcolor};`);
                //$(".sp-scroll-element").css( "color", DATAcolor );
                $(this).find( ".gi-img-icon" ).attr('src', 'res/elements/icons/.searchbar/'+ $(this).attr("data-engine") +iconSearchbarFileType);

                // keep searchbars sized and readable
                if ( $(this).parent().children('.item-searchbar-element').length >= 7 && $(this).parent().hasClass("searchbar-size-big") && !$(this).hasClass("searchbar-active") && $(this).parent().find(".searchbar-active").length >= 1 ) {
                    $(this).addClass("searchbar-minimized");
                } else if ( $(this).parent().children('.item-searchbar-element').length >= 4 && $(this).parent().hasClass("searchbar-size-medium") && !$(this).hasClass("searchbar-active") && $(this).parent().find(".searchbar-active").length >= 1) {
                    $(this).addClass("searchbar-minimized");
                }

            });
            searchbarcounter = searchbarcounter*4;
            if ( $this.hasClass("searchbar-size-small") && $(".editing-wrapper").length == 0 ) {
                $this.css("grid-row", "span " + searchbarcounter );
            } else if ( !$this.hasClass("searchbar-size-small") && $(".editing-wrapper").length == 0 ) {
                $this.css("grid-row", "span 4");
            }
            
            $(":root").attr("style", `--wrapper-searchbar-small: ${searchbarcounter};`);
        
        }

        // editing segments
        if ( $this.parent().hasClass("editing-wrapper") ) {
            $(".smain-c-bg").css( "background-color", DATAcolor );
            $(".smain-c-text").css( "color", DATAcolor );
            $(".smain-c-bg-accent").css("background-color", DATAcolor);
            $(".smain-c-icon-accent").css("fill", DATAcolor);
        }

        // falls Wallpaper/ Icons nicht vorhanden sind
        var $img = $this.find('.gi-img-icon');
        var $text = DATAtitle;

        if ($text && typeof $text === 'string') {
            var firstLetter = $text.charAt(0).toUpperCase();
            var secondLetter = $text.charAt(1) ? $text.charAt(1).toLowerCase() : '';
        } else {
            console.error("Error: $text is undefined or not a string");
        }

        if ( $this.find(".gi-img-icon-replacer").length > 0 ) { $this.find(".gi-img-icon-replacer").remove(); }

        $img.on('error', function() {

            var textToDisplay = firstLetter + secondLetter;
            console.log(textToDisplay);
            if ( $this.find(".gi-img-icon-replacer").length > 0 ) { $this.find(".gi-img-icon-replacer").remove(); }

            $img.after("<p class='gi-img-icon-replacer'>" + textToDisplay + "</p>");
            if ( $this.hasClass("light-mode") ) {
                $this.find(".gi-img-icon-replacer").css( "color" , $this.attr('data-gi-background-color') );
            }
        });

    });

    

    checkButtonAccessibility();

}