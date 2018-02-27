///
///  spinner.js
///
///  https://github.com/marando/zoomable.js/
///
///
///  Copyright (c) Ashley Marando
///  Released under the GNU2 license
///
///


(function ($) {

  /**
   * Main plugin entry point
   *
   * @param   {String}  style    The name of the spinner to generate
   * @param   {Object}  options  The parameters defining the spinner
   * @return  {[type]}           [description]
   */
  jQuery.fn.spinner = function (style, options) {
    // Clear any existing spinners
    $(this).html('');

    // Run the wave animation
    if (style == 'wave') {
      options = $.extend({}, defaults.wave, options);
      return bars($(this), options, 'Y');
    }

    // Run the domino animation
    if (style == 'domino') {
      options = $.extend({}, defaults.domino, options);
      return bars($(this), options, 'X');
    }
  }

  /**
   * Generates a bar based spinner
   * @param  {??????} container The dom element to append the spinner to
   * @param  {Object} options   Options pertaining to the spinner
   * @param  {[type]} axis      [description]
   * @return {[type]}           [description]
   */
  bars = function(container, options, axis) {

    // Generate a random ID for the spinner
    var id = String(Math.random()).replace('.', '');

    // Generate an outer class to hold the spinner elements
    var spinner = $('<div/>', {
      class: 'spinner-bars'
    }).css({
      paddingTop: '0px',
      fontSize: '0px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      maxWidth: '100%'
    });

    // Generate option.bars number of bars
    for (var i = 0; i < options.bars; i++) {

      // Convert speed to BPM
      var speed  = 60 / options.speed;

      // Calculate the animation delay factor and animation delay
      var factor    = options.bars * 2;
      var animDelay = -speed + (speed/factor) * i;

      // Generate the bar div
      var bar = $('<div/>', {
        class: 'spinner-bar spinner-bar-' + i
      }).css({
        width:           options.width,
        height:          options.height,
        display:        'inline-block',
        margin:          options.spacing,
        backgroundColor: options.color,
        opacity:         options.opacity,
        animation:      'bar-' + id + ' ' + speed + 's infinite ease-in-out',
        animationDelay:  animDelay + 's'
      });

      // Append the bar to the spinner container
      spinner.append(bar);
    }

    // This is the axis to transform
    var L = axis;

    // Generate the animation keyframes
    var keyframes = $('<style/>', {
      text: '@keyframes bar-' + id + ' {0%, 40%, 100% {transform: scale' + L
               + '(0.33);-webkit-transform: scale' + L
               + '(0.33);}20% {transform: scale' + L
               + '(1.0);-webkit-transform: scale' + L + '(1.0);}}'
    });

    // Add the keyframes to the spinner and the spinner to the container
    spinner.append(keyframes);
    container.append(spinner);

    return spinner;
  }

  /**
   * Default options for each type of spinner
   * @type {Object}
   */
  defaults = {
    wave: {
      width: '12px',
      height: '70px',
      axis: 'y',
      spacing: '1px',
      color: '#888',
      opacity: 1,
      bars: 5,
      speed: 1.5,
    },
    domino: {
      width: '1rem',
      height: '1.5rem',
      axis: 'x',
      spacing: '1px',
      color: '#888',
      opacity: 1,
      bars: 7,
      speed: 0.75,
    }
  };

})(jQuery);



