import docs from './docs'

var main = {
  docs,
  getMarkdown(path, key) {
    var doc = docs.find(function(doc) { return doc.path === path })
    return doc && doc.markdown_obj[key] ? doc.markdown_obj[key] : ''
  }
}

export default main
