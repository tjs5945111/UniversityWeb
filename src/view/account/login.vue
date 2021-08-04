<template>
  <div class="body">
    <!-- 登录页面 -->
    <div class="wrap">
      <!-- log -->
      <img src="../../assets/bage.png" alt="" class="log" />
      <!-- 密码/验证码登录 -->
      <div class="logonOptions">
        <img src="../../assets/title.png" alt="" class="title" />
        <div class="login">
          <p>
            <span :class="lockOptiTab ? lockOptions : 0" @click="passwSign"
              >密码登录</span
            >/
            <span :class="lockOptiTab1 ? lockOptions : 0" @click="verifiSign"
              >验证码登录</span
            >
          </p>
          <!-- 密码登录 -->
          <div class="password" v-if="lockOptiTab">
            <el-input
              v-model="passCellPhoneNum"
              placeholder="请输入工号"
            ></el-input>
            <el-input
              v-model="passPassword"
              placeholder="请输入密码"
              show-password
            ></el-input>
            <button class="pasSginBtn" @click="passwordLogin">登录</button>
          </div>
          <!-- 验证码登录 -->
          <div class="verifica" v-if="lockOptiTab1">
            <el-input
              v-model="verCellPhoneNum"
              placeholder="请输入手机号"
            ></el-input>
            <el-row type="flex" class="row-bg" justify="space-between">
              <el-input placeholder="验证码" v-model="verificaCode"></el-input>
              <button
                class="getVer"
                :style="
                  cationCodeJudge
                    ? 'background-color: #5BA3E3'
                    : 'background-color: #ccc'
                "
                @click="verificationCode()"
              >
                获取验证码 {{ countDown }}
              </button>
            </el-row>
            <button class="pasSginBtn" @click="verificaLogin">登录</button>
          </div>
          <!-- 更新密码 -->
          <div class="verifica" v-if="lockOptiTab2">
            <el-input v-model="teacherID" placeholder="请输入手机号"></el-input>
            <el-input
              v-model="newPwd"
              placeholder="请输入新密码"
              show-password
            ></el-input>
            <el-input
              v-model="newPwdAgain"
              placeholder="新密码确认"
              show-password
            ></el-input>
            <button class="pasSginBtn" @click="restPwd">确认</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
var reg = /^1[3578][01379]\d{8}|1[34578][01256]\d{8}|(134[012345678]\d{7}|1[34578][012356789]\d{8})$/g; //判断手机号码是否为中国电信，中国联通，中国移动中的一种

