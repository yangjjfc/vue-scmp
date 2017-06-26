<template>
    <section class="account_content">
        <!--工具条-->
        <el-row>
            <el-col :span="24">
                <ul class="rows">
                    <li>
                        <el-row>
                            <el-col :span="6">
                                <span>用户名</span>
                            </el-col>
                            <el-col :span="12">
                                <span class="Silver">{{user.loginAccount}}</span>
                            </el-col>
                            <el-col :span="6">
                            </el-col>
                        </el-row>
                    </li>
                    <li>
                        <el-row>
                            <el-col :span="6">
                                <span>真实姓名</span>
                            </el-col>
                            <el-col :span="12">
                                <span class="Silver">{{user.userName}}</span>
                            </el-col>
                            <el-col :span="6" class="text-right right">
                                <span class="text-button"  @click="changeNames(user.userName)">修改姓名</span>
                            </el-col>
                        </el-row>
                    </li>
                    <li>
                        <el-row>
                            <el-col :span="6">
                                <span>登录密码</span>
                            </el-col>
                            <el-col :span="12">
                                <span class="Silver">已设置</span>
                            </el-col>
                            <el-col :span="6" class="text-right right">
                                <span class="text-button"  @click="changePasswds">修改密码</span>
                            </el-col>
                        </el-row>
                    </li>
                    <li>
                        <el-row>
                            <el-col :span="6">
                                <span>验证手机</span>
                            </el-col>
                            <el-col :span="12">
                                <span class="Silver">{{user.phone?user.phone:'请绑定手机 【绑定的手机，用于接收系统通知信息，以及手机找回密码】'}}</span>
                            </el-col>
                            <el-col :span="6" class="text-right right">
                                <div>
                                    <span class="Success" v-if="user.phone">已设置</span>
                                    <span class="orange" v-else>未绑定</span>
                                    <span> | </span>
                                    <span class="text-button" @click="changePhones">{{user.phone?'修改手机':'绑定手机'}}</span>
                                </div>
                            </el-col>
                        </el-row>
                    </li>
                    <li>
                        <el-row>
                            <el-col :span="6">
                                <span>验证邮箱</span>
                            </el-col>
                            <el-col :span="12">
                                <span class="Silver">{{user.email?user.email:'请绑定邮箱 【绑定的邮箱，用于接收系统通知信息】'}}</span>
                            </el-col>
                            <el-col :span="6" class="text-right right">
                                <div>
                                    <span class="Success" v-if="user.email">已设置</span>
                                    <span class="orange" v-else>未绑定</span>
                                    <span> | </span>
                                    <span class="text-button" @click="changeEmails">{{user.email?'修改邮箱':'绑定邮箱'}}</span>
                                </div>
                            </el-col>
                        </el-row>
                    </li>
                    <li>
                        <el-row>
                            <el-col :span="6">
                                <span>最后登录时间</span>
                            </el-col>
                            <el-col :span="12">
                                <span class="Silver">{{user.lastLoginTime}}</span>
                            </el-col>
                            <el-col :span="6" class="text-right right">
                                <span class="text-button" @click="changeDetails">查看日志</span>
                            </el-col>
                        </el-row>
                    </li>
                </ul>
            </el-col>
            <el-col :span="24" v-if="changeNameShow">
                <change-name :showx.sync="changeNameShow" @refresh="getUserInfo" :msgx="changeNameMsg"></change-name>
            </el-col>
            <el-col :span="24" v-if="changePasswdShow">
                <change-passwd :showx.sync="changePasswdShow"  @refresh="getUserInfo" ></change-passwd>
            </el-col>
            <el-col :span="24" v-if="changeEmailShow">
                <change-email :showx.sync="changeEmailShow"   :title="changeEmailMsg" @refresh="getUserInfo"></change-email>
            </el-col>
            <el-col :span="24" v-if="changePhoneShow">
                <change-phone :showx.sync="changePhoneShow"   :title="changePhoneMsg" @refresh="getUserInfo"></change-phone>
            </el-col>
             <el-col :span="24" v-if="changedetailShow">
                <view-dailog :showx.sync="changedetailShow" ></view-dailog>
            </el-col>
        </el-row>
    </section>
</template>
<script>
import changeName from './mods/changeName';
import changePasswd from './mods/changePasswd';
import changeEmail from './mods/changeEmail';
import changePhone from './mods/changePhone';
import viewDailog from './mods/viewDailog';
import { mapGetters } from 'vuex';
const URL = {
    findUserByNoForWeb: 'ypt.open.user.findUserByNoForWeb' // 登陆用户的信息
};
export default {
    name: 'account',
    data () {
        return {
            user: {},
            changeNameShow: false, // 更改姓名
            changeNameMsg: {}, // 更改姓名
            changePasswdShow: false, // 更改密码
            changeEmailShow: false, // 更改邮箱
            changeEmailMsg: '', // 更改邮箱
            changePhoneShow: false, // 更改手机
            changePhoneMsg: '', // 更改手机
            changedetailShow: false // 显示日志
        };
    },
    computed: {
        ...mapGetters([
            'userno'
        ])
    },
    methods: {
        getUserInfo () {
            this.Http.post(URL.findUserByNoForWeb, {
                userNo: this.userno
            }).then(msg => {
                let p = msg.data.mobilePhone; // 电话格式化
                if (p) {
                    msg.data.phone = p.substr(0, 2) + '****' + p.substr(7);
                }
                this.user = msg.data;
            });
        },
        changeNames (data) {
            this.changeNameShow = true;
            this.changeNameMsg = {'rename': data};
        },
        changePasswds () {
            this.changePasswdShow = true;
        },
        changeEmails () {
            this.changeEmailShow = true;
            this.changeEmailMsg = this.user.email ? '修改邮箱' : '绑定邮箱';
        },
        changePhones () {
            this.changePhoneShow = true;
            this.changePhoneMsg = this.user.phone ? '修改手机' : '绑定手机';
        },
        changeDetails () {
            this.changedetailShow = true;
        }
    },
    mounted () {
        this.getUserInfo();
    },
    components: {
        changeName,
        changePasswd,
        changeEmail,
        changePhone,
        viewDailog
    }
};

</script>

<style lang="scss" scoped> 
.account_content {
    padding: 20px 10px;
    .rows {
        li {
            padding: 20px 10px;
            border-bottom: 1px solid #eee;
            &:hover {
                background: #eef1f6;
            }
            .text-button {
                color: #20a0ff;
                cursor: pointer;
            }
        }
    }
}
</style>
