;((w, $) => {
  $.fn.kover = function () {

    // global function : get natural image size
    let getNatural = function (DOMelement) {
      var img = new Image()
      img.src = DOMelement.src
      return { width: img.width, height: img.height }
    }

    // define each instance
    return this.each(function () {
      let _ = this
      _.init = () => {
        if (!_) {
          throw 'kover.js: A wrap cell is required!'
        }
        if ($('img', $(_)).length > 1) {
          throw 'kover.js: multiple images detected! One cell can contain only one image, same as in CSS.'
        }

        // find the image inside
        _.img = $('img', $(_))

        // define default image ratio
        _.ratio = null

        // resize event
        $(window, $(_)).on('resize', function () {
          _.calcStyle($(_), _.img, _.ratio)
        })

        // 
        var preload = new Image(),
          path = _.img.get(0).src
        preload.src = path + '?' + Math.random()
        preload.onload = function () {

          // whats gonna happen when a image is fully loaded
          _.img_size = getNatural(preload)
          _.ratio = _.img_size.height / _.img_size.width

          // boost calculation for 1s, ie 7 sucks
          let l = 1
          let time = 1000
          let int = 10
          let s = setInterval(() => {
            if (l * int >= time) {
              w.clearInterval(s)
            }

            _.calcStyle($(_), _.img, _.ratio)

            l++
          }, int)
        }
      }

      // calculation function
      _.calcStyle = (wrapcell, img, r) => {

        // normal situration: static css will do the trick
        wrapcell.css({
          position: 'relative'
        })
        img.css({
          position: 'absolute',
          zIndex: '0',
          top: '50%',
          left: '50%',
          width: '100%',
          marginLeft: -(wrapcell.width() / 2) + 'px',
          marginTop: -(img.height() / 2) + 'px',
          height: 'auto'
        })

        // this is where the magic happens, when the image height is lower than the container, we put the image height as same as the container. meanwhile, change the image width accordding to the original image ratio.
        if (img.height() < wrapcell.height()) {
          img.css({
            maxWidth: 'none',
            height: wrapcell.height(),
            width: wrapcell.height() / r + 'px',
            marginTop: -(wrapcell.height() / 2) + 'px',
            marginLeft: -(wrapcell.height() / r / 2) + 'px'
          })
        }
      }
      _.init()
    })
  }
})(window, jQuery)
