<template>
  <div class="absolute absolute--fill">
    <textarea
      ref="textarea"
      spellcheck="false"
      v-model.trim="json_text"
    ></textarea>
  </div>
</template>

<script>
  import yaml from 'js-yaml'
  import axios from 'axios'
  import marked from 'marked'
  import CodeMirror from 'codemirror'

  require('codemirror/mode/yaml/yaml.js')
  require('codemirror/mode/javascript/javascript.js')

  const base_path = 'https://raw.githubusercontent.com/flexiodata/flexio-docs/master'

  export default {
    props: {
      'doc-id': {
        type: String,
        default: ''
      }
    },
    watch: {
      docId: {
        handler: 'readYaml',
        immediate: true
      },
      json_text(val, old_val) {
        this.editor.setValue(val)
      }
    },
    data() {
      return {
        json_text: '',
        editor: null
      }
    },
    mounted() {
      var opts = {
        lineNumbers: true,
        mode: 'application/json'
      }

      this.editor = CodeMirror.fromTextArea(this.$refs['textarea'], opts)
      this.editor.setCursor({ line: 1, ch: 1000000 })
    },
    methods: {
      readYaml() {
        try {
          axios.get(base_path+'/src/task/convert.yml')
            .then(response => {
              var json = yaml.load(response.data)
              this.json_text = JSON.stringify(json, null, 2)
            })
        }
        catch(e) {
          this.json_text = JSON.stringify(e)
        }
      }
    }
  }
</script>

<style>
  .CodeMirror {
    width: 100%;
    height: 100%;
  }
</style>
