<template>
  <!-- 活动-批阅 -->
  <div class="wrap">
    <!-- 头部 -->
    <el-head></el-head>
    <div class="con">
      <div class="title">
        <h2>
          <span>课程名称:</span>
          {{ courseName }}
        </h2>
        <ul class="pagesNav">
          <li>
            <router-link
              :to="{path: '/teachingSpace/notStart', query: { courseName: courseName,phoneNum: phoneNum,userNum:userNum,teacherName:teacherName,myImage:myImage }}"
              style="color: #CC3333;"
            >活动</router-link>|
          </li>
          <li>
            <router-link
              :to="{path: '/statistics', query: { courseName: courseName,phoneNum: phoneNum,userNum:userNum,teacherName:teacherName,myImage:myImage }}"
            >统计</router-link>|
          </li>
          <li>
            <router-link
              :to="{path: '/data/queLibrary', query: { courseName: courseName,phoneNum: phoneNum,userNum:userNum,teacherName:teacherName ,myImage:myImage}}"
            >资料</router-link>|
          </li>
          <li>
            <router-link
              :to="{path: '/adminis', query: { courseName: courseName,phoneNum: phoneNum ,userNum:userNum,teacherName:teacherName,myImage:myImage}}"
              style="padding-right:0;"
            >管理</router-link>
          </li>
        </ul>
      </div>
      <!-- 姓名 -->
      <p class="stuName">
        <span>学生名称:</span>
        {{ stuName }}
      </p>
      <!-- 评语 -->
      <div class="commentWrap">
        <!-- 文章 -->
        <div class="article" style="width:100%;">
          <div :class="getClass()">
            <img :src="newimgUrl" @click="lookPicture()" />
          </div>
          <!-- <div class="canvas" v-if="!isReview">
            <canvas
              id="canvas"
              width="400"
              height="400"
              @mousedown="canvasDown($event)"
              @mousemove="canvasMove($event)"
              @mouseup="canvasUp($event)"
              @mouseleave="canvasLeave($event)"
              ref="canvas"
            >抱歉，您的浏览器不支持canvas元素</canvas>
          </div>-->
          <!--  <img ref="imgUrl" src="../../assets/img.jpeg" :style="oldImgStyle"  crossorigin="Anonymous"/>-->
          <!-- <img src="../../assets/test.jpg" alt /> -->
          <!-- <img  ref="imgUrl" src="../../assets/img.jpeg" :style="oldImgStyle" crossorigin="Anonymous" /> -->
        </div>
        <!-- <button>清屏</button>
        <button>截屏</button>-->
        <!-- 评语/分数 -->
        <div class="commFract">
          <div style="display: flex;">
            <div class="fract">
              <p>总分：</p>
              <p style="text-align: left;">{{ Number(totalScore).toFixed(1) }}</p>
            </div>
            <div class="fract">
              <p>分数：</p>
              <el-input v-model="grade" class="gradeBox" ref="gradeBox"></el-input>
            </div>
          </div>
          <div class="comment">
            <p>评语：</p>
            <textarea v-model="comment" class="commText" name id cols="30" rows="10"></textarea>
          </div>
        </div>
      </div>
      <!-- 操作 -->
      <div class="operation">
        <!-- 重新批注 -->
        <el-button type="danger" @click="rotateold">旋转图片</el-button>
        <!-- 重新批注 -->
        <el-button type="danger" @click="clear">重新批注</el-button>
        <!-- 保存 -->
        <!-- <el-button type="danger" @click="toImage">截图</el-button> -->
        <el-button type="danger" @click="save">保存</el-button>
        <!-- 继续批阅 -->
        <el-button type="danger" @click="returnTop">返回上一级</el-button>
      </div>
    </div>

    <el-dialog :visible.sync = "isLookPic" width="80%">
      <p><img :src="newimgUrl" width="80%" height="80%"/></p>

    </el-dialog>
  </div>
</template>

<script>
import elHead from "../../components/head";
import Question from "../../api/get";

