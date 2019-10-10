<template>
  <div class="hello">
    {{ message }}
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    message: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
