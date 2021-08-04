<template>
  <!-- 资料-课程资料-添加资料 -->
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
              style="color: #CC3333; padding-left:0;"
            >课程资料</router-link>|
          </li>
          <li>
            <router-link :to="{path: '/data/queLibrary', query: { courseName: courseName,phoneNum: phoneNum,userNum:userNum ,teacherName:teacherName,myImage:myImage }}">题库</router-link>|
          </li>
          <li>
            <router-link :to="{path: '/data/testLibrary', query: { courseName: courseName,phoneNum: phoneNum,userNum:userNum ,teacherName:teacherName,myImage:myImage }}">试卷库</router-link>|
          </li>
		  <li>
		    <router-link
		      :to="{path: '/data/knowledge', query: { courseName: courseName,phoneNum: phoneNum,userNum:userNum ,teacherName:teacherName,myImage:myImage }}"
		    >知识点</router-link>
		  </li>
        </ul>
        <div>
          <el-button type="danger" @click="addNewurl = true">添加链接资料</el-button>
          <el-button type="danger" @click="newCatalogProp = true">添加课程资料</el-button>
        </div>
      </div>

      <!-- 选项栏 -->
      <div class="optionsBar">
        <el-row class="optionsBarCon">
          <el-col :span="10">
            选择章节
            <el-select v-model="value2" placeholder="请选择" @change="getType">
              <el-option
                v-for="item in partclass"
                :key="item.course"
                :value="item.course"
              ></el-option>
            </el-select>
          </el-col>
          <el-col :span="10">
            选择类型
            <el-select v-model="value3" clearable placeholder="请选择" >
              <el-option
                v-for="item in typeData"
                :key="item"
                :value="item"
              ></el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-row :span="24" style="padding-top: 20px;">
          <el-button type="danger" @click="chaxun">查询</el-button>
        </el-row>
      </div>


      <el-table
        :data="chaxunData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
        border
        style="width:100%"
      >
        <el-table-column prop="id" label="ID" width="180" align="center"></el-table-column>
        <!--  prop="contentName" -->
        <el-table-column prop="contentName" label="目录/文件名" width="350" align="center"></el-table-column>
        <el-table-column prop="type" label="文件类型" align="center"></el-table-column>
        <!-- <el-table-column prop="size" label="大小" align="center"></el-table-column> -->
        <el-table-column prop="createTime" label="创建时间" align="center"></el-table-column>
        <el-table-column fixed="right" label="操作" width="200" align="center">
          <template slot-scope="scope">
		      <el-button type="text" size="small" @click="downloadItem(scope.row.url)" >下载</el-button>
        <el-button type="text" size="small" @click="delItme(scope.row.id)" >移除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <!-- <el-pagination background layout="prev, pager, next" :total="1000"></el-pagination> -->
      <el-pagination
        background
        :total="chaxunData.length"
        :current-page.sync="currentPage"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        layout="total, sizes, prev, pager, next, jumper"
      ></el-pagination>
      <div style="height:100px;"></div>
    </div>

    <!-- 添加链接资料 -->
    <el-dialog title="添加链接资料" :visible.sync="addNewurl">
      <div>
      选择章节：
    <el-select v-model="value1"  placeholder="请选择">
      <el-option
        v-for="item in partclass"
        :key="item.course"
        :value="item.course"
      ></el-option>
    </el-select>
      </div>
      <div><br></div>
      <br>
      <el-form>
        <el-form-item label="输入链接：">
          <el-input v-model="newCatalogurl" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" style="text-align: center;">
        <el-button type="danger" @click="saveurl">完 成</el-button>
        <el-button @click="addNewurl = false">取 消</el-button>
      </div>
    </el-dialog>

    <!-- 添加课程资料 -->
    <el-dialog title="添加课程资料" :visible.sync="newCatalogProp">
      <div>
      选择章节：
    <el-select v-model="value1" placeholder="请选择">
      <el-option
        v-for="item in partclass"
        :key="item.course"
        :value="item.course"
      ></el-option>
    </el-select>
      </div>
      <div><br></div>
    <br>
    <el-tabs type="border-card">
     <el-upload class="upload-demo" drag action="https://lic2.luckyzune.com/material/upload"
                    name="userfile"  :on-success="handleSuccess" :show-file-list="false" >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">
          将文件拖到此处，或
          <em>点击上传</em>
        </div>
        <!-- <div class="el-upload__tip" slot="tip">大小不超过500kb</div> -->
      </el-upload>
    </el-tabs>
     <!-- <div slot="footer" class="dialog-footer" style="text-align: center;">
        <el-button type="primary" @click="handleSave">完 成</el-button>
        <el-button @click="newCatalogProp = false">取 消</el-button>
      </div> -->
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
      value1: "",
      value2: "",
      value3: "",
      value4: "",
      tableData: [],
      partclass: [],
      chaxunData: [],
      typeData: [],
      // typeContent: ['PPT','PDF','Word','音频','网页链接','其他'],
      // editeFlag: false,
      newCatalogProp: false,
      addNewurl: false,
      newCatalogurl:'',
      newCatalog: "",
      // 分页
      currentPage: 1,
      pagesize: 10,
      authorize: 1,
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
    // console.log("电话:",this.$route.query.phoneNum);
    // console.log("电话:",this.passCellPhoneNum);
  },
  mounted() {
    console.log(this.courseName);
    this.getList();
    let that = this;
    //获取第几课
    this.$axios
      .post(Question.coursepart,{
        CourseName: that.courseName,
      })
      .then(function(response){
        console.log("response",response);
        console.log("coursename","学在中国"+that.courseName);
        if(response.data.status == 200){
          var ballList = [];
          for(var i=0;i < response.data.data.length; i++){
            if(response.data.data[i].Material=='未添加url')
            ballList.push({
              course: response.data.data[i].CoursePartId,
            });
          }
          that.partclass = ballList;
          console.log("总条数",that.partclass);
          console.log(that.partclass);
        }else{
          that.$message.error(response.data.ErrMsg);
        }
      })
      .catch(function(error){
        console.log("error1", error);
      });
  },
  methods: {
    saveurl(){
      var that = this;
      if(that.newCatalogurl != "") {
        var nowTime = new Date().toLocaleString();
        var index = nowTime.indexOf(" ");
        var creation = nowTime
			       .substring(0, index)
             .replace(new RegExp("/", "gm"), "-");   

        that.$axios
          .post(Question.uploadcourse, {
            Url: that.newCatalogurl,
            Size: that.newCatalogurl,
            CourseName: that.courseName,
            ClassId: localStorage.getItem('classId'),
            Creation: creation.toString(),
            CoursePartId: that.value1,
            MaterialType: "网页链接",
            Authorize: 1,
          })
          .then(function(response) {
            console.log("response", response);
            if(response.data.status == 200) {
              that.addNewurl = false;
              that.value1 = '',
              that.value4 = '',
              that.newCatalogurl = "";
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
          message: '链接不能为空！',
          type: 'error'
        });
      }
    },
    getList() {
      let that = this;
      this.$axios
        .post(Question.alldirectory, {
         CourseName: that.courseName,
         ClassId: localStorage.getItem('classId')
        })
        .then(function(response) {
          console.log("response", response);
          var ballList = [];
         for (var i = 0; i < response.data.data.length; i++) {
           ballList.push({
             // num: i+1,
             id: response.data.data[i].MaterialId,
             num: response.data.data[i].OrderNum,
             contentName: response.data.data[i].MaterialName,
             name: response.data.data[i].UploaderName,
             size: response.data.data[i].Size,
             createTime: response.data.data[i].CreateTime,
			        url: response.data.data[i].Url,
           });
         }
          that.tableData = ballList;
        })
        .catch(function(error) {
          console.log("error", error);
        });
    },
    getType(selVal){
      let that  = this;
      console.log("selVal",selVal);
      if(selVal!="请选择"){
        that.$axios
        .post(Question.coursepart,{
          CourseName: that.courseName,
        })
        .then(function(response){
          console.log("response", response);
          var typeList = [];
          for(var i=0;i<response.data.data.length;i++){
            if(response.data.data[i].CoursePartId == that.value2 && response.data.data[i].Material!="未添加url"){
              typeList.push({
                type: response.data.data[i].MaterialType,
              });
            }
          }
          var list = [];
          for(var i=0;i<typeList.length;i++){
            list[i] = typeList[i].type
          }
          
          var hash={},result = [];
          for(var i = 0;i<list.length;i++)
          if(!(list[i] in hash)){
            hash[list[i]] = true;
            result.push(list[i]);
          }
          that.typeData = result;
          console.log("typeData",that.typeData);
        })
        .catch(function(error){
          console.log("error",error);
        });
      }
    },
    
    //查询
    chaxun(){
      let that = this;
      if(String(this.value2) != "" && (this.value3)!=""){
        this.$axios
        .post(Question.coursepart, {
          CourseName: that.courseName,
        })
        .then(function(response) {
          console.log("response",response);
          var List = [];
          for(var i=0;i<response.data.data.length;i++){
            if(response.data.data[i].CoursePartId == that.value2 && response.data.data[i].MaterialType==that.value3){
              List.push({
                id: response.data.data[i].Id,
                contentName: response.data.data[i].Size,
                createTime: response.data.data[i].Creation,
                url: response.data.data[i].Uploader,
                type: response.data.data[i].MaterialType,
              })
            }
          }
          that.chaxunData = List;
          console.log("data",that.chaxunData);
        })
        .catch(function(error) {
          console.log("error1", error);
        });
      }else if(String(this.value2) != ""){
        this.$axios
        .post(Question.coursepart, {
          CourseName: that.courseName,
        })
        .then(function(response) {
          console.log("response",response);
          var List = [];
          for(var i=0;i<response.data.data.length;i++){
            if(response.data.data[i].CoursePartId == that.value2 && response.data.data[i].Material!="未添加url"){
              List.push({
                id: response.data.data[i].Id,
                contentName: response.data.data[i].Size,
                createTime: response.data.data[i].Creation,
                url: response.data.data[i].Uploader,
                type: response.data.data[i].MaterialType,
              })
            }
          }
          that.chaxunData = List;
          console.log("data",that.chaxunData);
        })
        .catch(function(error) {
          console.log("error1", error);
        });
      }
      else {
			that.$message({
			  message: '请选择章节以及类型！',
			  type: 'warning'
			});
		}
    },

    handleSave: function() {
      // 存数据
      let that = this;
      if(that.newCatalog != "") {
        var nowTime = new Date().toLocaleString();
        var index = nowTime.indexOf(" ");
        var creation = nowTime
            .substring(0, index)
            .replace(new RegExp("/", "gm"), "-");     

        this.$axios
          .post(Question.newdirectory, {
            directory: that.newCatalog,
            Author: localStorage.getItem("teacherName"),
            Creation: creation
          })
          .then(function(response) {
            if(response.data.ErrCode == 0) {
              that.$message({
                message: '学生添加成功！',
                type: 'success'
              });
              that.newCatalogProp = false;
              that.getList();
            } else {
              that.$message({
                message: response.data.ErrMsg,
                type: 'error'
              });
            }
          })
          .catch(function(error) {
            console.log("error", error);
          });
      } else {
        that.$message({
          message: '添加的目录/文件名不能为空！',
          type: 'error'
        });
      }
    },
	// 下载
	downloadItem(text) {
		 console.log("downloadItem", text);
		 window.open(text)
	  let that = this;

	},
    // 删除
    delItme(text) {
      let that = this;
      that.$confirm('此操作将永久移除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          that.$axios
            .post(Question.directorydelete, {
              MaterialId: text.toString()
            })
            .then(function(response) {
              console.log("response", response);
              console.log("text", text);
              if(response.data.status == 200) {
                that.chaxun();
                that.$message({
                  type: 'success',
                  message: '移除成功!'
                });
              } else {
                that.$message({
                  type: 'error',
                  message: response.data.message
                });
              }
            })
        }).catch(() => {
          that.$message({
            type: 'info',
            message: '已取消移除'
          });          
        });
    },
	    // 文件上传成功时的钩子
	  handleSuccess(res, file, fileList) {
		   let that = this;
       console.log("res", res);
       console.log("value1",that.value1);
       console.log("file.name",file.name);

		   if (res.status==200) { 
        var nowTime = new Date().toLocaleString();
        var index = nowTime.indexOf(" ");
        var creation = nowTime
			       .substring(0, index)
             .replace(new RegExp("/", "gm"), "-");   

        var str = file.name;
        var type = str.split(".");
        var mtype = type[type.length-1];
        console.log(mtype);
            
        var reader = new FileReader();
        console.log("file",file)
        reader.readAsDataURL(file.raw)
        reader.onload = function(e) {
          // base64 = e.target.result;
          console.log("target",e.target);
          console.log("e:",e);
        }

        //Size用来存放文件名（因为Url会自动给文件名加上一段乱码）
			   this.$axios
			     .post(Question.uploadcourse, {
			       Url: res.data.Url,
				     Size: file.name,
			       CourseName: that.courseName,
			       ClassId: localStorage.getItem('classId').toString(),
             Creation: creation.toString(),
             CoursePartId: that.value1,
             MaterialType: mtype,
             Authorize: 1,
			     })
			     .then(function(response) {
           console.log("response", response);
			       if(response.data.status == 200) {
               that.value1 = '',
               that.value4 = '',
			         that.$message({
			           message: '上传成功！',
                 type: 'success',
                 
			         });
			         that.newCatalogProp = false;
			        //  that.getList();
			       } else {
			         that.$message({
			           message: response.data.ErrMsg,
			           type: 'error'
			         });
			       }
			     })
			     .catch(function(error) {
			       console.log("error", error);
			     });
		   } else {
			   that.$message({
			     type: 'warning',
			     message: '上传失败!'
			   });
		   }
	    
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
</style>