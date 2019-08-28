<template>
	<div class="container">
		<Spin size="large" fix v-if="spinShow"></Spin>
		<Divider orientation="left">用户信息</Divider>
		<Form :label-width="150" class="form-info" :model="formData">
			<FormItem label="姓名:">
				<Input class="input-2w" v-model="formData.name" placeholder=""/>
			</FormItem>
			<FormItem label="头像:">
				<Avatar :src="formData.personPic" />
			</FormItem>
			<FormItem label="乡:">
				<Input class="input-2w" v-model="formData.village" placeholder=""/>
			</FormItem>
			<FormItem label="镇:">
				<Input class="input-2w" v-model="formData.twon" placeholder=""/>
			</FormItem>
			<FormItem label="机关:">
				<Input class="input-2w" v-model="formData.officeDetail" placeholder=""/>
			</FormItem>
			<FormItem label="分数:">
				{{formData.total}}
			</FormItem>
			<FormItem>
				<Button type="primary" @click="submit">修改用户信息</Button>
			</FormItem>
		</Form>
	</div>
</template>

<script>
import { revisePeo, getPeople } from "@/http/http.js"

export default {
	data () {
		return {
			spinShow: false,
			id: null,
			formData:{	
				id: "",
				personPic: "",
				name: "",
				twon: "",
				village: "",
				officeDetail: "",
				total: null,
			},
		}
	},
	methods: {
		init(){
			this.spinShow = true;
			const { id } = this;
			getPeople({ id }).then(res => {
				this.formData = res.data.results[0];
				this.spinShow = false;
			})
		},
		submit(){
			const params = this.formData;
			revisePeo(params).then(res => {
				this.$Message.success('修改成功')
			})
		}
	},
	mounted () {
		this.id = this.$route.params.id;
		this.init()
	}
}
</script>

<style scoped>
.container{
	background: #fff;
	flex: auto;
	position: relative;
}
.input-2w{
	width: 200px;
}
</style>