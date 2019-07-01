<template>
	<Layout class="layout">
		<Sider width="240" ref="siderNav" class="layout-sider">
			<h2 class="title">
				<span>你好！{{title}}</span>
			</h2>
			<Menu theme="dark" :active-name="3" @on-select="select">
				<MenuGroup title="题库">
					<MenuItem name="1" to="/home" >
						<Icon type="ios-paper" />
						题库管理
					</MenuItem>
				</MenuGroup>
				<MenuGroup title="用户">
					<MenuItem name="2" to="/people" >
						<Icon type="ios-people" />
						用户管理
					</MenuItem>
				</MenuGroup>
			</Menu>
		</Sider>
		<Layout>
			<Header class="layout-header-bar">
				<div class="nav-l">
					<Breadcrumb>
						<BreadcrumbItem>
							<Icon class="icon" type="ios-home-outline"></Icon>
							<span>Home</span>
						</BreadcrumbItem>
						<BreadcrumbItem>
							<Icon class="icon" :type="breadcrumb.icon"></Icon>
							<span>{{breadcrumb.label}}</span>
						</BreadcrumbItem>
					</Breadcrumb>
				</div>
				<div class="user-info" v-cloak>
					<Avatar class="user-head" icon="ios-person" />
					<Dropdown>
						{{title}}
						<Icon type="ios-arrow-down"></Icon>
						<DropdownMenu slot="list">
							<DropdownItem><span @click="link">修改密码</span></DropdownItem>
							<DropdownItem><span @click="logout">退出登录</span></DropdownItem>
						</DropdownMenu>
					</Dropdown>
				</div>
			</Header>
			<Content class="content">
				<router-view></router-view>
			</Content>
		</Layout>
	</Layout>
</template>

<script>

export default {
	data () {
		return {
			title: localStorage.getItem("username") ? localStorage.getItem("username") : 'admin',
			breadcrumb: {
				label: "题库管理",
				icon: "ios-paper"
			}
		}
	},
	mounted () {
	},
	methods: {
		select(value){
			console.log(value)
			if( value == 1 ){
				this.breadcrumb = {
					label: "题库管理",
					icon: "ios-paper"
				}
			}else{
				this.breadcrumb = {
					label: "用户管理",
					icon: "ios-people"
				}
			}
		},
		logout(){
			localStorage.removeItem("username");
			this.$router.push('/login');
		},
		collapsedSider () {
			this.$refs.siderNav.toggleCollapse();
		},
		link(type){
			this.$router.push({
				name: 'revise'
			})
		}	
	},
}
</script>

<style scoped>
.content{
	height: 100%;
	padding: 20px;
	box-sizing: border-box;
	display: flex;
}
.layout{
	height: 100%;
	overflow: hidden;
    background: #f5f7f9;
    position: relative;
    overflow: hidden;
}
.layout-sider{
	height: 100%;
	overflow-y: auto;
	overflow-x: hidden;
}
.title{
	text-align: center;
	padding-top: 30px;
	padding-bottom: 10px;
	color: #fff;
	display: flex;
	align-items: center;
	justify-content: center;
}
.layout-header-bar{
	background: #fff;
	box-shadow: 0 1px 1px rgba(0,0,0,.1);
	display: flex;
	justify-content: space-between;
}
.nav-l{
	display: flex;
}
.user-info{
	display: flex;
	align-items: center;
}
.user-head{
	margin-right: 15px;
	background-color: #87d068;
}
.icon{
	font-size: 22px;
}
.nav-icon{
	display: block;
	color: #515a6e;
	margin-right: 40px;
}
</style>
