<template>
<div class="product">
	<div class="content">
		<Spin size="large" fix v-if="loading"></Spin>
		<Divider orientation="left">验票取票</Divider>
		<Form class="form-info">
			<FormItem label="手机号:">
				<Input class="input-3w"></Input>
			</FormItem>
			<FormItem label="验证码:">
				<Input class="input-2w"></Input>
			</FormItem>
			<FormItem>
				<Button type="primary">验票</Button>
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
	}
}
</script>

<style>
</style>
