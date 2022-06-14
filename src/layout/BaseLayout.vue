<template>
  <a-layout>
    <a-layout-header style="height: 58px">
      <div class="logo">
        <img :src="logo"/>
      </div>
    </a-layout-header>
    <a-layout>
      <a-layout-sider> side</a-layout-sider>
      <a-layout-content>content</a-layout-content>
    </a-layout>
    <a-layout-footer>footer</a-layout-footer>
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

const selectedKeys = ref(["1"]);
const collapsed = ref(false);

</script>
<style>
.logo img{
  width: 30px;
}
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.3);
  margin: 16px;
}

.site-layout .site-layout-background {
  background: #fff;
}
</style>
