<template>
  <!-- 活动-查阅 -->
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
              :to="{path: '/teachingSpace/notStart', query: { courseName: courseName,phoneNum: phoneNum,userNum:userNum ,teacherName:teacherName,myImage:myImage }}"
              style="color: #CC3333;"
            >活动</router-link>|
          </li>
          <li>
            <router-link
              :to="{path: '/statistics', query: { courseName: courseName,phoneNum: phoneNum,userNum:userNum ,teacherName:teacherName,myImage:myImage }}"
            >统计</router-link>|
          </li>
          <li>
            <router-link
              :to="{path: '/data/queLibrary', query: { courseName: courseName,phoneNum: phoneNum ,userNum:userNum ,teacherName:teacherName,myImage:myImage}}"
            >资料</router-link>|
          </li>
          <li>
            <router-link
              :to="{path: '/adminis', query: { courseName: courseName,phoneNum: phoneNum ,userNum:userNum ,teacherName:teacherName,myImage:myImage}}"
              style="padding-right:0;"
            >管理</router-link>
          </li>
        </ul>
      </div>
      <!-- 表格 -->
      <el-table :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" border style="width: 100%" @cell-click="stuEssay">
        <el-table-column prop="id" label="序号" width="180" align="center"></el-table-column>
        <el-table-column prop="stuName" label="姓名" width="180" align="center"></el-table-column>
        <el-table-column prop="stuId" label="学号" align="center"></el-table-column>
        <el-table-column prop="department" label="院系" align="center"></el-table-column>
        <!-- prop="state" -->
        <el-table-column label="状态" align="center">
          <template slot-scope="scope">
            <el-button type="text" size="small" :class="{active: scope.row.state=='已批阅',line: scope.row.state=='未批阅'}">
              {{ scope.row.state }}
              <!-- <router-link
                :to="{path: '/activity/marking', query: { stuName: scope.row.stuName,courseName: courseName,phoneNum: phoneNum }}"
              >{{ scope.row.state }}</router-link>-->
            </el-button>
          </template>
        </el-table-column>
        <el-table-column prop="grade" label="作文分数" align="center"></el-table-column>
      </el-table>
      <div class="bottom"> 
        <!-- 分页器 -->
        <!-- <el-pagination background layout="prev, pager, next" :total="1000"></el-pagination> -->
        <el-pagination
          background
          :total="tableData.length"
          :page-size="10"
          :current-page.sync="currentPage"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          layout="total, sizes, prev, pager, next, jumper"
        ></el-pagination>
        <button class="return" @click="returnTop">返回上一级</button>
      </div>
    </div>
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
      teacherName:"",
      myImage:"",
      
      testTitle: "",
      // 表格
      tableData: [],
      // 分页
      currentPage: 1,
      pagesize: 10
    };
  },
  created() {
    this.courseName = this.$route.query.courseName;
    this.phoneNum = this.$route.query.phoneNum;
    this.testTitle = this.$route.query.testTitle;
    this.userNum = this.$route.query.userNum;
    this.teacherName = this.$route.query.teacherName;
    this.myImage = this.$route.query.myImage;  
    this.className = this.$route.query.className;  
  },
  mounted() {
    let that = this;
    console.log("testId",this.testTitle);
    this.$axios
      .post(Question.correct, {
        TestId: this.testTitle,
      })
      .then(function(response) {
        console.log("responseconsult", response);
        // console.log("response", response.data.response4);
          // alert("该小测有作文部分");
          var ballList = [];
          for (var i = 0; i < response.data.data.length; i++) {
            ballList.push({
              id: response.data.data[i].Number,
              stuName: response.data.data[i].StudentName,
              stuId: response.data.data[i].StudentId,
              department: response.data.data[i].Department,
              state: response.data.data[i].State,
              grade: response.data.data[i].Score
            });
          }

          for(let i=0;i<ballList.length;i++){
            if(ballList[i].grade=='-1.0'){
              ballList[i].grade = '未批阅'
            }
          }
          that.tableData = ballList;
          console.log("table",that.tableData);
       
      })
      .catch(function(error) {
        console.log("error1", error);
      });
  },
  components: {
    elHead
  },
  methods: {
    getstatue(row){
      console.log("row",row);
    },
    stuEssay(row, column, cell, event) {
      let that = this;
      if (column.label == "状态") {
          console.log("去批改学生作文",row.stuId);
          this.$axios
            .post(Question.oncorrect, {
              StudentId: row.stuId.toString(),
              TestId: this.testTitle,
            })
            .then(function(response) {
              console.log("responseEssay", response);
              console.log("response.data.data.ImgUrl",response.data.data.ImgUrl);
              that.$router.push({
                path: "/activity/marking",
                query: {
                stuName: row.stuName,
                testTitle: that.testTitle,
                stuNum: row.stuId,
				        topicId:response.data.data.QuestionTopicId,
                totalScore: "10",
                image: "https://licres.luckyzune.com/photo/1T2M4ORIAOM.jpg",
                state: row.state,
                courseName:  that.courseName,
                phoneNum:  that.phoneNum ,
                userNum: that.userNum ,
                teacherName: that.teacherName,
                myImage: that.myImage,
                definiteUrl:response.data.data.ImgUrl,
                definiteGrade:response.data.data.Score,
                definiteComment:response.data.data.Comment,
                totalScore:response.data.data.FullScore,
				  
                }
              });
            })
            .catch(function(error) {
              console.log("error", error);
            });

      }
    },
    //分页实现
    handleSizeChange: function(size) {
      this.pagesize = size;
    },
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage;
    },

    // 返回上一级
    returnTop() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="css" scoped>
@import '../../public/public.css';
.bottom {
  display: flex;
  justify-content: flex-end;
  align-items: center; 
  padding: 20px 0;
}

/* 返回上一级按钮 */
.return {
  width: 130px;
  height: 45px;
  margin-left: 50px;
  font-size: 15px;
  border: 0;
  border-radius: 8px;
  color: #fff;
  background-color: #FF6A6A;
}
.active{
  color: blue
}
.line{
  color:  #FF6A6A
}
</style>
