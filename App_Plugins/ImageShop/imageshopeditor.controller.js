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
    .controller("screentek.ImageshopEditorController",
        function ($scope, assetsService) {
            assetsService.loadJs("/App_Plugins/Imageshop/imageshop.js?v=a", $scope)
                .then(function () {
                    var imageshopChange = function (pguid) {
                        $scope.$apply(function () {
                            $scope.model.value = JSON.parse($(".imageshopurl[data-guid='" + pguid + "']").val());
                            $scope.image = $(".imageshopimage[data-guid='" + pguid + "']");
                            $scope.description = $(".imageshopdescription[data-guid='" + pguid + "']");
                            $scope.description.text($scope.model.value.text[getCulture()].description);
                            $scope.selector.show();
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
                    $scope.removebutton = $(".removeimage:eq( " + _boxNumber + " )");
                    $scope.selector = $(".imageshop-selector:eq( " + _boxNumber + " )");

                    //$scope.textbox.attr("data-guid", guid);
                    //$scope.image.attr("data-guid", guid);
                    //$scope.description.attr("data-guid", guid);

                    $scope.boxNumber = _boxNumber;
                    _boxNumber = _boxNumber + 1;
                    $scope.textbox.val(JSON.stringify($scope.model.value));
                    if ($scope.model.value && $scope.model.value.image && $scope.model.value.image.file) {
                        if ($scope.model.config.previewcrop)
                            $scope.image.attr("src", $scope.model.value.image.file + $scope.model.config.previewcrop);
                        else
                            $scope.image.attr("src", $scope.model.value.image.file);
                        $scope.description.text($scope.model.value.text[getCulture()].description);
                        $scope.selector.show();
                    } else {
                        $scope.selector.hide();
                    }
                    $scope.textbox.data("value", $scope.textbox.val());
                    $(".imageshop-button").click(function () {
                        var imageshopurl = $(this).parent().find(".imageshopurl");
                        var cguid = imageshopurl.data("guid");
                        imageshop.openWindow($(".imageshopurl[data-guid='" + cguid + "']"),
                            $(".imageshopimage[data-guid='" + cguid + "']"),
                            $(this));
                    });

                    $(".removeimage").click(function () {
                        var thisGuid = $(this).data("guid");
                        if (thisGuid == $scope.guid) {
                            var imageshopurllocal = $(".imageshopurl[data-guid='" + thisGuid + "']");
                            var imageshopselector = $(".imageshop-selector[data-guid='" + thisGuid + "']");
                            $scope.model.value = "";
                            imageshopurllocal.val("");
                            imageshopselector.hide();
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