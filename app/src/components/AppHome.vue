<template>
  <div class="flex flex-row w-100">
    <div class="br b--black-10" style="min-width: 12rem"><div class="pa3">Sidenav</div></div>
    <div class="flex-fill relative">
      <doc-detail :base-path="base_path" :doc-path="doc_path" />
    </div>
  </div>
</template>

<script>
  import DocDetail from './DocDetail'

  const base_path = 'https://raw.githubusercontent.com/flexiodata/flexio-docs/master'

  export default {
    components: {
      DocDetail
    },
    data() {
      return {
        base_path,
        doc_path: '/src/task/convert.yml'
      }
    }
  }
</script>
