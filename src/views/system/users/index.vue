<template>
  <a-card>
    <a-form layout="inline" :model="formState" @finish="onFinish">
      <a-form-item label="姓名">
        <a-input v-model:value="formState.name" placeholder="请输入姓名" />
      </a-form-item>
      <a-form-item label="手机">
        <a-input v-model:value="formState.mobile" placeholder="请输入手机号" />
      </a-form-item>
      <a-form-item label="角色">
        <a-select v-model:value="formState.role" placeholder="请选择角色">
          <a-select-option :value="0" disabled>请选择</a-select-option>
          <a-select-option :value="1">管理员</a-select-option>
          <a-select-option :value="2">门店管理员</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="状态">
        <a-select v-model:value="formState.status" placeholder="请选择状态">
          <a-select-option :value="0" disabled>请选择</a-select-option>
          <a-select-option :value="1">启用</a-select-option>
          <a-select-option :value="2">禁用</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" htmlType="submit">查询</a-button>
      </a-form-item>
    </a-form>
    <a-space>
      <a-button type="primary" @click="handleNew">新建</a-button>
    </a-space>
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
          <a-button>编辑</a-button>
          <a-button>禁用</a-button>
        </a-space>
      </template>
    </a-table>
  </a-card>
</template>

<script setup>
import { onMounted, reactive, ref } from "vue";
import { getUserList } from "@/api/user";

const formState = reactive({
  name: "",
  mobile: "",
  role: 0,
  status: 0,
});

let loading = ref(true);
const onFinish = (values) => {
  queryData();
};

const columns = [
  {
    title: "姓名",
    dataIndex: "name",
    width: 60
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
  tital: 0,
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
</script>

<style lang="scss" scoped></style>
