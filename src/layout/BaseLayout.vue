<template>
  <a-layout>
    <a-layout-sider
      collapsible
      v-model:collapsed="collapsed"
      :trigger="null"
      class="layout-sider"
    >
      <div class="header-logo">
        <img :src="logo" />
      </div>
      <a-menu
        id="dddddd"
        v-model:openKeys="openKeys"
        v-model:selectedKeys="selectedKeys"
        style="width: 256px"
        mode="inline"
        theme="dark"
        :inline-collapsed="collapsed"
        @click="handleClick"
      >
        <a-sub-menu key="sub1" @titleClick="titleClick">
          <template #icon>
            <MailOutlined />
          </template>
          <template #title>Navigation One</template>
          <a-menu-item-group key="g1">
            <template #icon>
              <QqOutlined />
            </template>
            <template #title>Item 1</template>
            <a-menu-item key="1">Option 1</a-menu-item>
            <a-menu-item key="2">Option 2</a-menu-item>
          </a-menu-item-group>
          <a-menu-item-group key="g2" title="Item 2">
            <a-menu-item key="3">Option 3</a-menu-item>
            <a-menu-item key="4">Option 4</a-menu-item>
          </a-menu-item-group>
        </a-sub-menu>
        <a-sub-menu key="sub2" @titleClick="titleClick">
          <template #icon>
            <AppstoreOutlined />
          </template>
          <template #title>Navigation Two</template>
          <a-menu-item key="5">Option 5</a-menu-item>
          <a-menu-item key="6">Option 6</a-menu-item>
          <a-sub-menu key="sub3" title="Submenu">
            <a-menu-item key="7">Option 7</a-menu-item>
            <a-menu-item key="8">Option 8</a-menu-item>
          </a-sub-menu>
        </a-sub-menu>
        <a-sub-menu key="sub4">
          <template #icon>
            <SettingOutlined />
          </template>
          <template #title>Navigation Three</template>
          <a-menu-item key="9">Option 9</a-menu-item>
          <a-menu-item key="10">Option 10</a-menu-item>
          <a-menu-item key="11">Option 11</a-menu-item>
          <a-menu-item key="12">Option 12</a-menu-item>
        </a-sub-menu>
      </a-menu>
    </a-layout-sider>

    <a-layout class="layout-content">
      <a-layout-header class="header">
        <menu-unfold-outlined
          v-if="collapsed"
          class="trigger"
          @click="() => (collapsed = !collapsed)"
        />
        <menu-fold-outlined
          v-else
          class="trigger"
          @click="() => (collapsed = !collapsed)"
        />
        <div class=""></div>
      </a-layout-header>
      <a-layout-content>content</a-layout-content>
      <a-layout-footer>footer</a-layout-footer>
    </a-layout>
  </a-layout>
</template>
<script setup>
import { ref } from "vue";
import { MenuFoldOutlined, MenuUnfoldOutlined, MailOutlined, QqOutlined, SettingOutlined, AppstoreOutlined } from "@ant-design/icons-vue";
import logo from "@/assets/logo.png";

const collapsed = ref(false);
const selectedKeys = ref(['1']);
const openKeys = ref(['sub1']);

const titleClick = () => {

}

const handleClick = (e) => {
  console.log(e)
}
</script>
<style scoped>
.layout-sider {
  height: 100vh;
  overflow: hidden;
}
.header {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-left: 0;
}
.header-logo {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  height: 64px;
}
.header-logo img {
  width: 20px;
}
.trigger {
  color: antiquewhite;
  font-size: 30px;
}
</style>
