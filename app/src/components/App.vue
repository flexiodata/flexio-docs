<template>
  <div id="app" class="fixed absolute--fill flex flex-column overflow-hidden">
    <nav class="flex flex-row items-center relative z-4 pa2" style="box-shadow: rgba(0, 0, 0, 0.125) 0px 1px 4px;">
      <div class="flex-fill f4">Flex.io Structured Documentation</div>
      <div>
        <button
          type="button"
          style="outline: 0"
          class="f6 ttu b ba pointer dim br1 pv1 ph3"
          :class="show_json ? 'b--blue bg-blue white' : 'b--light-silver bg-white light-silver'"
          @click="show_json = !show_json"
        >
          JSON
        </button>
        <button
          type="button"
          style="outline: 0"
          class="f6 ttu b ba pointer dim br1 pv1 ph3"
          :class="show_preview ? 'b--blue bg-blue white' : 'b--light-silver bg-white light-silver'"
          @click="show_preview = !show_preview"
        >
          Preview
        </button>
      </div>
    </nav>
    <router-view
      class="flex-fill"
      :show-json="show_json"
      :show-preview="show_preview"
    />
  </div>
</template>

<script>
  export default {
    name: 'App',
    data() {
      return {
        show_json: true,
        show_preview: true
      }
    }
  }
</script>
