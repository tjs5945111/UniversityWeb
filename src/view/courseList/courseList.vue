<template>
  <!-- 课程列表页面 -->
  <div class="wrap">
    <!-- 头部 -->
    <el-head></el-head>
    <div class="con">
      <div class="left">
        <div class="leftTop">
          <img src="" alt="" />
          <p>xxx，您好！</p>
        </div>
        <div class="menu">
          <el-menu
            default-active="我的课程"
            class="el-menu-vertical-demo"
            background-color="#5ba3e3"
            text-color="#425058"
            active-text-color="#1784FC"
            @open="handleOpen"
            @close="handleClose"
            @select="handleSelect"
          >
            <!-- <el-menu-item index="我的课程">
              <i class="el-icon-document"></i>
              <span slot="title">我的课程</span>
            </el-menu-item> -->
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-document"></i>
                <span>我的课程</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="课程">课程</el-menu-item>
                <el-menu-item index="作业">作业</el-menu-item>        
              </el-menu-item-group>
              <el-menu-item-group title="资料">
                <el-menu-item index="题库">题库</el-menu-item>
                <el-menu-item index="作业库">作业库</el-menu-item>
                <el-menu-item index="试卷库">试卷库</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-menu-item index="班级管理">
              <i class="el-icon-menu"></i>
              <span slot="title">班级管理</span>
            </el-menu-item>
            <el-menu-item index="下载中心">
              <i class="el-icon-download"></i>
              <span slot="title">下载中心</span>
            </el-menu-item>
            <el-menu-item index="消息通知">
              <i class="el-icon-message"></i>
              <span slot="title">消息通知</span>
            </el-menu-item>
            <el-menu-item index="个人设置">
              <i class="el-icon-setting"></i>
              <span slot="title">个人设置</span>
            </el-menu-item>
          </el-menu>
        </div>
      </div>
      <!-- 标题 -->
      <div class="right">
        <div class="rightTop">
          <h2 style="marginLeft: 26px; fontSize: 26px">{{title}}</h2>
          <el-input
            style="width: 250px"
            placeholder="请输入内容"
            suffix-icon="el-icon-search"
            v-model="input1"
          >
          </el-input>
          <div @click="addCourseiPorp" style="display: flex; alignItem: center">
            <i
              class="el-icon-circle-plus-outline"
              style="color: #5ba3e3; fontSize: 40px; marginRight: 5px"
            ></i>
            <span style="color: #5ba3e3;lineHeight:40px">创建课程</span>
          </div>
          <div>
            <img src="../../assets/tit.png" alt="" />
            <!-- <span>教师端</span> -->
          </div>
        </div>

        <!-- 列表 -->
        <ul class="courseList clearfix">
          <li
            v-for="(item, index) in list"
            :key="index"
            v-if="title === '我的课程'"
          >
            <!-- 删除 -->
            <img class="del" src="" alt="" @click="delItem(index)" />
            <!--  -->
            <!-- <router-link
            @click="ball"
            :to="{path: '/teachingSpace/notStart', query: { courseName: item.title, session_id: sessionId, userNum:userNum,teacherName:teacherName,myImage:myImage}}"
          > -->
            <div @click="ball(item.Title)">
              <img :src="item.Img" alt />
              <p>{{ item.Title }}</p>
            </div>
            <!-- </router-link> -->
          </li>
          <!-- 添加 -->
          <!-- <li>
            <div class="addBlock" @click="addCourseiPorp">+</div>
          </li> -->
          <!-- <li>
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            style="height: 275px;"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </li> -->
        </ul>
      </div>
    </div>

    <el-dialog title="添加课程" :visible.sync="dialogVisible" width="30%">
      <div>
        <el-select v-model="seleccourse" placeholder="请选择课程">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="danger" @click="addCoursei">添 加</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import elHead from "../../components/head";
