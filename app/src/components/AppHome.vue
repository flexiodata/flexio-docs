<template>
  <div class="flex flex-row w-100">
    <doc-nav
      class="br b--black-10 overflow-auto"
      style="min-width: 15rem"
      :paths="paths"
      :doc-path.sync="doc_path"
    />
    <div class="flex-fill flex flex-column">
      <doc-definition
        class="flex-fill relative"
        :full-path="full_path"
      />
    </div>
  </div>
</template>

<script>
  import DocNav from './DocNav'
  import DocDefinition from './DocDefinition'

  const base_path = 'https://raw.githubusercontent.com/flexiodata/flexio-docs/master/src/'

  const paths = [
    'task/create',
    'task/convert',
    'task/copy',
    'task/dump',
    'task/echo',
    'task/email',
    'task/execute',
    'task/filter',
    'task/foreach',
    'task/insert',
    'task/limit',
    'task/merge',
    'task/mkdir',
    'task/list',
    'task/read',
    'task/render',
    'task/request',
    'task/select',
    'task/sequence',
    'task/set',
    'task/sleep',
    'task/task',
    'task/transform',
    'task/write'
  ]

  export default {
    components: {
      DocNav,
      DocDefinition
    },
    data() {
      return {
        paths,
        base_path,
        doc_path: paths[0]
      }
    },
    computed: {
      full_path() {
        return this.base_path + this.doc_path + '.yml'
      }
    }
  }
</script>
