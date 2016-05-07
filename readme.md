# Colorhole
Colorhole is an pretty simple, lightweight, dependency-free library which allows you to manage color like it can be done for any other default data type.
Library allows work with HEX colors (16 and 256 colors as well) but data can be easily exported as HEX and RGBA.
You can try it http://tryshchenko.com/examples/colorhole
Library can:
  * Make a color lighter
  * Make a color darken
  * Inverse color
  * Discolor
  * Export values as RGBa and set opacity
  * Allows chaining
  * Works as commonjs module as well
  * Written in ES5, so is compatible with all modern (and not much modern) browsers. 

It's safe. You can pass anything into the constructor, in the case of unexpected value - library will throw warning message into the console and keep white color as default - your application still be working.

# Usage
### Common
To initiate Colorhole - just use Colorhole constructor: 
```javascript
// Initiate
var myColor = new Colorhole('#FF19AC');
// Get channels
myColor.red // 0 - 255
myColor.green // 0 - 255
myColor.blue // 0 - 255
// Build it back into the HEX
myColor.toString();
```
### Make a color darken
You can easily make color darken: just call .darken() method.
```javascript
var myColor = new Colorhole('#0FC311').darken(3); // Makes color darken 3 times
console.log(myColor.toString()) // #054105
```
You can call .darken() or .lighten() methods without an argument - Colorhole will use default value (2);
```javascript
var myColor = new Colorhole('#0FC311').darken();
```
### Make a color lighter
Work in the same way like .darken() method
```javascript
var myColor = new Colorhole('#0FC311').lighter(3);
```

### Inverse the color
Arguments not required for inverse method
```javascript
var myColor = new Colorhole('#0FC311').inverse();
```

### Discolor
Makes gray based on saturation common lightness
Arguments not required for inverse method
```javascript
var myColor = new Colorhole('#0FC311').grayscale();
```
### Make RGBA
Work in the same way like .toString() method but returns RGBA value.
Can take opacity as argument, otherwise uses '1' as default value
```javascript
var myColor = new Colorhole('#0FC311').toRGBA(0.5); // 	rgba(15, 195, 17, 0.5)
var myColor = new Colorhole('#0FC311').toRGBA(); // 	rgba(15, 195, 17, 1)
```
### Re-pick color
Probably you want to change color after few manipulation. You can do it without using another constructor, just use the .pick() method.
```javascript
var myColor = new Colorhole('#0FC311');
var firstColorRGBA = myColor.toRGBA(0.3);
var secondColor = myColor.pick('#FFAAFF').darken(2).toString();
```
Licenced under MIT licence