<template>
  <!-- 资料-试卷库 -->
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
            <router-link :to="{path: '/statistics', query: { courseName: courseName,phoneNum: phoneNum,userNum:userNum ,teacherName:teacherName,myImage:myImage }}">统计</router-link>|
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
            <router-link :to="{path: '/data/queLibrary', query: { courseName: courseName,phoneNum: phoneNum,userNum:userNum ,teacherName:teacherName,myImage:myImage }}"
            style="color: #CC3333;">题库</router-link>|
          </li>
          <li>
            <router-link
              :to="{path: '/data/testLibrary', query: { courseName: courseName,phoneNum: phoneNum,userNum:userNum ,teacherName:teacherName,myImage:myImage }}"
            >试卷库</router-link>|
          </li>
		  <li>
		    <router-link
		      :to="{path: '/data/knowledge', query: { courseName: courseName,phoneNum: phoneNum,userNum:userNum ,teacherName:teacherName,myImage:myImage }}"
		    >知识点</router-link>
		  </li>
        </ul>
        <div>
          <el-button type="danger" @click="newCatalogProp = true">创建目录</el-button>
          <!-- <el-button type="primary" @click="onNewData=true">随机创建</el-button> -->
        </div>
      </div>
      <!-- prop="testName" -->
      <el-table
        :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
        border
        style="width:100%"
      >
        <el-table-column prop="num" label="序号" width="180" align="center"></el-table-column>
        <el-table-column label="目录" align="center">
          <template slot-scope="scope">
            <router-link :to="{path: '/data/addQuestion', query: { courseName: courseName,phoneNum: phoneNum,userNum:userNum ,teacherName:teacherName,myImage:myImage,testName: scope.row.testName,id: scope.row.id}}">
              <span v-if="!scope.row.editeFlag">{{ scope.row.testName }}</span>
            </router-link>
            <span v-if="scope.row.editeFlag" class="cell-edit-input">
              <el-input v-model="scope.row.testName" placeholder="请输入内容"></el-input>
            </span>
            <span
              v-if="!scope.row.editeFlag"
              style="margin-left:10px;"
              class="cell-icon"
              @click="handleEdit(scope.row.num-1,scope.row)"
            >
              <i class="el-icon-edit"></i>
            </span>
            <span
              v-if="scope.row.editeFlag"
              style="margin-left:10px;"
              class="cell-icon"
              @click="handleSave(scope.row.num-1,scope.row)"
            >
              <i class="el-icon-document"></i>
            </span>
          </template>
        </el-table-column>
        <el-table-column label="注释" align="center">
          <template slot-scope="scope">
            <span v-if="!scope.row.notesFlag">{{ scope.row.notes }}</span>
            <span v-if="scope.row.notesFlag" class="cell-edit-input">
              <el-input v-model="scope.row.notes" placeholder="请输入内容"></el-input>
            </span>
            <span 
              v-if="!scope.row.notesFlag"
              style="margin-left:10px;"
              class="cell-icon"
              @click="notesEdit(scope.row.num-1,scope.row)"
            >
              <i class="el-icon-edit"></i>
            </span>
            <span
              v-if="scope.row.notesFlag"
              style="margin-left:10px;"
              class="cell-icon"
              @click="notesSave(scope.row.num-1,scope.row)"
            >
              <i class="el-icon-document"></i>
            </span>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="name" label="创建者" align="center"></el-table-column> -->
        <el-table-column prop="createTime" label="创建时间" align="center" ></el-table-column>
        <el-table-column prop="num" fixed="right" label="操作" width="100" align="center">
          <template slot-scope="scope">
            <!-- <el-button type="text" size="small">编辑</el-button> -->
            <el-button type="danger" size="small" @click="remove(scope.row.id)">移除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        :total="tableData.length"
        :current-page.sync="currentPage"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        layout="total, sizes, prev, pager, next, jumper"
      ></el-pagination>
    </div>

    <!-- 添加目录 -->
    <el-dialog title="添加目录" :visible.sync="newCatalogProp">
      <el-form>
        <el-form-item label="目录名" label-width="120px">
          <el-input v-model="newCatalog" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" style="text-align: center;">
        <el-button type="danger" @click="saveDirect">完 成</el-button>
        <el-button @click="newCatalogProp = false">取 消</el-button>
      </div>
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
      myImage:"",

      newCatalogProp: false,
      newCatalog: "",

      tableData: [],
      editeFlag: false,
      notesFlag: true,
      // 分页
      currentPage: 1,
      pagesize: 10
    };
  },
  components: {
    elHead
  },
  created(){
    this.phoneNum = this.$route.query.phoneNum;
    this.courseName = this.$route.query.courseName;
    this.userNum = this.$route.query.userNum;
    this.teacherName = this.$route.query.teacherName;
    this.myImage = this.$route.query.myImage;
  },
  mounted() {
    this.getDataList();
  },
  methods: {
    sortData(){
      return sortdata(this.tableData,'createTime');
      console.log("sortData",sortdata(this.tableData,'createTime'));
    },

    getDataList() {
      let that = this;
      this.$axios
        .post(Question.directorylibraryshow, {
          CourseName: that.courseName,
          ClassId: localStorage.getItem('classId')
        })
        .then(function(response) {
          console.log("response123", response);
          var ballList = [];
          for (var i = 0; i < response.data.data.length; i++) {
            ballList.push({
              // num: i+1,
              id: response.data.data[i].IndexId,
              num: response.data.data[i].OrderNum,
              testName: response.data.data[i].Description,
              createTime: response.data.data[i].CreateTime,
              notes: response.data.data[i].Note,
              editeFlag:false,
              notesFlag:false,
            });
          }
          that.tableData = ballList;
          console.log("that.tableData", that.tableData);
        })
        .catch(function(error) {
          console.log("error1", error);
        });
    },

    saveDirect() {
      var that = this;
      if(that.newCatalog != "") {
        that.$axios
          .post(Question.directorylibraryadd, {
            CourseName: that.courseName,
            ClassId: localStorage.getItem('classId'),
            Directoryname: that.newCatalog
          })
          .then(function(response) {
            console.log("response", response);
            if(response.data.status == 200) {
              that.newCatalogProp = false;
              that.newCatalog = "";
              that.$message({
                message: '保存成功！',
                type: 'success'
              });
              that.getDataList();
            } else {
              that.$message.error(response.data.data);
              that.getDataList();
            }
          })
          .catch(function(error) {
            console.log("error", error);
          });
      } else {
        that.$message({
          showClose: true,
          message: '目录名不能为空！',
          type: 'error'
        });
      }
    },
    handleEdit: function(index, row) {
      //遍历数组改变editeFlag
      console.log("row", row);
      console.log("index", index);
      this.tableData[index].editeFlag = true;
    },
    handleSave: function(index, row) {
      var that = this;
      //保存数据，向后台取数据
      console.log("index", index)
      console.log("row", row)
      console.log("this.tableData", that.tableData)
      console.log("that.tableData[index].testName",that.tableData[index].testName);
      that.tableData[index].editeFlag = false;

      that.$axios
        .post(Question.directorynameedit, {
          QuestiontopicindexId: String(row.id),
          Directoryname: String(that.tableData[index].testName),

        })
        .then(function(response) {
          console.log("responseName", response);
          if(response.data.ErrCode == 0) {
            that.$message({
              message: '保存成功！',
              type: 'success'
            });
            that.getDataList();
          } else {
             that.$message.error(response.data.ErrMsg);
             that.getDataList();
          }
        })
        .catch(function(error) {
          console.log("error", error);
        });
    },

    notesEdit: function(index, row) {
      //遍历数组改变editeFlag
      console.log("row", row);
      console.log("index", index);
      this.tableData[index].notesFlag = true;
    },

    notesSave: function(index, row) {
      var that = this;
      //保存数据，向后台取数据
      console.log("index", index)
      console.log("row", row)
      console.log("this.tableDatasave", that.tableData)
      that.tableData[index].notesFlag = false;

      that.$axios
        .post(Question.directorylibrarynotes, {
          QuestionId: String(row.id),
          Notes: String(row.notes)
        })
        .then(function(response) {
          console.log("response", response);
          if(response.data.ErrCode == 0) {
            that.$message({
              message: '注释成功！',
              type: 'success'
            });
            that.getDataList();
          } else {
             that.$message.error(response.data.ErrMsg);
             that.getDataList();
          }
        })
        .catch(function(error) {
          console.log("error", error);
        });
    },
    remove(id) {
      let that = this;
      console.log("id", id);
      this.$confirm('此操作将永久移除该目录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios
            .post(Question.delete, {
              QuestiontopicindexId: String(id)
            })
            .then(function(response) {
              console.log("responsedelete", response);
              that.getDataList();
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

function sortdata(array,key) {
  console.log("被调用");
  return array.sort(function(a,b){
    var x = a[key];
    var y = b[key];
    return ((x>y)?-1:((x<y)?1:0));
  })
  
}
</script>

<style lang="css" scoped>
 @import './public.css';
</style>
