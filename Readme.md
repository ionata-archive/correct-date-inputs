Correct date inputs
===================

The new HTML 5 date input is theoretically awesome. Unfortunately, Opera and iOS Safari are the only
browsers to support it properly. The date picker implementation in Chrome and Safari is currently
terrible, and nothing else even attempts to support it. The jQuery date picker is bad for picking
dates of birth (the year selector is not helpful), and other date picker widgets are almost as bad.

Typing a date is a simple process, but enforcing correct format is not. Placing three inputs for
each of the day, month and year components is very easy to use, but annoying to validate on the
server. It is just a mine field!

This small (~1kB minified) JavaScript library attempts to help here, by hiding all of the mess for
you. By intelligently converting text input date fields into the best available form of input, your
users get the best experience possible, while still making your life server side simple.

How it works
============

On browsers that support date pickers well, this script will change inputs to the `date` type. The
rest is done by the browser. Dates are submitted in the` yyyy-mm-dd` format as specified in the
HTML5 spec.

On browsers that do not have good date picker support, this script will replace inputs with
`year-month-day` style inputs. These will be combined by JavaScript in to the `yyyy-mm-dd` format,
the same as the real date pickers. The layout and formatting of the inputs can be configured, if you
want to localize the layout (e.g. `dd/mm/yyyy`). This is often preferable to clunky date picker
forms, as people can type out dates very quickly.

On browsers with no JavaScript, nothing is done. The original text input will be left untouched. For
these cases, a format hint of "Enter dates as yyyy-mm-dd" is encouraged.

Every one of the three cases results in a date formatted as "yyyy-mm-dd" being sent to the server in
a single field. This makes your life simple, at the same time as making the users life as simple as
possible.

Of course, it is possible for users to enter dates in an incorrect format, so you should use caution
when validating the dates server-side. If possible, try to parse the date even if it does not
conform to the expected format. How far you go with this is up to you.

Example
=======

```html
<div class="input date">
	<label for="date_of_birth">Date of birth</label>
	<input type="text" value="1989-10-16" name="date_of_birth" id="date_of_birth" />
	<p class="hint">Format: yyyy-mm-dd</p>
</div>

<script>
	ION.gui.datePicker(document.querySelectorAll(".input.date input"));
</script>
```

See `date.html` for more examples.

See `date.js` for more options.
