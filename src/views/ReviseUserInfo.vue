<template>
    <div class="login">
		<div class="login-card">
            <Card shadow title="修改密码" class="card">
                <a href="#" slot="extra" @click.prevent="toIndex">
                    <Icon type="md-backspace" class="return" />
                </a>
				<Form ref="passwordForm" :model="passwordData" :rules="passwordRules" :label-width="80">
					<FormItem prop="password" label="原密码" >
						<Input type="password" class="input-2w" v-model="passwordData.password" placeholder="请输入原始密码" />
					</FormItem>
					<FormItem prop="newPass" label="新密码">
						<Input type="password" class="input-2w" v-model="passwordData.newPass" placeholder="请输入新密码" />
					</FormItem>
                    <FormItem prop="newPassAgin" label="重新输入">
						<Input type="password" class="input-2w" v-model="passwordData.newPassAgin" placeholder="请重新输入新密码" />
					</FormItem>
					<FormItem>
						<Button type="primary" class="input-2w" long @click="revisePass">确认修改</Button>
					</FormItem>
				</Form>
			</Card>
		</div>
	</div>
</template>

<script>
import { revisePassword } from '../http/http.js';
export default {
    data () {
        const validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入新密码'));
            } else {
                if (this.passwordData.newPassAgin !== '') {
                    this.$refs.passwordForm.validateField('newPassAgin');
                }
                callback();
            }
        };
        const validatePassCheck = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请重新输入新密码'));
            } else if (value !== this.passwordData.newPass) {
                callback(new Error('俩次输入的密码不一致'));
            } else {
                callback();
            }
        };
        return{
            passwordData: {
                password: '',
                newPass: '',
                newPassAgin: ''
            },
            passwordRules:{
                password: [
                    { required: true, message: '请输入原始密码', trigger:'blur' }
                ],
                newPass: [
                    { validator: validatePass, trigger: 'blur' },
                ],
                newPassAgin: [
                    { validator: validatePassCheck, trigger: 'blur' },
                ]
            }  
        }
    },
    methods: {
        revisePass() {
            this.$refs['passwordForm'].validate((valid) => {
                if(valid){
                    const params = {
                        ord: this.passwordData.password,
                        password: this.passwordData.newPass
                    };
                    revisePassword(params).then( res => {
                        this.$Message.success('修改成功！');
                        this.toIndex();
                    })
                }
            })
            
        },
        toIndex(){
            this.$router.replace('/');
        }
    },
    mounted() {
        
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
	width: 360px;
	margin: 0 auto;
}
.return{
    font-size: 26px;
}
</style>
