<template>
  <div class="flex flex-column">
    <div class="flex-fill flex flex-row">
      <div class="flex-fill">
        <textarea ref="textarea-yaml"></textarea>
      </div>
      <div class="flex-fill">
        <textarea ref="textarea-json"></textarea>
      </div>
    </div>
    <div class="flex-fill bt b--black-20" v-html="preview_markup"></div>
  </div>
</template>

<script>
  import yaml from 'js-yaml'
  import axios from 'axios'
  import marked from 'marked'
  import CodeMirror from 'codemirror'

  require('codemirror/mode/yaml/yaml.js')
  require('codemirror/mode/javascript/javascript.js')

  export default {
    props: {
      'full-path': {
        type: String,
        default: ''
      }
    },
    watch: {
      fullPath: {
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
        return yaml.load(this.yaml_text)
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
            if (typeof val == 'string')
              markup += val + '\n\n'
          }
        }

        return marked(markup)
      }
    },
    methods: {
      readYaml() {
        this.error_msg = ''

        try {
          axios.get(this.fullPath)
            .then(response => {
              this.error_msg = ''
              this.yaml_text = response.data
              this.editor_yaml.setValue(this.yaml_text)
            })
            .catch(response => {
              this.error_msg = response.message
              this.yaml_text = 'error: ' + response.message
              this.editor_yaml.setValue(this.yaml_text)
            })
        }
        catch(e) {
          this.error_msg = e.message
          this.yaml_text = 'error: ' + e.message
          this.editor_yaml.setValue(this.yaml_text)
        }
      }
    }
  }
</script>

<style>
  button {
    font-family: "Open Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
  }

  .CodeMirror {
    width: 100%;
    height: 100%;
  }
</style>
