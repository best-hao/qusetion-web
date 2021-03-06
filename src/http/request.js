//const baseurl = "/api"
const baseurl = "/"
import axios from 'axios'
import { Message } from 'iview'

const instance = axios.create({
	baseURL: baseurl,
})

const codeMessage = {
  200: '服务器成功返回请求的数据',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据,的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器',
  502: '网关错误',
  503: '服务不可用，服务器暂时过载或维护',
  504: '网关超时',
};

/* 请求拦截器 */
instance.interceptors.request.use(function (config) { 
	let token = localStorage.getItem("token")
	if (token) {
		token = 'Bearer ' + token;
		config.headers.common['Authorization'] = token;
	}
	return config
}, function (error) {
	return Promise.reject(error)
})


export const get = (url, params) => {
	return new Promise((resolve, reject) => {
		instance.get(url, {params:params})
			.then((res) => {
				console.log(res.data)
				if(	res.data.errcode === 0  ){
					resolve(res.data)
				}else{
					Message.error(res.data.errmsg);
				}
			})
			.catch((error) => {
				const msg = codeMessage[error.response.status];
				console.error(error);
				Message.error(msg);
			})
	})
}

export const login = (url, params) => {
	return new Promise((resolve, reject) => {
		instance.get(url, {params:params})
			.then((res) => {
				if(	res.data.errcode === 0  ){
					resolve(res.data)
				}else{
					Message.error('用户名或密码错误');
				}
			})
			.catch((error) => {
				const msg = codeMessage[error.response.status];
				console.error(error);
				Message.error(msg);
			})
	})
}

export const resvice = (url, params) => {
	return new Promise((resolve, reject) => {
		instance.get(url, {params:params})
			.then((res) => {
				if(	res.data.errcode === 0  ){
					resolve(res.data)
				}else{
					Message.error('密码输入错误');
				}
			})
			.catch((error) => {
				const msg = codeMessage[error.response.status];
				console.error(error);
				Message.error(msg);
			})
	})
}

//订单导出
// export const download = (url, params) => {

// 	return new Promise((resolve, reject) => {
// 		const responseType = 'arraybuffer';
// 		instance.get(url,{ params, responseType })
// 			.then((res) => {
// 				console.log(res.data)
// 				if(	res.data.errcode === 0  ){
// 					resolve(res.data)
// 				}else{
// 					Message.error(res.data.errmsg);
// 				}
// 			})
// 			.catch((error) => {
// 				const msg = codeMessage[error.response.status];
// 				Message.error(msg);
// 			})
// 	})
// }



