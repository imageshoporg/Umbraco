var _textBox;
var _image;

function listener(event) {
    var eventdata = event.data.split(";");
    _textBox.val(eventdata[0]);
    _image.attr("src", JSON.parse(eventdata[0]).image.file);
}

var imageshop = {
    openWindow: function (textbox, image, opener) {

        var imageshoptoken = opener.data('token');
        var editDescription = (opener.data('editdescription') == "1" ? "true" : "false");
        var imageshopprofile = opener.data('profile');
        var imageshopinterfacename = opener.data('interface'); // Name of the default interface
        var imageshopdocumentprefix = opener.data('prefix'); // Document code prefix
        var sizes = opener.data('sizes') !== "undefined" ? opener.data("sizes") : "";
        var sizeDialogue = (opener.data("hidesizedialgue") == "1" ? "false" : "true");

        if (imageshopprofile == "empty")
            imageshopprofile = "";
        else if (imageshopprofile == "null" || imageshopprofile == "")
            imageshopprofile = null;

        var imageshopsitepath = "/App_Plugins/ImageShopEditor/InsertImage.html?SETDOMAIN=false " + 
			((imageshopprofile == null) ? "&IMAGESHOPSIZES=" + sizes : "") + 
            ((imageshopprofile == null) ? "&SHOWSIZEDIALOGUE=" + sizeDialogue : "&SHOWSIZEDIALOGUE=false")  + 
            ((imageshopprofile == null) ? "&SHOWCROPDIALOGUE=true" : "&SHOWCROPDIALOGUE=false") + 
			"&IMAGESHOPINTERFACENAME=" + imageshopinterfacename + 
            "&IMAGESHOPDOCUMENTPREFIX=" + imageshopdocumentprefix + 
            "&IMAGESHOPTOKEN=" + imageshoptoken +
            "&EDITDESCRIPTION=" + editDescription
            ;

        if (imageshopprofile != null)
            imageshopsitepath = imageshopsitepath + "&PROFILEID=" + imageshopprofile;

        if (window.addEventListener) {
            addEventListener("message", listener, false);
        } else {
            attachEvent("onmessage", listener);
        }

        _textBox = textbox;
        _image = image;
        window.open(imageshopsitepath, 'imageshop', "width=950, height=800, scrollbars=1, inline=1");
    }
};

//$(function () {
//    $(".imageshop-button").click(function () {
//        imageshop.openWindow($(this).parent().find(".imageshopurl"), $(this));
//    });
//});
