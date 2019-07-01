<template>
	<div class="container">
		<!-- <div class="check-date">
			<DatePicker size="large" v-model="date" placeholder="选择日期"></DatePicker>
            <Button type="primary" class="add-btn">删选</Button>
			<Button type="primary" class="add-btn">导出</Button>
        </div> -->
		<div class="list">
			<Table :loading="loading" :columns="columns" :data="data" stripe border class="table">
				<template slot-scope="{ row, index }" slot="index">
					{{ index + 1 }}
				</template>
				<template slot-scope="{ row }" slot="date">
					{{ row.addTime | formatDate }}
				</template>
				<template slot-scope="{ row }" slot="action">
					<Button type="warning" size="small" style="margin-right: 5px" :to="{path:`/info/${row.id}`}">用户信息</Button>
					<Poptip
						confirm
						transfer
						title="删除后将无法恢复,确定删除?"
						@on-ok="deleteli(row.id)"
					>
						<Button type="error" size="small">删除</Button>
					</Poptip>
				</template>
			</Table>
			<div class="page-nav">
				<Page show-total  show-sizer/>
			</div>
		</div>
	</div>
</template>

<script>
import moment from "moment";
import { getPeople, deletePeo } from '@/http/http.js';
export default {
	data ()  {
		return {
			date: new Date(),
			loading: false,
			pageNum: 1,
			pageSize: 10,
			columns:[
				{
					title: "排名",
					slot: "index",
				},
				{
					title: "姓名",
					key: "name",
				},
				{
					title: "注册时间",
					slot: "date",
				},
				{
					title: "乡村",
					key: "village",
				},
				{
					title: "分数",
					key: "total",
				},				
				{
					title: "镇",
					key: "twon",
				},
				{
					title: "操作",
					slot: "action"
				}
			],
			data:[]
		}
	},
	methods: {
		// 修改
		revise(id){
			this.$router.push({
				name: 'addline',
				query: {
					id: id
				}
			})
		},
		getData(){
			this.loading = true;
			const { pageNum, pageSize } = this;
			const params = { pageNum, pageSize };
			getPeople().then( res => {
				this.data = res.data.results;
				this.loading = false;
			})
		},
		deleteli(id){
			deletePeo(id).then( res => {
				this.$Message.success('删除成功');
				this.getData();
			})
		}
	},
	mounted() {
		this.getData();
	},
	filters: {
		/* 格式化时间 */
		formatDate(date) {
			return moment(date).format('YYYY-MM-DD HH:mm:ss');
		},
	}
}
</script>

<style scoped>
.container{
	background: #fff;
	flex: auto;
	position: relative;
	width: 100%;
}
.check-date{
    margin: 20px;
}
.list{
    padding: 0 20px;
	margin-top: 20px;
}
.add-btn{
    margin-left: 20px;
}
</style>
