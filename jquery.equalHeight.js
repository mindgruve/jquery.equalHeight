//it's safe to use window & document throughout your code, but scoping the variable lets you take advantage of some really useful features of minifiers/uglifiers.
;
(function ($, window, document) {

    var pluginName = 'equalHeight';
    /**
     *
     * @constant {EqualHeightOptions} defaults
     */
    var defaults = {
        includeOuterHeight: false,
        live: false,
        resizeDelay: 50,
        willSetHeight: null,
        didSetHeight: null
    };

    /**
     * EqualHeight plugin is used to set the height of a collection of elements to the height of to the tallest element in the collection.
     * By default this plugin sets height once during initialization but you can also set it up to resize when the window is resized.
     *
     * @version 1.2.1
     *
     * @param {jQuery} elements jQuery instance of selected elements
     * @param {EqualHeightOptions} options Custom options will be merged with the defaults
     * @constructor
     */
    function EqualHeight(elements, options) {

        //this test makes sure you we have elements to work with & allows this class to be inherited from using prototypal inheritance
        if (elements) {
            this.elements = elements;
            this.options = $.extend({}, defaults, options);
            this._defaults = defaults;
            this._name = pluginName;
            this.calculated = {
                height: 0,
                lastHeight: 0
            };
            this.init();
        }
    }

    EqualHeight.prototype = {
        init: function () {

            if (this.options.willSetHeight) {
                this.elements.on('willSetHeight.equalHeight', this.options.willSetHeight);
            }

            if (this.options.didSetHeight) {
                this.elements.on('didSetHeight.equalHeight', this.options.didSetHeight);
            }

            this.resize();

            if (this.options.live) {

                var _this = this,
                    timer;

                /** @TODO: this version of equalHeight registers multiple onResize events. Would one shared resize event be more performant? Improve this. -AG **/
                $(window).on('resize.equalHeight', function () {

                    clearTimeout(timer);

                    timer = setTimeout(function () {
                        _this.resize();
                    }, _this.options.resizeDelay);

                });
            }
        },
        calculateHeights: function () {
            var _this = this;
            this.elements.css('height', '');
            this.calculated.height = 0;
            this.elements.each(function () {
                var thisHeight = _this.options.includeOuterHeight ? $(this).outerHeight() : $(this).height();
                if (thisHeight > _this.calculated.height) {
                    _this.calculated.height = thisHeight;
                }
            });
        },
        equalize: function () {

            var _this = this;
            var visibleElementCount = this.elements.filter(':visible').length;
            var shouldSetHeight = visibleElementCount <= 1 ? false : true;

            var willSetHeightEvent = $.Event('willSetHeight', {equalHeight: this});
            this.elements.trigger(willSetHeightEvent);
            if (willSetHeightEvent.isDefaultPrevented()) {
                shouldSetHeight = false;
            }

            this.elements.each(function () {

                var $this = $(this);
                $this.css('height', shouldSetHeight ? _this.calculated.height + 'px' : '');

            });

            this.elements.trigger('didSetHeight');

        },
        resize: function () {
            this.calculateHeights();
            this.equalize();
        }
    };

    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn[pluginName] = function (options) {
        //FYI: this only checks the first element
        if (!$.data(this, "plugin_" + pluginName)) {
            this.data(
                "plugin_" + pluginName,
                new EqualHeight(this, options)
            );
        }
        return this;
    };

    if (typeof define === "function" && define.amd) {
        define(function () {
            return EqualHeight;
        });
    }

    /**
     * @typedef {object} EqualHeightOptions
     * This object can be overridden during initialization
     * @property {boolean} options.includeOuterHeight: boolean Toggle whether height takes into account the outer height of an element ( content box + padding + border)
     * @property {boolean} options.live Toggle live resizing on window.resize event
     * @property {number} options.resizeDelay Control the amount of time after a resize event that the elements are re-calculated & re-sized.
     * @property {EqualHeightEventCallback|null} options.willSetHeight Fires before the elements will have their height set. Use event.preventDefault() to cancel the set height and perform css('height', '') instead.
     * @property {EqualHeightEventCallback|null} options.didSetHeight Fires after the elements did have their height set.
     */

    /**
     * This callback is used during equal height events
     * @typedef {callback} EqualHeightEventCallback
     * @callback
     * @param {jQuery.Event} event
     */

})(jQuery, window, document);
