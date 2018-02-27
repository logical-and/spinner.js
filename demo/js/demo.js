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


//------------------------------------------------------------------------------
// DOCUMENT READY
//------------------------------------------------------------------------------

$(document).ready(function() {

  // Generate all of the examples.
  generateExamples();

  // Initialize the functionality of the examples.
  initFunctionality();

});


//------------------------------------------------------------------------------
// FUNCTIONS
//------------------------------------------------------------------------------

/**
 * Updates the value display of an input.
 *
 * @param  {input}  input  The DOM input element to update
 */
function updateValueDisp(input) {
  // Generate value span
  var valueSpan = $('<span>', {
    text:  $(input).val(),  // Value of the input
    class: 'value'
  });

  // Generate the full label, e.g. "bars: 5"
  var label = $(input).attr('prop') + ': ' + valueSpan.outerHTML();

  // Set the input's <label> element to the value
  $(input).parent().parent().find('label').html(label);
}

/**
 * Converts an array of inputs with property attributes that can be passed
 * to spinner.js
 *
 * @param   {Array}   inputs  The array of inputs
 * @return  {Object}          spinner.js properties object
 */
function inpToProp(inputs) {
  var props = { };  // Hold all properties

  // Each input...
  for (var i = 0; i < inputs.length; i++) {
    var input = $(inputs[i]);
    var units = input.attr('units') || '';  // Units (px, rem, etc)

    //        prop name          prop value
    props[input.attr('prop')] = input.val() + units;
  }

  return props;
}

/**
 * Gets the outer HTML of a jQuery element.
 *
 * @return  {String}  The outer HTML of the element as a string.
 */
jQuery.fn.outerHTML = function() {
  return jQuery('<div />').append(this.eq(0).clone()).html();
};

/**
 * Generates the example DOM elements from the examples.js JSON data.
 */
function generateExamples() {

  // For each example...
  $(examples).each(function(e) {
    // Get the outer container, and the current example
    var container = $('div.container.main');
    var example   = $(this)[0];

    // Build a card in the container from the example
    var card = buildExampleCard(example);
    container.append(card);
  });

}

/**
 * Builds a Bootstrap 4 card based around an example
 *
 * @param   {Object}  example  The example JSON object
 * @return  {Object}           DOM element representing the card
 */
function buildExampleCard(example) {
  // Build some DOM elements...
  var card = $('<div>', {
    class: 'card example',
    anim:   example.name
  });
  var cardImgTop = $('<div>', {
    class: 'card-img-top anim'
  });
  var cardBlock = $('<div>', {
    class: 'card-block bg-faded'
  });
  var cardTitleDiv = $('<div>', {
    class: 'card-title',
  });
  var cardTitle = $('<h4>', {
    text: example.name
  });
  var cardText = $('<div>', {
    class: 'card-text row'
  });
  var codeBtn = $('<button>', {
    class: 'btn btn-sm btn-default pull-xs-right get-code',
    anim:   example.name,
    html:  '<i class="fa fa-code"></i> code'
  });

  // Build the input grid (for the plugin parameters)
  var inputs = buildInputs(example);

  // Append elements to each other...
  card.append(cardImgTop);
  card.append(cardBlock);
  cardTitleDiv.append(codeBtn);
  cardTitleDiv.append(cardTitle);
  cardBlock.append(cardTitleDiv);
  cardBlock.append(cardText);
  cardText.append(inputs);

  // Return the card
  return card;
}

/**
 * Builds out the inputs for an example
 *
 * @param   {Object}  example  The example JSON object
 * @return  {Array}            DOM element holding all of the inputs
 */
function buildInputs(example) {
  // Get the inputs from the object, and create an array of form groups
  var inputs     = example.inputs;
  var formGroups = [];

  // Do for each input...
  for (var i = 0; i < inputs.length; i++) {
    // Generate some DOM elements
    var formGroup = $('<div>', {
      class: 'form-group col-sm-4 col-md-3'
    });
    var label = $('<label>', {
      class: 'col-sm-12 form-control-label',
      text:  inputs[i].name  // Label for the input (plugin property name)
    });
    var div = $('<div>', {
      class: 'col-sm-12'
    });

    // Generate the input
    var input = $('<input>', {
      class: 'form-control',
      type:   inputs[i].type || 'range',  // Default should be range
      min:    inputs[i].min,
      max:    inputs[i].max,
      step:   inputs[i].step,
    });

    // Set the default value and property name property
    input.val(inputs[i].default);
    input.attr('prop', inputs[i].prop);

    // Check if units were specified?
    if (inputs[i].units) {
      // They were, so add that property with the units
      input.attr('units', inputs[i].units);
    }

    // Append elements to each other
    formGroup.append(label);
    formGroup.append(div);
    div.append(input);

    // Add to the form group array
    formGroups.push(formGroup);
  }

  // Return the form Groups
  return formGroups;
}

/**
 * Initializes the functionality of the example cards. Basically, this adds
 * jQuery events to each of the components so that they regenerate the spinner
 * plugin when the input sliders are modified.
 */
function initFunctionality() {
  // Add functionality to each example, e.g. wave, domino, etc...
  $('.example').each(function(e) {
    var example  = $(this);                // Example container
    var animName = example.attr('anim');   // Animation name
    var animCont = example.find('.anim');  // Animation container

    // Each input in the example
    example.find('input').on('input', function() {
      var prop   = $(this).attr('prop');  // Property name
      var inputs = $(this).parent()
                          .parent()
                          .parent()
                          .find('input');  // Inputs for property

      // Get all properties as an object (to pass into spinner.js)
      allProp = inpToProp(inputs);

      // Generate the spinner with the properties
      animCont.spinner(animName, allProp);

      // Update the value display
      updateValueDisp($(this));
    });

    // Trigger event on first input.
    example.find('input').eq(0).trigger('input');
  });

  // Update value displays
  $('.example input').each(function() {
    updateValueDisp($(this));
  });

  // Shows a modal with the jQuery code for the selected options
  $('.get-code').click(function() {
    // Get animation name
    var anim = $(this).attr('anim');

    // Format the code (add line breaks mostly)
    var formatted = JSON.stringify(allProp)
                        .replace(/{/g, '{\r\n    ')  // Spaces are here for the
                        .replace(/,/g, ',\r\n    ')  //   code indentation
                        .replace(/}/g, '\r\n}')
                        .replace(/":"/g, '": "');
    formatted = '$("body").spinner("' + anim + '", ' + formatted + ');'
    formatted = formatted.replace(/"/g, '\'');

    // Show the dialog
    var modal = bootbox.dialog({
      message: '<pre class="prettyprint linenums prpr-mod" style="display:none"><code class="language-javascript">'
                  + formatted
                  + '</code></pre>',
      title: anim,
      buttons: {
        op: {
          label: "Done",
          className: "btn-primary"
        }
      }
    });

    $(modal).on('shown.bs.modal', function() {
      PR.prettyPrint();
      $('.prpr-mod').slideDown();
    })

  });

}


