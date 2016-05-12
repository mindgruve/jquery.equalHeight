## jQuery Equal Height Plugin

## Version 1.2.1

This is used to set the height of a collection of elements to the height of to the tallest element in the collection.
By default this plugin sets height once during initialization but you can also set it up to resize when the window is resized.

Initialization Options
- @property {boolean} options.includeOuterHeight: boolean Toggle whether height takes into account the outer height of an element ( content box + padding + border)
- @property {boolean} options.live Toggle live resizing on window.resize event
- @property {number} options.resizeDelay Control the amount of time after a resize event that the elements are re-calculated & re-sized.
- @property {EqualHeightEventCallback|null} options.willSetHeight Fires before the elements will have their height set. Use event.preventDefault() to cancel the set height and perform css('height', '') instead.
- @property {EqualHeightEventCallback|null} options.didSetHeight Fires after the elements did have their height set.

CSS:

```css
.columns {
  background: pink;
  float: left;
  margin: 0 1.5%;
  width:30%;
}
```

HTML:

```html
<div class="columns column-1">
	Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas dictum hendrerit mattis. Etiam nunc enim, dapibus sit amet ultricies in, efficitur ac justo. Praesent ac volutpat elit. Integer id ante a nisi iaculis scelerisque. Nunc venenatis, metus at efficitur ornare, magna diam aliquam urna, et venenatis neque metus at mauris. Donec non ante molestie, dapibus orci sed, rutrum nunc. Vestibulum eget nisi id odio condimentum commodo non sed enim. Vestibulum ac aliquam mi. Morbi vestibulum lobortis libero, ac volutpat est placerat vel. Aliquam massa tellus, vestibulum quis est congue, gravida congue mauris. Nam id sapien lectus. Donec vitae nisl sed augue luctus tempus ac quis dolor. Suspendisse nec nisl mauris. Maecenas tempor turpis eget lobortis fermentum. Maecenas in ligula elementum, sodales lorem quis, auctor felis. Cras id convallis diam, eu aliquam nulla.
</div>
<div class="columns column-2">
	Proin eleifend iaculis ipsum et gravida. Mauris faucibus pretium urna a convallis. Donec in mauris vitae mauris pulvinar blandit at ac augue. Quisque ante lacus, facilisis vitae dolor quis, blandit lobortis tellus. Duis ut aliquam risus. Fusce faucibus sed augue sit amet laoreet. Aenean mattis sit amet ligula nec auctor. Nulla auctor nibh libero. Donec sed erat dignissim odio venenatis efficitur non sed mi. Fusce nulla urna, dapibus quis enim et, accumsan ultrices velit. Mauris ac ligula ligula. Nullam efficitur dapibus massa, tristique rutrum libero condimentum quis.
</div>
<div class="columns column-3">
	Integer id pulvinar arcu. Donec suscipit urna a lacus egestas efficitur sit amet ut tellus. Pellentesque rutrum quam id congue pellentesque. Aenean aliquam lectus vel dictum faucibus. Nunc tristique tincidunt orci sit amet euismod. Etiam blandit ex sit amet rutrum finibus. Duis id vehicula eros, eget pharetra tellus.
</div>
```

JS:

```js
$('.columns').equalHeight({
    live: true,
	didSetHeight: function () {
		console.log('a resize happened');
	}
});
```