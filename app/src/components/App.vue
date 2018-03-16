<template>
  <div id="app" class="fixed absolute--fill flex flex-column overflow-hidden">
    <nav class="pa3 relative z-4" style="box-shadow: rgba(0, 0, 0, 0.125) 0px 1px 4px;">
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
