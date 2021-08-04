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
          {{courseName}}
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
            >统计</router-link>|
          </li>
          <li>
            <router-link
              :to="{path: '/data/queLibrary', query: { courseName: courseName,phoneNum: phoneNum,userNum:userNum ,teacherName:teacherName,myImage:myImage }}"
              style="color: #CC3333;"
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
      <!-- 选择目录 -->
      <el-row class="questionRow">
        <el-col :span="2">
          <span class="outSpan">选择目录:</span>
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
          <el-select v-model="value2" clearable placeholder="请选择" class="questionSelect">
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
      <!-- 知识点&&查询 -->
      <el-row class="questionRow">
        <el-col :span="2">
          <span class="outSpan">知识点:</span>
        </el-col>
        <el-col :span="4">
          <el-select
            v-model="value4"
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
            v-model="value5"
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
          <el-select v-model="value6" placeholder="请选择" class="questionSelect">
            <el-option
              v-for="item in KnowledgePoint3"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="10" class="questionSub">
          <el-button type="danger" style="display: block; width: 20%;" @click="findQue">查询</el-button>
        </el-col>
      </el-row>
      <!-- 表单数据 -->
      <el-table
        :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
        border
        style="width:100%"
        ref="tabledata"
      >
        <el-table-column type="selection" align="center"></el-table-column>
        <!-- <el-table-column type="selection" align="center" @selection-change="selectionRowsChange"></el-table-column> -->
        <el-table-column prop="num" label="序号" align="center" width="50px"></el-table-column>
        <el-table-column prop="Context" label="目录/题目" align="center" width="350px" :show-overflow-tooltip='true'>
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" :content="scope.row.Details" placement="top">
               <div v-html="scope.row.Context"></div>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column prop="testPartType" label="题型" align="center"></el-table-column>
        <el-table-column prop="knowledgePoint" label="知识点" align="center"></el-table-column>
        <el-table-column prop="degreeOfDifficulty" label="难易度" align="center"></el-table-column>
        <!-- <el-table-column prop="creator" label="创建者" align="center"></el-table-column>
        <el-table-column prop="CreateTime" label="创建时间" align="center"></el-table-column>-->
      </el-table>
      <!-- 分页器 -->
      <el-row>
        <el-pagination
          background
          :total="tableData.length"
          :page-size="10"
          :current-page.sync="currentPage"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          layout="total, sizes, prev, pager, next, jumper"
        ></el-pagination>
      </el-row>
      <el-row class="questionRow" >
      <el-col :span="7" class="footer"></el-col>
        <el-col :span="5" class="footer">
          <el-button
            type="danger"
            style="display: block; width: 25%; margin:0 auto;"
            @click="finishSelect"
          >完成</el-button>
        </el-col>
		<el-col :span="5" class="footer">
		  <el-button type="danger" @click="returnTop()" style="display: block; width: 25%; margin-left: 10px">返回</el-button>
		</el-col>
      </el-row>
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
	   index: 0,
      teacherName: "",
      myImage: "",
      testName: "",
	  paperId:0,
      tableData: [],
      // 下拉菜单
      directory: [],
      value1: "",
      // 知识点
      KnowledgePoint1: [],
      KnowledgePoint2: [],
      KnowledgePoint3: [],
      value4: "",
      value5: "",
      value6: "",
      // 难易度
      difficultytype: [],
      value2: "",
      queTitle: "",
      value: "",
      checked: false,
      // 分页
      currentPage: 1,
      pagesize: 10,
      //
      part1:"",
      part2:"",
      multipleSelection: [],

      existList: null, // id列表
    };
  },
  components: {
    elHead
  },
  created() {
    this.phoneNum = this.$route.query.phoneNum;
    this.courseName = this.$route.query.courseName;
    this.testName = this.$route.query.testName;
    this.userNum = this.$route.query.userNum;
    this.teacherName = this.$route.query.teacherName;
    this.myImage = this.$route.query.myImage;
    this.paperId= this.$route.query.paperId;
    // 模块类型
    this.part1 = this.$route.query.part1;
    this.part2 = this.$route.query.part2;
	 this.index = this.$route.query.index;
    this.existList = this.$route.query.existList;
  },
  mounted() {
    let that = this;
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

    this.$axios
      .post(Question.directorylibraryshow, {
        CourseName: that.courseName,
        ClassId: localStorage.getItem('classId')
      })
      .then(function(response) {
        console.log("目录", response)
        var ballList = [];
        for (var i = 0; i < response.data.data.length; i++) {
          ballList.push({
            value: response.data.data[i].IndexId,
            label: response.data.data[i].Description
          });
        }
        that.directory = ballList;
      })
      .catch(function(error) {
        console.log("error", error);
      });

    // 难易度
    this.$axios.get(Question.difficultytypegetname).then(function(response) {
      // console.log("response", response);
      // console.log("response.data.response", response.data.response);
      var ballList4 = [];
      for (var i = 0; i < response.data.data.length; i++) {
        ballList4.push({
          value: i+1,
          label: response.data.data[i]
        });
      }
      that.difficultytype = ballList4;
    });
    // 获取题目
    this.$axios
      .post(Question.papermanageaddquestion, {
        ChoiceCatalogue: '', //
        Difficulty: '',//
        TestPartType1: this.part1,
        TestPartType2: this.part2,
        Level1: '', //一级知识点
        Level2: '',//
        Level3: '',//
        Titlecontent: '', //题目内容
        ExistQuestionId: that.existList

        // Rateimport: "", //预留：批量导入
        // Addtitle: "" //预留：添加题目
      })
      .then(function(response) {
        // console
        console.log(that.part1,that.part2, Array(that.existList));
        console.log("response", response.data);
        var ballList = [];
        for (var i = 0; i < response.data.Temp.length; i++) {
          ballList.push({
            num: response.data.Temp[i].QuestionId,
            Details: response.data.Temp[i].Details,
            Context: response.data.Temp[i].QuestionDescription,
            questionType: response.data.Temp[i].QuestionType,
            testPartType: that.part1 + "-" + that.part2,
            knowledgePoint:
              response.data.Temp[i].Point1 +
              "-" +
              response.data.Temp[i].Point2 +
              "-" +
              response.data.Temp[i].Point3,
            degreeOfDifficulty: response.data.Temp[i].DifficultyLevel
          });
        }
        that.tableData = ballList;
      })
      .catch(function(error) {
        console.log("error1", error);
      });
	  that.$message({
	    message: '请先选择目录后点击查询！',
	    type: 'success'
	  });
	  
  },
  methods: {
    getKnowledgePoint2(selVal) {
      let that = this;
      console.log(selVal);
      if (!selVal != "请选择") {
        console.log(true);
        // 第二个知识点
        this.$axios
          .post(Question.knowledgepointlevel2, { Level1: selVal })
          .then(function(response) {
            // console.log(response);
            // console.log("response.data.response", response.data.response);
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
      var flag=0;
      const loading = this.$loading({
        lock: true,
        text: '正在查询中...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      

      this.$axios
      .post(Question.questionlibraryshow, {
        IndexId: that.value1.toString(), //
        DifficultyType: that.value2.toString(),//
        QuestionPartLevel2: that.part2.toString()
      })
      .then(function(response) {
        console.log("that.value1", that.value1);
        console.log("that.value2", that.value2);
        console.log("that.part2", that.part2);
        console.log("response", response);
        
        if(response.data.status ==200) {
          var ballList = [];
          for (var i = 0; i < response.data.data.length; i++) {
            ballList.push({
            id: response.data.data[i].Id,
            num: response.data.data[i].Num,
            Context: response.data.data[i].Question,
            questionType: response.data.data[i].QuestionType,
            testPartType:response.data.data[i].TestPartType,
           // knowledgePoint:response.data.data[i].testPartType,
            degreeOfDifficulty: response.data.data[i].DegreeOfDifficulty
            });
          }
          that.tableData = ballList;
          loading.close();
          flag=1;                   
          that.$message({
            type: 'success',
            message: '查询成功！'
          });
          console.log("length",ballList.length);
          console.log('ballList',ballList);

        } else {
          that.$message({
            type: 'error',
            message: response.data.message
          });
        }
        
       
      })
      .catch(function(error) {
        console.log("error1", error);
      });

      //4s种后自动关闭
      setTimeout(function(){
        loading.close();
        if(flag==0){
          that.$message({
          type: 'error',
          message: '请求超时！'
      });
      that.tableData = [];
        }
      },4000)

      
      



      // this.$axios
      //   .post(Question.questionlibraryshow, {
      //     Choicecatalogue: that.value1, //选择目录（必选）
      //     Difficulty: String(that.value2),
      //     Testparttype1: that.part1, //一级小测模块类型
      //     Testparttype2: that.part2,
      //     Level1: that.value4, //一级知识点
      //     Level2: that.value5,
      //     Level3: that.value6,
      //     Titlecontent: that.queTitle, //题目内容
      //     Rateimport: "", //预留：批量导入
      //     Addtitle: "" //预留：添加题目
      //   })
      //   .then(function(response) {
      //     console.log("response", response);
      //     console.log("that.value1", that.value1);
      //     console.log("that.value2", that.value2);
      //     console.log("that.part1", that.part1);
      //     console.log("that.part2", that.part2);
      //     console.log("Level1", that.value4);
      //     console.log("Level2", that.value5);
      //     console.log("Level3", that.value6);
      //     console.log("that.queTitle", that.queTitle);
      //     loading.close();
      //     if(response.data.ErrCode == 0) {
      //       var ballList = [];
      //       for (var i = 0; i < response.data.Temp.length; i++) {
      //         ballList.push({
      //           id: response.data.Temp[i].QuestionId,
      //           num: i + 1,
      //           question: response.data.Temp[i].List1,
      //           questionType: response.data.Temp[i].Questiontype1,
      //           testPartType:
      //             response.data.Temp[i].Testparttype1 +
      //             "-" +
      //             response.data.Temp[i].Testparttype2,
      //           knowledgePoint:
      //             response.data.Temp[i].Point1 +
      //             "-" +
      //             response.data.loadTemp[i].Point2 +
      //             "-" +
      //             response.data.Temp[i].Point3,
      //           degreeOfDifficulty: response.data.Temp[i].Difficultylevel
      //         });
      //       }
      //       that.tableData = ballList;
      //       that.$message({
      //         type: 'success',
      //         message: '查询成功！'
      //       });

      //       // 查询成功后清除为空
      //       that.value1 = "";
      //       that.value2 = "";
      //       that.value3 = "";
      //       that.value4 = "";
      //       that.value5 = "";
      //       that.value6 = "";
      //       that.value7 = "";
      //       that.queTitle = "";
      //     } else {
      //       that.$message({
      //         type: 'error',
      //         message: response.data.ErrMsg
      //       });
      //     }
      //   })
      //   .catch(function(error) {
      //     console.log("error1", error);
      //   });
    },
    finishSelect() {
      console.log("testName", this.testName)
      console.log("this.$refs.tabledata.selection", this.$refs.tabledata.selection)
      this.$router.push({
        path: "/data/manualCreateTest",
        query: {
          testName: this.testName,
          selection: this.$refs.tabledata.selection,
          paperId: this.paperId,
          courseName: this.courseName,
          userNum:this.userNum ,
          teacherName:this.teacherName,
          myImage:this.myImage,
          index:this.index
        }
      });
    },
	returnTop() {
	  this.$router.go(-1);
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

<style lang="css">

.el-tooltip__popper, .is-dark {
   width: 500px !important;
 }
</style>

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
.footer {
  margin-top: 20px;
}

/* 清楚hover样式 */

/* 自定义的按钮  需要绑定事件 */
</style>




    