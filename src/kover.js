;((w, $) => {
  const kover = function (obj) {
    let _ = this
    _.getNatural = function (DOMelement) {
      var img = new Image()
      img.src = DOMelement.src
      return { width: img.width, height: img.height }
    }
    _.init = (fn) => {
      if (!obj) {
        throw 'kover.js: A wrap cell is required!'
      }
      _.wrapCell = $(obj.wrapCell)
      if (_.wrapCell.find('img').length > 1) {
        throw 'kover.js: multiple images detected! One cell can only contain one image, same as in CSS.'
      }

      _.img = _.wrapCell.find('img')
      _.minWidth = obj.minWidth || null
      _.maxWidth = obj.maxWidth || null
      _.ratio = null

      w.onresize = () => {
        _.resized()
      }
      let onload_fn = () => {
        _.img_size = _.getNatural(_.img.get(0))
        _.ratio = _.img_size.height / _.img_size.width
        _.calcStyle()
      }
      w.onload = function () {
        onload_fn()
      }
    }
    _.calcStyle = () => {
      _.wrapCell.css({
        position: 'relative'
      })
      _.img.css({
        position: 'absolute',
        top: '50%',
        zIndex: '0',
        left: '50%',
        width: '100%',
        marginLeft: -(_.wrapCell.width() / 2) + 'px',
        marginTop: -(_.img.height() / 2) + 'px',
        height: 'auto'
      })
      if (_.img.height() < _.wrapCell.height()) {
        _.img.css({
          maxWidth: 'none',
          height: _.wrapCell.height(),
          width: _.wrapCell.height() / _.ratio + 'px',
          marginTop: -(_.wrapCell.height() / 2) + 'px',
          marginLeft: -((_.img_size.width * _.ratio) / 2) + 'px'
        })
      }
    }
    _.resized = () => {
      if (_.minWidth && _.wrapCell.width() <= _.minWidth) {
        _.calcStyle()
        _.img.css({
          maxWidth: 'none',
          width: _.minWidth + 'px',
          left: '0',
          marginTop: -(_.img.height() / 2) + 'px',
          marginLeft: 0
        })
      } else {
        _.calcStyle()
      }
    }

    _.init()
  }
  $.kover = kover
})(window, jQuery)
