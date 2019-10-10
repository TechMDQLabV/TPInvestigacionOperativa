<template>
  <div class="home text-white">
    <img class="img" alt="Vue logo" src="../assets/logo.png">
    <HelloWorld message="Sergio Garguir - Mauro Yini"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "home",
  components: {
    HelloWorld
  }
};
</script>
