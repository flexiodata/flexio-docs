import paths from './paths'

var docs = []

paths.forEach(function(path) {
  try {
    docs.push({
      label: path,
      yaml_text: require('raw-loader!../def/' + path + '.yml'),
      json_obj: require('json-loader!yaml-loader!../def/' + path + '.yml'),
      is_valid: true
    })
  }
  catch(e)
  {
    docs.push({
      label: path,
      yaml_text: '',
      json_obj: {},
      is_valid: false
    })
  }
})

export default docs
