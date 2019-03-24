<template>
  <div>
    <h2 class="title">{{title}}</h2>
    <Child/>
    <img src="./assets/images/test.jpg" alt>
    <div class="bg"></div>
  </div>
</template>

<script>
import { addClass } from "./base/dom.js";
import Child from './components/child'

export default {
  mounted() {
    addClass();
  },
  data() {
    return {
      title: "hello webpack4"
    };
  },
  components: {
    Child
  }
};
</script>

<style scoped>
.title {
  user-select: none;
  transform: translate(20px, 20px);
}
.bg {
  width: 500px;
  height: 500px;
  background-image: url("./assets/images/wali.jpg");
}
</style>
