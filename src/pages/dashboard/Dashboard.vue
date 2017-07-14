<template>
	<el-row class="container">
		<el-col :span="24" class="header">
			<el-col :span="10" class="logo ">
				{{sysName}}
			</el-col>
			<el-col :span="4" class="userinfo">
				<el-dropdown trigger="hover">
					<span class="el-dropdown-link userinfo-inner">
						<img :src="this.sysUserAvatar" /> {{sysUserName}}
					</span>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item>我的消息</el-dropdown-item>
						<el-dropdown-item>设置</el-dropdown-item>
						<el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
			</el-col>
		</el-col>
		<el-col :span="24" class="main">
			<aside :class="collapsed?'collapsed':'expanded'" class="sidebar el-menu--dark">
				<el-scrollbar tag="div" class="scrollbar-box" >
					<el-menu :default-active="($route.matched[1]&&$route.matched[1].meta.active)||$route.path" :default-openeds="states.defaultOpen||['']" class="el-menu-vertical-demo" :unique-opened="false" router theme="dark">
						<template v-for="(item,index) in menuList" v-if="!item.meta.nomenu">
							<el-submenu :index="item.path" v-if="item.children&&item.children.length>0" :key="item.path">
								<template slot="title">
									<i class="sidebar-iconfont iconfont" :class="[item.meta.icon]"></i>{{item.meta.name}}
								</template>
								<el-menu-item v-for="child in item.children" :index="child.state" :key="child.state">{{child.meta.name}}</el-menu-item>
							</el-submenu>
							<el-menu-item v-if="!item.children" :index="item.state">
								<i class="sidebar-iconfont iconfont" :class="[item.meta.icon]"></i>{{item.meta.name}}
							</el-menu-item>
						</template>
					</el-menu>
				</el-scrollbar>
			</aside>
			<section class="content-container" :class="collapsed?'content-collapsed':'content-expanded'">
				<div class="tools" @click.prevent="collapse">
					<i :class="collapsed?'el-icon-d-arrow-right':'el-icon-d-arrow-left'"></i>
				</div>
				<div class="grid-content bg-purple-light">
					<el-col :span="24" class="breadcrumb-container">
						<i class="iconfont " :class="setionHeardClass"></i>
						<span v-text="setionHeardName"></span>
					</el-col>
					<el-col :span="24" class="content-wrapper">
						<transition name="fade" mode="out-in">
							<keep-alive include="Logistic,supplier">
								<router-view></router-view>
							</keep-alive>
						</transition>
					</el-col>
				</div>
			</section>
		</el-col>
	</el-row>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
export default {
    data () {
        return {
            sysName: '云供应链', // title
            collapsed: false, // 是否缩进
            sysUserName: '', // 客户名称
            menuList: [], // 菜单
            activeMenu: {
                classx: 'icon-index',
                name: '首页'
            },
            sysUserAvatar: ''
        };
    },
    methods: {
        ...mapMutations(['REFRESH', 'HEIGHTRESIZE']),
        ...mapActions({
            'userLoginout': 'logout',
            'getroles': 'getroles'
        }),
		/** 退出登 */
        logout () {
            this.$confirm('确认退出吗', '退出', {
                cancelButtonText: '取消',
                confirmButtonText: '确定',
                type: 'warning'
            }).then(() => {
                this.userLoginout().then(result => {
                    location.reload();// 为了重新实例化vue-router对象 避免bug
                });
            });
        },
		// 折叠导航
        collapse () {
            this.collapsed = !this.collapsed;
        }
    },
    mounted () {
        this.sysUserName = this.states.userInfo.userName;
        this.sysUserAvatar = 'http://dfs.test.cloudyigou.com/dfs/s2/M00/25/39/rB4r9Vk3mwWAdctcAAFf5pjzdHU212_100x100.jpg';
    },
    created () {
		// 判断用户是否登录
        if (!this.states.userInfo) {
            this.$router.push({ name: 'auth' });
        } else {
            this.menuList = this.states.routers;
        }
    },
	// F5刷新重新赋值
    computed: mapState({
		// 状态
        states: function (state) {
            if (!state.userInfo) {
                this.REFRESH();
            }
            return state;
        },
		// icon
        setionHeardClass () {
            return this.$route.meta.icon;
        },
		// name
        setionHeardName () {
            return this.$route.meta.name;
        } 
    })

};
</script>
 
