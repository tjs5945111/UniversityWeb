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
      <div class="stuName">
        <p>
          <span>学生名称:</span>
          {{ stuName }}
        </p>
      </div>

      <!-- 题目内容 -->
      <ul class="subject">
        <li v-for="(item, index) in data.StudentAnswer" :key="index">
          <b>题目：</b>
          <b v-html="item.QuestionDescription"></b>
          <br />
          <b>参考答案：</b>
          <b v-html="item.CorrectAnswer"></b>
          <div class="subjectImg">
            <img v-for="(srcItem, srcIndex) in item.ImgUrl" :key="srcIndex" :src="srcItem" alt />
          </div>
          <div class="available" style="float:right; font-weight: bold;">
            分数：
            <input type="text" placeholder="请输入分数" v-model="item.Score" />
          </div>
          <div class="totalScore" style="float:right; font-weight: bold;">总分：{{ item.FullScore }}</div>
          <br />
          <br />

          <hr />
          <br />
        </li>
      </ul>

      <!-- 操作 -->
      <!-- <div class="fraction">
	   <div class="totalScore">
	   总分：{{ data.FullScore }}
	   </div>
	   <div class="available">
	     分数：<input type="text" placeholder="请输入分数" v-model="data.Score">
	   </div>
      </div>-->
      <div class="operation">
        <el-button type="danger" @click="save">保存</el-button>
        <!-- 继续批阅 -->
        <el-button type="danger" @click="returnTop">返回上一级</el-button>
      </div>
    </div>
  </div>
</template>
	<style>
p {
  padding: 0px;
  margin: 0px;
  display: inline;
}
</style>
<script>
import elHead from "../../components/head";
import Question from "../../api/get";

export default {
  data() {
    return {
      data: null,
      courseName: "",
      phoneNum: "",
      stuName: "",
      TestName: "",
      userNum: "",
      state: "",
      myImage: "",
      teacherName: "",
      testTitle: "",
      definiteUrl: "",
      definiteGrade: "",
      definiteComment: "",
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
    this.testTitle = this.$route.query.testTitle;
    //
    this.definiteUrl = this.$route.query.definiteUrl;
    this.definiteGrade = this.$route.query.definiteGrade;
    this.definiteComment = this.$route.query.definiteComment;
    this.data = this.$route.query.data;
  },
  mounted() {
    console.log("data",this.data);
  },
  methods: {
    // 保存
    save() {
      var that = this;
      var flag = 1;
      //  if(that.data.Score != '') {
      console.log("that.data.Score", that.data.StudentAnswer);
      console.log("that.data.FullScore", that.data.StudentAnswer);
      var topic = [];
      var score = [];
      for (var i = 0; i < that.data.StudentAnswer.length; i++) {
        if (
          that.data.StudentAnswer[i].Score >
          that.data.StudentAnswer[i].FullScore
        ) {
          flag = 0;
          break;
        }
        topic.push(that.data.StudentAnswer[i].QuestionTopicId.toString());
        score.push(that.data.StudentAnswer[i].Score.toString());
      }

      if (flag == 1) {
        that.$axios
          .post(Question.saveread, {
            TestId: this.testTitle.toString(),
            StudentId: this.UserNum.toString(),
            Score: score,
            TopicId: topic,
          })
          .then(function (response) {
            console.log("response", response);
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
            console.log("error", error);
          });
      } else {
        that.$message.error("分数不能高于总分数!");
      }

      // } else {
      //   that.$message.error('请输入分数');
      // }
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
  display: flex;
  justify-content: space-between;
  font-size: 26px;
  line-height: 50px;
}

.stuName span {
  color: #cc3333;
}

.fraction {
  display: flex;
  justify-content: center;
  margin: 40px;
}
.totalScore {
  margin-top: 7px;
}
.available {
  margin-left: 20px !important;
}

.available input {
  display: inline-block;
  width: 200px;
  padding: 3px 10px;
  font-size: 18px;
  border-radius: 10px;
}

.subject {
  margin: 20px 0;
}

.subject li > p {
  font-size: 22px;
  font-weight: 500;
}

.subjectImg {
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;
}

.subjectImg img {
  display: block;
  width: 130px;
  height: 130px;
  margin: 0 12px 12px 0;
  border-radius: 8px;
  background-color: #eee;
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
</style>
