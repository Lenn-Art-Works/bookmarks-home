// Standard Data Werte

var itemsetupDataBackgroundColor = "#000";
var itemsetupDataDisplayMode = "dark-mode";
var itemsetupDataTitle = "unedited";
var itemsetupDataURL = "https://google.com";

// wird nur ersetzt wenn data-ID nicht definiert ist - nicht umgesetzt
var itemsetupDataID// = generateValidId(itemsetupDataTitle); // keine Sonderzeichen, nur Aa-Zz, 0-9, _-

var GIbaseDataBlock = "data-gi-id='' data-gi-background-color="+itemsetupDataBackgroundColor+" data-gi-display-mode="+itemsetupDataDisplayMode+" data-gi-title="+itemsetupDataTitle+" data-gi-url="+itemsetupDataURL+"";

// Basic Tag Element
var GIbaseBannerElement = '<div class="grid-item custom-item type-banner" '+GIbaseDataBlock+'><div class="inner-element type-tag"><p class="gi-title"></p><div class="gi-box"><img class="gi-img-icon" src="res/elements/icons/'+itemsetupDataID+'.png" alt=""></div></div></div>';
var GIbaseCardElement = '<div class="grid-item custom-item type-card" '+GIbaseDataBlock+'><div class="inner-element type-tag"><p class="gi-title"></p><div class="gi-box"><img class="gi-img-icon" src="res/elements/icons/'+itemsetupDataID+'.png" alt=""></div></div></div>';
var GIbaseTagElement = '<div class="grid-item custom-item type-tag" '+GIbaseDataBlock+'><p class="gi-title"></p><div class="gi-box"><img class="gi-img-icon" src="res/elements/icons/'+itemsetupDataID+'.png" alt=""></div></div>';
var GIbaseIconBigElement = '<div class="grid-item custom-item type-icon-big" '+GIbaseDataBlock+'><img class="gi-img-icon" src="res/elements/icons/'+itemsetupDataID+'.png" alt=""></div>';
var GIbaseIconSmallElement = '<div class="grid-item custom-item type-icon-small" '+GIbaseDataBlock+'><img class="gi-img-icon" src="res/elements/icons/'+itemsetupDataID+'.png" alt=""></div>';
