<template>
  <div>
    <ul class="list ma0 pa0" style="cursor: default">
      <li
        class="flex flex-row items-center pa2 f6 pointer"
        :class="[ isActivePath(path) ? 'white bg-blue' : 'dark-gray hover-black hover-bg-light-gray' ]"
        :key="path"
        v-for="path in paths"
        @click="$emit('update:docPath', path)"
      >
        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA+UlEQVQ4jY1Tu27DMBCjCk2NDWRPZi3NPzSB/zoPdPIcp4O/wB+QvQrZIZYtxJKdAw46HEQeeZAM+mhuvxIJSiCJUIsE+zTG3L33h/3+uwk4E4rrtdFu94VctG2LoijRdd3d+79DVVUNAHyEC5QAAN77ZAJAWRbYbjdrY8xPwNmBgMxOD1HXNQBg9blaTwi0QOCcg3MO1lpczpehP7EwF+rvxGoHgiUFASwJVIJgbgcx+DlsVLtIEINHC4+EhcQOUmBJ4DsKcuC8goggBw6ZVtBvdgn8OiyyMLLOgV/tTl6itUNr4j3USQKSOB1PoAhRIB9gdMbfOn5I//3MG/gLtGdEAAAAAElFTkSuQmCC" />
        <div class="ml1">{{path}}</div>
      </li>
    </ul>
  </div>
</template>

<script>
  const paths = [
    'task/convert',
    'task/request'
  ]

  export default {
    props: {
      'doc-path': {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        paths
      }
    },
    methods: {
      isActivePath(path) {
        return path == this.docPath
      }
    }
  }
</script>
