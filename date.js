/**
 * Make nice date input elements, using native datepickers if possible, otherwise using 
 * simple JavaScript-extended year-month-day inputs.
 *
 * Requirements:
 *   - Modernizr, with the input types module. This is not a heavy dependency. It is
 *     referenced once in <datePicker.options.useNative>, which can be replaced.
 */
(function(window, document) {
	'use strict';

	var ION = window.ION = window.ION || {},
        propValue = 'value',

		/**
		 * Create nicer date inputs. Uses native date pickers if they are available, otherwise
		 * defaults to a group of year/month/day inputs.
		 *
		 * Parameters:
		 *   inputs - An Array, NodeList or other iterable object containing the inputs to replace
		 *   options - Optional. An object of additional options. See <datePicker.options> for 
		 *     possible values.
		 */
		datePicker = function(rawInputs, options) {
			// Clone the inputs array. It could be not an array (e.g. node list) so make sure to
			// call slice off the array prototype.
			var inputs = [].slice.call(rawInputs, 0),
                // Helper function to make an input. Nothing special
                makeInput = function(type, name, value, onChange) {
                    var input = document.createElement('input');
                    input.type = 'text';
                    input.className = options.className + ' ' + type;
                    input.name = name;
                    input[propValue] = value;

                    options.addEventListener(input, 'change', onChange);
                    return input;
                },


                // Take an input element, make some year/month/day elements, and stick them in the page
                replaceInput = function(input) {

					// If we have browser support, just set the input type to date
					if (useNative) return input.type = 'date';

					// Otherwise, set up some year, month, day inputs and put them in their place
                    var value = input[propValue].match(/^(\d{4})-(\d\d)-(\d\d)$/),
                        onChange = function() {
                            input[propValue] = year[propValue] + '-' + month[propValue] + '-' + day[propValue];
                        },
                        year = makeInput('year', input.name + '__year', value && value[1], onChange),
                        month = makeInput('month', input.name + '__month', value && value[2], onChange),
                        day = makeInput('day', input.name + '__day', value && value[3], onChange);

					// Format the inputs using the format function from the options.
					// The default simply wraps them in a span with '/' between each field
					input.parentNode.insertBefore(options.formatInputs(year, month, day), input);

					input.style.display = 'none';
                },
                input, useNative, x;

			options = options || {};


			// Fill in option defaults;
			for (x in datePicker.options) if (!options[x]) {
				options[x] = datePicker.options[x];
			}

            useNative = options.useNative();

            while (inputs.length) {
				replaceInput(inputs.pop());
			}
		};

	ION.gui = ION.gui || {};
	ION.gui.datePicker = datePicker;

	/**
	 * Default options for <datePicker>.
	 */
	datePicker.options = {
		/**
		 * Test to see if native inputs should be used. By default, this checks
		 * `Modernizr.inputtypes.date`.
		 *
		 * Returns:
		 * True if native date inputs should be used
		 */
		useNative: function() {
			return Modernizr.inputtypes.date;
		},

		className: 'datePicker',

		/**
		 * Format the year, month, and day inputs, suitable for display. By default,
		 * this wraps all the inputs in a <span>, separated by a ' / '. Override this
		 * to format the inputs with your application-specific format.
		 *
		 * Parameters:
		 *   year - The year input
		 *   month - The month input
		 *   day - The day input
		 *
		 * Returns:
		 * An Element/DocumentFragment that will be appended via <Element.insertBefore>
		 * to the parent of the original input, before the original input
		 */
		formatInputs: function(year, month, day) {
			var wrapper = document.createElement('span'),
				createTextNode = function() { return document.createTextNode(' - '); },
				nodes = [day, createTextNode(), month, createTextNode(), year];

			while (nodes.length) {
				wrapper.appendChild(nodes.pop());
			}

			return wrapper;
		},

		/**
		 * Add an event to an element. This can be overridden with a method that is
		 * more appropriate for your framework.
		 *
		 * Example:
		 * (code)
		 * // jQuery
		 * ION.gui.datePicker.options.addEventListener = function(element, event, callback) {
		 *     $(element).on(event, callback);
		 * };
		 * (end)
		 *
		 * Parameters:
		 *   element - The element to register the event on
		 *   event - The event name to register
		 *   callback - The callback that should be run when the event fires
		 */
		addEventListener: function(element, event, callback) {
			var prop = "on" + event, old = element[prop];
		   
			element[prop] = function() {
				// Run the old event listener if we have one
				old && old.apply(this, arguments);
				return callback.apply(this, arguments);
			}
		},
	};

})(window, document);
