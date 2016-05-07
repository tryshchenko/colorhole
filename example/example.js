(function(){
	var exampleColor = '#0FC382';
	
	var darkenOptionless = function(color) {
		var result = new Colorhole(color).darken().color;
		document.querySelector('#example-darken-optionless').style.backgroundColor = result;
		document.querySelector('#result-darken-optionless').innerHTML = result;
	}

	var darkenOption = function(color) {
		var result = new Colorhole(color).darken(3).color;
		document.querySelector('#example-darken-option').style.backgroundColor = result;
		document.querySelector('#result-darken-option').innerHTML = result;
	}

	var lighterOptionless = function(color) {
		var result = new Colorhole(color).lighter().color;
		document.querySelector('#example-lighter-optionless').style.backgroundColor = result;
		document.querySelector('#result-lighter-optionless').innerHTML = result;
	}

	var lighterOption = function(color) {
		var result = new Colorhole(color).lighter(3).color;
		document.querySelector('#example-lighter-option').style.backgroundColor = result;
		document.querySelector('#result-lighter-option').innerHTML = result;
	}

	var inverseOptionless = function(color) {
		var result = new Colorhole(color).inverse().color;
		document.querySelector('#example-inverse-optionless').style.backgroundColor = result;
		document.querySelector('#result-inverse-optionless').innerHTML = result;
	}

	var grayscaleOptionless = function(color) {
		var result = new Colorhole(color).grayscale().color;
		document.querySelector('#example-grayscale-optionless').style.backgroundColor = result;
		document.querySelector('#result-grayscale-optionless').innerHTML = result;
	}

	var toRGBA = function(color) {
		var result = new Colorhole(color).toRGBA(0.5);
		document.querySelector('#result-rgba-option').innerHTML = result;
		document.querySelector('#example-rgba-option').style.backgroundColor = result;
	}

	var toRGBAOptionless = function(color) {
		var result = new Colorhole(color).toRGBA();
		document.querySelector('#result-rgba-optionless').innerHTML = result;
		document.querySelector('#example-rgba-optionless').style.backgroundColor = result;
	}

	var runExamples = function(color) {
		var style = document.querySelector('#color-selector').style;
		style.backgroundColor = color;

		// Call all example.
		// It's more readable than one large function.
		darkenOptionless(color);
		darkenOption(color);
		lighterOptionless(color);
		lighterOption(color);
		inverseOptionless(color);
		grayscaleOptionless(color);
		toRGBA(color);
		toRGBAOptionless(color);
	}

	var onColorChange = function(event) {
		var color = event.target.value;
		runExamples(color)		
	}

	window.onload = function() {
		document.querySelector('#color-selector').addEventListener('change', onColorChange);
		document.querySelector('#color-selector').value = exampleColor;
		runExamples(exampleColor);
	}
})();