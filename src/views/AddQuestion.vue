<template>
	<div class="container">
		<Spin size="large" fix v-if="spinShow"></Spin>
		<Divider orientation="left">题目管理</Divider>
		<Form :label-width="150" class="form-info" :model="formData" :rules="rules" ref="dataForm">
			<FormItem label="题目顺序:">
				<!-- <Input v-model="" type="number" class="input-w" placeholder="输入1-10的数字" ma /> -->
				<InputNumber :max="10" :min="1" :step="1" v-model="formData.ord"></InputNumber>
			</FormItem>
			<FormItem label="问题:" prop="content">
				<Input v-model="formData.content" type="textarea" :rows="4" placeholder="输入问题" class="input-2w"  />
			</FormItem>
			<FormItem label="选项a:" prop="first">
				<Input v-model="formData.first" class="input-2w" placeholder="请输入选项A" />
			</FormItem>
			<FormItem label="选项b:" prop="second">
				<Input v-model="formData.second" class="input-2w" placeholder="请输入选项B" />
			</FormItem>
			<FormItem label="选项c:" prop="thirdly">
				<Input v-model="formData.thirdly" class="input-2w" placeholder="请输入选项C" />
			</FormItem>
			<FormItem label="选项d:">
				<Input v-model="formData.fourthly" class="input-2w" placeholder="请输入选项D" />
			</FormItem>
			<FormItem label="答案:">
				<Select v-model="answers" multiple style="width:400px">
					<Option v-for="item in answerList" :value="item" :key="item">{{ item }}</Option>
				</Select>
			</FormItem>
			<FormItem>
				<Button type="primary" @click="add">{{ id ? '修改题目' : '添加题目' }}</Button>
			</FormItem>
		</Form>
	</div>
</template>

<script>
import { addQuestion, getQuestions } from "@/http/http.js"
import moment from "moment";
export default {
	data () {
		return {
			time: null,
			id: null,
			spinShow: false,
			answerList:['a','b','c','d'],
			answers: [],
			formData:{
				ord: null,
				content: '',
				first: '',
				second: '',
				thirdly: '',
				fourthly: '',
			},
			columns:[
				{
					title: "序号",
					key: "index",
					width: 50
				},
				{
					title: "内容",
					slot: "answer",
				}
			],
			rules: {
				content: [
					{ required: true, message: '请输入问题', trigger: 'blur' },
				],
				first:  [
					{ required: true, message: '请输入选项A', trigger: 'blur' },
				],
				second:  [
					{ required: true, message: '请输入选项B', trigger: 'blur' },
				],
				thirdly:  [
					{ required: true, message: '请输入选项C', trigger: 'blur' },
				]
			}
		}
	},
	methods: {
		add() {
			this.$refs['dataForm'].validate((valid) =>{
                if(valid){
					const params = {
						time: this.time,
						...this.formData,
					}
					if(this.answers.length > 1){
						params['answer'] = this.answers.join(",");
						params['enable'] = 1;
					}else{
						params['answer'] = this.answers[0];
						params['enable'] = 0;
					}
                    if(this.id){
						this.reserve(params)
                    }else{
						this.addqe(params)
                    }
                }
            })
		},
		init(){
			const params = {
				id: this.id,
				type: 4
			}
			addQuestion(params).then(res => {
				this.formData = res.data;
				this.answers = res.data.answer.split(",");
			})
		},
		//修改
		reserve(params){
			params['id'] = this.id;
			params['type'] = 3;
			addQuestion(params).then(res => {
				this.spinShow = false;
				this.$Message.success("修改成功");
				this.tohome();
			})
		},
		//新增
		addqe(params){
			params['type'] = 1;
			addQuestion(params).then(res => {
				this.spinShow = false;
				this.tohome();
			})
		},
		//确认提示
		custom() {
			this.$Modal.confirm({
				title: '添加成功',
				okText: '继续添加',
				cancelText: '返回列表',
				onOk: () => {
					this.$router.go(0)
				},
				onCancel: () => {
					this.tohome();
				}
			});
		},
		//查看当日题目数量
		getNum(){
			const { time } = this;
            getQuestions({time}).then(res => {
				const num = res.data.length;
				return num;
			}).then(num =>{
				console.log(num);
				if( num < 10 ){
					this.custom();
				}else{
					this.$Message.success("当前日期题目添加完成");
					this.tohome();
				}
			})
		},
		tohome() {
			this.$router.push({
				name: "home",
				query: {
					time: this.time
				}
			})
		}
	},
	mounted () {
		if( this.$route.query.id ){
			this.id = this.$route.query.id;	
			this.init();		
		}
		if( this.$route.query.time ){
			this.time = this.$route.query.time;
		}
	}
}
</script>

<style scoped>
.container{
	background: #fff;
	flex: auto;
	position: relative;
}
span.input-w{
	display: inline-block;
	margin: 0 5px;
}
.input-2w{
	width: 800px;
}
.input-w{
	width: 200px;
}
</style>
