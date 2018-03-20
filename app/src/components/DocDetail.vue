<template>
  <div class="flex flex-column">
    <div class="flex-fill flex flex-row">
      <div class="flex-fill">
        <textarea ref="textarea-yaml"></textarea>
      </div>
      <div class="flex-fill" v-show="showJson">
        <textarea ref="textarea-json"></textarea>
      </div>
    </div>
    <div class="flex-fill bt b--black-20 pa2 overflow-auto css-preview" v-html="preview_markup" v-show="showPreview"></div>
  </div>
</template>

<script>
  import yaml from 'js-yaml'
  import marked from 'marked'
  import CodeMirror from 'codemirror'
  import render from '../../../render'

  require('codemirror/mode/yaml/yaml.js')
  require('codemirror/mode/javascript/javascript.js')

  export default {
    props: {
      'active-doc': {
        type: Object,
        default: () => { return {} }
      },
      'show-json': {
        type: Boolean,
        default: true
      },
      'show-preview': {
        type: Boolean,
        default: true
      }
    },
    watch: {
      activeDoc: {
        handler: 'readYaml',
        immediate: true
      },
      yaml_text() {
        this.editor_json.setValue(this.json_text)
      }
    },
    data() {
      return {
        error_msg: '',
        yaml_orig: '',
        yaml_text: '',
        editor_json: null,
        editor_yaml: null
      }
    },
    mounted() {
      this.editor_yaml = CodeMirror.fromTextArea(this.$refs['textarea-yaml'], {
        lineNumbers: true,
        mode: 'text/x-yaml'
      })

      this.editor_yaml.on('change', (cm) => {
        this.yaml_text = cm.getValue()
      })

      this.editor_json = CodeMirror.fromTextArea(this.$refs['textarea-json'], {
        lineNumbers: true,
        mode: 'application/json',
        readOnly: true
      })
    },
    computed: {
      has_error() {
        return this.error_msg.length > 0
      },
      json_obj() {
        try {
          return yaml.load(this.yaml_text)
        }
        catch(e) {
          return e
        }
      },
      json_text() {
        try {
          return JSON.stringify(this.json_obj, null, 2)
        }
        catch(e) {
          return JSON.stringify(e, null, 2)
        }
      },
      preview_markup() {
        var markup = ''

        for (var key in this.json_obj) {
          if (this.json_obj.hasOwnProperty(key)) {
            var val = this.json_obj[key]

            markup += '<h6 class="pa1 bg-near-white ttu silver css-key">' + key + '</h6>'
            markup += marked(render.toMarkdown(val))
            markup += '\n\n'
          }
        }

        return markup
      }
    },
    methods: {
      readYaml() {
        this.$nextTick(() => {
          this.error_msg = ''

          try {
            this.error_msg = ''
            this.yaml_orig = this.activeDoc.yaml_text
            this.yaml_text = this.activeDoc.yaml_text
          }
          catch(e) {
            this.error_msg = e.message
            this.yaml_orig = 'error: ' + e.message
            this.yaml_text = 'error: ' + e.message
          }

          this.editor_yaml.setValue(this.yaml_text)
        })
      }
    }
  }
</script>

<style>
  .CodeMirror {
    width: 100%;
    height: 100%;
  }

  h6.css-key:first-child {
    margin-top: 0;
  }

  h6.css-key {
    /*
    border-bottom: 1px solid #eee;
    padding-bottom: 3px;
    */
    margin: 3em 0 0;
  }

  /* marked */

  .css-preview {
    & h1,
    & h2,
    & h3,
    & h4,
    & h5,
    & h6 {
      line-height: initial;
    }

    & h1,
    & h2,
    & h3,
    & h4,
    & strong {
      font-weight: 600;
      color: #222;
    }

    & h1 {
      margin: 0 0 1em;
    }

    & h2 {
      margin: 45px 0 0.8em;
      padding-bottom: 4px;
      border-bottom: 1px solid #ddd;
    }

    & h3 {
      margin: 52px 0 1.2em;
    }

    & h5 {
      font-size: 0.875em;
    }

    & h6 {
      font-size: 0.75em;
    }

    & code,
    & pre {
      font-family: "Roboto Mono", Monaco, courier, monospace;
      font-size: 0.8em;
      background-color: #f8f8f8;
      -webkit-font-smoothing: initial;
      -moz-osx-font-smoothing: initial;
    }

    & code {
      color: #e96900;
      padding: 3px 5px;
      margin: 0 2px;
      border-radius: 2px;
      white-space: nowrap;
    }

    & pre code {
      color: #525252;
      font-size: 12px;
      line-height: 18px;
    }

    & p,
    & ul,
    & ol {
      line-height: 1.7em;
    }

    & p {
      word-spacing: 0.05em;
    }

    & address {
      font-style: normal;
    }

    & input,
    & textarea,
    & keygen,
    & select,
    & button {
      font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    }

    & input,
    & button,
    & submit {
      border: none;
      outline: none;
      padding: 0;
    }

    & pre code {
      color: #525252;
      font-size: 12px;
      line-height: 18px;
    }

    & table {
      border-spacing: 0;
      border-collapse: collapse;
      margin: 1.2em auto;
      padding: 0;
      display: block;
      overflow-x: auto;
    }

    & table td,
    & table th {
      line-height: 1.5em;
      padding: 0.4em 0.8em;
      border: none;
      border: 1px solid #ddd;
    }

    & table th {
      font-weight: bold;
      text-align: left;
    }

    & table th,
    & table tr:nth-child(2n) {
      background-color: #f8f8f8;
    }

    & table th code,
    & table tr:nth-child(2n) code {
      background-color: #efefef;
    }
  }

</style>
