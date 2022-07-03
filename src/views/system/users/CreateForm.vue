<template>
  <a-modal
    :title="title"
    :visible="visible"
    :maskClosable="false"
    :width="isMobile ? '100%' : 520"
    :footer="null"
    @cancel="onCancel"
  >
    <a-form
      :labelCol="{ span: 4 }"
      :wrapperCol="{ span: 20 }"
      :model="formState"
      layout="horizontal"
      @finish="handleFinish"
    >
      <a-form-item
        label="姓名"
        name="name"
        :rules="[{ required: true, message: '姓名不可为空' }]"
      >
        <a-input v-model:value="formState.name" />
      </a-form-item>
      <a-form-item
        label="手机"
        name="mobile"
        :rules="[
          { required: true, message: '手机号不可为空' },
          { pattern: /^1[3456789]{1}\d{9}$/, message: '手机号格式错误' },
        ]"
      >
        <a-input v-model:value="formState.mobile" />
      </a-form-item>
      <a-form-item
        label="密码"
        name="password"
        :rules="[{ validator: checkPwd }]"
      >
        <a-input v-model:value="formState.password" />
      </a-form-item>
      <a-form-item
        label="确认密码"
        name="confirm_password"
        :rules="[{ validator: checkConfirm }]"
      >
        <a-input v-model:value="formState.confirm_password" />
      </a-form-item>
      <a-form-item label="角色" name="roles">
        <a-select mode="multiple" v-model:value="formState.roles">
          <a-select-option v-for="role in roles" :key="role.id">{{
            role.desc
          }}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item :wrapperCol="{ span: 24 }">
        <a-button block htmlType="submit" type="primary">提交</a-button>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup>
import { reactive, ref, onMounted, watch, toRefs } from "vue";
import { useMobile } from "@/hooks";
import { getRoles } from "@/api/role";
const isMobile = useMobile();

const props = defineProps({
  title: {
    type: String,
    default: "",
  },
  visible: {
    type: Boolean,
    default: false,
  },
  model: {
    type: Object,
    default: () => {},
  },
});

const roles = ref([]);
onMounted(() => {
  console.log('挂载')
  getRoles().then((res) => {
    roles.value = res.data;
  });
});

const formState = reactive({
  id: 0,
  name: "",
  mobile: "",
  roles: [],
});
const { model } = toRefs(props);
const initForm = () => {
  // formState.id = model.value.id;
  // formState.name = model.value.name;
  // formState.mobile = model.value.mobile;
  // formState.roles = model.value.roles;
  Object.assign(formState, model.value)
};
watch(model, initForm);

const checkPwd = (rule, value, callback) => {
  if (value && value.length < 6) {
    return Promise.reject("密码长度最低6位");
  }
  return Promise.resolve();
};

const checkConfirm = (rule, value, callback) => {
  if (formState.password !== value) {
    return Promise.reject("两次密码不一致");
  }
  return Promise.resolve();
};

const handleFinish = (values) => {
  console.log(values);
};

const emit = defineEmits(["cancel"]);

const onCancel = () => {
  emit("cancel", false);
};
</script>

<style lang="less" scoped></style>
