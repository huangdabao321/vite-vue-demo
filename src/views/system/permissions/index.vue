<template>
  <a-card>
    <a-form
      :layout="isMobile ? 'horizontal' : 'inline'"
      :model="formState"
      @finish="onFinish"
    >
      <a-form-item label="name">
        <a-input
          v-model:value="formState.name"
          allowClear
          placeholder="请输入name"
        />
      </a-form-item>
      <a-form-item label="描述">
        <a-input
          v-model:value="formState.title"
          allowClear
          placeholder="请输入名称"
        />
      </a-form-item>
      <a-form-item label="状态">
        <a-select
          v-model:value="formState.status"
          allowClear
          placeholder="请选择状态"
          :style="{
            minWidth: '150px',
          }"
        >
          <a-select-option :value="0" disabled>请选择</a-select-option>
          <a-select-option :value="1">启用</a-select-option>
          <a-select-option :value="2">禁用</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" htmlType="submit">查询</a-button>
      </a-form-item>
    </a-form>
    <div class="margin-20">
      <a-button type="primary" @click="handleNew">新建</a-button>
    </div>
    <a-table
      rowKey="id"
      :columns="columns"
      :pagination="false"
      :dataSource="dataSource"
      :loading="loading"
      :scroll="{ x: true }"
      @change="handleTableChange"
    >
      <template #bodyCell="{ column, text, record }">
        <a-space v-if="column.dataIndex === 'actions'">
          <a-tag
            color="purple"
            v-for="action in record.actions"
            :key="action.name"
            >{{ action.desc }}</a-tag
          >
        </a-space>
        <a-space v-if="column.dataIndex === 'operation'">
          <a-button type="primary" @click="handleEdit(record)">编辑</a-button>
          <a-button type="danger">禁用</a-button>
        </a-space>
      </template>
    </a-table>
  </a-card>
  <a-drawer
    :width="isMobile ? '100%' : 520"
    :visible="visible"
    :title="title"
    :maskClosable="false"
    destroyOnClose
    @close="onClose"
  >
    <a-form
      :model="drawerState"
      :labelCol="{ span: 4 }"
      :wrapperCol="{ span: 20 }"
      @finish="onDrawerFinish"
    >
      <a-form-item
        label="name"
        name="name"
        :rules="[
          { required: true, message: 'name不可为空' },
          { pattern: /^\w+$/, message: 'name只可用字母数字下划线组合' },
        ]"
      >
        <a-input v-model:value="drawerState.name" />
      </a-form-item>
      <a-form-item
        label="描述"
        name="title"
        :rules="[
          { required: true, message: '描述不可为空' },
          { pattern: /^[\u4e00-\u9fa5]+$/, message: '请使用中文' },
        ]"
      >
        <a-input v-model:value="drawerState.title" />
      </a-form-item>
      <a-form-item
        label="父级"
        name="pid"
        :rules="[{ required: true, message: '父级不可为空' }]"
      >
        <a-tree-select
          v-model:value="drawerState.pid"
          allow-clear
          tree-default-expand-all
          :tree-data="dataSource"
          :fieldNames="{children: 'children', label: 'title', value: 'id'}"
        >
          <template #title="{ title }">
            {{ title }}
          </template>
        </a-tree-select>
      </a-form-item>
      <a-form-item
        label="路径"
        name="path"
        :rules="[{ required: true, message: '路径不可为空' }]"
      >
        <a-input v-model:value="drawerState.path" />
      </a-form-item>
      <a-form-item
        label="组件"
        name="component"
        :rules="[{ required: true, message: '组件不可为空' }]"
      >
        <a-input v-model:value="drawerState.component" />
      </a-form-item>
      <a-form-item label="权限" name="permission">
        <a-input v-model:value="drawerState.permission" />
      </a-form-item>
      <a-form-item label="路由隐藏" name="hidden" help="控制路由和子路由是否显示在 sidebar">
        <a-switch
          v-model:checked="drawerState.hidden"
          checkedChildren="隐藏"
          unCheckedChildren="显示"
        ></a-switch>
      </a-form-item>
      <a-form-item label="redirect" name="redirect">
        <a-input v-model:value="drawerState.redirect" />
      </a-form-item>
      <a-form-item label="操作" name="actions">
        <a-select mode="multiple" v-model:value="drawerState.actions">
          <a-select-option
            v-for="action in actions"
            :key="action.id"
            :value="actions.id"
            >{{ action.desc }}</a-select-option
          >
        </a-select>
      </a-form-item>
      <a-form-item :wrapperCol="{ offset: 4 }">
        <a-button block htmlType="submit" type="primary">提交</a-button>
      </a-form-item>
    </a-form>
  </a-drawer>
</template>

<script setup>
import { onMounted, reactive, ref } from "vue";
import { getPermissions } from "@/api/permission";
import { getActions } from "@/api/action";
import { useMobile } from "@/hooks";
import { listToTree } from "@/store/utils";

const isMobile = useMobile();
const formState = reactive({
  name: "",
  title: "",
  status: 0,
});

const onFinish = (values) => {
  queryData();
};

let loading = ref(true);

const columns = [
  {
    title: "name",
    dataIndex: "name",
    width: 180,
  },
  {
    title: "描述",
    dataIndex: "title",
  },
  {
    title: "权限操作",
    dataIndex: "actions",
  },
  {
    title: "操作",
    dataIndex: "operation",
  },
];

const dataSource = ref([]);
onMounted(() => {
  queryData();
  queryActions();
});

const actions = ref([]);
const queryActions = () => {
  getActions().then((res) => {
    actions.value = res.data;
  });
};

const queryData = (p) => {
  const params = {
    ...formState,
  };
  loading.value = true;
  getPermissions(params).then((res) => {
    const tree = [];
    listToTree(res.data, tree, 0);
    dataSource.value = tree;
    loading.value = false;
  });
};
// 分页
const handleTableChange = (args) => {
  pagination.value = { ...args };
  queryData();
};

let visible = ref(false);
const onClose = () => {
  visible.value = false;
};

let title = ref("新增");
const drawerState = ref({
  id: 0,
  name: "",
  pid: 0,
  path: "",
  component: "",
  title: "",
  icon: "",
  permission: "",
  hiddenInMenu: false,
  hidden: false,
  redirect: "",
  actions: [],
});
const handleNew = () => {
  visible.value = true;
  title.value = "新增";
  drawerState.value = {
    id: 0,
    name: "",
    pid: 0,
    path: "",
    component: "",
    title: "",
    icon: "",
    permission: "",
    hiddenInMenu: false,
    hidden: false,
    redirect: "",
    actions: [],
  };
};

const handleEdit = (record) => {
  Object.assign(drawerState.value, record);
  drawerState.value.actions = drawerState.value.actions.map((p) => p.id);
  title.value = "编辑";
  visible.value = true;
};

const onDrawerFinish = (values) => {
  // todo 新建或者更新
  console.log(values);
};
</script>

<style lang="less" scoped>
.ant-form-inline .ant-form-item {
  margin-top: 10px;
}
</style>
