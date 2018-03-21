const paths = require('./paths')

var docs = []

paths.forEach(function(path) {
  try {
    docs.push({
      path: path,
      label: path,
      yaml_text: require('raw-loader!../def/' + path + '.yml'),
      json_obj: require('json-loader!yaml-loader!../def/' + path + '.yml'),
      is_valid: true
    })
  }
  catch(e)
  {
    docs.push({
      path: path,
      label: path,
      yaml_text: '',
      json_obj: {},
      is_valid: false
    })
  }
})

module.exports = docs