import Question from "../../api/get";
export default {
  name: "login",
  data() {
    return {
      passCellPhoneNum: "", // 密码登录手机号
      passPassword: "", // 密码登录密码
      countDown: "", // 验证码倒计时
      verCellPhoneNum: "", // 验证码登录手机号
      verificaCode: "", // 验证码
      msgId: "", // 验证码登录回调msgid
      cationCodeJudge: true,
      lockOptions: "lockOptionsSty",
      lockOptiTab: true,
      lockOptiTab1: false,
      lockOptiTab2: false,

      //isRestPwd:true
      teacherID: "",
      newName: "",
      newPwd: "",
      newPwdAgain: "",
      // 要传递的参数
      teacherName: "",
      sessionId: "",
      classId: 0,
      userNum: "",
      myImage: "",
      phoneNum: "",
    };
  },
  mounted() {
    console.log("process.env.API_ENV", process.env.API_ENV);
  },
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(() => (this.isRouterAlive = true));
    },
    // 验证码登录tab
    verifiSign() {
      this.lockOptiTab = false;
      this.lockOptiTab1 = true;
      this.lockOptiTab2 = false;
    },
    // 密码登录
    passwSign() {
      this.lockOptiTab = true;
      this.lockOptiTab1 = false;
      this.lockOptiTab2 = false;
    },

    // 获取验证码
    verificationCode() {
      var that = this;
      if (that.cationCodeJudge) {
        if (!reg.test(that.verCellPhoneNum)) {
          that.$message({
            showClose: true,
            message: "手机格式不正确，请重新输入！",
            type: "error",
          });
          return;
        } else {
          // 拼命加载中模态框
          const loading = that.$loading({
            lock: true,
            text: "拼命加载中...",
            spinner: "el-icon-loading",
            background: "rgba(0, 0, 0, 0.5)",
          });
          console.log("verCellPhoneNum", that.verCellPhoneNum);
          that.$axios
            .post(Question.login1, {
              phone_no: String(that.verCellPhoneNum),
            })
            .then(function (response) {
              console.log("response", response);
              if (response.data.msg_id != "") {
                that.msgId = response.data.msg_id;
                // 关闭模态框
                loading.close();
                // 提示发送成功
                that.$message({
                  message: "验证码发送成功！",
                  type: "success",
                });
                // 开启60秒倒计时
                const TIME_COUNT = 180;
                if (!that.timer) {
                  that.countDown = TIME_COUNT;
                  that.cationCodeJudge = false;
                  that.timer = setInterval(() => {
                    if (that.countDown > 0 && that.countDown <= TIME_COUNT) {
                      that.countDown--;
                    } else {
                      that.cationCodeJudge = true;
                      that.countDown = "";
                      clearInterval(that.timer);
                      that.timer = null;
                    }
                  }, 1000);
                }
              }
            })
            .catch(function (error) {
              console.log("error", error);
              this.$message({
                showClose: true,
                message: "请刷新重试",
                type: "error",
              });
            });
        }
      }
    },

    // 密码登录
    passwordLogin() {
      console.log("Question.login", Question);
      let that = this;
      // "https://huadaapi.luckyzune.com/user/login"
      this.$axios
        .post(Question.login, {
          user_num: this.passCellPhoneNum, //1625141024
          password: this.passPassword, //ccc
        })
        .then(function (response) {
          console.log("response", response);
          if (response.data.status == 200) {
            that.teacherName = response.data.data.name;
            that.sessionId = response.data.data.sessionId;
            that.myImage = response.data.data.userIcon;
            that.classId = response.data.data.classId;
            that.$router.push({
              path: "/courseList",
              query: {
                userNum: that.passCellPhoneNum,
                sessionId: that.sessionId,
                teacherName: that.teacherName,
                myImage: that.myImage,
                classId: that.classId,
              },
            });
            localStorage.setItem("userNum", that.passCellPhoneNum);
            localStorage.setItem("sessionId", that.sessionId);
            localStorage.setItem("teacherName", that.teacherName);
            localStorage.setItem("myImage", that.myImage);
            localStorage.setItem("classId", that.classId);
            window.location.reload();
          } else {
            that.$message.error(response.data.data);
          }
        })
        .catch(function (error) {
          console.log("error", error);
        });
    },
    // 验证码登录
    verificaLogin() {
      var that = this;
      if (!this.cationCodeJudge && this.verificaCode != "") {
        that.$axios
          .post(Question.login2, {
            msg_id: that.msgId,
            verify_code: that.verificaCode,
          })
          .then(function (response) {
            // console.log("response", response.data.Permission);
            // console.log("response", response.data.err_msg);
            // console.log("response", response.data.is_reset_pwd);
            // console.log("response", response.data.user_num);
            if (response.data.Permission == 0) {
              alert("这是学生账号");
            } else {
              if (response.data.err_msg == "") {
                console.log("验证码登录成功");
                if (response.data.is_reset_pwd == true) {
                  that.lockOptiTab = false;
                  that.lockOptiTab1 = false;
                  that.lockOptiTab2 = true;
                } else {
                  that.teacherName = response.data.Name;
                  that.userNum = response.data.user_num;
                  that.session_id = response.data.session_id;
                  that.$router.push({
                    path: "/courseList",
                    query: {
                      session_id: that.session_id,
                      teacherName: that.teacherName,
                      userNum: that.userNum,
                      myImage: that.myImage,
                    },
                  });
                  localStorage.setItem("userNum", that.passCellPhoneNum);
                  localStorage.setItem("session_id", that.session_id);
                  localStorage.setItem("teacherName", that.teacherName);
                  localStorage.setItem("myImage", that.myImage);
                  window.location.reload();
                }
              }
            }
          })
          .catch(function (error) {
            console.log("error", error);
            that.$message({
              showClose: true,
              message: "请刷新重试",
              type: "error",
            });
          });
      } else {
        that.$message({
          showClose: true,
          message: "请获取验证码",
          type: "error",
        });
      }
    },
    // 保存新密码
    restPwd() {
      let that = this;
      if (this.newPwd != this.newPwdAgain) {
        alert("输入的两次密码不同，请确认！");
      } else {
        this.$axios
          .post(Question.login3, {
            phoneNum: that.teacherID,
            pwd: that.newPwd,
            TeacherNum: String(that.passCellPhoneNum),
          })
          .then(function (response) {
            console.log("response", response);
            if (response.data.ErrCode == 0) {
              that.$router.push({
                path: "/courseList",
                query: {
                  userNum: that.passCellPhoneNum,
                  session_id: response.data.session_id,
                  teacherName: response.data.Name,
                  myImage: response.data.Icon,
                },
              });
              localStorage.setItem("userNum", that.passCellPhoneNum);
              localStorage.setItem("session_id", response.data.session_id);
              localStorage.setItem("teacherName", response.data.Name);
              localStorage.setItem("myImage", response.data.Icon);
            } else {
              that.$message.error(response.data.ErrMsg);
            }
          })
          .catch(function (error) {
            console.log("error", error);
          });
      }
    },
  },
};
</script>


<style lang="css" scoped>
.body {
  height: 100%;
}

/* 框 */
.wrap {
  display: flex;
  height: 100%;
}

.log {
  width: 80%;
  height: 100%;
}
.title {
  width: 100%;
  border-bottom: 1px solid #bbbbbb;
}
.login{
  padding: 10%;
}
.row-bg {
  display: flex;
  align-items: flex-start;
  height: 100%;
}

/* 密码/验证码登录 */
.logonOptions {
  /* width: 225px;
  margin: 0 auto;
  padding-top: 40px; */
}

.logonOptions p {
  display: flex;
  justify-content: space-around;
  font-size: 20px;
  font-weight: 700;
  line-height: 65px;
  color: #a4a8a8;
}

.el-input {
  width: 100%;
  margin: 0 0 20px 0 !important;
}

/* 密码登录 */
.pasSginBtn {
  width: 100%;
  margin: 10px auto 0;
  line-height: 40px;
  text-align: center;
  color: #fff;
  font-size: 18px;
  border-radius: 8px;
  border: none;
  background-color: #3298DE;
}

.getVer {
  width: 180px;
  height: 40px;
  font-size: 12px;
  line-height: 40px;
  border: none;
  color: #fff;
  margin-left: 15px;
  border-radius: 4px;
}

.lockOptionsSty {
  color: #5BA3E3;
}
</style>
