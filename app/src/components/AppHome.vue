<template>
  <div class="flex flex-row w-100">
    <div class="br b--black-10" style="min-width: 12rem"><div class="pa3">Sidenav</div></div>
    <div class="flex-fill relative">
      <doc-detail :doc-id="doc_id" />
    </div>
  </div>
</template>

<script>
  import DocDetail from './DocDetail'

  export default {
    components: {
      DocDetail
    },
    data() {
      return {
        doc_id: ''
      }
    }
  }
</script>
