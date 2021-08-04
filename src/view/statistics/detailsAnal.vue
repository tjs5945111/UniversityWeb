<template>
  <!-- 统计-课程分析 -->
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
            >活动</router-link>|
          </li>
          <li>
            <router-link
              :to="{path: '/statistics', query: { courseName: courseName,phoneNum: phoneNum,userNum:userNum ,teacherName:teacherName,myImage:myImage }}"
              style="color: #CC3333;"
            >统计</router-link>|
          </li>
          <li>
            <router-link
              :to="{path: '/data/queLibrary', query: { courseName: courseName,phoneNum: phoneNum,userNum:userNum ,teacherName:teacherName,myImage:myImage }}"
            >资料</router-link>|
          </li>
          <li>
            <router-link
              :to="{path: '/adminis', query: { courseName: courseName,phoneNum: phoneNum,userNum:userNum ,teacherName:teacherName,myImage:myImage }}"
              style="padding-right:0;"
            >管理</router-link>
          </li>
        </ul>
      </div>
      <!-- 面包屑 -->
      <div class="breadCrumbNav">
        <ul class="pagesNav">
          <li>
            <router-link
              :to="{path: '/statistics', query: { courseName: courseName,phoneNum: phoneNum,userNum:userNum ,teacherName:teacherName,myImage:myImage }}"
              style="padding-left:0; color: #CC3333;"
            >班级统计</router-link>|
          </li>
          <li>
            <router-link
              :to="{path: '/statistics/analysis', query: { courseName: courseName,phoneNum: phoneNum,userNum:userNum ,teacherName:teacherName,myImage:myImage }}"
              style
            >课程统计</router-link>
          </li>
        </ul>
        <el-button type="danger" @click="exportExcel()" s>一键导出</el-button>
      </div>
      <!-- 选项栏 -->
      <div class="optionsBar">
        <el-row class="optionsBarCon">
          <div>
            选择学生
            <el-select v-model="value5" clearable placeholder="请选择" @change="getStuName">
              <el-option
                v-for="item in stuname"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
        </el-row>
      </div>
      <!-- 表格 -->
      <el-table :data="tableData" border style="width: 100%" id="table" sort-by="queId">
        <el-table-column prop="queId" label="题号" width="80" align="center"></el-table-column>
        <el-table-column
          prop="topic1"
          label="题目描述"
          width="300"
          align="center"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">
            <div v-html="scope.row.topic1"></div>
          </template>
        </el-table-column>
        <el-table-column prop="topic2" label="题目类型" width="200" align="center">
          <template slot-scope="scope">
            <div v-html="scope.row.topic2"></div>
          </template>
        </el-table-column>
        <el-table-column prop="stuAnswer" label="学生答案" align="center" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column
          prop="correctAnsw"
          label="正确答案"
          align="center"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">
            <div v-html="scope.row.correctAnsw"></div>
          </template>
        </el-table-column>
        <el-table-column prop="score" label="分数" align="center"></el-table-column>
      </el-table>
      <!-- 分页器 -->
      <!-- <el-pagination background layout="prev, pager, next" :total="1000"></el-pagination> -->
      <!--      <el-pagination
        background
        :total="tableData.length"
        :page-size="2"
        :current-page.sync="currentPage"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        layout="total, sizes, prev, pager, next, jumper"
      ></el-pagination>-->
      <div style="height:50px;"></div>
    </div>
  </div>
</template>


