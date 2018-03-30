
/**
 * Check if value is primitive
 */
function _isPrimitive(val) {
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
function _isObject(obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function _isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]'
}

/**
 * Quick check to see if we're trying to render an object or an array of non-objects
 */
function _isLikeList(val) {
  if (Array.isArray(val) && val.length > 0)
    return _isPrimitive(val[0]) ? true : false

  return _isObject(val) && Object.keys(val).length > 0 ? true : false
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function _isLikeTable(val) {
  if (Array.isArray(val) && val.length > 0) {
    var item = val[0]

    if (_isPrimitive(item))
      return false

    return _isObject(item) && Object.keys(item).length > 0 ? true : false
  }

  return false
}

/**
 * Quick easy way to capitalize the first letter of a word
 */
function _capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

/**
 * This function handles arrays and objects
 */
function _eachRecursive(obj, path, callback) {
  if (typeof path != 'string')
    path = ''

  for (var k in obj) {
    if (typeof obj[k] == 'object' && obj[k] !== null)
      _eachRecursive(obj[k], path.length > 0 ? path + '.' + k : k)
       else
      callback(obj[k], path)
  }
}

/* exports */

module.exports = {
  isPrimitive: _isPrimitive,
  isObject: _isObject,
  isPlainObject: _isPlainObject,
  isLikeList: _isLikeList,
  isLikeTable: _isLikeTable,
  capitalizeFirstLetter: _capitalizeFirstLetter,
  eachRecursive: _eachRecursive
}
