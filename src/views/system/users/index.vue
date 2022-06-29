<template>
  <a-card>
    <a-form
      :layout="isMobile ? 'horizontal' : 'inline'"
      :model="formState"
      @finish="onFinish"
    >
      <a-form-item label="姓名">
        <a-input
          v-model:value="formState.name"
          allowClear
          placeholder="请输入姓名"
        />
      </a-form-item>
      <a-form-item label="手机">
        <a-input
          v-model:value="formState.mobile"
          allowClear
          placeholder="请输入手机号"
        />
      </a-form-item>
      <a-form-item label="角色">
        <a-select
          v-model:value="formState.role"
          allowClear
          placeholder="请选择角色"
          :style="{
            minWidth: '150px',
          }"
        >
          <a-select-option :value="0" disabled>请选择</a-select-option>
          <a-select-option :value="1">管理员</a-select-option>
          <a-select-option :value="2">门店管理员</a-select-option>
        </a-select>
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
        <a-space v-if="column.dataIndex === 'roles'">
          <a-space>
            <a-tag v-for="role in record.roles" :key="role.name">{{
              role.desc
            }}</a-tag>
          </a-space>
        </a-space>
        <a-space v-else-if="column.dataIndex === 'action'">
          <a-button type="primary">编辑</a-button>
          <a-button type="danger">禁用</a-button>
        </a-space>
      </template>
    </a-table>
  </a-card>
</template>

<script setup>
import { onMounted, reactive, ref } from "vue";
import { getUserList } from "@/api/user";
import { useMobile } from "@/hooks";

const isMobile = useMobile();
const formState = reactive({
  name: "",
  mobile: "",
  role: 0,
  status: 0,
});

const onFinish = (values) => {
  queryData();
};

let loading = ref(true);

const columns = [
  {
    title: "姓名",
    dataIndex: "name",
    width: 60,
  },
  {
    title: "电话",
    dataIndex: "mobile",
  },
  {
    title: "角色",
    dataIndex: "roles",
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
  getUserList(params).then((res) => {
    const { total, data } = res.data;
    pagination.value.total = total;
    dataSource.value = data;
    loading.value = false;
  });
};
// 分页
const handleTableChange = (pag) => {
  pagination.value = { ...pag };
  queryData();
};

const handleNew = () => {};
</script>

<style lang="less" scoped>
.ant-form-inline .ant-form-item {
  margin-top: 10px;
}
</style>
