var _textBox;
var _image;

async function listener(event) {
    let eventdata = event.data.split(";");
    let imageshopData = JSON.parse(eventdata[0]);
    const permalinkToken = imageshopData.image.file.split('/').pop();

    _image.attr("src", JSON.parse(eventdata[0]).image.file);
    const permalinkInfo = await getPermalinkInfo(permalinkToken);
    if (permalinkInfo) {
        imageshopData.image.croppedWidth = permalinkInfo.ReferenceWidth - permalinkInfo.X1 - (permalinkInfo.X2 - permalinkInfo.ReferenceWidth)
        imageshopData.image.croppedHeight = permalinkInfo.ReferenceHeight - permalinkInfo.Y1 - (permalinkInfo.Y2 - permalinkInfo.ReferenceHeight)
        if (imageshopData.image.height === 0) {
            imageshopData.image.height = Math.floor((imageshopData.image.width / imageshopData.image.croppedWidth) * imageshopData.image.croppedHeight);
        } else if (imageshopData.image.width === 0) {
            imageshopData.image.width = Math.floor((imageshopData.image.height / imageshopData.image.croppedHeight) * imageshopData.image.croppedWidth);
        }
    }
    _textBox.val(JSON.stringify(imageshopData));
    let editor = _opener.closest('.imageshop-editor');
    editor.addClass('has-image');
    editor.removeClass('no-image');
}

var imageshop = {
    openWindow: function (textbox, image, opener) {
        var imageshoptoken = opener.data('token');
        var editDescription = (opener.data('editdescription') == "1" ? "true" : "false");
        var imageshopprofile = opener.data('profile');
        var imageshopinterfacename = opener.data('interface'); // Name of the default interface
        var imageshopdocumentprefix = opener.data('prefix'); // Document code prefix
        var imageshopShowVideo = opener.data('showvideo');
        var sizes = opener.data('sizes') !== "undefined" ? opener.data("sizes") : "";
        var sizeDialogue = (opener.data("hidesizedialgue") == "1" ? "false" : "true");

        if (imageshopprofile == "empty")
            imageshopprofile = "";
        else if (imageshopprofile == "null" || imageshopprofile == "")
            imageshopprofile = null;

        var imageshopsitepath = "/App_Plugins/Imageshop/InsertImage.html?SETDOMAIN=false " +
            ((imageshopprofile == null) ? "&IMAGESHOPSIZES=" + sizes : "") +
            ((imageshopprofile == null) ? "&SHOWSIZEDIALOGUE=" + sizeDialogue : "&SHOWSIZEDIALOGUE=false") +
            ((imageshopprofile == null) ? "&SHOWCROPDIALOGUE=true" : "&SHOWCROPDIALOGUE=false") +
            "&IMAGESHOPINTERFACENAME=" + imageshopinterfacename +
            "&IMAGESHOPDOCUMENTPREFIX=" + imageshopdocumentprefix +
            "&IMAGESHOPTOKEN=" + imageshoptoken +
            "&EDITDESCRIPTION=" + editDescription
            ;

        if (imageshopprofile != null)
            imageshopsitepath = imageshopsitepath + "&PROFILEID=" + imageshopprofile;
        if (imageshopShowVideo)
            imageshopsitepath += "&SHOWVIDEO=true";
        if (window.addEventListener) {
            addEventListener("message", (event) => listener(event), false);
        } else {
            attachEvent("onmessage", (event) => listener(event));
        }

        _textBox = textbox;
        _image = image;
        _opener = opener;
        window.open(imageshopsitepath, 'imageshop', "width=950, height=800, scrollbars=1, inline=1");
    }
};

async function getPermalinkInfo(permalinkToken) {
    try {
        const response = await fetch(`https://api.imageshop.no/Permalink/GetPermalinks?permalink=${permalinkToken}`, {
            method: 'GET',
            headers: {
                token: _opener.data('token')
            }
        });
        if (response.ok) {
            let json = await response.json();
            return json[0];
        }
        console.error('Failed to get permalink', response);
        return null;
    } catch (e) {
        console.error('Get permalink info error:', error);
    }
}