<style  lang="scss">
$menuWidth: 180px;
$menuHeight: 50px;
$topColor: #20a0ff;
$transition-time:.2s;
.container {
	position: absolute;
	top: 0px;
	bottom: 0px;
	width: 100%; //head 头部
	.header {
		height: $menuHeight;
		line-height: $menuHeight;
		background: $topColor;
		color: #fff;
		.userinfo {
			text-align: right;
			padding-right: 35px;
			float: right;
			.userinfo-inner {
				cursor: pointer;
				color: #fff;
				img {
					width: 30px;
					height: 30px;
					border-radius: 20px;
					margin: 10px 0px 10px 10px;
					float: right;
				}
			}
		}
		.logo {
			font-size: 22px;
			padding-left: 20px;
			width: $menuWidth;
			img {
				width: 30px;
				float: left;
				margin: 10px 10px 10px 18px;
			}
			.txt {
				color: #fff;
			}
		}
	} //主体
	.main {
		display: flex;
		position: absolute;
		top: $menuHeight;
		bottom: 0px;
		overflow: hidden;
		.sidebar {
			position: absolute;
			height: 100%;
			z-index: 22;
			.sidebar-iconfont {
				vertical-align: baseline;
				margin-right: 15px;
				font-style: normal;
				font-weight: 400;
				font-variant: normal;
				text-transform: none;
				line-height: 1;
				vertical-align: baseline;
				display: inline-block;
				-webkit-font-smoothing: antialiased;
				position: relative;
				font-size: 21px;
				top: 2px;
			}
			.scrollbar-box {
				height: 100%;
				.el-scrollbar__wrap {
					height: 100%;
					.el-scrollbar__view {
						height: 100%;
					}
				}
			}
			.el-menu {
				width: 180px;
				height: 100%;
			} 
			.el-submenu .el-menu-item{
				padding-left: 58px !important;
			}
			
			&:hover{
				width:180px;
				transition: width $transition-time;
			}
			
		}
		//展开
		.expanded {
			width:180px;
			transition: width $transition-time; 
		}
		//收缩
		.collapsed {
			width:53px;
			transition: width $transition-time; 
			.el-menu {
				position:relative;
				left:-3px;
			} 
		}
		//展开
		.content-expanded {
			margin-left:180px;
			transition: all $transition-time; 
		}
		//收缩
		.content-collapsed {
			margin-left:53px;
			transition: all $transition-time;
		}
		.content-container {
			flex: 1;
			overflow-y: auto;
			padding: 0 0 20px 0;
			position: relative;
			.breadcrumb-container {
				font-size: 14px;
				font-weight: bold;
				color: #666;
				height: 50px;
				background: #fff;
				line-height: 50px;
				margin-bottom: 10px;
				border-bottom: 1px solid #ccc;
				i {
					padding-left: 20px;
					font-size: 20px;
					color: #999;
					line-height: 50px;
				}
				span {
					position: relative;
					top: -2px;
					left: 5px;
				}
			}
			.content-wrapper {
				padding: 0 10px 0 20px;
				box-sizing: border-box;
			}
			.tools {
				position: absolute;
				top: 46%;
				height: 87px;
				width: 14px; //background:rgba(49,49,49,0.6);
				border-radius: 2px;
				left: 0;
				cursor: pointer;
				i {
					font-size: 14px;
					line-height: 87px;
					text-align: center;
					color: $topColor;
				}
			}
		}
	}
}
</style>
