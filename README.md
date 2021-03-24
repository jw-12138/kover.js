# kover.js

Use JavaScript to implement CSS `background-size: cover`  
用JavaScript实现CSS`background-size: cover`的效果

## Demo

[https://jw1.dev/kover.js/test/index.html](https://jw1.dev/kover.js/test/index.html)

## Usage 用法

```html
<div class="test-block">
  <img src="test.jpg" alt="" class="test-img">
</div>

<script src="path/to/jquery"></script>
<script src="path/to/kover.js"></script>
<script>
  $(function () {
    $('.test-block').kover()
  })
</script>
```

## Compatibility 兼容性

| Browsers | Version | Supported |
| -------- | ------- | --------- |
| Chrome   | 1.0     | ✅         |
| Firefox  | 3.5     | ✅         |
| Opera    | 10      | ✅         |
| Safari   | 3.1     | ✅         |
| IE       | 7       | ✅         |