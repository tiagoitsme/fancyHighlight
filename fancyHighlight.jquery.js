/*!
 * fancyHighlight v0.1
 * @author Tiago Silva
 * @web blog.tiagoits.me
 *
 * Copyright (c) 2014
 * Available under the MIT license
 */

 /*
 * fancyHighlight let's you highlight individual letters as you type
 * All you need to do is grab text from input and point the target
 * 
 * Example:
 * $("#input").fancyHighlight({ target: $("#content") });
 */

;(function ( $, window, document, undefined ) {
    
    var pluginName = 'fancyHighlight',
        defaults = {
            color: "#e92e44",
            background: null,
            target: null
        };

    function Plugin( element, options ) {
        this.element = element;
        this.options = $.extend( {}, defaults, options) ;
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }

    Plugin.prototype.init = function () {

    	var style = '<style>strong.fancyHighlight{';

    	style += 'color: ' + this.options.color;
    	this.options.background ? style += 'background: ' + this.options.background : null;
    	style += '}</style>';

    	$('body').append(style);

    	var __highlight = function(s, t) {
  			
  			var matcher = new RegExp("(" + t + ")", "ig" );
  			return s.replace(matcher, "<strong class=\"fancyHighlight\">$1</strong>");

		},
		$this = this,
		cache = $this.options.target.html();

		$($this.element).on("keyup", function(event){

			$this.options.target.html(__highlight(cache, $(this).val()));

		});
        
    };

    $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName, 
                new Plugin( this, options ));
            }
        });
    }

})( jQuery, window, document );