const paths = require('./paths')

var docs = []

paths.forEach(function(path) {
  try {
    docs.push({
      label: path,
      yaml_text: require('raw-loader!../def/' + path + '.yml'),
      is_valid: true
    })
  }
  catch(e)
  {
    docs.push({
      label: path,
      yaml_text: '',
      is_valid: false
    })
  }
})

module.exports = docs
