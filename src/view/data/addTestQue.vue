<template>
  <!-- 资料-题库-新建目录 -->
  <div class="wrap">
    <!-- 头部 -->
    <el-head></el-head>
    <div class="con">
      <!-- 标题 -->
      <div class="title">
        <h2>
          <span>课程名称:</span>
          {{ courseName }}
        </h2>
        <ul class="pagesNav">
          <li>
            <router-link
              :to="{path: '/teachingSpace/notStart', query: { courseName: courseName,phoneNum: phoneNum }}"
            >活动</router-link>/
          </li>
          <li>
            <router-link
              :to="{path: '/statistics', query: { courseName: courseName,phoneNum: phoneNum,userNum:userNum ,teacherName:teacherName,myImage:myImage }}"
            >统计</router-link>/
          </li>
          <li>
            <router-link
              :to="{path: '/data/queLibrary', query: { courseName: courseName,phoneNum: phoneNum,userNum:userNum ,teacherName:teacherName,myImage:myImage }}"
              style="color: #50b4c4;"
            >资料</router-link>/
          </li>
          <li>
            <router-link
              :to="{path: '/adminis', query: { courseName: courseName,phoneNum: phoneNum,userNum:userNum ,teacherName:teacherName,myImage:myImage }}"
              style="padding-right:0;"
            >管理</router-link>
          </li>
        </ul>
      </div>
      <!-- 操作 -->
      <div class="operation">
        <ul class="pagesNav">
          <li>
            <router-link
              :to="{path: '/data/addCourseData', query: { courseName: courseName,phoneNum: phoneNum,userNum:userNum ,teacherName:teacherName,myImage:myImage }}"
              style="padding-left:0;"
            >课程资料</router-link>/
          </li>
          <li>
            <router-link
              :to="{path: '/data/queLibrary', query: { courseName: courseName,phoneNum: phoneNum,userNum:userNum ,teacherName:teacherName,myImage:myImage }}"
              style="color: #50b4c4;"
            >题库</router-link>/
          </li>
          <li>
            <router-link
              :to="{path: '/data/testLibrary', query: { courseName: courseName,phoneNum: phoneNum,userNum:userNum ,teacherName:teacherName,myImage:myImage }}"
            >试卷库</router-link>
          </li>
        </ul>
        <div>
          <el-button type="primary" @click="batchImport('批量导入')">批量导入</el-button>
          <el-button type="primary" @click="addQue">添加题目</el-button>
        </div>
      </div>
      <!-- 选择目录 -->
      <el-row class="questionRow">
        <el-col :span="2">
          <span class="outSpan">选择周测:</span>
        </el-col>
        <el-col :span="4">
          <el-select v-model="value1" placeholder="请选择" class="questionSelect">
            <el-option
              v-for="item in directory"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="2">
          <span class="outSpan">难易度:</span>
        </el-col>
        <el-col :span="4">
          <el-select v-model="value2" placeholder="请选择" class="questionSelect">
            <el-option
              v-for="item in difficultytype"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="2">
          <span class="outSpan">题目内容:</span>
        </el-col>
        <el-col :span="3">
          <el-input placeholder v-model="queTitle"></el-input>
        </el-col>
      </el-row>
      <!-- 模块类型&&知识点&&查询 -->
      <el-row class="questionRow">
        <el-col :span="2">
          <span class="outSpan">模块类型:</span>
        </el-col>
        <el-col :span="4">
          <el-select v-model="value3" placeholder="请选择" class="questionSelect" @change="getPart2">
            <el-option
              v-for="item in questionPartLevel1"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="4">
          <el-select v-model="value4" placeholder="请选择" class="questionSelect">
            <el-option
              v-for="item in questionPartLevel2"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row class="questionRow">
        <el-col :span="2">
          <span class="outSpan">知识点:</span>
        </el-col>
        <el-col :span="4">
          <el-select
            v-model="value5"
            placeholder="请选择"
            class="questionSelect"
            @change="getKnowledgePoint2"
          >
            <el-option
              v-for="item in KnowledgePoint1"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="4">
          <el-select
            v-model="value6"
            placeholder="请选择"
            class="questionSelect"
            @change="getKnowledgePoint3"
          >
            <el-option
              v-for="item in KnowledgePoint2"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="4">
          <el-select v-model="value7" placeholder="请选择" class="questionSelect">
            <el-option
              v-for="item in KnowledgePoint3"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="10" class="questionSub">
          <el-button type="primary" style="display: block; width: 30%;" @click="findQue">查询</el-button>
        </el-col>
      </el-row>

      <!-- 表单数据 -->
      <el-table
        :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
        border
        style="width:100%"
      >
        <el-table-column prop="num" label="序号" width="50" align="center"></el-table-column>
        <el-table-column prop="question" label="题目" align="center"></el-table-column>
        <el-table-column prop="questionType" label="题型" width="100" align="center"></el-table-column>
        <el-table-column prop="testPartType" label="模块类型" align="center"></el-table-column>
        <el-table-column prop="knowledgePoint" label="知识点" align="center"></el-table-column>
        <el-table-column prop="degreeOfDifficulty" label="难易度" width="80" align="center"></el-table-column>
        <el-table-column fixed="right" label="操作" width="100" align="center">
          <el-button type="text" size="small">下载</el-button>
          <el-button type="text" size="small">移除</el-button>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <!-- <el-pagination background layout="prev, pager, next" :total="1000"></el-pagination> -->
      <el-pagination
        background
        :total="1000"
        :page-size="2"
        :current-page.sync="currentPage"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        layout="total, sizes, prev, pager, next, jumper"
      ></el-pagination>
      <div style="height:100px;"></div>
    </div>
    <!-- 批量导入题目 -->
    <el-dialog :title="boxTitle" :visible.sync="onAddQue">
      <el-tabs type="border-card">
        <el-upload
          class="upload-demo"
          drag
          action="https://jsonplaceholder.typicode.com/posts/"
          multiple
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">
            将文件拖到此处，或
            <em>点击上传</em>
          </div>
          <div class="el-upload__tip" slot="tip">只能上传Excel文件，且不超过500kb</div>
        </el-upload>
      </el-tabs>
    </el-dialog>
  </div>
