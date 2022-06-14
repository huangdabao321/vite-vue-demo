import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import { message } from 'ant-design-vue'
import 'ant-design-vue/es/message/style/css'

const app = createApp(App)

app.use(router)

app.mount('#app')

app.config.globalProperties.$message = message