<script>
import elHead from "../../components/head";
import Question from "../../api/get";
import FileSaver from "file-saver";
import XLSX from "xlsx";
export default {
  data() {
    return {
      courseName: "",
      phoneNum: "",
      userNum: "",
      teacherName: "",
      myImage: "",
      // 表格
      tableData: [],
      // type: ['听力理解-听句子','听力理解-听长对话','听力理解-听短对话','听力理解-听讲话','综合阅读-选词填空','综合阅读-句子匹配','综合阅读',,,,]
      classname: [],
      stuname: [],
      testname: [],
      value1: "",
      value2: "",
      value3: "",
      value4: "",
      value5: "",
      value: "",
      // 分页
      currentPage: 1,
      pagesize: 10,
    };
  },
  components: {
    elHead,
  },
  created() {
    this.phoneNum = this.$route.query.phoneNum;
    this.courseName = this.$route.query.courseName;
    this.userNum = this.$route.query.userNum;
    this.teacherName = this.$route.query.teacherName;
    this.myImage = this.$route.query.myImage;
  },
  mounted() {
    this.value1 = this.$route.query.classname;
    this.value2 = this.$route.query.testName;
    this.value3 = this.$route.query.stuName;
    this.value5 = this.$route.query.stuName;
    this.value4 = this.$route.query.stuId;
    let that = this;
    this.$axios
      .post(Question.classStatistical, {
        TestId: this.value2.toString(),
      })
      .then(function (response) {
        // console.log("response", response)
        if (response.data.status == 200) {
          var ballList = [];
          for (var i = 0; i < response.data.data.length; i++) {
            ballList.push({
              value: response.data.data[i].StudentId,
              label: response.data.data[i].StudentName,
            });
          }
          that.stuname = ballList;
          console.log("总条数", that.classname);
        } else {
          that.$message.error(response.data.ErrMsg);
        }
      })
      .catch(function (error) {
        console.log("error1", error);
      });

    this.$axios
      .get(Question.classname)
      .then(function (response) {
        // console.log("response", response.data.response); detail
        var ballList = [];
        for (var i = 0; i < response.data.response.length; i++) {
          ballList.push({
            value: response.data.response[i],
            label: response.data.response[i],
          });
        }
        that.classname = ballList;
      })
      .catch(function (error) {
        console.log("error1", error);
      });

    this.$axios
      .post(Question.detail, {
        TestId: this.value2.toString(),
        StudentId: this.value4.toString(),
      })
      .then(function (response) {
        console.log("response", response);
        var ballList = [];
        var test;
        for (var i = 0; i < response.data.data.length; i++) {
          ballList.push({
            queId: response.data.data[i].QuestionNumber,
            topic1: response.data.data[i].QuestionDescription,
            // test = response.data.response[i][3],
            topic2: response.data.data[i].QuestionType,
            stuAnswer: response.data.data[i].StudentAnswer,
            correctAnsw: response.data.data[i].CorrectAnswer,
            score: response.data.data[i].Score,
          });
        }

        let type = [];
        for (var i = 0; i < ballList.length; i++){
          if(ballList[i].score == '')
            ballList[i].score = '0'

          if(ballList[i].stuAnswer == '')
            ballList[i].stuAnswer = '空'

          type[i] = ballList[i].topic2;
        }
        that.tableData = ballList;
        let unique = Array.from(new Set(type));

        console.log("type",unique);
        let allScore = new Array(unique.length).fill(0);
        console.log(allScore);

        for(let i=0;i<ballList.length;i++){
          for(let j=0;j<type.length;j++){
            if(ballList[i].topic2 == unique[j]){
              allScore[j] += parseFloat(ballList[i].score);
            }
          }
        }

        console.log("allScore",allScore);


        console.log("that.tableData", that.tableData);
      })
      .catch(function (error) {
        console.log("error1", error);
      });
  },
  methods: {
    getTestName(selVal) {
      let that = this;
      if (selVal != "请选择") {
        that.$axios
          .post(Question.testname1, {
            ClassName: selVal,
          })
          .then(function (response) {
            console.log("response", response.data.response);
            var ballList = [];
            for (var i = 0; i < response.data.response.length; i++) {
              ballList.push({
                value: response.data.response[i],
                label: response.data.response[i],
              });
            }
            that.testname = ballList;
          })
          .catch(function (error) {
            console.log("error1", error);
          });
      }
    },
    getStuName(selVal) {
      let that = this;
      if (selVal != "请选择") {
        this.$axios
          .post(Question.detail, {
            TestId: this.value2.toString(),
            StudentId: selVal.toString(),
          })
          .then(function (response) {
            console.log("response", response);
            var ballList = [];
            var test;
            for (var i = 0; i < response.data.data.length; i++) {
              ballList.push({
                queId: response.data.data[i].QuestionNumber,
                topic1: response.data.data[i].QuestionDescription,
                // test = response.data.response[i][3],
                topic2: response.data.data[i].QuestionType,
                stuAnswer: response.data.data[i].StudentAnswer,
                correctAnsw: response.data.data[i].CorrectAnswer,
                score: response.data.data[i].Score,
              });
            }
            that.tableData = ballList;

            console.log("that.tableData", that.tableData);
          })
          .catch(function (error) {
            console.log("error1", error);
          });
      }
    },
    findStu() {
      let that = this;
      this.$axios
        .post(Question.classStatistical, {
          ClassName: this.value1,
          TestName: this.value2,
          UserNum: this.value3,
          UserName: this.value4,
        })
        .then(function (response) {
          // console.log("response", response);
          if (response.data.response == "班级、测试不能为空") {
            alert("班级、测试不能为空");
          }
          var ballList = [];
          for (var i = 0; i < response.data.response.length; i++) {
            ballList.push({
              id: i + 1,
              name: response.data.response[i][0],
              stuId: response.data.response[i][1],
              test: response.data.response[i][2],
              department: response.data.response[i][3],
              grade: response.data.response[i][4],
            });
          }
          that.tableData = ballList;
        })
        .catch(function (error) {
          console.log("error1", error);
        });
    },
    exportExcel() {
      this.pagesize = 30; //表格长度变长
      this.currentPage = 1;

      let fix = document.querySelector(".el-table__fixed-right");
      let wb;
      if (fix) {
        //判断要导出的节点中是否有fixed的表格，如果有，转换excel时先将该dom移除，然后append回去
        wb = XLSX.utils.table_to_book(
          document.querySelector("#table").removeChild(fix)
        );
        document.querySelector("#table").appendChild(fix);
      } else {
        wb = XLSX.utils.table_to_book(document.querySelector("#table"));
      }
      let wbout = XLSX.write(wb, {
        bookType: "xlsx",
        bookSST: true,
        type: "array",
      });
      try {
        FileSaver.saveAs(
          new Blob([wbout], { type: "application/octet-stream" }),
          "班级统计详细成绩.xlsx"
        );
      } catch (e) {
        if (typeof console !== "undefined") console.log(e, wbout);
      }
      this.pagesize = 10; //表格还原
      return wbout;
    },
    //分页实现
    handleSizeChange: function (size) {
      this.pagesize = size;
    },
    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage;
    },
  },
};
</script>

<style lang="css" scoped>
@import "./public.css";
</style>
