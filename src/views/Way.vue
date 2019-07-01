<template>
	<div class="product">
		<div class="content">
			<Spin size="large" fix v-if="loading"></Spin>
			<Divider orientation="left">路线行程</Divider>
			<Form class="form-info" :label-width="150">
				<FormItem label="往返交通:">
					<Select placeholder="选择交通" class="input-2w">
						<Option label="1">汽车</Option>
						<Option label="2">飞机</Option>
					</Select>
					<Select placeholder="选择交通" class="input-2w">
						<Option label="1">汽车</Option>
						<Option label="2">飞机</Option>
					</Select>
				</FormItem>
				<FormItem label="天数:">
					<Select class="input-w">
						<Option label="1">1</Option>
						<Option label="1">2</Option>
					</Select>
					<span class="between">天</span>
					<Select class="input-w">
						<Option label="1">1</Option>
						<Option label="1">2</Option>
					</Select>
					<span class="between">晚</span>
				</FormItem>
				<FormItem label="集合出发城市:">
					<Input class="input-2w"></Input>
				</FormItem>
				<FormItem label="返回抵达城市:">
					<Input class="input-2w"></Input>
				</FormItem>
				<FormItem label="集合出发时间:">
					<DatePicker type="datetime" placeholder="出发时间"></DatePicker>
				</FormItem>
				<FormItem label="返回抵达时间:">
					<DatePicker type="datetime" placeholder="抵达时间"></DatePicker>
				</FormItem>
				<FormItem label="路线行程:">
					
				</FormItem>
			</Form>
		</div>
	</div>
</template>

<script>
export default {
	data () {
		return {
			loading: false,
		}
	},
	mounted() {
		this.loading = true;
		setTimeout(() => {
			this.loading = false;
		},1500)
	}
}
</script>

<style>

</style>
