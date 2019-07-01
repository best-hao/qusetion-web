import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/views/Layout'

Vue.use(Router)

export default new Router({
	mode: 'history',
	routes: [
		{
			path: '/',
			component: Layout,
			children:[
				{
					path: '/',
					redirect: '/home'
				},
				{
					path: '/home',
					name: 'home',
					component: resolve => require(['@/views/Question'], resolve)
				},
				{
					path: '/people',
					name: 'people',
					component: resolve => require(['@/views/People'], resolve)
				},
				{
					path: '/add',
					name: 'add',
					component: resolve => require(['@/views/AddQuestion'], resolve)
				},
				{
					path: '/info/:id',
					name: 'info',
					component: resolve => require(['@/views/PeopleDetail'], resolve)
				}
			]
		},
		{
			path: '/login',
			name: 'login',
			component: resolve => require(['@/views/Login'], resolve)
		},
		{
			path: '/revise',
			name: 'revise',
			component: resolve => require(['@/views/ReviseUserInfo'], resolve)
		},
		{
			path: '/*',
			redirect: '/'
		}
	]
})
