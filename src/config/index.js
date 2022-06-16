import { isDev } from "../utils/tools"
export default {
  apiUrl: isDev ? 'dev.api' : 'pro.api',
  title: 'vite-vue3-demo'
}