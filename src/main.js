const fs = require('fs')
const path = require('path')
const yaml = require('js-yaml')

const docs = require('./docs')
const render = require('./render')

const main = {
  docs: docs,
  getMarkdown: function(relative_path, key) {
    try {
      var full_path = path.resolve(__dirname, '../def/' + relative_path + '.yml')
      var doc = yaml.safeLoad(fs.readFileSync(full_path, 'utf8'))
      return doc && doc[key] ? render.toMarkdown(doc[key]) : ''
    }
    catch(e)
    {
      return e
    }
  }
}

module.exports = main
