import docs from './docs'

var app = {
  docs: docs,
  getMarkdown(path, key) {
    var doc = docs.find(function(doc) { return doc.label === path })
    return doc && doc[key] ? doc[key] : ''
  }
}

export default app
