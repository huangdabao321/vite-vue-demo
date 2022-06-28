<template>
  <a-sub-menu :key="menuInfo.path">
    <template #title>{{menuInfo.meta.title}}</template>
    <template v-for="item in menuInfo.children" :key="item.path">
      <template v-if="!item.children">
        <a-menu-item :key="item.path">
          {{ item.meta.title}}
        </a-menu-item>
      </template>
      <template v-else>
        <SubMenu :menu-info="item" :key="item.path"/>
      </template>
    </template>
  </a-sub-menu>
</template>
<script setup>
const props = defineProps({
  menuInfo: {
    type: Object,
    default: () => {}
  },
})

console.log(props.menuInfo)
</script>