# Umbraco Property Editor for Imageshop

This Umbraco property editor integrates [Imageshop](https://www.imageshop.org) to enable easy selection and insertion of images directly into your content. It enhances the editing experience by not only embedding the image URL, but also storing rich metadata alongside the image for multilingual and accessibility support.

## Key Features

* Select and insert images from Imageshop into Umbraco content.
* Automatically retrieve metadata such as image dimensions, titles, descriptions, and usage rights.
* Supports multiple languages (e.g. `no`, `en`, `sv`, etc.) for localized metadata.
* Allows the user to modify the Norwegian (`no`) image description within the editor.
* Stores the full JSON representation of the image and its metadata.
* **Not backward compatible** with the older string-based property editor, which only stored image URLs.

## Value Format

The property editor stores the image data as a JSON object. Below is a description of the structure and fields.

### JSON Example

```json
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
      "altText": "Logo av Imageshop",
      "rights": "",
      "credits": "",
      "tags": "",
      "categories": []
    },
    "en": {
      "title": "Imageshop logo",
      "description": "",
      "altText": "",
      "rights": "",
      "credits": "",
      "tags": "",
      "categories": []
    },
    "sv": {
      "title": "imageshop-96.png",
      "description": "Imageshop ikon",
      "altText": "Ikon från Imageshop",
      "rights": "",
      "credits": "",
      "tags": "",
      "categories": []
    }
  },
  "extraInfo": {
    "ShowDescription": "1"
  },
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
  ],
  "focalPoint": {
    "x": 0.25,
    "y": -0.1
  }
}
```

## JSON Field Breakdown

| Field                      | Type     | Description                                                                 |                                                                                     |
| -------------------------- | -------- | --------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| `code`                     | `string` | A unique identifier for the image (typically an image code or SKU).         |                                                                                     |
| `image.file`               | `string` | Direct URL to the image file hosted on Imageshop.                           |                                                                                     |
| `image.width`              | `number` | Width of the image in pixels.                                               |                                                                                     |
| `image.height`             | `number` | Height of the image in pixels.                                              |                                                                                     |
| `image.thumbnail`          | `string` | URL to a thumbnail or preview of the image.                                 |                                                                                     |
| `text`                     | `object` | Localized metadata organized by language code (`no`, `en`, `sv`, etc.).     |                                                                                     |
| `text.{lang}.title`        | `string` | Title of the image in the specified language.                               |                                                                                     |
| `text.{lang}.description`  | `string` | Description or caption for the image. Can be edited for Norwegian (`no`).   |                                                                                     |
| `text.{lang}.altText`      | `string` | Alternative text for accessibility.                                         |                                                                                     |
| `text.{lang}.rights`       | `string` | Usage rights or license information.                                        |                                                                                     |
| `text.{lang}.credits`      | `string` | Photographer or source credits.                                             |                                                                                     |
| `text.{lang}.tags`         | `string` | Comma-separated tags or keywords for search.                                |                                                                                     |
| `text.{lang}.categories`   | `array`  | Array of categories assigned to the image.                                  |                                                                                     |
| `text.{lang}.documentinfo` | `array`  | List of additional metadata with `DocumentInfoTypeId`, `Name`, and `Value`. |                                                                                     |
| `extraInfo`                | \`object | null\`                                                                      | Optional field for additional display/config flags (e.g. `ShowDescription`).        |
| `documentId`               | `number` | Internal Imageshop document ID.                                             |                                                                                     |
| `AuthorName`               | \`string | null\`                                                                      | Optional name of the author or creator.                                             |
| `InterfaceList`            | `array`  | List of interfaces where the image is used (e.g. Public, Private).          |                                                                                     |
| `profile`                  | \`object | null\`                                                                      | Optional metadata profile (may be null).                                            |
| `focalPoint`               | \`object | null\`                                                                      | Optional object with `x` and `y` (range: -1.0 to 1.0) for image cropping and focus. |

## Editing Description in Umbraco

The user can edit the Norwegian description of the image through the editor using:

```javascript
value.text['no'].description
```

This allows content editors to override or enrich the default description provided by Imageshop.

## Manifest File Configuration

The configuration for the property editor is defined in a manifest file. This file registers the editor with Umbraco and provides editable prevalue fields for token setup, interface, sizing, etc.

### Example manifest file:

```js
{
  propertyEditors: [
    {
      alias: "screentek.ImageshopEditor",
      name: "Screentek Imageshop",
      editor: {
        view: "~/App_Plugins/Imageshop/imageshopeditor.html?v=b",
        valueType: "JSON"
      },
      prevalues: {
        fields: [
          {
            label: "Token",
            description: "Retrieved from Imageshop",
            key: "token",
            view: "textstring",
            validation: [{ type: "Required" }]
          },
          {
            label: "Interface",
            description: "A valid Interface in Imageshop",
            key: "interface",
            view: "textstring"
          },
          {
            label: "Prefix",
            description: "Prefix of the document code when uploading to Imageshop",
            key: "prefix",
            view: "textstring"
          },
          {
            label: "Predefined sizes",
            description: "Predefined sizes the user can select from. Format: <name>;<size>[:<name>;<size>][...]. Example: 'Default size;2000x868:Free width;2000x0'",
            key: "sizes",
            view: "textstring"
          },
          {
            label: "Profile name",
            description: "Size profile created by Imageshop. Use 'empty' to denote the blank profile. See http://demo.imageshop.no for more info.",
            key: "profile",
            view: "textstring"
          },
          {
            label: "Default preview crop for profile",
            description: "Crop suffix for preview (e.g. '-Desktop/HD'). See https://apidocumentation.imageshop.no",
            key: "previewcrop",
            view: "textstring"
          },
          {
            label: "Hide size dialogue",
            description: "Hide or show size selector. If hidden, only predefined size will be used.",
            key: "hidesizedialgue",
            view: "boolean"
          }
        ]
      }
    }
  ],
  javascript: [
    "~/App_Plugins/Imageshop/imageshopeditor.controller.js?v=c"
  ]
}
```

This manifest file should be placed in your Umbraco `App_Plugins/ImageshopEditor` folder. It defines how the editor behaves and what configuration options are available to content administrators.

## Migration Notice

This version is not backward compatible with the old string-based property editor, which only stored a single image URL. The new version stores a rich JSON object including metadata, localized texts, alt texts, and accessibility details.

Legacy data must be manually migrated or transformed to match the new format if you wish to upgrade existing properties.
