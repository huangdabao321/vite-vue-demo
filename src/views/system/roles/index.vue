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
          v-model:value="formState.mobile"
          allowClear
          placeholder="请输入描述"
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
      :pagination="pagination"
      :dataSource="dataSource"
      :loading="loading"
      :scroll="{ x: true }"
      @change="handleTableChange"
    >
      <template #bodyCell="{ column, text, record }">
        <a-space v-if="column.dataIndex === 'action'">
          <a-button type="primary" @click="handleEdit(record)">编辑</a-button>
          <a-button type="danger">禁用</a-button>
        </a-space>
      </template>
      <template #expandedRowRender="{ record }">
        <a-row :gutter="[{ xs: 12 }, 16]">
          <a-col v-for="p in record.permissions" :key="p.name" :span="12">
            <a-tag color="purple">{{ p.title }}</a-tag>
          </a-col>
        </a-row>
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
        name="desc"
        :rules="[
          { required: true, message: '描述不可为空' },
          { pattern: /^[\u4e00-\u9fa5]+$/, message: '请使用中文' },
        ]"
      >
        <a-input v-model:value="drawerState.desc" />
      </a-form-item>
      <a-form-item label="权限" name="permissions">
        <Tree v-model:value="drawerState.permissions" />
      </a-form-item>
      <a-form-item :wrapperCol="{ offset: 4 }">
        <a-button block htmlType="submit" type="primary">提交</a-button>
      </a-form-item>
    </a-form>
  </a-drawer>
</template>

<script setup>
import { onMounted, reactive, ref } from "vue";
import { getRoleList } from "@/api/role";
import { useMobile } from "@/hooks";
import Tree from "./tree.vue";
import { message } from "ant-design-vue";

const isMobile = useMobile();
const formState = reactive({
  name: "",
  desc: "",
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
    width: 60,
  },
  {
    title: "描述",
    dataIndex: "desc",
  },
  {
    title: "操作",
    dataIndex: "action",
  },
];
const pagination = ref({
  current: 1,
  pageSize: 1,
  total: 0,
});

const dataSource = ref([]);
onMounted(() => {
  queryData();
});

const queryData = (p) => {
  const params = {
    page: pagination.value.current,
    pageSize: pagination.value.pageSize,
    ...formState,
  };
  loading.value = true;
  getRoleList(params).then((res) => {
    const { total, data } = res.data;
    pagination.value.total = total;
    dataSource.value = data;
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
  desc: "",
  permissions: [],
});
const handleNew = () => {
  visible.value = true;
  title.value = '新增'
  drawerState.value = {
    name: '',
    desc: '',
    permissions: []
  }
};

const handleEdit = (record) => {
  Object.assign(drawerState.value, record)
  drawerState.value.permissions = drawerState.value.permissions.map((p) => p.id);
  title.value = "编辑";
  visible.value = true;
};

const onDrawerFinish = values => {
  // todo 新建或者更新
  console.log(values)
}
</script>

<style lang="less" scoped>
.ant-form-inline .ant-form-item {
  margin-top: 10px;
}
</style>
