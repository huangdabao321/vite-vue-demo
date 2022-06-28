import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index";
import  store  from "@/store/index";
import { message } from "ant-design-vue";
import "ant-design-vue/es/message/style/css";
import "./global.less";
import "./permission";

const app = createApp(App);

app.use(store);
app.use(router);
app.mount("#app");

app.config.globalProperties.$message = message;

