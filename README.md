
# Umbraco property editor for Imageshop

This property editor will allow you to insert images from Imageshop. Various metadata for the image will also be available. The value of the property editor will be a JSON looking like the one shown below. The user will be able to modify the text for the Norwegian description of the image, which is available from value.text['no'].description. The permalink for the image will be retrieved by using value.image.file.

This property editor is not backward compatible with the previous string based property editor for Imageshop, which did not contain metadata for the image, but only a link to the actual image in a string. The new editor will store the full json with metadescription in addition to the image.

Example json:

{
  "code": "SC-0203",
  "image": {
    "file": "https://v.imgi.no/jp724drlek",
    "width": 200,
    "height": 500,
    "thumbnail": "https://magik.imageshop.no/iMageWithFallbackAndMagikAndS3.aspx?d=1&t=637820640000000000&c=image%2fjpeg&base=39&h=2FCB358DB8099760D816E577A91E2D9B&x=0&y=0&real=&img=-2bba06-wm.JPG"
  },
  "text": {
    "no": {
      "title": "Imageshop logo",
      "description": "Imageshop ikon modified",
      "rights": "",
      "credits": "",
      "tags": "",
      "categories": []
    },
    "en": {
      "title": "Imageshop logo",
      "description": "",
      "rights": "",
      "credits": "",
      "tags": "",
      "categories": []
    },
    "sv": {
      "title": "imageshop-96.png",
      "description": "Imageshop ikon",
      "rights": "",
      "credits": "",
      "tags": "",
      "categories": []
    }
  },
  "extraInfo": { "ShowDescription": "1" },
  "documentId": 2865670,
  "AuthorName": null,
  "InterfaceList": [
    {
      "InterfaceID": 57331,
      "InterfaceName": "Public"
    },
    {
      "InterfaceID": 57332,
      "InterfaceName": "Private"
    }
  ]
}
