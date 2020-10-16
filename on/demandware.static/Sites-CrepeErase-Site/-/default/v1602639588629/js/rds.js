$(document).ready(function () {
    var RadianceLabs = window.RadianceLabs;
    window.RadianceLabsCommerce = {
        processingCount: 0,
        showACWidget: function (optInMessage) {
            if (RadianceLabs.isOptin()) { return; }
            var acWrapper = $('#rad-ac');
            if (acWrapper.length > 0 && $('#rl_ac').length === 0) {
                RadianceLabs.addFBCheckboxBox({ prependDiv: acWrapper, opt_in_messaging: optInMessage, prechecked: RadianceLabs.MessengerCheckboxPrechecked, allow_login: RadianceLabs.MessengerCheckboxAllowLogin, size: 'standard', element_id: 'rl_ac' }, true);
                this.needInitFB = true;
                $(document).on('click', 'button#add-to-cart', function () {
                    if (RadianceLabs.confirmCheckboxOptin({ opt_in_location: 'product_page' })) {
                        RadianceLabs.markCartUpdate();
                    }
                });
                var RadianceLabsCommerce = this;
                var origOpen = XMLHttpRequest.prototype.open;
                XMLHttpRequest.prototype.open = function (method, url) {
                    this.addEventListener('readystatechange', function () {
                        if (this.readyState === 4) {
                            var isOptedIn = RadianceLabs.isOptin();
                            if (!isOptedIn && method === 'GET' && /.+Product-Variation(\?.*)$/.test(url)) {
                                setTimeout(function () {
                                    RadianceLabsCommerce.showACWidget(optInMessage);
                                    RadianceLabs.initFB();
                                }, 1000);
                            }
                        }
                    });
                    origOpen.apply(this, arguments);
                };
            }
        },
        registerCartUpdateRequestListener: function (URL) {
            var RadianceLabsCommerce = this;
            var origOpen = XMLHttpRequest.prototype.open;
            XMLHttpRequest.prototype.open = function (method, url) {
                this.addEventListener('readystatechange', function () {
                    if (this.readyState === 4) {
                        var isOptedIn = RadianceLabs.isOptin();
                        if (isOptedIn && method === 'POST' && /.+Cart-AddProduct(\?.*)$/.test(url)) {
                            RadianceLabsCommerce.syncCart(URL);
                        }
                    }
                });
                origOpen.apply(this, arguments);
            };
            $(document).on('submit', 'form#cart-items-form', function () {
                RadianceLabs.markCartUpdate();
            });
            $(document).on('click', 'button.add-to-cart, button#update-cart, button#add-all-to-cart', function () {
                RadianceLabs.markCartUpdate();
            });
        },
        checkAC: function (URL) {
            this.syncCart(URL);
            this.registerCartUpdateRequestListener(URL);
        },

        showPopup: function (commandName, smsText, logoURL, bgURL) {
            RadianceLabs.showPopup(commandName, smsText, logoURL, bgURL);
        },
        showSMSCheckoutOptin: function (email, phoneNumber, optInMessage, command) {
            if (!phoneNumber) return;
            var widgetWrapper = $('#rad-checkout');
            if (widgetWrapper.length > 0 && !RadianceLabs.isOptin()) {
                widgetWrapper.append('<div class="field-wrapper"><input class="input-checkbox" "type="checkbox" id="rad_sms_checkbox"/><label for="rad_sms_checkbox">' + optInMessage.replace(/\{0\}/g, phoneNumber) + '</label></div>');
                $(document).on('submit', 'form.submit-order', function () {
                    if (/\S+@\S+\.\S+/.test(email) && $('input#rad_sms_checkbox')[0].checked) {
                        RadianceLabs.linkSMS({ opt_in_location: 'checkout_page', email: email, phone: phoneNumber, command: command });
                    }
                });
            }
        },
        showMessengerCheckoutOptin: function (email, optInMessage, command) {
            var widgetWrapper = $('#rad-checkout');
            if (widgetWrapper.length > 0 && !RadianceLabs.isOptin()) {
                RadianceLabs.addFBCheckboxBox({ prependDiv: widgetWrapper, opt_in_messaging: optInMessage, prechecked: RadianceLabs.MessengerCheckboxPrechecked, allow_login: RadianceLabs.MessengerCheckboxAllowLogin, size: 'standard', element_id: 'rl_ac' }, true);
                $(document).on('submit', 'form.submit-order', function () {
                    RadianceLabs.confirmCheckboxOptin({ opt_in_location: 'checkout_page', email: email, command: command });
                });
            }
        },
        initWidgets: function () {
            if (this.processingCount === 0) {
                RadianceLabs.initFB();
            }
        },
        syncCart: function (URL) {
            if (RadianceLabs.isOptin()) {
                RadianceLabs.loadCart = function () {
                    var jqXHR = $.ajax({
                        url: URL,
                        type: 'get',
                        async: false
                    });
                    var data = JSON.parse(jqXHR.responseText);
                    return data;
                };
                RadianceLabs.cart_update();
            }
        }
    };
});
