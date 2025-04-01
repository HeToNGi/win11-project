// 引入 axios 库
import axios from 'axios'
// 创建一个自定义的 Axios 实例
const customAxios = axios.create({
  baseURL: 'http://localhost:8080', // 设置基本的请求 URL
  timeout: 20000, // 设置请求超时时间
  headers: {
    'Content-Type': 'application/json', // 设置请求头
  },
});

// 封装 GET 请求方法
export async function get(url, params) {
  try {
    const response = await customAxios.get(url, { params });
    return response.data;
  } catch (error) {
    console.error('GET 请求出错:', error);
    throw error;
  }
}

// 封装 POST 请求方法
export async function post(url, data) {
  try {
    const response = await customAxios.post(url, data);
    return response.data;
  } catch (error) {
    console.error('POST 请求出错:', error);
    throw error;
  }
}
