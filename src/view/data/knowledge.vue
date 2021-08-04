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
      <!-- 操作 -->
      <div class="operation">
        <ul class="pagesNav">
          <li>
            <router-link
              :to="{path: '/data/addCourseData', query: { courseName: courseName,phoneNum: phoneNum,userNum:userNum ,teacherName:teacherName,myImage:myImage }}"
              style="padding-left:0;"
            >课程资料</router-link>|
          </li>
          <li>
            <router-link
              :to="{path: '/data/queLibrary', query: { courseName: courseName,phoneNum: phoneNum,userNum:userNum ,teacherName:teacherName,myImage:myImage }}"
             
            >题库</router-link>|
          </li>
          <li>
            <router-link
              :to="{path: '/data/testLibrary', query: { courseName: courseName,phoneNum: phoneNum,userNum:userNum ,teacherName:teacherName,myImage:myImage }}"
            >试卷库</router-link>|
          </li>
		  <li>
		    <router-link
		      :to="{path: '/data/knowledge', query: { courseName: courseName,phoneNum: phoneNum,userNum:userNum ,teacherName:teacherName,myImage:myImage }}"
		  style="color: #CC3333;"   >知识点</router-link>
		  </li>
        </ul>
       <!-- <div>
          <el-button type="danger" @click="newKnowledgeProp = true">添加知识点</el-button>
          <el-button type="danger" @click="batchImport('批量导入')">批量导入</el-button>
        </div> -->
      </div>
     
      <!-- 模块类型&&知识点&&查询 -->
      
      <el-row class="questionRow">
        <el-col :span="2">
          <span class="outSpan">知识点:</span>
        </el-col>
        <el-col :span="4">
          <el-select
            v-model="value5"
            placeholder="请选择"
            class="questionSelect"
			:clearable=true
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
			:clearable=true
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
          <el-select v-model="value7" placeholder="请选择" :clearable=true class="questionSelect" >
            <el-option
              v-for="item in KnowledgePoint3"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="10" class="questionSub">
          <el-button type="danger" style="display: block; width: 30%;" @click="findQue">查询</el-button>
        </el-col>
      </el-row>

      <!-- 表单数据 -->
      <el-table
        :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
        border
        style="width:100%"
      >
        <el-table-column prop="num" label="序号"  align="center"></el-table-column>
        <el-table-column prop="level1" label="层次一" align="center">
        </el-table-column>
        <el-table-column prop="level2" label="层次二"  align="center"></el-table-column>
        <el-table-column prop="level3" label="层次三" align="center"></el-table-column>
        <el-table-column prop="relation" label="关联的题目数" align="center"></el-table-column>
		<el-table-column prop="memo" label="举例" align="center" :show-overflow-tooltip='true'></el-table-column>
       
      </el-table>
      <!-- 分页器 -->
      <!-- <el-pagination background layout="prev, pager, next" :total="1000"></el-pagination> -->
      <el-pagination
        background
        :total="tableData.length"
        :page-size="pagesize"
        :current-page.sync="currentPage"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        layout="total, sizes, prev, pager, next, jumper"
      ></el-pagination>
      <div style="height:100px;"></div>
    </div>
    <!-- 批量导入题目 -->
	<el-dialog title="添加知识点" :visible.sync="newKnowledgeProp">
	  <el-form>
	    <el-form-item label="层次一" label-width="120px">
	      <el-input v-model="newKnowledge1" autocomplete="off"></el-input>
	    </el-form-item>
		<el-form-item label="层次二" label-width="120px">
		  <el-input v-model="newKnowledge2" autocomplete="off"></el-input>
		</el-form-item>
		<el-form-item label="层次三" label-width="120px">
		  <el-input v-model="newKnowledge3" autocomplete="off"></el-input>
		</el-form-item>
	  </el-form>
	  <div slot="footer" class="dialog-footer" style="text-align: center;">
	    <el-button type="danger" @click="saveDirect">完 成</el-button>
	    <el-button @click="newKnowledgeProp = false">取 消</el-button>
	  </div>
	   
	</el-dialog>
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
  <!-- 添加目录 -->
  </div>
</template>


