<template>
  <div class="delete">
    {{ message }}
  </div>
</template>

<script>
export default {
  name: 'delete',
  data() {
      return {
          
      }
  },
  computed: {
      message() {
          return "Hello " + this.$route.params.id;
      }
  }
}
</script>
