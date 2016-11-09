(function($, window){
  'use strict';

  var pluginName = 'points';
  var defaultOptions = {
    mobileBreakpoint: 768,
    slickInitializedClass: 'slick-initialized',
    slide: 'li'
  };

  /** [Object Constructor] **/
  function Plugin(element, options){
    _setup.call(this, element, options);
  }
  
  /*** [Public Methods] **/
  Plugin.prototype = {

  };

  /*** [Private Methods] **/
  
  /**
   * _setup() sets up the attributes and calls any initialisation
   * methods required for the plugin to be setup for each instance of constructor.
   * @param element - The element in question
   * @param options - Any options passed in through the
   * constructor.
   * @private
   */
  function _setup(element, options){
    this._selector = $(element);
    this._options = $.extend(defaultOptions, options);

    _setupPoints.call(this);
    _setEvents.call(this);
  }
  
  /**
   * _setEvents() sets up any events that are required
   * for the plugin.
   * @private
   */
  function _setEvents(){
    var _self = this;
    
    var resizeTimeout;
    
    $(window).resize(function(){
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(_handleResize.call(_self), 500);
    });

  }
  
  /**
   * _handleResize() handles the window resize event. 
   * @private
   */
  function _handleResize(){
    _setupPoints.call(this);
  }
  
  
  /**
   * _setupPoints() sets up the element by checking to
   * see if the screen size is less than the mobile breakpoint
   * and will change into Slick's carousel if the resolution
   * is less than the mobile breakpoint.
   * @private
   */
  function _setupPoints(){
    //determine if is initialized
    if(this._selector.data('plugin_' + pluginName)){
      // destroy the slick
      if(this._selector.hasClass(this._options.slickInitializedClass)){
        this._selector.slick('unslick');
      }
    }

    if($(window).width() < this._options.mobileBreakpoint){
      this._selector.slick({
        slide: this._options.slide,
        dots: true,
        autoPlay: true,
        arrows: false,
        adaptiveHeight: true
      });
    }
  }
  
  /**
   * slickDependencyIsDefined() is a helper method that
   * checks to ensure the Slick has been installed for 
   * use. If it has not been installed script will silently
   * fail.
   * @returns {boolean} - whether or not Slick has been installed
   */
  function slickDependencyIsDefined(){
    return typeof $.fn.slick === 'function';
  }

  // plugin initializer
  $.fn[pluginName] = function(options){
    if(slickDependencyIsDefined()){
      return this.each(function(){
        if(!$.data(this, 'plugin_' + pluginName)){
          $.data(this, 'plugin_' + pluginName, new Plugin(this, options));
        }
      });
    }
  };

})(jQuery, window);