import Question, { courseNameGet } from "../../api/get";
export default {
  data() {
    return {
      options: null,
      seleccourse: "", // 选中课程
      dialogVisible: false, // 添加课程弹窗
      sessionId: "",
      classId: 0,
      imageUrl: "",
      teacherName: "",
      userNum: "",
      myImage: "",
      input1: "",
      title: "我的课程",
      list: [
        {
          img:
            "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1739326917,4243650745&fm=26&gp=0.jpg",
          title: "基础教程",
        },
      ],
    };
  },
  components: {
    elHead,
  },
  created() {
    this.userNum = this.$route.query.userNum;
    this.teacherName = this.$route.query.teacherName;
    this.myImage = this.$route.query.myImage;
    this.classId = this.$route.query.classId;
    this.sessionId = this.$route.query.session_id;
  },
  mounted() {
    this.getCouresiList(); // 获取课程列表
  },
  methods: {
    handleSelect(key, keyPath) {
      this.title = key;
      console.log(key, keyPath);
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    ball(title) {
      console.log("123456", title);
      localStorage.setItem("course", title);
      this.$router.push({
        path: "/teachingSpace/notStart",
        query: {
          courseName: title,
          session_id: this.sessionId,
          classId: this.classId,
          userNum: this.userNum,
          teacherName: this.teacherName,
          myImage: this.myImage,
        },
      });
    },
    //   限制头像
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

    // 添加课程
    addCoursei() {
      var that = this;
      if (that.seleccourse != "") {
        that.$axios
          .post(Question.courseInsert, {
            CourseId: that.seleccourse,
            ClassId: that.classId,
          })
          .then(function (response) {
            console.log("添加课程", response);
            if (response.data.data == "该课程已经添加") {
              that.$message.error("该课程已被添加!");
            } else {
              that.dialogVisible = false;
              that.getCouresiList();
            }
          })
          .catch(function (error) {
            console.log("error", error);
          });
      } else {
        console.log("请选择课程", that.seleccourse);
        this.$message.error("请选择课程！");
      }
    },

    // 添加课程选项列表
    addCourseiPorp() {
      var that = this;
      that.dialogVisible = true;
      this.$axios
        .get(Question.courseNameGet)
        .then(function (response) {
          console.log("response", response);
          var list = [];
          for (var i = 0; i < response.data.data.length; i++) {
            var obj = {
              value: response.data.data[i].CourseId,
              label: response.data.data[i].CourseName,
            };
            list.push(obj);
          }
          that.options = list;
        })
        .catch(function (error) {
          console.log("error", error);
        });
    },

    getCouresiList() {
      // 获取数据列表
      var that = this;
      that.$axios
        .post(Question.teachCourse, {
          classId: that.classId.toString(),
        })
        .then(function (response) {
          console.log("获取列表", response);
          that.list = response.data.data;
        })
        .catch(function (error) {
          console.log("error", error);
        });
    },

    // 删除列表
    delItem(text) {
      var that = this;
      console.log("text", text);
      var courseid, coursename;

      this.$axios.get(Question.courseNameGet).then(function (response) {
        console.log("response", response);
        courseid = response.data.data[text].CourseId;
        coursename = response.data.data[text].CourseName;
        console.log("courseid", courseid, coursename);
      });

      that
        .$confirm("此操作将永久删除该课程(请谨慎使用), 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
        .then(() => {
          that.$axios
            .post(Question.coursedelete, {
              CourseId: Number(courseid),
              Permission: "1",
            })
            .then(function (response) {
              console.log("response", response);
              that.getCouresiList(); // 获取课程列表
              that.$message({
                type: "success",
                message: "删除成功",
              });
            })
            .catch(function (error) {
              console.log("error", error);
            });
        })
        .catch(() => {
          that.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>

<style lang="css" scoped>
.wrap {
  width: 100%;
  height: 100% !important;
  height: auto;
  margin: 0 auto;
  border-radius: 12px;
  background-color: #fff;
}
.rightTop {
  display: flex;
  height: 80px;
  border-bottom: 1px solid #5ba3e3;
  justify-content: space-around;
  align-items: center;
}
.rightTop img {
  width: 180px;
  height: 80px;
}
.con {
  display: flex;
  font-weight: 600;
  height: 100%;
}

.left {
  width: 20%;
  background: #5ba3e3;
}
.right {
  flex: 1;
}

.el-menu {
  border: none;
  padding: 0 20%;
}
.el-menu span {
  font-size: 20px;
}
.leftTop {
  display: flex;
  margin: 25% 0 10%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #bbbbbb;
}
.leftTop img {
  width: 150px;
  height: 150px;
  margin-bottom: 20px;
}
.leftTop p {
  margin-bottom: 10px;
}
h1 {
  line-height: 130px;
  font-size: 28px;
}

.courseList {
  padding: 5%;
}
.courseList li {
  overflow: hidden;
  float: left;
  width: 265px;
  margin: 0 35px 35px 0;
  border-radius: 5px;
  background-color: #f8f8ff;
}

.courseList li img {
  width: 265px;
  height: 200px;
  border-radius: 9px;
  box-shadow: 10px 10px 5px #cdcdc1;
}
.el-submenu .el-menu-item{
  font-size: 18px;
}

.courseList li p {
  text-align: center;
  font-size: 22px;
  line-height: 75px;
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
/* .el-menu-item:hover, */
.el-menu-item:focus {
  background: #e5f6ff !important;
  border-right: 2px solid #409eff;
}
/* .el-submenu >div:hover,
.el-submenu >div:focus {
  background: #e5f6ff !important;
  border-right: 2px solid #409eff;
} */
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 263px;
  height: 273px;
  line-height: 273px;
  text-align: center;
}

.avatar {
  width: 273px;
  height: 273px;
  display: block;
}

.addBlock {
  width: 263px;
  height: 273px;
  font-weight: 400;
  font-size: 100px;
  text-align: center;
  line-height: 273px;
}

.courseList li {
  position: relative;
}

.del {
  position: absolute;
  top: 0;
  right: 0;
  width: 30px !important;
  height: 30px !important;
  background: url("../../assets/del.png") 0 0 no-repeat;
  background-size: 30px 30px;
}
</style>


