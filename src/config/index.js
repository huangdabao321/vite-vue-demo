import { isDev } from "../utils/tools"
const settings =  {
  apiUrl: isDev ? 'dev.api' : 'pro.api',
  webSiteName: 'vite-vue3-demo'
}

export default settings