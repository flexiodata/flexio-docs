const docs = require('./docs')
const render = require('./render')

const main = {
  docs,
  getMarkdown(path, key) {
    var doc = docs.find(function(doc) { return doc.path === path })
    return doc && doc.json_obj[key] ? render.toMarkdown(doc.json_obj[key]) : ''
  }
}

module.exports = main
