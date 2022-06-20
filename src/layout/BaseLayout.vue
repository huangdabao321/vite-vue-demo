<template>
  <a-layout>
    <a-drawer
      :visible="show && isMobile"
      :width="200"
      :bodyStyle="{
        padding: 0,
        backgroundColor: '#001529'
      }"
      placement="left"
      :closable="false"
      @close="() => (show = !show)"
    >
      <a-menu
        id="mobileMenu"
        v-model:openKeys="openKeys"
        v-model:selectedKeys="selectedKeys"
        mode="inline"
        theme="dark"
        @click="handleMenuClick"
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
        id="siderMenu"
        v-model:openKeys="openKeys"
        v-model:selectedKeys="selectedKeys"
        mode="inline"
        theme="dark"
        @click="handleMenuClick"
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
            <DotChartOutlined />
          </template>
          <template #title>基础数据</template>
          <a-menu-item key="/cars/list">车型管理</a-menu-item>
          <a-menu-item key="/areas/list">地区管理</a-menu-item>
        </a-sub-menu>
      </a-menu>
    </a-layout-sider>

    <a-layout class="layout-content" :class="{fullscreen: isMobile}">
      <a-layout-header class="header">
        <menu-unfold-outlined
          v-if="collapsed"
          class="trigger"
          @click="handleControlCollapsed"
        />
        <menu-fold-outlined v-else class="trigger" @click="handleControlCollapsed" />

        <a-dropdown v-model:visible="visible">
          <a-avatar @click.prevent>
            <template #icon>
              <UserOutlined />
            </template>
          </a-avatar>
          <template #overlay>
            <a-menu @click="handleAvatarMenuClick">
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
            hideAdd
            type="editable-card"
            v-model:activeKey="activeKey"
            :tabBarStyle="{
              margin: 0,
            }"
            @tabClick="handleTabClick"
            @edit="handleTabEdit"
          >
            <a-tab-pane
              v-for="item in pages"
              :key="item.fullPath"
              :tab="item.name"
              ></a-tab-pane
            >
          </a-tabs>
        </div>
        <router-view></router-view>
      </a-layout-content>
      <a-layout-footer class="layout-footer">{{ webSiteName }}</a-layout-footer>
    </a-layout>
  </a-layout>
</template>
<script setup>
import { onMounted, reactive, ref } from "vue";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SettingOutlined,
  DotChartOutlined,
  UserOutlined
} from "@ant-design/icons-vue";
import logo from "@/assets/logo.png";
import config from "@/config";
import { onBeforeRouteUpdate, useRouter, useRoute } from "vue-router";
import { message } from "ant-design-vue";
import { SMALLDEVICE } from "@/config/type";

const webSiteName = ref(config.webSiteName);
const selectedKeys = ref([]);
const openKeys = ref([]);
const visible = ref(false);
let isMobile = ref(false);
let show = ref(true);
let collapsed = ref(false);
let activeKey = ref("/");
let pages = reactive([]);
const fullPathList = reactive([]);

const router = useRouter();
const route = useRoute();

onMounted(() => {
  resize();
  window.addEventListener("resize", resize);
  pages.push({
    name: route.name,
    fullPath: route.fullPath
  });
  fullPathList.push(route.fullPath);
});
const resize = (e) => {
  const { width } = document.documentElement.getBoundingClientRect();
  isMobile.value = width <= SMALLDEVICE;
};

onBeforeRouteUpdate((to, from) => {
  if (!fullPathList.includes(to.fullPath)) {
    pages.push({
      name: to.name,
      fullPath: to.fullPath
    });
    fullPathList.push(to.fullPath);
    activeKey.value = to.fullPath
  }
});

// 编辑tab
const handleTabEdit = (key, action) => {
  if (action === "remove") {
    if (pages.length > 1) {
      removeTab(key);
    } else {
      message.error("这是最后一个标签,无法被关闭");
    }
  }
};
// 移除tab
const removeTab = (key) => {
  const index = fullPathList.indexOf(key);
  pages.splice(index, 1);
  fullPathList.splice(index, 1);
  router.push(fullPathList[fullPathList.length - 1])
};
// tab切换
const handleTabClick = (key) => {
  router.push(key)
}

// 右上角 头像 菜单点击
const handleAvatarMenuClick = (e) => {
  const { key } = e;
  // todo resetpwd logout
  console.log("头像下拉菜单", key);
};

// sider 折叠/收起
const handleControlCollapsed = () => {
  collapsed.value = !collapsed.value;
  show.value = !show.value;
};
// 菜单点击
const handleMenuClick = (e) => {
  const { key } = e;
  if (fullPathList.some((path) => path === key)) {
    // 更新当前tab的位置
    const index = fullPathList.indexOf(key);
    const [currentRoute] = pages.splice(index, 1);
    const [path] = fullPathList.splice(index, 1)
    pages.push(currentRoute);
    fullPathList.push(path)
  } else {
    router.push(key);
  }
};
</script>
<style scoped>
.fullscreen,.layout-sider {
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
