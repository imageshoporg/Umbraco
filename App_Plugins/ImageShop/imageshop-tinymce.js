'use strict'
    ; (function () {
        /**
         * @param {import('tinymce').TinyMCE} tinymce
         */
        function plugin(tinymce) {

            // Register a new plugin on the PluginManager
            tinymce.PluginManager.add('imageshop', function (editor) {

                // Register a new button
                editor.ui.registry.addButton('imageshopbutton', {
                    text: 'ImageShop Button',
                    icon: 'code-sample',

                    // When the button is clicked, insert 'Hello World!' into the editor
                    onAction: function () {
                        editor.insertContent('Hello World!')
                    }
                })
            })
        }

        // Initialize the plugin only if the global `tinymce` object exists
        if (window && 'tinymce' in window) {
            plugin(window.tinymce)
        }
    })();