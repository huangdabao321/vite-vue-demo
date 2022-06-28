<template>
  <div class="user-container">
    <router-view></router-view>
  </div>
</template>

<script setup>

</script>

<style scoped>
.user-container{
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  background: url('../assets/loginbackground.svg');
}
</style>