<template>
  <a-result
    status="404"
    title="404"
    sub-title="Sorry, the page you visited does not exist."
  >
    <template #extra>
      <a-button type="primary">Back Home</a-button>
    </template>
  </a-result>
</template>

<script setup>
import { Result } from 'ant-design-vue'
</script>