</template>


<script>
import elHead from "../../components/head";
import Question from "../../api/get";
export default {
  name:'addQuestion',
  data() {
    return {
      courseName: "",
      phoneNum: "",
      userNum: "",
      teacherName: "",
      myImage:"",

      currentTableData: [],
      tableData: [],
      // 下拉菜单
      directory: [],
      value1: "",
      queTitle: "",
      // 难易度
      difficultytype: [],
      value2: "",
      // 模块类型
      questionPartLevel1: [],
      questionPartLevel2: [],
      value3: "",
      value4: "",
      // 知识点
      KnowledgePoint1: [],
      KnowledgePoint2: [],
      KnowledgePoint3: [],
      value5: "",
      value6: "",
      value7: "",
      // 批量导入弹框
      onAddQue: false,
      boxTitle: "",
      // 分页
      currentPage: 1,
      pagesize: 5
    };
  },
  components: {
    elHead
  },
  created() {
    this.phoneNum = this.$route.query.phoneNum;
    this.courseName = this.$route.query.courseName;
    this.userNum = this.$route.query.userNum;
    this.teacherName = this.$route.query.teacherName;
    this.myImage = this.$route.query.myImage;
    this.value1 = this.$route.query.testName;
  },
  mounted() {
    let that = this;
    // 难易度
    this.$axios.get(Question.difficultytypegetname).then(function(response) {
      // console.log("难易度", response);
      // console.log("response.data.response", response.data.response);
      var ballList4 = [];
      for (var i = 0; i < response.data.response.length; i++) {
        ballList4.push({
          value: i,
          // value: response.data.response[i],
          label: response.data.response[i]
        });
      }
      that.difficultytype = ballList4;
    });
    // 模块类型--模块一
    this.$axios.get(Question.testparttype1).then(function(response) {
      var ballList = [];
      for (var i = 0; i < response.data.response.length; i++) {
        ballList.push({
          value: response.data.response[i].level1,
          label: response.data.response[i].level1
        });
      }
      that.questionPartLevel1 = ballList;
    });

    // 知识点1
    this.$axios
      .get(Question.knowledgepointlevel1)
      .then(function(response) {
        var ballList1 = [];
        for (var i = 0; i < response.data.response.length; i++) {
          ballList1.push({
            value: response.data.response[i],
            label: response.data.response[i]
          });
        }
        that.KnowledgePoint1 = ballList1;
      })
      .catch(function(error) {
        console.log("error1", error);
      });
    // 获取模块类型
    // 获取题目
    this.$axios
      .post(Question.questionlibraryshow, {
        Choicecatalogue: this.value1, //选择目录（必选）
        Difficulty: this.value2,
        Testparttype1: this.value3, //一级小测模块类型
        Testparttype2: this.value4,
        Level1: this.value5, //一级知识点
        Level2: this.value6,
        Level3: this.value7,
        Titlecontent: this.queTitle, //题目内容
        Rateimport: "", //预留：批量导入
        Addtitle: "" //预留：添加题目
      })
      .then(function(response) {
        console.log("response", response.data.Temp);
        var ballList = [];
        for (var i = 0; i < response.data.Temp.length; i++) {
          ballList.push({
            num: i + 1,
            question: response.data.Temp[i].List1,
            questionType: response.data.Temp[i].Questiontype1,
            testPartType:
              response.data.Temp[i].Testparttype1 +
              "-" +
              response.data.Temp[i].Testparttype2,
            knowledgePoint:
              response.data.Temp[i].Point1 +
              "-" +
              response.data.Temp[i].Point2 +
              "-" +
              response.data.Temp[i].Point3,
            degreeOfDifficulty: response.data.Temp[i].Difficultylevel
          });
        }
        that.tableData = ballList;
      })
      .catch(function(error) {
        console.log("error1", error);
      });
  },
  methods: {
    // 添加题目-跳转至添加题目界面
    addQue() {
      this.$router.push({ path: '/data/addTypeQuestion', query: { phoneNum: this.phoneNum, courseName: this.courseName,testName: this.value1,}});
    },
    // 批量导入
    batchImport(text) {
      this.onAddQue = true;
      this.boxTitle = text;
    },
    getPart2() {
      // 模块类型--模块二
      let that = this;
      this.questionPartLevel2 = [];
      this.value4 = "";
      this.$axios
        .post(Question.testparttype2, {
          Firsttype: this.value3
        })
        .then(function(response) {
          // console.log("response", response);
          // console.log("模块类型--模块二", response.data.response);
          var ballList = [];
          for (var i = 0; i < response.data.response.length; i++) {
            ballList.push({
              value: response.data.response[i].level2,
              label: response.data.response[i].level2
            });
          }
          that.questionPartLevel2 = ballList;
        });
    },
    getKnowledgePoint2(selVal) {
      let that = this;
      console.log(selVal);
      if (!selVal != "请选择") {
        console.log(true);
        // 第二个知识点
        this.$axios
          .post(Question.knowledgepointlevel2, { Level1: selVal })
          .then(function(response) {
            var ballList2 = [];
            for (var i = 0; i < response.data.response.length; i++) {
              ballList2.push({
                value: response.data.response[i],
                label: response.data.response[i]
              });
            }
            that.KnowledgePoint2 = ballList2;
            console.log("knowledgepoint2", that.KnowledgePoint2);
          })
          .catch(function(error) {
            console.log(error);
          });
      } else {
        console.log(false);
      }
    },
    getKnowledgePoint3(selVal) {
      let that = this;
      console.log(selVal);
      if (!selVal != "请选择") {
        console.log(true);
        // 第三个知识点
        this.$axios
          .post(Question.knowledgepointlevel3, { Level2: selVal })
          .then(function(response) {
            console.log(response);
            console.log("response.data.response", response.data.response);
            var ballList3 = [];
            for (var i = 0; i < response.data.response.length; i++) {
              ballList3.push({
                value: response.data.response[i],
                label: response.data.response[i]
              });
            }
            that.KnowledgePoint3 = ballList3;
            console.log("knowledgepoint3", that.KnowledgePoint3);
          })
          .catch(function(error) {
            console.log(error);
          });
      } else {
        console.log(false);
      }
    },
    findQue() {
      let that = this;
      this.$axios
        .post(Question.questionlibraryshow, {
          Choicecatalogue: this.value1, //选择目录（必选）
          Difficulty: this.value2,
          Testparttype1: this.value3, //一级小测模块类型
          Testparttype2: this.value4,
          Level1: this.value5, //一级知识点
          Level2: this.value6,
          Level3: this.value7,
          Titlecontent: this.queTitle, //题目内容
          Rateimport: "", //预留：批量导入
          Addtitle: "" //预留：添加题目
        })
        .then(function(response) {
          console.log("response", response);
          var ballList = [];
          for (var i = 0; i < response.data.Temp.length; i++) {
            ballList.push({
              num: i + 1,
              question: response.data.Temp[i].List1,
              questionType: response.data.Temp[i].Questiontype1,
              testPartType:
                response.data.Temp[i].Testparttype1 +
                "-" +
                response.data.Temp[i].Testparttype2,
              knowledgePoint:
                response.data.Temp[i].Point1 +
                "-" +
                response.data.Temp[i].Point2 +
                "-" +
                response.data.Temp[i].Point3,
              degreeOfDifficulty: response.data.Temp[i].Difficultylevel
            });
          }
          that.tableData = ballList;
        })
        .catch(function(error) {
          console.log("error1", error);
        });
    },
    //分页实现
    handleSizeChange: function(size) {
      this.pagesize = size;
    },
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage;
    }
  }
};
</script>

<style lang="css" scoped>
 @import './public.css';

/* 题目内容 */
/* 题目中的下拉框 知识点 难易度 */
.questionSelect {
  margin-right: 15px;
}
.compositionQuestion {
  padding-left: 15px;
}

.ql-container.ql-snow{
  border: 0;
}
/* 题目中的每一行元素 题型 题干等 */
.questionRow {
  margin-bottom: 20px;
}
.compositionQuestion el-radio-group {
  height: 20px;
}
.el-radio-button__inner {
  font-size: 20px;
  color: black;
  padding: 10px 20px;
}
.outSpan {
  display: block;
  font-size: 20px;
  margin: 8px 0;
  color: black;
}
.questionSub {
  display: flex;
  justify-content: flex-end;
}
.upload-demo {
  text-align: center;
}
</style>