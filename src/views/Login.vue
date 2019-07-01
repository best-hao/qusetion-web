<template>
	<div class="login">
		<div class="login-card">
			<h2 class="title">党员答题后台管理系统</h2>
			<Card shadow title="欢迎登录" class="card">
				<Form ref="loginForm" :model="formData" :rules="rules">
					<FormItem prop="name">
						<Input type="text" v-model="formData.name" placeholder="请输入用户名">
							<Icon type="ios-person-outline" slot="prepend"></Icon>
						</Input>
					</FormItem>
					<FormItem prop="password">
						<Input type="password" v-model="formData.password" placeholder="请输入密码">
							<Icon type="ios-lock-outline" slot="prepend"></Icon>
						</Input>
					</FormItem>
					<FormItem>
						<Button type="primary" long @click="toLogin">登录</Button>
					</FormItem>
				</Form>
			</Card>
		</div>
	</div>
</template>

<script>
import { loginto } from "../http/http.js"	

export default{
	data () {
		return {
			formData:{
				name: '',
				password: ''
			},
			rules:{
				name: [
					{ required: true, message: '用户名不能为空', trigger: 'blur' }
                ],
				password: [
					{ required: true, message: '密码不能为空', trigger: 'blur' }
				]
			}
		}
	},
	methods:{
		toLogin(){
			this.$refs['loginForm'].validate((valid) => {
	            if (valid) {
					const params = this.formData;
					const name = this.formData.name;
					loginto(params).then(res =>{
						localStorage.setItem('username',name);
						this.$router.replace("/");
						this.$Message.success('登录成功!');
					})
	            }
	        })
		}
	}
}
</script>

<style scoped>
.login{
	background: #f5f7f9;
	width: 100%;
	height: 100%;
	overflow: hidden;
	background: url(../assets/bg02.jpg) no-repeat center/cover;
}
.login-card{
	width: 100%;
	margin-top: 10%;
	letter-spacing: 1px;
}
.login-card .card{
	width: 300px;
	margin: 0 auto;
}
.title{
	display: flex;
	align-items: center;
	justify-content: center;
	color: #fff;
	margin: 20px 0;
}
.title>img{
	width: 60px;
	margin-right: 10px;
}
</style>
