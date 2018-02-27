# spinner.js
spinner.js is a jQuery plugin that allows you to easily generate highly customizable loading animations.

## Demo
https://marando.github.io/spinner.js

## Installation

#### With Bower
```shell
$ bower install marando/spinner.js --save
```

#### Manual Installation
Just download `spinner.min.js` from the `dist` folder and place it within your project's directory, that's it!


## Configuration
Include both `jquery` and `spinner.min.js` in script tags:
```html
<script src="https://code.jquery.com/jquery-2.2.1.min.js"></script>
<script src="spinner.min.js"></script>
```

Then call spinner.js and pass it an animation type. (Currently there are two animation types, `wave` and `domino`).
```javascript
<script type="text/javascript">
    $(document).ready(function() {
        $('body').spinner('wave');
        $('body').spinner('domino');
    });
</script>   
```

You can also pass the plugin parameters:
```javascript
<script type="text/javascript">
  $('body').spinner('wave', {
      'bars': '7',
      'height': '24px',
      'width': '15px',
      'spacing': '1px',
      'speed': '92',
      'opacity': '1',
      'color': '#383b3d'
  });
</script>   
```



## Development

Install the node dependencies:
```shell
$ npm install
```

Then make sure that gulp is installed globally:
```shell
$ npm install -g
```

To build the project:
```shell
$ gulp build
```

Watch files with BrowserSync:
```shell
$ gulp watch
```


