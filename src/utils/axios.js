import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '../store'
import { getToken } from '@/utils/auth'

// 创建axios实例
let service =  axios.create({
	baseURL: process.env.BASE_API, //process.env.BASE_API, // api的base_url 'https://sendheart.dreamer-inc.com'
	headers: {
		'content-type':'application/x-www-form-urlencoded',
		//'Access-Control-Allow-Origin': '*',
		//'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
		//'Access-Control-Allow-Methods': 'GET, POST, PUT,DELETE',
		//'Accept': 'application/json'
	},
	timeout: 5000 // 请求超时时间
})
// request拦截器
service.interceptors.request.use(config => {
	if(store.getters.token) {
		config.headers['Authorization'] = "Token " + getToken('Token') // 让每个请求携带自定义token 请根据实际情况自行修改
	}
	return config
}, error => {
	console.log('axios return error:',error) // for debug
	Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
   /**
    * code:200,接口正常返回;
    */
    const res = response.data
	if(res.status=='y'){
		//console.log('http response:',response.data)
		if(res.all_rows){
			let ret = {
				'result':res.result,
				'total':res.all_rows,
			}
			return ret
		}else{
			return res.result
		}
	} 
	 
    if (res.code !== 200) {
      Message({
        message: res.info?res.info:res.message,
        type: 'error',
        duration: 5 * 1000
      })
      // 根据服务端约定的状态码：5001:非法的token; 5002:其他客户端登录了; 5004:Token 过期了;
      if (res.code === 5001 || res.code === 5002 || res.code === 5004) {
          MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
            confirmButtonText: '重新登录',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            store.dispatch('LogOut').then(() => {
              location.reload()// 为了重新实例化vue-router对象 避免bug
            })
          })
      }
      return Promise.reject(res)
    } else { // res.code === 200,正常返回数据
		console.log('http response:',response.data)
        return response.data
    }
	 
  },
  error => {
    Message({
      message: error.info?error.info:error.message,
      type: 'error',
      duration: 5 * 1000
    })
	console.log('http request error:',error.message)
    return Promise.reject(Message)
  }
)

export default service
