const util = require('./util')

function _toMarkdownList(arr) {
  var md = ''

  if (Array.isArray(arr) && arr.length > 0) {
    if (util.isPrimitive(arr[0])) {
      arr.forEach(function(item) { md += '* ' + item + '\n' })
      md += '\n'
    }
  } else if (util.isObject(arr) && Object.keys(arr).length > 0) {
    var keys = Object.keys(arr)
    keys.forEach(function(key) { md += '* **' + key + '**: ' + String(arr[key]) + '\n' })
    md += '\n'
  }

  return md
}

function _toMarkdownTable(arr) {
  var md = ''

  if (Array.isArray(arr) && arr.length > 0) {
    var cols = Object.keys(arr[0])

    md += cols.map(function(col) { return util.capitalizeFirstLetter(col) }).join(' | ')
    md += '\n'
    md += cols.map(function() { return '---' }).join(' | ')
    md += '\n'

    arr.forEach(function(item) {
      var keys = Object.keys(item)
      md += keys.map(function(key) { return String(item[key]) }).join(' | ')
      md += '\n'
    })
  }

  // remove extra line breaks
  md = md.replace(/\n\n/g, '\n')

  return md
}

function _toMarkdown(val) {
  if (util.isLikeList(val))
    return _toMarkdownList(val)

  if (util.isLikeTable(val))
    return _toMarkdownTable(val)

  return String(val)
}

/* exports */

module.exports = {
  toMarkdownList: _toMarkdownList,
  toMarkdownTable: _toMarkdownTable,
  toMarkdown: _toMarkdown
}
