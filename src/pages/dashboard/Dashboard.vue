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
			<aside :class="collapsed?'menu-collapsed':'menu-expanded'" class="sidebar el-menu--dark">
				<el-scrollbar tag="div" class="scrollbar-box" v-show="!collapsed">
					<el-menu :default-active="$route.path" class="el-menu-vertical-demo" unique-opened router theme="dark">
						<template v-for="(item,index) in menuList" v-if="!item.hidden">
							<el-submenu :index="index+''" v-if="item.son&&item.son.length>0" :key="index">
								<template slot="title">
									<i :class="[font,item.icon]"></i>{{item.name}}
								</template>
								<el-menu-item v-for="child in item.son" :index="child.state" :key="child.state" v-if="!child.hidden">{{child.name}}</el-menu-item>
							</el-submenu>
							<el-menu-item v-if="!item.son" :index="item.state">
								<i :class="[font,item.icon]"></i>{{item.name}}
							</el-menu-item>
						</template>
					</el-menu>
				</el-scrollbar>
				<!--导航菜单-折叠后-->
				<ul class="el-menu--dark el-menu-vertical-demo collapsed" v-show="collapsed" ref="menuCollapsed">
					<li v-for="(item,index) in menuList" v-if="!item.hidden" class="el-submenu item">
						<template v-if="item.son&&item.son.length>0">
							<div class="el-submenu__title" style="padding-left: 20px;" @mouseover="showMenu(index,true)" @mouseout="showMenu(index,false)">
								<i :class="[font,item.icon]"></i>
							</div>
							<ul class="el-menu submenu" :class="'submenu-hook-'+index" @mouseover="showMenu(index,true)" @mouseout="showMenu(index,false)">
								<li v-for="child in item.son" v-if="!child.hidden" :key="child.state" class="el-menu-item" style="padding-left: 40px;" :class="$route.path==child.state?'is-active':''" @click="$router.push(child.state)">{{child.name}}</li>
							</ul>
						</template>
						<template v-else>
							<li class="el-submenu">
								<div class="el-submenu__title el-menu-item" style="padding-left: 20px;height: 56px;line-height: 56px;padding: 0 20px;" :class="$route.path==item.state?'is-active':''" @click="$router.push(item.state)">
									<i :class="[font,item.icon]"></i>
								</div>
							</li>
						</template>
					</li>
				</ul>
	
				<!--导航菜单-->
				<div class="tools" @click.prevent="collapse">
					<i :class="collapsed?'el-icon-d-arrow-right':'el-icon-d-arrow-left'"></i>
				</div>
			</aside>
			<section class="content-container">
				<div class="grid-content bg-purple-light">
					<el-col :span="24" class="breadcrumb-container">
						<i class="iconfont icon-index"></i>
						<span>首页</span>
					</el-col>
					<el-col :span="24" class="content-wrapper">
						<transition name="fade" mode="out-in">
							<router-view></router-view>
						</transition>
					</el-col>
				</div>
			</section>
		</el-col>
	</el-row>
</template>

<script>
import createMenu from '@/config/menu.js';
import SweetAlert from '@/services/sweetalert';
import { mapState, mapMutations, mapActions } from 'vuex';
// import CONFIG from '@/config/app.config';
export default {
    data () {
        return {
            sysName: '云供应链', // title
            collapsed: false, // 是否缩进
            sysUserName: '', // 客户名称
            menuList: '', // 菜单
            sysUserAvatar: '',
            font: 'sidebar-iconfont iconfont'
        };
    },
    methods: {
        ...mapMutations(['REFRESH', 'HEIGHTRESIZE']),
        ...mapActions({
            'userLoginout': 'logout',
            'getroles': 'getroles'
        }),
		/** 退出登 */
        logout: function () {
            var self = this;
            SweetAlert.confirm({
                title: '确认退出吗',
                cancelButtonText: '取消',
                confirmButtonText: '确定',
                width: '300px',
                showCancelButton: true,
                showLoaderOnConfirm: true,
                allowOutsideClick: false,
                preConfirm: function () {
                    return self.userLoginout();
                }
            }).then(result => {
                SweetAlert.success('操作成功');
                self.$router.push('/auth');
            });
        },
		// 折叠导航
        collapse () {
            this.collapsed = !this.collapsed;
            if (document.createEvent) {
                var event = document.createEvent('HTMLEvents');
                event.initEvent('resize', true, true);
                window.dispatchEvent(event);
            } else if (document.createEventObject) {
                window.fireEvent('onresize');
            }
        },
        showMenu (i, status) {
            this.$refs.menuCollapsed.getElementsByClassName('submenu-hook-' + i)[0].style.display = status ? 'block' : 'none';
        }
    },
    mounted () {
        this.sysUserName = this.states.userInfo.userName;
		// this.sysUserAvatar = CONFIG.IMAGE_DOWNLOAD + User.msg.enterpriseLogo;
        this.sysUserAvatar = 'http://dfs.test.cloudyigou.com/dfs/s2/M00/25/39/rB4r9Vk3mwWAdctcAAFf5pjzdHU212_100x100.jpg';
		// window.onresize = () => (() => {
		//     let $height = document.body.clientHeight || document.documentElement.clientHeight;
		//     this.HEIGHTRESIZE($height);
		// })();
    },
    created () {
		// 判断用户是否登录
        if (!this.states.userInfo) {
            this.$router.push({ name: 'auth' });
        } else {
            this.getroles().then(() => {
                this.menuList = createMenu();
            });
        }
    },
	// F5刷新重新赋值
    computed: mapState({
        states: function (state) {
            if (!state.userInfo) {
                this.REFRESH();
            }
            return state;
        }
    })

};
</script>
 
<style  lang="scss">
$menuWidth: 180px;
$menuHeight: 50px;
$topColor: #20a0ff;
.container {
	position: absolute;
	top: 0px;
	bottom: 0px;
	width: 100%;
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
			//width:230px;
			height: $menuHeight;
			font-size: 22px;
			padding-left: 20px;
			padding-right: 20px;
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
	}
	.main {
		display: flex;
		position: absolute;
		top: $menuHeight;
		bottom: 0px;
		overflow: hidden;
		aside {
			.sidebar-iconfont {
				vertical-align: baseline;
				margin-right: 10px;
				speak: none;
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
			position: relative;
			flex: 0 0 $menuWidth;
			width: $menuWidth;
			.el-menu {
				height: 100%;
			}
			.collapsed {
				width: 60px;
				.item {
					position: relative;
				}
				.submenu {
					position: absolute;
					top: 0px;
					left: 60px;
					z-index: 99999;
					height: auto;
					display: none;
				}
			}
			.tools {
				position: absolute;
				top: 46%;
				height: 87px;
				width: 14px; //background:rgba(49,49,49,0.6);
				border-radius: 2px;
				right: -14px;
				cursor: pointer;
				i {
					font-size: 14px;
					line-height: 87px;
					text-align: center;
					color: $topColor;
				}
			}
		}
		.menu-collapsed {
			flex: 0 0 60px;
			width: 60px;
			background: #324157;
		}
		.menu-expanded {
			flex: 0 0 $menuWidth;
			width: $menuWidth;
		}
		.content-container {
			flex: 1;
			overflow-y: scroll;
			padding: 0 0 20px 0;
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
				padding: 0 20px;
				box-sizing: border-box;
			}
		}
	}
}
</style>
