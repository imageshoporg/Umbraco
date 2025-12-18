var _boxNumber = 0;

function getCulture() {
    culture = getParameterByName("mculture");
    if (culture == 'nb' || culture == 'nn')
        return "no";
    return "en";
}

function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

angular.module("umbraco")
    .controller("imageshop.ImageshopEditorController",
        function ($scope, assetsService) {
            assetsService.loadJs("/App_Plugins/Imageshop/imageshop.js?v=13.0.0", $scope)
                .then(function () {

                    var imageshopChange = function (pguid) {
                        $scope.$apply(function () {
                            $scope.model.value = JSON.parse($(".imageshopurl[data-guid='" + pguid + "']").val());
                            $scope.image = $(".imageshopimage[data-guid='" + pguid + "']");
                            $scope.description = $(".imageshopdescription[data-guid='" + pguid + "']");
                            $scope.editor = $(".imageshop-editor[data-guid='" + pguid + "']");
                            $scope.description.text($scope.model.value.text[getCulture()].description);

                            $scope.editor.removeClass("no-image");
                            $scope.editor.addClass("has-image");
                        });
                    };

                    if ($(".imageshopurl:eq( " + 0 + " )").val() === "{{ model.value }}" || _boxNumber >= $(".imageshopurl").length) {
                        _boxNumber = 0;
                    }

                    var guid = $scope.$id;

                    $scope.guid = guid;

                    $scope.textbox = $(".imageshopurl:eq( " + _boxNumber + " )");
                    $scope.image = $(".imageshopimage:eq( " + _boxNumber + " )");
                    $scope.description = $(".imageshopdescription:eq( " + _boxNumber + " )");
                    $scope.editor = $(".imageshop-editor:eq( " + _boxNumber + " )");


                    $scope.boxNumber = _boxNumber;
                    _boxNumber = _boxNumber + 1;
                    $scope.textbox.val(JSON.stringify($scope.model.value));
                    if ($scope.model.value && $scope.model.value.image && $scope.model.value.image.file) {
                        if ($scope.model.config.previewcrop)
                            $scope.image.attr("src", $scope.model.value.image.file + $scope.model.config.previewcrop);
                        else
                            $scope.image.attr("src", $scope.model.value.image.file);
                        $scope.description.text($scope.model.value.text[getCulture()].description);
                        $scope.editor.addClass("has-image");
                        $scope.editor.removeClass("no-image");
                    } else {
                    }
                    $scope.textbox.data("value", $scope.textbox.val());
                    $(".imageshop-button").click(function () {
                        var imageshopurl = $(this).parent().find(".imageshopurl");
                        var cguid = imageshopurl.data("guid");
                        imageshop.openWindow($(".imageshopurl[data-guid='" + cguid + "']"),
                            $(".imageshopimage[data-guid='" + cguid + "']"),
                            $(this));
                    });

                    $(".imageshop-remove-image").click(function () {
                        var thisGuid = $(this).data("guid");
                        if (thisGuid == $scope.guid) {
                            var imageshopurllocal = $(".imageshopurl[data-guid='" + thisGuid + "']");
                            $scope.model.value = "";
                            imageshopurllocal.val("");
                            var imageshopEditor = $scope.editor;

                            imageshopEditor.addClass("no-image");
                            imageshopEditor.removeClass("has-image");
                        }
                    });

                    setInterval(function () {
                        var data = $(".imageshopurl[data-guid='" + guid + "']").data("value"),
                            val = $(".imageshopurl[data-guid='" + guid + "']").val();
                        if (val && data !== val) {
                            $(".imageshopurl[data-guid='" + guid + "']").data("value", val);
                            imageshopChange(guid);
                        }
                    },
                        100);


                });


        });