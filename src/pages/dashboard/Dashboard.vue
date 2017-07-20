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
			<aside class="sidebar el-menu--dark" :class="collapsed?'collapsed':'expandeds'">
				<el-scrollbar tag="div" class="scrollbar-box">
					<div class="tools" @click.prevent="collapse" :class="collapsed?'collapsed':'expandeds'">
					</div>
					<el-menu :default-active="($route.matched[1]&&$route.matched[1].meta.active)||$route.path" :default-openeds="states.defaultOpen||['']" class="el-menu-vertical-demo" :unique-opened="false" router theme="dark">
						<template v-for="(item,index) in menuList" v-if="!item.meta.nomenu">
							<el-submenu :index="item.path" v-if="item.children&&item.children.length>0" :key="item.path">
								<template slot="title">
									<i class="sidebar-iconfont iconfont" :class="[item.meta.icon]"></i>{{item.meta.name}}
								</template>
								<el-menu-item v-for="child in item.children" :index="child.state" :key="child.state">
									<i class="submenu-iconfont iconfont icon-iconfonticonfontyuandian"></i>{{child.meta.name}}
								</el-menu-item>
							</el-submenu>
							<el-menu-item v-if="!item.children" :index="item.state">
								<i class="sidebar-iconfont iconfont" :class="[item.meta.icon]"></i>{{item.meta.name}}
							</el-menu-item>
						</template>
					</el-menu>
				</el-scrollbar>
			</aside>
			<section class="content-container" :class="collapsed?'content-collapsed':'content-expanded'">
				<div class="grid-content bg-purple-light">
					<el-col :span="24" class="breadcrumb-container">
						<i class="iconfont " :class="setionHeardClass"></i>
						<span v-text="setionHeardName"></span>
					</el-col>
					<el-col :span="24" class="content-wrapper">
						<transition name="fade" mode="out-in">
							<keep-alive include="Logistic,supplier,order">
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
            sysName: '云供应链平台端', // title
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
			// if (document.createEvent) {      
			//     var event = document.createEvent('HTMLEvents');  
			//     event.initEvent('resize', true, true); 
			//     window.dispatchEvent(event);
			// } else if (document.createEventObject) {
			//     window.fireEvent('onresize');
			// }    
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
@import '../../style/mixin.scss';
$menuWidth: 180px;
$menuHeight: 50px;
$topColor: #20a0ff;
$transition-time:.2s;
.border-menu-style {
	border-top: 1px #50576a solid;
	border-bottom: 1px #2d3446 solid;
}

.container {
	position: absolute;
	top: 0px;
	bottom: 0px;
	width: 100%; //head 头部
	.header {
		height: $menuHeight;
		line-height: $menuHeight;
		color: #fff;
		@include bg-linear-gradients;
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
			line-height: $menuHeight;
			font-size: 26px;
			font-family: "黑体", "微软雅黑", "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei";
			font-weight: bold;
			padding-left: 20px;
			letter-spacing: 1px;
		}
	} //主体
	.main {
		display: flex;
		position: absolute;
		top: $menuHeight;
		bottom: 0px;
		overflow: hidden;
		//菜单
		.sidebar {
			position: absolute;
			height: 100%;
			z-index: 22; //展开
			&.expandeds {
				@include menuchange($menuWidth, width);
			} //收缩
			&.collapsed {
				@include menuchange($menuWidth - 127px, width);
			} //icon
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
			.submenu-iconfont {
				@extend .sidebar-iconfont;
				font-size: 16px;
				color: #feac31;
			}
			.scrollbar-box {
				//侧边栏盒子
				height: 100%;
				.el-scrollbar__wrap {
					height: 100%;
					.el-scrollbar__view {
						position: relative;
						height: 100%;
						.tools {
							position: absolute;
							top: 0;
							height: 56px;
							left: 0;
							z-index: 999;
							cursor: pointer;
							background: rgba(255, 255, 255, 0);
							&.expandeds {
								width: $menuWidth;
							} //收缩
							&.collapsed {
								width: $menuWidth - 127px;
							}
						}
					}
				}
			}
			.el-menu {
				width: $menuWidth + 6px;
				height: 100%;
				position: relative;
				left: -3px;
				.el-menu-item {
					@extend .border-menu-style;
					&:nth-of-type(1) {
						border-top: none;
					}
				}
				.el-submenu {
					@extend .border-menu-style;
					.el-menu-item {
						padding-left: 28px !important;
						border: none;
					}
				}
			}
		}
		//内容部分
		.content-container {
			flex: 1;
			overflow-y: auto;
			padding: 0 0 20px 0;
			position: relative; 
			&.content-expanded {//展开
				margin-left: $menuWidth;
				transition: all $transition-time;
			} 
			&.content-collapsed {//收缩
				margin-left: $menuWidth - 127px;
				transition: all $transition-time;
			}
			//内容头部
			.breadcrumb-container {        
				font-size: 14px;
				font-weight: bold;
				color: #666;
				height: 50px;
				background: #f4f4f4;
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
				padding: 0 10px;
				box-sizing: border-box;
			}
		}
	}
}
</style>
