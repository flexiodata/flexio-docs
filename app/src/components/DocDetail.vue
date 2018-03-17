<template>
  <div class="flex flex-column relative">
    <div class="absolute top-0 right-0 z-5 flex flex-row justify-end pa2" v-if="showToggle">
      <button
        type="button"
        class="flex flex-row items-center pointer dim bn bg-blue ttu b white pv1 ph3 br2 mr2"
        @click="mode = 'json'"
      >
        <i class="material-icons nl2 mr1" v-if="mode == 'json'">check</i>
        <span>JSON</span>
      </button>
      <button
        type="button"
        class="flex flex-row items-center pointer dim bn bg-blue ttu b white pv1 ph3 br2"
        @click="mode = 'yaml'"
      >
        <i class="material-icons nl2 mr1" v-if="mode == 'yaml'">check</i>
        <span>YAML</span>
      </button>
    </div>
    <div class="flex-fill flex flex-row">
      <div class="flex-fill" v-if="!_isMounted || !showToggle || (showToggle && mode == 'yaml')">
        <textarea ref="textarea-yaml"></textarea>
      </div>
      <div class="flex-fill" v-if="!_isMounted || !showToggle || (showToggle && mode == 'json')">
        <textarea ref="textarea-json"></textarea>
      </div>
    </div>
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
      },
      'show-toggle': {
        type: Boolean,
        default: false
      }
    },
    watch: {
      fullPath: {
        handler: 'readYaml',
        immediate: true
      },
      yaml_text() {
        this.editor_json.setValue(this.json_text)
      },
      mode() {
        this.editor_json.setValue(this.json_text)
        this.editor_yaml.setValue(this.yaml_text)
      }
    },
    data() {
      return {
        mode: 'yaml', // 'json' or 'yaml'
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
      json_text() {
        try {
          var json_obj = yaml.load(this.yaml_text)
          return JSON.stringify(json_obj, null, 2)
        }
        catch(e) {
          return JSON.stringify(e, null, 2)
        }
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
