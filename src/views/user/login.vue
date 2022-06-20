<template>
  <a-form :model="formState" @finish="onFinish">
    <a-form-item
      name="mobile"
      label="手机"
      :rules="[
        { required: true, message: '手机号不可为空' },
        { pattern: '/^1[3456789]\d{9}$/', message: '手机号格式错误' },
      ]"
    >
      <a-input v-model.value="formState.mobile" />
    </a-form-item>
    <a-form-item
      name="password"
      label="密码"
      :rules="[
        { required: true, message: '密码不可为空' },
        { min: 6, message: '密码最少6位' },
      ]"
    >
      <a-input v-model.value="formState.password" />
    </a-form-item>
    <a-form-item>
      <a-button type="primary" block htmlType="submit">登陆</a-button>
    </a-form-item>
  </a-form>
</template>

<script setup>
import { login } from "@/api/login";
import { reactive } from "@vue/reactivity";

const formState = reactive({
  mobile: "",
  passowrd: "",
});

const onFinish = (values) => {
  login(values).then((res) => {
    console.log("login", res);
  });
};
</script>

<style lang="scss" scoped></style>
