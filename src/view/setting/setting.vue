<template>
  <!-- 设置页面 -->
  <div class="wrap">
    <!-- 头部 -->
    <el-head></el-head>
    <div class="con">
      <!-- 标题 -->
      <h1>个人设置</h1>
      <div class="userInfo">
        <p>修改头像</p>
        <!-- 头像 -->
        <div class="userHeadImg">
          <el-avatar :size="100" :src="circleUrl" style="position: absolute; top: 0; left: 0;"></el-avatar>
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-change="getFile"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="avatar-uploader-icon"></i>
          </el-upload>
        </div>
        <el-button type="primary" style="margin-top: 20px;" plain @click="onUserImg">确认修改头像</el-button>
		
		  <p>账号名称</p>
		<center style="color: #CC3333;"> {{ userNum }}</center>
        <p>修改密码</p>
        <!-- <el-input placeholder="姓名" v-model="oldPwd"></el-input> -->
        <el-input placeholder="原密码" v-model="oldPwd" show-password></el-input>
        <el-input placeholder="新密码" v-model="newPwd" show-password></el-input>
        <el-input placeholder="确认新密码" v-model="newPwdAgain" show-password></el-input>
        <el-button type="primary" plain @click="update">确认修改</el-button>
      </div>
    </div>
    <div style="height:50px;"></div>
  </div>
</template>

<script>
import elHead from "../../components/head";
import Question from "../../api/get";
export default {
  data() {
    return {
      circleUrl:"",
        // "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      session_id: "",
      teacherName: "",
      userNum: "",
      myImage:"",
	  classId:"",
      imageUrl: "",
      oldPwd: "",
      newPwd: "",
      newPwdAgain: ""
    }
  },
  components: {
    elHead
  },
  created() {
    this.teacherName = this.$route.query.teacherName;
    this.session_id = this.$route.query.session_id;
    this.userNum = this.$route.query.userNum;
    this.myImage = this.$route.query.myImage;
	this.classId = this.$route.query.classId;

    if (this.myImage == "") {
      this.imageUrl =
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png";
        // this.imageUrl =
        // "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png";
    } else {
      this.imageUrl = this.myImage;
    }
  },
  methods: {
    getFile(file, fileList) {
      const loading = this.$loading({
        lock: true,
        text: '拼命加载中...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      this.getBase64(file.raw).then(res => {
        console.log("url", res);
        let that = this;
        this.$axios
          .post(Question.photo, {
            file_byte: res
          })
          .then(function(response) {
            console.log("response", response);
            if(response.data.err_code == 0) {
              loading.close();
              that.imageUrl = response.data.url;

            }
          })
          .catch(function(error) {
            console.log("error", error);
          });
      });
      
    },

    getBase64(file) {
      return new Promise(function(resolve, reject) {
        let reader = new FileReader();
        let imgResult = "";
        reader.readAsDataURL(file);
        reader.onload = function() {
          imgResult = reader.result;
        };
        reader.onerror = function(error) {
          reject(error);
        };
        reader.onloadend = function() {
          resolve(imgResult);
        };
      });
    },
    // 限制上传头像大小
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    update() {
      let that = this;
      if (that.newPwd == that.newPwdAgain) {
        that.$axios
          .post(Question.userpost, {
            OldPassword: that.oldPwd,
            NewPassword: that.newPwd,
            UserIcon: that.imageUrl.toString(),
            UserNum: that.userNum,
          })
          .then(function(response) {
			   console.log("response", response);
            if(response.data.status == 404){
              alert("请输入正确的原密码！");
            }else if(response.data.status == 200) {
             
              alert("修改成功！");
              that.$router.push({ 
				  path: "/courseList" ,
				  query: {
				    userNum: that.userNum,
				    sessionId: that.sessionId,
				    teacherName: that.teacherName,
				    myImage: that.myImage,
				    classId: that.classId
				  }
				  });
              localStorage.setItem('myImage',response.data.data);
            } else {
				 alert("修改失败！");
			}
            
          })
          .catch(function(error) {
            console.log("error", error);
          });
      } else {
        alert("两次输入的新密码不相同！");
      }
    },
    onUserImg() {
      var that = this;
      that.$axios
        .post(Question.userpostimage, {
          UserNum: that.userNum,
          UserIcon: that.imageUrl.toString()
        })
        .then(function(response) {
          console.log("response头像", response)
          if(response.data.status == 200) {
            that.$message({
              message: '头像修改成功！',
              type: 'success'
            });

            localStorage.setItem('myImage',response.data.data);

            setTimeout(function() {
              that.$router.push({
                path: "/courselist",
				query: {
				  userNum: that.userNum,
				  sessionId: that.sessionId,
				  teacherName: that.teacherName,
				  myImage: that.myImage,
				  classId: that.classId
				}
              })
            }, 1000)
          } else {
            that.$message.error(response.data.message);
          }
        })
        .catch(function(error) {
          console.log("error", error);
        });
    }
  },

};
</script>

<style lang="css" scoped>
.wrap{
  background-color:#fff; 
  width: 100%;
  height: auto;
}
.con {
  width: 80%;
  margin: 0 auto;
  color: #006699;
  font-weight: 600;
}

h1 {
  line-height: 130px;
  font-size: 28px;
}

/* 用户信息 */
.userInfo {
  width: 250px;
  margin: 0 auto;
}

.userInfo p {
  font-size: 18px;
  line-height: 75px;
  color: #000;
  text-align: center;
}

.userHeadImg {
  overflow: hidden;
  position: relative;
  width: 100px;
  margin: 0 auto;
  border-radius: 50%;
}

.userInfo input {
  margin-bottom: 15px;
}

.userInfo >>> .el-button {
  width: 100%;
}

.avatar-uploader {
  width: 100px;
  height: 100px;
}

.el-input {
  width: 100%;
  margin: 0 0 15px 0 !important;
}

.avatar-uploader >>> .el-upload {
  width: 100px;
  height: 100px;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
}

.avatar {
  width: 100px;
  height: 100px;
  display: block;
}
</style>

