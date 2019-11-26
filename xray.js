var Xray = require('x-ray')
var x = Xray({
  filters: {
    trim: function(value) {
      return typeof value === 'string' ? value.trim() : value
    },
    reverse: function(value) {
      return typeof value === 'string'
        ? value
            .split('')
            .reverse()
            .join('')
        : value
    },
    slice: function(value, start, end) {
      return typeof value === 'string' ? value.slice(start, end) : value
    }
  }
})

x('http://mat.io', {
  title: 'title | trim | reverse | slice:2,3'
})(function(err, obj) {
  /*
  {
    title: 'oi'
  }
*/
})