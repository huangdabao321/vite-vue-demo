<template>
  <a-layout>
    <a-drawer
      :visible="show && isMobile"
      :width="200"
      :bodyStyle="{
        padding: 0,
        backgroundColor: '#001529',
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
        <template v-for="item in menus" :key="item.path">
          <template v-if="!item.children">
            <a-menu-item>{{ item.meta.title }}</a-menu-item>
          </template>
          <template v-else>
            <SubMenu :menu-info="item" :key="item.path" />
          </template>
        </template>
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
        <template v-for="item in menus" :key="item.path">
          <template v-if="!item.children">
            <a-menu-item :key="item.path">{{ item.meta.title }}</a-menu-item>
          </template>
          <template v-else>
            <SubMenu :menu-info="item" :key="item.path" />
          </template>
        </template>
      </a-menu>
    </a-layout-sider>

    <a-layout class="layout-content" :class="{ fullscreen: isMobile }">
      <a-layout-header class="header">
        <menu-unfold-outlined
          v-if="collapsed"
          class="trigger"
          @click="handleControlCollapsed"
        />
        <menu-fold-outlined
          v-else
          class="trigger"
          @click="handleControlCollapsed"
        />

        <a-dropdown v-model:visible="visible" :trigger="['click']">
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
            ></a-tab-pane>
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
  UserOutlined,
} from "@ant-design/icons-vue";
import logo from "@/assets/logo.png";
import config from "@/config";
import { onBeforeRouteUpdate, useRouter, useRoute } from "vue-router";
import { message } from "ant-design-vue";
import SubMenu from "@/components/CustomeMenu/SubMenu.vue";
import { SMALLDEVICE } from "@/config/type";
import { useUserStore } from "@/store/user";
import { useMobile } from "@/hooks";

const webSiteName = ref(config.webSiteName);
const selectedKeys = ref([]);
const openKeys = ref([]);
const visible = ref(false);
let isMobile = useMobile()
let show = ref(true);
let collapsed = ref(false);
let activeKey = ref("/");
let pages = reactive([]);
const fullPathList = reactive([]);

const router = useRouter();
const route = useRoute();

const userStore = useUserStore();
const menus = userStore.addRoutes[0].children;

onMounted(() => {
  pages.push({
    name: route.meta.title,
    fullPath: route.fullPath,
  });
  fullPathList.push(route.fullPath);
});

onBeforeRouteUpdate((to, from) => {
  if (!fullPathList.includes(to.fullPath)) {
    pages.push({
      name: to.meta.title,
      fullPath: to.fullPath,
    });
    fullPathList.push(to.fullPath);
  }
  activeKey.value = to.path;
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
  router.push(fullPathList[fullPathList.length - 1]);
};
// tab切换
const handleTabClick = (key) => {
  router.push(key);
};

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
  router.push(key);
};
</script>
<style scoped>
.fullscreen,
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
  font-size: 20px;
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
