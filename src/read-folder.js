const fs = require('fs')
const path = require('path')
const set = require('lodash.set')

function normalizeObjectKey(key) {
  // remove opening slash if it exists
  if (key.charAt(0) == '\\' || key.charAt(0) == '/')
    key = key.substring(1)

  // remove file type
  key = key.substring(0, key.lastIndexOf('.'))

  // replace slashes with periods
  key = key.replace(/\\/g, '.')
  key = key.replace(/\//g, '.')

  return key
}

function readFiles(folder_name, recursive, onFileContent, onError) {
  fs.readdir(folder_name, function(err, filenames) {
    if (err) {
      onError(err)
      return
    }
    filenames.forEach(function(filename) {
      var full_path = path.join(folder_name, filename)
      var stats = fs.lstatSync(full_path)

      if (stats.isDirectory()) {
        if (recursive === true)
          readFiles(full_path, recursive, onFileContent, onError)
      } else {
        fs.readFile(full_path, 'utf-8', function(err, content) {
          if (err) {
            onError(err)
            return
          }
          onFileContent(filename, content, full_path)
        })
      }
    })
  })
}

function readFolder(folder_name, recursive) {
  var data = {}
  readFiles(folder_name, recursive, function(filename, content, full_path) {
    var key = full_path.substring(folder_name.length)
    key = normalizeObjectKey(key)
    set(data, key, content)
  }, function(err) {
    throw err
  })
  return data
}

/* exports */

module.exports = readFolder
