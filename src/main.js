import docs from './docs'
import render from './render'

var main = {
  docs,
  getMarkdown(path, key) {
    var doc = docs.find(function(doc) { return doc.path === path })
    return doc && doc.json_obj[key] ? render.toMarkdown(doc.json_obj[key]) : ''
  }
}

export default main
