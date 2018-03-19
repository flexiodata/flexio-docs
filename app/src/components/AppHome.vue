<template>
  <div class="flex flex-row w-100">
    <doc-nav
      class="br b--black-10 overflow-auto"
      style="min-width: 15rem"
      :docs="docs"
      :active-doc.sync="active_doc"
    />
    <doc-detail
      class="flex-fill relative"
      :active-doc="active_doc"
    />
  </div>
</template>

<script>
  import DocNav from './DocNav'
  import DocDetail from './DocDetail'
  import docs from '../../../docs'

  var active_doc = docs.find(function(doc) {
    return doc.is_valid
  })

  export default {
    components: {
      DocNav,
      DocDetail
    },
    data() {
      return {
        docs,
        active_doc
      }
    }
  }
</script>
