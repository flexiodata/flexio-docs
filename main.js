/**
 * Check if value is primitive
 */
function isPrimitive(val) {
  return (
    typeof val === 'string' ||
    typeof val === 'number' ||
    typeof val === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject(obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]'
}

/**
 * Quick check to see if we're trying to render an object or an array of non-objects
 */
function isLikeList(val) {
  if (Array.isArray(val) && val.length > 0)
    return isPrimitive(val[0]) ? true : false

  return isObject(val) && Object.keys(val).length > 0 ? true : false
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isLikeTable(val) {
  if (Array.isArray(val) && val.length > 0) {
    var item = val[0]

    if (isPrimitive(item))
      return false

    return isObject(item) && Object.keys(item).length > 0 ? true : false
  }

  return false
}

/* -- local functions -- */

const _renderList = function(arr) {
  var md = ''

  if (Array.isArray(arr) && arr.length > 0) {
    if (isPrimitive(arr[0])) {
      arr.forEach(function(item) { md += '* ' + item + '\n' })
      md += '\n'
    }
  } else if (isObject(arr) && Object.keys(arr).length > 0) {
    var keys = Object.keys(arr)
    keys.forEach(function(key) { md += '* **' + key + '**: ' + String(arr[key]) + '\n' })
    md += '\n'
  }

  return md
}

const _renderTable = function(arr) {
  var md = ''

  if (Array.isArray(arr) && arr.length > 0) {
    var cols = Object.keys(arr[0])

    md += cols.join(' | ')
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

const _render = function(val) {
  if (isLikeList(val))
    return _renderList(val)

  if (isLikeTable(val))
    return _renderTable(val)

  return String(val)
}

export const renderList = _renderList
export const renderTable = _renderTable
export const render = _render

export default {
  renderList: _renderList,
  renderTable: _renderTable,
  render: _render
}
