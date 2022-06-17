<template>
  <a-layout>
    <a-drawer
      :visible="show && isMobile"
      :width="200"
      :bodyStyle="{
        padding: 0,
      }"
      placement="left"
      :closable="false"
      @close="() => (show = !show)"
    >
      <a-menu
        id="dddddd"
        v-model:openKeys="openKeys"
        v-model:selectedKeys="selectedKeys"
        mode="inline"
        theme="dark"
        @click="handleClick"
      >
        <a-sub-menu key="sub4">
          <template #icon>
            <SettingOutlined />
          </template>
          <template #title>系统设置</template>
          <a-menu-item key="/users/list">用户管理</a-menu-item>
          <a-menu-item key="/roles/list">角色管理</a-menu-item>
          <a-menu-item key="/permissions/list">权限管理</a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="sub5">
          <template #icon>
            <SettingOutlined />
          </template>
          <template #title>基础数据</template>
          <a-menu-item key="/cars/list">车型管理</a-menu-item>
          <a-menu-item key="/areas/list">地区管理</a-menu-item>
        </a-sub-menu>
      </a-menu>
    </a-drawer>
    <a-layout-sider
      collapsible
      v-model:collapsed="collapsed"
      class="layout-sider"
      :trigger="null"
      v-if="!isMobile"
    >
      <div class="header-logo">
        <img :src="logo" />
      </div>
      <a-menu
        id="dddddd"
        v-model:openKeys="openKeys"
        v-model:selectedKeys="selectedKeys"
        mode="inline"
        theme="dark"
        @click="handleClick"
      >
        <a-sub-menu key="sub4">
          <template #icon>
            <SettingOutlined />
          </template>
          <template #title>系统设置</template>
          <a-menu-item key="/users/list">用户管理</a-menu-item>
          <a-menu-item key="/roles/list">角色管理</a-menu-item>
          <a-menu-item key="/permissions/list">权限管理</a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="sub5">
          <template #icon>
            <SettingOutlined />
          </template>
          <template #title>基础数据</template>
          <a-menu-item key="/cars/list">车型管理</a-menu-item>
          <a-menu-item key="/areas/list">地区管理</a-menu-item>
        </a-sub-menu>
      </a-menu>
    </a-layout-sider>

    <a-layout class="layout-content">
      <a-layout-header class="header">
        <menu-unfold-outlined
          v-if="collapsed"
          class="trigger"
          @click="handleCollapsed"
        />
        <menu-fold-outlined
          v-else
          class="trigger"
          @click="handleCollapsed"
        />

        <a-dropdown v-model:visible="visible">
          <a-avatar @click.prevent>
            <template #icon>
              <UserOutlined />
            </template>
          </a-avatar>
          <template #overlay>
            <a-menu @click="handleMenuClick">
              <a-menu-item key="resetpwd">重置密码</a-menu-item>
              <a-menu-item key="logout">退出登陆</a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </a-layout-header>
      <a-layout-content>
        <!-- 多标签页 -->
        <div class="tabs-container">
          <a-tabs
            type="card"
            v-model:activeKey="activeKey"
            :tabBarStyle="{
              margin: 0 
            }"
            @tabClick="handleTab"
            @contextmenu="handleContextmenu"
          >
            <a-tab-pane v-for="i in 10" :key="i" :tab="`Tab-${i}`"></a-tab-pane>
          </a-tabs>
        </div>
        <router-view></router-view>
      </a-layout-content>
      <a-layout-footer class="layout-footer">{{ webSiteName }}</a-layout-footer>
    </a-layout>
  </a-layout>
</template>
<script setup>
import { onMounted, ref } from "vue";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  MailOutlined,
  QqOutlined,
  SettingOutlined,
  AppstoreOutlined,
  UserOutlined,
} from "@ant-design/icons-vue";
import logo from "@/assets/logo.png";
import config from "@/config";
import { useRouter } from "vue-router";

const webSiteName = ref(config.webSiteName);
const selectedKeys = ref([]);
const openKeys = ref([]);
const visible = ref(false);
let isMobile = ref(false);
let show = ref(true);
let collapsed = ref(false);
let activeKey = ref('1');

const router = useRouter();

onMounted(() => {
  resize()
  window.addEventListener('resize', resize)
})

const tabScrollCallback = () => {}

const resize = (e) => {
  const { width } = document.documentElement.getBoundingClientRect()
  isMobile.value = width <= 750
}

// 菜单点击
const handleClick = (e) => {
  const { key } = e;
  console.log(key);
  router.push(key);
};
// 右上角 头像 菜单点击
const handleMenuClick = (e) => {
  const { key } = e;
  // todo resetpwd logout
  console.log(key);
};

// sider 折叠/收起
const handleCollapsed = () => {
  collapsed.value = !collapsed.valuee
  show.value = !show.value
}

const handleTab = (key) => {
  console.log('---', key)
}

// tab 标签右键
const handleContextmenu = e => {
  console.log('==.', e)
  e.preventDefault()
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
  justify-content: space-between;
  padding: 0 10px;
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
  color: #fff;
  font-size: 30px;
}

.layout-footer {
  display: flex;
  align-items: center;
  justify-content: center;
  color: rosybrown;
}
/* tabs样式 */
.tabs-container {
  padding: 2px 6px;
  background-color: white;
  box-shadow: 1px 1px 4px 1px rgba(0, 0, 0, 0.5);
}

</style>
