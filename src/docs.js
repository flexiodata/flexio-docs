import paths from './paths'
import { toMarkdown } from './render'

var docs = []

paths.forEach(function(path) {
  var json_obj = require('json-loader!yaml-loader!../def/' + path + '.yml')
  var markdown_obj = {}

  for (var key in json_obj) {
    if (json_obj.hasOwnProperty(key)) {
      markdown_obj[key] = render.toMarkdown(json_obj[key])
    }
  }

  try {
    docs.push({
      path: path,
      label: path,
      yaml_text: require('raw-loader!../def/' + path + '.yml'),
      markdown_obj: markdown_obj,
      is_valid: true
    })
  }
  catch(e)
  {
    docs.push({
      path: path,
      label: path,
      yaml_text: '',
      markdown_obj: {},
      is_valid: false
    })
  }
})

export default docs