export default {
  data() {
    return {
      courseName: "",
      phoneNum: "",
      userNum: "",
      teacherName: "",
      myImage: "",
      image: "",
      stuName: "",
      stuNum: "",
      TestName: "",
      grade: "",
      comment: "",
      state: "",
      url: "",
      topicId: "",
      isReview: false,
      testimgUrl: "",
      newimgUrl: "",
      oldimgUrl: "",
      definiteUrl: "",
      totalScore: "",
      testTitle: "",
      definiteGrade: "",
      definiteComment: "",
      rotate: false,
      isLookPic: false,
      count: 0,
      degr: 0,
      newImgStyle: {
        margin: "0 auto",
        transform: "rotate(0deg)",
      },
      oldImgStyle: {
        display: "none",
        transform: "rotate(0deg)",
      },
    };
  },
  components: {
    elHead,
  },
  created() {
    this.courseName = this.$route.query.courseName;
    this.phoneNum = this.$route.query.phoneNum;
    this.stuName = this.$route.query.stuName;
    this.TestName = this.$route.query.TestName;
    this.UserNum = this.$route.query.stuNum;
    this.state = this.$route.query.state;
    this.myImage = this.$route.query.myImage;
    this.image = this.$route.query.image;
    this.testTitle = this.$route.query.testTitle;
    //
    this.definiteUrl = this.$route.query.definiteUrl;
    this.definiteGrade = this.$route.query.definiteGrade;
    this.definiteComment = this.$route.query.definiteComment;
    this.totalScore = this.$route.query.totalScore;
    this.topicId = this.$route.query.topicId;
  },
  mounted() {
    this.show0();
    this.show();
  },
  methods: {
    getClass() {
      switch (this.count % 4) {
        case 0:
          return "xuanzhuan0";
          break;
        case 1:
          return "xuanzhuan1";
          break;
        case 2:
          return "xuanzhaun2";
          break;
        case 3:
          return "xuanzhuan3";
          break;
      }
    },
    //点击查看大图
    lookPicture(){
      this.isLookPic = true;
    },
    show0() {
      console.log("已批阅", "已批阅");
      this.newimgUrl = this.definiteUrl;
      this.grade = this.definiteGrade;
      this.comment = this.definiteComment;
    },
    show() {
      console.log("this.definiteUrl", this.definiteUrl);
      console.log("this.myImage", this.image);
      // this.canvas = this.$refs.canvas; // 指定canvas
      // this.ctx = this.canvas.getContext("2d"); // 设置2D渲染区域
      // this.$refs.imgUrl.src = this.newimgUrl;
      var ball = this.$refs.imgUrl;
      // ball.setAttribute("crossOrigin",'Anonymous');
      ball.onload = () => {
        this.ctx.drawImage(this.$refs.imgUrl, 0, 0, 400, 400);
      };
      // this.ctx.lineWidth = 2; // 设置线的宽度
      // this.ctx.lineCap = "round"; // 设置或返回线条的结束端点样式
      // this.ctx.lineJoin = "round"; // 设置或返回两条线相交时，所创建的拐角类型
      // this.ctx.strokeStyle = "red"; // 设置边框色
      // this.ctx.drawImage(this.$refs.imgUrl, 0, 0, 400, 400);
    },
    // canvasDown(e) {
    //   this.canvasMoveUse = true;
    //   const canvasX = e.clientX - e.target.offsetLeft;
    //   const canvasY =
    //     e.clientY - e.target.offsetTop + document.documentElement.scrollTop;
    //   this.ctx.beginPath(); // 移动的起点
    //   this.ctx.moveTo(canvasX, canvasY);
    // },
    // canvasMove(e) {
    //   if (this.canvasMoveUse) {
    //     // 只有允许移动时调用
    //     const t = e.target;
    //     let canvasX;
    //     let canvasY;
    //     canvasX = e.clientX - t.offsetLeft;
    //     canvasY = e.clientY - t.offsetTop + document.documentElement.scrollTop;
    //     this.ctx.lineTo(canvasX, canvasY);
    //     this.ctx.stroke();
    //   }
    // },
    // canvasUp(e) {
    //   this.canvasMoveUse = false;
    // },
    // canvasLeave(e) {
    //   this.canvasMoveUse = false;
    // },
    clear() {
      this.grade = "";
      this.comment = "";
    },

    rotateold() {
      this.count++;
      console.log("count:", this.count);
    },
    // 截图
    toImage() {
      let url = this.$refs.canvas.toDataURL("image/jpeg");
      console.log("canvas", url);
      console.log("this.refs.canvas", this.$refs.canvas);
      let that = this;
      this.$axios
        .post(Question.photo, {
          file_byte: url,
        })
        .then(function (response) {
          console.log("response", response.data.url);
          that.url = response.data.url;
        })
        .catch(function (error) {
          console.log("error", error);
        });
    },
    save() {
      let that = this;
      // console.log("123", this.TestName);
      // console.log("this.grade", this.grade);
      console.log("thaturl", this.testTitle.toString());
      console.log("thaturl", this.UserNum.toString());
      console.log("thaturl", this.grade);
      console.log("thaturl", this.comment);
      console.log("thaturl", this.topicId);
      if(this.grade <= this.totalScore){
      this.$axios
        .post(Question.composition, {
          TestId: this.testTitle.toString(),
          StudentId: this.UserNum.toString(),
          Score: this.grade,
          Comment: this.comment,
          TopicId: this.topicId.toString(),
        })
        .then(function (response) {
          console.log("response", response);
          // if (response.data.response.startsWith("当前成绩高于满分")) {
          //   alert(response.data.response);
          // }
          if (response.data.status == 200) {
            that.$message({
              message: "保存成功！",
              type: "success",
            });
            that.$router.go(-1);
          } else {
            that.$message.error(response.data.data);
          }
        })
        .catch(function (error) {
          console.log("erorr", error);
        });
      // } else {
      //   alert("请做出批注并截图");
      // }

      // } else {
      //   alert("分数不可以为空");
      // }
      }
      else{
        alert("不能超过满分！");
      }
    },
    returnTop() {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="css" scoped>
@import "../../public/public.css";

/* 学生姓名 */
.stuName {
  font-size: 26px;
  line-height: 50px;
}

.stuName span {
  color: #cc3333;
}

/* 评语 */
.commentWrap {
  display: flex;
  margin-top: 25px;
}

/* 文章 */
.article {
  overflow: auto;
  width: 580px;
  height: 400px;
  padding: 10px 0;
  border: 1px solid #ccc;
  background-color: #cce3f6;
}
.canvas {
  width: 80%;
  height: 395px;
  margin: 0 auto;
}
.canvas canvas {
  height: 100%;
}

.commFract div {
  margin-bottom: 10px;
}

/* 评语/分数 */
.fract,
.comment {
  display: flex;
}

.fract p,
.comment p {
  font-size: 26px;
  width: 130px;
  text-align: right;
  line-height: 53px;
}

.gradeBox {
  width: 145px;
  height: 53px;
  font-size: 20px;
  font-weight: 600;
  line-height: 53px;
  text-align: center;
  border: 1px solid #ccc;
  background-color: #cce3f6;
}

.el-input__inner {
  border: 0;
  background-color: #cce3f6;
}

.commText {
  width: 448px;
  height: 330px;
  padding: 5px 10px;
}

/* 操作 */
.operation {
  display: flex;
  justify-content: center;
  margin: 40px;
}

.operation button {
  width: 120px;
  margin-left: 40px !important;
}
.el-input__inner {
  background-color: #cce3f6 !important;
  border: 0 !important;
  color: black !important;
}
textarea {
  background-color: #cce3f6 !important;
  border: 0 !important;
  color: black !important;
}
.xuanzhuan0 {
  transform: rotate(0deg);
  -ms-transform: rotate(0deg); /* IE 9 */
  -webkit-transform: rotate(0deg); /* Safari and Chrome */
}
.xuanzhuan1 {
  transform: rotate(90deg);
  -ms-transform: rotate(90deg); /* IE 9 */
  -webkit-transform: rotate(90deg); /* Safari and Chrome */
}
.xuanzhuan2 {
  transform: rotate(180deg);
  -ms-transform: rotate(180deg); /* IE 9 */
  -webkit-transform: rotate(180deg); /* Safari and Chrome */
}
.xuanzhuan3 {
  transform: rotate(270deg);
  -ms-transform: rotate(270deg); /* IE 9 */
  -webkit-transform: rotate(270deg); /* Safari and Chrome */
}
</style>
