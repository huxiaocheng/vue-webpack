<template>
  <div class='msg'>
    {{message}}
  </div>
</template>
<script>
export default {
  data() {
    return {
      message: 'child msg'
    }
  }
}
</script>
<style lang="scss" scoped>
body {
  background: #666;
  .msg {
    color: red;
  }
}
</style>
