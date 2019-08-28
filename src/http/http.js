import { get , login, resvice} from './request.js';

//登录接口获取token
export const loginto = params => login('api/back/account/login', params)
//修改密码
export const revisePassword = params => resvice('api/back/account/accupdate', params)
//根据日期查询题目列表
export const getQuestions = params => get('api/back/subject/findlist',params)
//增加.删除题目
export const addQuestion = params => get('api/back/subject',params)
//根据日期查询题目列表
export const getPeople = params => get('api/back/account/list',params)
//所有题目列表
export const questionList = () => get('/api/back/subject/findTmelist')
//删除用户
export const deletePeo = id => get(`/api/back/account/delect?id=${id}`)
//修改用户
export const revisePeo = params => get("api/back/account/update", params)
//订单导出
//export const exportOrder = params => download("api/back/account/export", params)



