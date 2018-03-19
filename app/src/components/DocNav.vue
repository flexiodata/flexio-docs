<template>
  <div>
    <ul class="list ma0 pa0" style="cursor: default">
      <li
        class="flex flex-row items-center pa2 f6"
        :class="[
          isActive(doc) ? 'white bg-blue' : 'dark-gray',
          isValid(doc) ? '' : 'o-40 no-pointer-events',
          isValid(doc) && !isActive(doc) ? 'pointer hover-black hover-bg-light-gray' : ''
        ]"
        :key="doc.label"
        v-for="(doc, index) in docs"
        @click="$emit('update:activeDoc', doc)"
      >
        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA+UlEQVQ4jY1Tu27DMBCjCk2NDWRPZi3NPzSB/zoPdPIcp4O/wB+QvQrZIZYtxJKdAw46HEQeeZAM+mhuvxIJSiCJUIsE+zTG3L33h/3+uwk4E4rrtdFu94VctG2LoijRdd3d+79DVVUNAHyEC5QAAN77ZAJAWRbYbjdrY8xPwNmBgMxOD1HXNQBg9blaTwi0QOCcg3MO1lpczpehP7EwF+rvxGoHgiUFASwJVIJgbgcx+DlsVLtIEINHC4+EhcQOUmBJ4DsKcuC8goggBw6ZVtBvdgn8OiyyMLLOgV/tTl6itUNr4j3USQKSOB1PoAhRIB9gdMbfOn5I//3MG/gLtGdEAAAAAElFTkSuQmCC" />
        <div class="ml1">{{doc.label}}</div>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    props: {
      'docs': {
        type: Array,
        default: () => { return [] }
      },
      'active-doc': {
        type: String,
        default: ''
      }
    },
    methods: {
      isActive(doc) {
        return doc.label == this.activeDoc.label
      },
      isValid(doc) {
        return doc.is_valid === true
      }
    }
  }
</script>

<style>
  .no-pointer-events {
    pointer-events: none;
  }
</style>
