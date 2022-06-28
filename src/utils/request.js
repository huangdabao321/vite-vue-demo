import axios from "axios";
import { message } from "ant-design-vue";
import { getItem, setItem } from "@/utils/storage";
import { TOKEN } from "@/config/type";
import settings from "@/config/index";

const instance = axios.create({
  baseURL: settings.apiPrefix,
  timeout: 3000,
  headers: {
    'Content-Type': 'application/json',
  }
})

instance.interceptors.request.use(function(config){
  const token = getItem(TOKEN)
  if (token) {
    config.headers = {
      Authorization: 'Bearer ' + token,
    }
  }
  return config
}, function (error){
  return Promise.reject(error)
})

instance.interceptors.response.use(function(response){
  const data = response.data
  const { accessToken, expireIn } = data.data
  if (accessToken) {
    setItem(TOKEN, accessToken, expireIn)
  }
  return Promise.resolve(data)
}, function(error){
  const { response } = error
  if (response) {
    if (response.status === 401 ) {
      message.error('身份校验失败')
      window.location.href = '/user/login'
    }
  }
  return Promise.reject(error)
})

export default instance