<template>
  <div class="login-container">
    <h1 class="site-name">{{ settings.webSiteName }}</h1>
    <a-form
      :model="formState"
      autocomplete="off"
      @finish="onFinish"
      @finishFailed="onFinishFailed"
      class="login-form"
    >
      <a-form-item
        name="mobile"
        label="手机"
        :rules="[
          { required: true, message: '手机号不可为空' },
          { pattern: /^1[3456789]{1}\d{9}$/, message: '手机号格式错误' },
        ]"
      >
        <a-input v-model:value="formState.mobile" />
      </a-form-item>
      <a-form-item
        name="password"
        label="密码"
        :rules="[
          { required: true, message: '密码不可为空' },
          { min: 6, message: '密码最少6位' },
        ]"
      >
        <a-input type="password" v-model:value="formState.password" />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" block htmlType="submit">登陆</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { reactive } from "@vue/reactivity";
import { login } from "@/api/login";
import settings from "@/config";
import { message } from "ant-design-vue";

const router = useRouter();

const formState = reactive({
  mobile: "13888888888",
  password: "123456",
});

const onFinish = (values) => {
  login(values)
    .then((res) => {
      router.push({ path: "/welcome" });
    })
    .catch((error) => {
      message.error(error.message);
    });
};
const onFinishFailed = (values, errorFields, outOfData) => {
  console.log("onFinishFailed");
};
</script>

<style lang="less" scoped>
@root-entry-name: default;
@import "ant-design-vue/dist/antd.less";
.login-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .ant-form {
    width: 100%;
  }
}

@media screen and (min-width: 750px) {
  .login-container {
    width: 25vw;
    height: 40vh;
  }
}
@media screen and (max-width: 750px) {
  .login-container {
    width: 80vw;
    height: 80vh;
  }
}
.site-name {
  color: @primary-color;
}
</style>