<script>
import elHead from "../../components/head";
import Question from "../../api/get";
export default {
  name:'addQuestion',
  data() {
    return {
      editorOption:{
        modules:{
            toolbar: false
        }
      },
      courseName: "",
      phoneNum: "",
      userNum: "",
      teacherName: "",
      myImage:"",
	  IndexId:"",

      currentTableData: [],
      tableData: [],
      // 下拉菜单
      directory: [],
      value1: "",
      queTitle: "",
      // 难易度
      difficultytype: [],
      value2: '',
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
	  newKnowledgeProp: false,
      boxTitle: "",
      // 分页
      currentPage: 1,
      pagesize: 10
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
	this.IndexId = this.$route.query.id;
  },
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      let that = this;
	  this.$axios
	    .post(Question.knowledgelibraryshow, {

	    })
	    .then(function(response) {
	      // console
	      console.log("知识点", response);
	      // console.log("response", response.data.data1);
	      // var length = response.data.data1.length;
	      // console.log("length", length);
	      var ballList = [];
	      for (var i = 0; i < response.data.data.length; i++) {
	        ballList.push({
	          id: response.data.data[i].KnowledgeId,
	          num: i+1,
	          level1: response.data.data[i].KnowledgeLevel1,
	          level2: response.data.data[i].KnowledgeLevel2,
	          level3:response.data.data[i].KnowledgeLevel3,
	         // knowledgePoint:response.data.data[i].testPartType,
	          relation: response.data.data[i].Relation,
			  memo: response.data.data[i].Memo,
	        });
	      }
	      that.tableData = ballList;
	    })
	    .catch(function(error) {
	      console.log("error1", error);
	    });
      // 难易度
      this.$axios.get(Question.difficultytypegetname).then(function(response) {
        console.log("难易度", response);
        // console.log("response.data.response", response.data.response);
        var ballList4 = [];
        for (var i = 0; i < response.data.data.length; i++) {
          ballList4.push({
            value: i+1,
            // value: response.data.response[i],
            label: response.data.data[i]
          });
        }
        that.difficultytype = ballList4;
      });
      // 模块类型--模块一
      // this.$axios.get(Question.testparttype1).then(function(response) {
      //   var ballList = [];
      //   for (var i = 0; i < response.data.response.length; i++) {
      //     ballList.push({
      //       value: response.data.response[i].level1,
      //       label: response.data.response[i].level1
      //     });
      //   }
      //   that.questionPartLevel1 = ballList;
      // });
      // console.log("模块类型--模块一", that.questionPartLevel1);

   //   知识点1
      this.$axios
        .post(Question.knowledgepointlevel1)
        .then(function(response) {
          var ballList1 = [];
          for (var i = 0; i < response.data.data.length; i++) {
            ballList1.push({
              value: response.data.data[i].KnowledgeId,
              label: response.data.data[i].KnowledgeLevel1,
            });
          }
          that.KnowledgePoint1 = ballList1;
        })
        .catch(function(error) {
          console.log("error1", error);
        });
      
    
      console.log("123123", this.escapeStringHTML('<p>123</p>'))
    },
    escapeStringHTML(str) {
      str = str.replace(/&lt;/g,'<');
      str = str.replace(/&gt;/g,'>');
      // str.creatt
      return str;
    },
    // 添加题目-跳转至添加题目界面
    addQue() {
      this.$router.push({ path: '/data/addTypeQuestion', query: { phoneNum: this.phoneNum, courseName: this.courseName,testName: this.value1,id: this.IndexId,}});
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
            // console.log(response);
            // console.log("response.data.response", response.data.response);
            var ballList2 = [];
           for (var i = 0; i < response.data.data.length; i++) {
             ballList2.push({
               value: response.data.data[i].KnowledgeId,
               label: response.data.data[i].KnowledgeLevel2,
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
           for (var i = 0; i < response.data.data.length; i++) {
             ballList3.push({
               value: response.data.data[i].KnowledgeId,
               label: response.data.data[i].KnowledgeLevel3
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
      .post(Question.knowledgelibraryshow, {
        Level1: that.value5,
	    Level2: that.value6,
	    Level3: that.value7
      })
      .then(function(response) {
        // console
        console.log("知识点", response);
        // console.log("response", response.data.data1);
        // var length = response.data.data1.length;
        // console.log("length", length);
        var ballList = [];
        for (var i = 0; i < response.data.data.length; i++) {
          ballList.push({
            id: response.data.data[i].KnowledgeId,
            num: i+1,
            level1: response.data.data[i].KnowledgeLevel1,
            level2: response.data.data[i].KnowledgeLevel2,
            level3:response.data.data[i].KnowledgeLevel3,
           // knowledgePoint:response.data.data[i].testPartType,
            relation: response.data.data[i].Relation,
    			  memo: response.data.data[i].Memo,
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
    },

    // 移除题目
    deleteItem(row) {
      let that = this;
      console.log("row", row);
      this.$confirm('此操作将永久移除该目录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios
            .post(Question.questionlibrarydelete, {
              Questionid: row
            })
            .then(function(response) {
              console.log("response", response);
              that.getList();
              that.$message({
                type: 'success',
                message: '删除成功!'
              });
            })
            .catch(function(error) {
              console.log("error1", error);
            });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
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

.questionRow .quill-editor .ql-snow{
  border: 0 !important;
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
  font-size: 18px;
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