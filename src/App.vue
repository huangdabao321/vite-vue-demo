<template>
  <router-view></router-view>
</template>

<script setup>
import { message } from 'ant-design-vue'
import { onMounted } from 'vue'
 onMounted(() => {
  message.warn('xx')
 })
</script>
