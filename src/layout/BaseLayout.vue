<template>
  <a-layout>
    <a-layout-header class="header">
      <div class="logo">
        <img :src="logo"/>
      </div>
    </a-layout-header>
    <a-layout class="layout-content">
      <a-layout-sider class="sider"> side</a-layout-sider>
      <a-layout-content>content</a-layout-content>
      <a-layout-footer>footer</a-layout-footer>
    </a-layout>
  </a-layout>
</template>
<script setup>
import {
  Layout,
  LayoutHeader,
  LayoutSider,
  LayoutContent,
} from "ant-design-vue";
import { ref } from "vue";
import logo from '@/assets/logo.png'

const resize = () => {}

</script>
<style  scoped>
.layout-content{
  height: calc(100vh - 64px);
}
.layout-content .sider{
  
}
</style>
