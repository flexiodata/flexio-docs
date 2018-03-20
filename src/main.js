import docs from './docs'

var app = {
  docs: docs,
  getMarkdown(path, key) {
    var doc = docs.find(function(doc) { return doc.label === path })
    return doc && doc.json_obj[key] ? doc.json_obj[key] : ''
  }
}

export default app
