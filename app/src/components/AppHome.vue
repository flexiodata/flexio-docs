<template>
  <div class="flex flex-row w-100">
    <div class="br b--black-10" style="min-width: 12rem">
      <doc-nav :doc-path.sync="doc_path" />
    </div>
    <div class="flex-fill relative">
      <doc-detail :full-path="full_path" />
    </div>
  </div>
</template>

<script>
  import DocNav from './DocNav'
  import DocDetail from './DocDetail'

  const base_path = 'https://raw.githubusercontent.com/flexiodata/flexio-docs/master/src/'

  export default {
    components: {
      DocNav,
      DocDetail
    },
    data() {
      return {
        base_path,
        doc_path: 'task/convert'
      }
    },
    computed: {
      full_path() {
        return this.base_path + this.doc_path + '.yml'
      }
    }
  }
</script>
