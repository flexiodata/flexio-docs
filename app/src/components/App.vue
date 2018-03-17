<template>
  <div id="app" class="fixed absolute--fill flex flex-column overflow-hidden">
    <nav class="flex flex-row relative z-4 pa3" style="box-shadow: rgba(0, 0, 0, 0.125) 0px 1px 4px;">
      <div class="f4">Flex.io Structured Documentation</div>
    </nav>
    <router-view class="flex-fill" />
  </div>
</template>

<script>
  export default {
    name: 'App'
  }
</script>
