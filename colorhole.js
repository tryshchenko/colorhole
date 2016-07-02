/**
 * Extreamely simple, lightweight and dependency free library which simplifies color manipulation.
 * @author Oleksandr Tryshchenko http://tryshchenko.com
 * MIT licence
 */

var Colorhole = (function(){
	"use strict";

	/**
	 * Colorhole constructor
	 * @param  {String} color HEX code for color (16 or 255 palette)
	 */
	var colorEntity = function(color) {
		if (color == undefined || (color.length !== 7 && color.length !== 4)) {
			color = '#ffffff';
			console.warn('Wrong value passed into Colorhole constructor. Default value selected');
		}
		this.schema = ['red', 'green', 'blue'];
		this.pick(color);
	}

	/**
	 * Encapsuled absolute rounding
	 * @param  {integer} number
	 * @return {integer}
	 */
	var round = function(number) {
		return Math.abs(Math.floor(number));
	}

	/**
	 * All logic hidden into prototype
	 * @type {Object}
	 */
	colorEntity.prototype = {
		/**
		 * Set string into color variable and convert it into RGB
		 * @param  {String} color HEX code for color (16 or 255 palette)
		 * @return {Object}       Return self for chaining
		 */
		pick: function(color) {
			var markerLength = 2;
			var multiplier = 1;

			this.color = color;
			// User can pass value from palette with 16 colors instead of 256
			if (color.length == 4) {
				markerLength = 1;
				multiplier = 16;
			}
			// Parsing hexademical values into decimal ones
			this.red = parseInt(color.substr(1, markerLength), 16);
			this.green = parseInt(color.substr(1 + markerLength, markerLength), 16) * multiplier;
			this.blue = parseInt(color.substr(1 + markerLength * 2, markerLength), 16) * multiplier;

			return this;
		},

		/**
		 * Makes the color darken
		 * @param  {Integer} multiplier Multiplier for calculations
		 * @return {Object}            Return self for chaining
		 */
		darken: function(multiplier) {
			multiplier = multiplier || 2;
			this.schema.forEach(function(chanel){
				this[chanel] = round(this[chanel] / multiplier);
			}.bind(this));
			this.toString();

			return this;
		},

		/**
		 * Makes the color lighter
		 * @param  {Integer} multiplier Multiplier for calculations
		 * @return {Object}            Return self for chaining
		 */
		lighter: function(multiplier) {
			multiplier = multiplier || 2;
			this.schema.forEach(function(chanel){
				var difference = ((255 - this[chanel]) / multiplier) * (multiplier - 1);
				var result = round(this[chanel] + difference);
				this[chanel] = result;
			}.bind(this));
			this.toString();

			return this;
		},

		/**
		 * Inverse colors
		 * @return {Object} Return self for chaining
		 */
		inverse: function() {
			this.schema.forEach(function(chanel){
				this[chanel] = round(255 - this[chanel]);
			}.bind(this));
			this.toString();

			return this;
		},

		/**
		 * Make gray color by medium options
		 * @return {Object} Return self for chaining
		 */
		grayscale: function() {
			var values = [];
			var result = 0;
			var total = 0;

			this.schema.forEach(function(chanel){
				values.push(this[chanel]);
			}.bind(this));

			total = values.reduce(function(a,b){
				return a + b;
			}, 0);

			result = round(total / this.schema.length);
			this.schema.forEach(function(chanel){
				this[chanel] = result;
			}.bind(this));
			this.toString();

			return this;
		},

		/**
		 * Get the closer extreme value
		 * @return {Object} Return self for chaining
		 */
		closerExtreme: function() {
			var primary = 255;
			var result = 0;
			var total = 0;

			this.schema.forEach(function(chanel){
				total += this[chanel];
			}.bind(this));

			result = total / this.schema.length;

			if (result > 150) {
				primary = 0;
			}

			this.schema.forEach(function(chanel){
				this[chanel] = primary;
			}.bind(this));
			this.toString();

			return this;
		},

		/**
		 * Makes HEX color from RGB integers. I know it's replaces the native toString method. 
		 * It's not a bug it's a feature.
		 * User can call toString like it's the native data type and receive an expected result.
		 */
		toString: function() {
			this.schema.forEach(function(chanel){
				this[chanel] = this.makeHexademical(this[chanel]);
			}.bind(this));
			this.color = '#' + this.red + this.green + this.blue;
		},

		/**
		 * Makes RGBA color from RGB integers and opacity
		 * @param  {Integer} opacity Opacity between 0 and 1
		 * @return {String}         RGBA string
		 */
		toRGBA: function(opacity) {
			opacity = opacity || 1;
			var result = 'rgba(';
			this.schema.forEach(function(chanel){
				result += this[chanel] + ', ';
			}.bind(this));
			result += opacity + ')';

			return result;
		},

		/**
		 * Makes HEX number from decimal
		 * @param  {Integer} digit Decimal value
		 * @return {String}       Hexademical value
		 */
		makeHexademical: function(digit) {
			var hex = digit.toString(16);
			if (hex.length == 1) {
				hex = '0' + '' + hex;
			}

			return hex;
		}
	}

	/**
	 * Allows use Colorhole as CommonJS module
	 * @param  {[type]} typeof module        [description]
	 * @return {[type]}        [description]
	 */
	if (typeof module == 'object' && module.exports) {
		module.exports = colorEntity;
	}

	return colorEntity;
})();