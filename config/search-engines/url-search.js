document.addEventListener('keyup', (event) => {

    // Send search to Site
    if ( $('.wizard-off .item-searchbar-element input').is(':focus') ) {

        var $this = $('.wizard-off .item-searchbar-element input:focus').closest('.item-searchbar-element');

        if (event.key === 'Enter') {

            if ( $this.attr("data-engine") === "Google" ) {
                window.open("https://www.google.com/search?q=" + $this.find("input").val(), tabtype);
                $this.val("");

            } else if ( $this.attr("data-engine") === "Amazon" ) {
                window.open("https://www.amazon.de/s?k=" + $this.find("input").val(), tabtype);
                $this.val("");

            } else if ( $this.attr("data-engine") === "Ecosia" ) {
                window.open("https://www.ecosia.org/search?method=index&q=" + $this.find("input").val(), tabtype);
                $this.val("");

            } else if ( $this.attr("data-engine") === "Dribbble" ) {
                window.open("https://dribbble.com/search/" + $this.find("input").val(), tabtype);
                $this.val("");

            } else if ( $this.attr("data-engine") === "Spotify" ) {
                window.open("https://open.spotify.com/search/" + $this.find("input").val(), tabtype);
                $this.val("");

            }
            
        }
    }

});