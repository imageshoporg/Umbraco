import { UmbChangeEvent } from '@umbraco-cms/backoffice/event';
import { css, customElement, html, LitElement, property, state } from '@umbraco-cms/backoffice/external/lit';
import type {
	UmbPropertyEditorConfigCollection,
	UmbPropertyEditorUiElement,
} from '@umbraco-cms/backoffice/property-editor';
import type { ImageshopValue } from './types/imageshop.types';

@customElement('imageshop-property-editor-ui')
export default class ImageshopEditorUiElement extends LitElement implements UmbPropertyEditorUiElement {
    @property({ attribute: false })
    public value?: ImageshopValue;

    private _instanceId = crypto.randomUUID();

    @state()
    private _token?: string;

    @state()
    private _interface?: string;

    @state()
    private _prefix?: string;

    @state()
    private _sizes?: string;

    @state()
    private _previewcrop?: string;

    @state()
    private _profile?: string;

    @state()
    private _hidesizedialogue?: boolean;

    @state()
    private _showvideo?: boolean;


    @property({ attribute: false })
    public set config(config: UmbPropertyEditorConfigCollection) {
        this._token = config.getValueByAlias('token');
        this._interface = config.getValueByAlias('interface');
        this._prefix = config.getValueByAlias('prefix');
        this._sizes = config.getValueByAlias('sizes');
        this._previewcrop = config.getValueByAlias('previewcrop');
        this._profile = config.getValueByAlias('profile');
        this._hidesizedialogue = config.getValueByAlias('hidesizedialogue');
        this._showvideo = config.getValueByAlias('showvideo');
    }

    #dispatchChangeEvent() {
		this.dispatchEvent(new UmbChangeEvent());
	}
    #setValue(value?: ImageshopValue) {
        this.value = value;
        this.#dispatchChangeEvent();

        /*let editor = document.querySelector(`.imageshop-editor-${this._instanceId}`);

        if (this.value && editor?.classList.contains("no-image")) {
            editor?.classList.add("has-image");
            editor?.classList.remove("no-image");
        } else if (this.value && editor?.classList.contains("has-image")) {
            editor?.classList.remove("has-image");
            editor?.classList.add("no-image");
        }*/
    }
    #clearValue() {
        this.#setValue(undefined);
    }
    #openWindow() {
        console.log(`Opening window: ${this._instanceId}`)
        let sizeDialogue = this._hidesizedialogue ? "false" : "true"; 
        let insertImagePath = "/App_Plugins/Imageshop/InsertImage.html?SETDOMAIN=false" +
        ((this._profile == null) ? "&IMAGESHOPSIZES=" + this._sizes : "") +
        ((this._profile == null) ? "&SHOWSIZEDIALOGUE=" +  sizeDialogue : "&SHOWSIZEDIALOGUE=false") +
        ((this._profile == null) ? "&SHOWCROPDIALOGUE=true" : "&SHOWCROPDIALOGUE=false") +
        "&IMAGESHOPINTERFACENAME=" + this._interface +
        "&IMAGESHOPDOCUMENTPREFIX=" + this._prefix +
        "&IMAGESHOPTOKEN=" + this._token +
        "&EDITDESCRIPTION=false";

        if (this._profile) {
            insertImagePath += "&PROFILEID=" + this._profile
        }
        if (this._showvideo) {
            insertImagePath += "&SHOWVIDEO=true";
        }

        addEventListener("message", (event) => {
            console.log('Imageshop data:', event.data);
            var imageshopValue = JSON.parse(event.data.split(';')[0]) as ImageshopValue;

            this.#setValue(imageshopValue);
        }, { once: true })
        window.open(insertImagePath, 'imageshop', "width=950, height=800, scrollbars=1, inline=1");
    }
    override render() {
        return html`
        <div class="imageshop-editor imageshop-editor-${this._instanceId} ${this.value ? 'has-image' : 'no-image'}">
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
                @click=${this.#openWindow}
            >
                <div class="imageshop-add-image-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M420.592 214.291H296.104V89.804h-83.102v124.487H88.518v83.104h124.484v124.488h83.102V297.395h124.488z"></path></svg>
                </div>
            </button>
            <img
                src="${this.value?.image?.thumbnail ?? this.value?.image?.file ?? ''}"
                class="imageshopimage"
                alt="Preview"
                title="Preview"
                data-uuid="${this._instanceId}"
            />
            <button
                class="imageshop-remove-image"
                data-uuid="${this._instanceId}"
                type="button"
                @click=${this.#clearValue}
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

    static override readonly styles = [
        css`
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
}

declare global {
    interface HTMLElementTagNameMap {
        'imageshop-property-editor-ui': ImageshopEditorUiElement;
    }
}