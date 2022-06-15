import axios from "axios";
import { message } from "ant-design-vue";
import { TOKEN } from "../config/type";
import { getItem, setItem } from "./storage";

const instance = axios.create({
  baseURL: process.env,
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

instance.interceptors.response.use(function(res){
  const { accessToken, expireIn } = res.data
  if (accessToken) {
    setItem(TOKEN, accessToken, expireIn)
  }
  return Promise.resolve(res)
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