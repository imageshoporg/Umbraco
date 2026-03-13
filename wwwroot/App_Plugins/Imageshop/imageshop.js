import { UmbChangeEvent as v } from "@umbraco-cms/backoffice/event";
import { css as w, property as c, state as o, customElement as b, LitElement as I, html as x } from "@umbraco-cms/backoffice/external/lit";
var y = Object.defineProperty, E = Object.getOwnPropertyDescriptor, u = (e) => {
  throw TypeError(e);
}, s = (e, t, a, h) => {
  for (var r = h > 1 ? void 0 : h ? E(t, a) : t, d = e.length - 1, l; d >= 0; d--)
    (l = e[d]) && (r = (h ? l(t, a, r) : l(r)) || r);
  return h && r && y(t, a, r), r;
}, O = (e, t, a) => t.has(e) || u("Cannot " + a), $ = (e, t, a) => t.has(e) ? u("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, a), p = (e, t, a) => (O(e, t, "access private method"), a), n, m, g, _, f;
let i = class extends I {
  constructor() {
    super(...arguments), $(this, n), this._instanceId = crypto.randomUUID();
  }
  set config(e) {
    this._token = e.getValueByAlias("token"), this._interface = e.getValueByAlias("interface"), this._prefix = e.getValueByAlias("prefix"), this._sizes = e.getValueByAlias("sizes"), this._previewcrop = e.getValueByAlias("previewcrop"), this._profile = e.getValueByAlias("profile"), this._hidesizedialogue = e.getValueByAlias("hidesizedialogue"), this._showvideo = e.getValueByAlias("showvideo");
  }
  render() {
    return x`
        <div class="imageshop-editor imageshop-editor-${this._instanceId} ${this.value ? "has-image" : "no-image"}">
            <button
                class="imageshop-button"
                type="button"
                data-token="${this._token}"
                data-interface="${this._interface}"
                data-prefix="${this._prefix}"
                data-sizes="${this._sizes}"
                data-profile="${this._profile}"
                data-hidesizedialgue="${this._hidesizedialogue}"
                data-editdescription="0"
                data-uuid="${this._instanceId}"
                data-showvideo="${this._showvideo}}"
                title="Insert image from Imageshop"
                @click=${p(this, n, f)}
            >
                <div class="imageshop-add-image-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M420.592 214.291H296.104V89.804h-83.102v124.487H88.518v83.104h124.484v124.488h83.102V297.395h124.488z"></path></svg>
                </div>
            </button>
            <img
                src="${this.value?.image?.thumbnail ?? this.value?.image?.file ?? ""}"
                class="imageshopimage"
                alt="Preview"
                title="Preview"
                data-uuid="${this._instanceId}"
            />
            <button
                class="imageshop-remove-image"
                data-uuid="${this._instanceId}"
                type="button"
                @click=${p(this, n, _)}
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M401.431 167.814l-58.757-58.76-88.029 88.026-88.028-88.026-58.76 58.76 88.026 88.027-88.026 88.024 58.76 58.768 88.028-88.031 88.029 88.031 58.757-58.768-88.027-88.024z"></path></svg>
            </button>
        </div>
        <div
            id="imageshop-input-${this._instanceId}"
            class="imageshop-input" 
            label="imageshop"
            data-uuid="${this._instanceId}"
            data-token="${this._token}"
            data-interface="${this._interface}"   
            data-prefix="${this._prefix}"
            data-sizes="${this._sizes}"   
            data-previewcrop="${this._previewcrop}"   
            data-profile="${this._profile}"   
            data-hidesizedialogue="${this._hidesizedialogue}"   
            data-showvideo="${this._showvideo}"
            style="display:none;"
        >
        </div>`;
  }
};
n = /* @__PURE__ */ new WeakSet();
m = function() {
  this.dispatchEvent(new v());
};
g = function(e) {
  this.value = e, p(this, n, m).call(this);
};
_ = function() {
  p(this, n, g).call(this, void 0);
};
f = function() {
  console.log(`Opening window: ${this._instanceId}`);
  let e = this._hidesizedialogue ? "false" : "true", t = "/App_Plugins/Imageshop/InsertImage.html?SETDOMAIN=false" + (this._profile == null ? "&IMAGESHOPSIZES=" + this._sizes : "") + (this._profile == null ? "&SHOWSIZEDIALOGUE=" + e : "&SHOWSIZEDIALOGUE=false") + (this._profile == null ? "&SHOWCROPDIALOGUE=true" : "&SHOWCROPDIALOGUE=false") + "&IMAGESHOPINTERFACENAME=" + this._interface + "&IMAGESHOPDOCUMENTPREFIX=" + this._prefix + "&IMAGESHOPTOKEN=" + this._token + "&EDITDESCRIPTION=false";
  this._profile && (t += "&PROFILEID=" + this._profile), this._showvideo && (t += "&SHOWVIDEO=true"), addEventListener("message", (a) => {
    console.log("Imageshop data:", a.data);
    var h = JSON.parse(a.data.split(";")[0]);
    p(this, n, g).call(this, h);
  }, { once: !0 }), window.open(t, "imageshop", "width=950, height=800, scrollbars=1, inline=1");
};
i.styles = [
  w`
            a.imageshop-button {
                width: 17px;
                height: 17px;
                cursor: pointer;
                background: url(/App_Plugins/Imageshop/imageshop-logo.png) no-repeat;
                background-size: contain;
                text-decoration: none;
                display: inline-block;
            }

            img.imageshopimage {
                width: calc(100% - 5px);
                max-height: calc(100% - 5px);
                background: #ddd;
                object-fit: contain;
            }

            .imageshop-editor {
                width: 144px;
                height: 144px;
                background: #fff;
                border: 1px solid #ddd;
                position: relative;
                display: flex;
                justify-content: center;
                place-items: center;
            }

                .imageshop-editor.no-image img {
                    display: none;
                }

                .imageshop-editor.has-image .imageshop-button {
                    display: none;
                }

                .imageshop-editor.has-image .imageshop-remove-image {
                    display: flex;
                }

            button.imageshop-button {
                width: 100px;
                height: 100px;
                background: #fff;
                border: 2px dashed #ddd;
                color: #ddd;
                display: flex;
                justify-content: center;
                place-items: center;
                cursor: pointer;
            }

                button.imageshop-button:hover {
                    color: #2152a3;
                    border-color: #2152a3;
                }

                button.imageshop-button .imageshop-add-image-icon {
                    width: 32px;
                    height: 32px;
                }

                    button.imageshop-button .imageshop-add-image-icon svg {
                        fill: currentColor;
                    }

            button.imageshop-remove-image {
                background: #fff;
                border-radius: 15px;
                box-shadow: 0 1px 2px rgba(0,0,0,.25);
                display: none;
                justify-content: center;
                width: 25px;
                height: 25px;
                border: none;
                color: red;
                position: absolute;
                bottom: 5px;
                right: 5px;
                cursor: pointer;
            }

                button.imageshop-remove-image svg {
                    fill: currentColor;
                }
        `
];
s([
  c({ attribute: !1 })
], i.prototype, "value", 2);
s([
  o()
], i.prototype, "_token", 2);
s([
  o()
], i.prototype, "_interface", 2);
s([
  o()
], i.prototype, "_prefix", 2);
s([
  o()
], i.prototype, "_sizes", 2);
s([
  o()
], i.prototype, "_previewcrop", 2);
s([
  o()
], i.prototype, "_profile", 2);
s([
  o()
], i.prototype, "_hidesizedialogue", 2);
s([
  o()
], i.prototype, "_showvideo", 2);
s([
  c({ attribute: !1 })
], i.prototype, "config", 1);
i = s([
  b("imageshop-property-editor-ui")
], i);
//# sourceMappingURL=imageshop.js.map
