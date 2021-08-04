<template>
  <!-- 管理页面 -->
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
            <router-link :to="{path: '/data/queLibrary', query: { courseName: courseName,phoneNum: phoneNum,userNum:userNum ,teacherName:teacherName,myImage:myImage }}">资料</router-link>|
          </li>
          <li>
            <router-link
              :to="{path: '/adminis', query: { courseName: courseName,phoneNum: phoneNum,userNum:userNum ,teacherName:teacherName,myImage:myImage }}"
              style="padding-right:0; color: #CC3333;"
            >管理</router-link>
          </li>
        </ul>
      </div>
      <!-- 操作 -->
      <div class="operation">
        <el-select v-model="value1" clearable placeholder="请选择" @change="getTeaOrClass">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <div>
         <!-- <el-button type="danger" @click="addClass">新建班级</el-button> -->
          <el-button v-if="value1 != '老师'" type="danger" @click="onAddStuTeac('添加学生')">添加学生</el-button>
          <!-- <el-button v-else type="primary" @click="onAddStuTeac('添加老师')">添加老师</el-button> -->
		 <el-button type="danger" @click="addCourse">
		    添加课程
		 </el-button>
        </div>
      </div>
      <!-- 水平线 -->
      <el-divider></el-divider>
      <!-- 统计提示 -->
      <p v-if="teaOrStu" class="statiTips">该班级共有{{ numOfAll }}名学生</p>
      <p v-if="!teaOrStu" class="statiTips">该班级共有{{ numOfAll }}名老师</p>
      <!-- 表格 -->
      <el-table :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" border style="width: 100%">
        <el-table-column prop="id" label="序号" width="180" align="center"></el-table-column>
        <el-table-column prop="stuName" label="姓名" width="180" align="center"></el-table-column>
        <el-table-column prop="stuId" label="学号(工号)" align="center"></el-table-column>
        <el-table-column prop="department" label="院系" align="center"></el-table-column>
        <el-table-column prop="date" label="加入时间" align="center"></el-table-column>
        <el-table-column fixed="right" label="操作" width="100" align="center">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="remove(scope.row)">移除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <el-pagination
        background
        :total="tableData.length"
        :current-page.sync="currentPage"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        layout="total, sizes, prev, pager, next, jumper"
      ></el-pagination>
      <div style="height:50px;"></div>
    </div>

    <!-- 新建班级 -->
    <el-dialog title="新建班级" :visible.sync="onNewClass">
      <el-form>
        <el-form-item label="班级名称" :label-width="formLabelWidth">
          <el-input v-model="newClassName" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" style="text-align: center;">
        <el-button type="primary" @click="endAddClass">完 成</el-button>
        <el-button @click="notAddClass">取 消</el-button>
      </div>
    </el-dialog>
	
 <!-- 新建班级 -->
    <el-dialog title="新建班级" :visible.sync="onNewCourse">
      <el-form>
        <el-form-item label="课程名称" :label-width="formLabelWidth">
          <el-input v-model="newCourseName" autocomplete="off"></el-input>
		   </el-form-item>
		   <el-form-item label="课程图片" :label-width="formLabelWidth">
		  <li class="imgBox" v-for="(item, index) in essayImg" :key="index">
		    <img :src="item" alt="" style="height: 100%; width: auto; margin: 0 auto;">
		   <img class="delImg" src="../../assets/del.png" alt="" @click="spliceImg(index)">
		  </li>
		  <button type="primary" class="upImg" style="background-color: #FF6A6A;">
		    <div>添加图片</div>
		    <input type="file" class="fileInput" id="upImg" ref="upFile" @change="imageInput($event)" />
		  </button>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" style="text-align: center;">
        <el-button type="primary" @click="endAddCourse">完 成</el-button>
        <el-button @click="notAddCourse">取 消</el-button>
      </div>
    </el-dialog>
	
    <!-- 添加学生/老师 -->
    <el-dialog :title="StuTeacTitle" :visible.sync="onAddStudent">
      <el-tabs type="border-card">
        <el-tab-pane label="手动添加" style="padding-top: 20px;">
          <el-form>
			  <el-form-item label="班级" :label-width="formLabelWidth">
			    {{ className }}
			  </el-form-item>
            <el-form-item label="姓名" :label-width="formLabelWidth">
              <el-input v-model="valueName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="工号(学号)" :label-width="formLabelWidth">
              <el-input v-model="ThisUserNum" autocomplete="off"></el-input>
            </el-form-item>
            <el-button
              type="primary"
              style="display: block; width: 50%; margin: 0 auto;"
              @click="addTeaAndStu"
            >添 加</el-button>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="批量导入">
        <el-upload
         class="upload-demo"
         drag
         action=""
         :http-request="uploadFile"
         
		     :show-file-list="false"
         :on-change="fileChange"
         :on-exceed="fileExceed"
         accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">
            将文件拖到此处，或
            <em>点击上传</em>
          </div>
          <div class="el-upload__tip" slot="tip">只能上传Excel文件，且不超过500kb</div>
        </el-upload>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
  </div>
</template>

<script>
import elHead from "../../components/head";
import Question from "../../api/get";
import XLSX from 'xlsx';
export default {
  data() {
    return {
      courseName: "",
      phoneNum: "",
      userNum: "",
      teacherName: "",
      myImage:"",
      // 下拉菜单--选择班级或老师
      options: [],
	  className: "",
      numOfAll: 0,
      value1: "",
      value: "",
      // 表格
      tableData: [],
      teaOrStu: true,
      // 新建班级模态框
      onNewClass: false,
	   onNewCourse: false,
      newClassName: "",
	   newCourseName: "",
      formLabelWidth: "120px",
      // 添加学生/老师模态框
      onAddStudent: false,
      StuTeacTitle: "",
      valueName:"",
      ThisUserNum:"",
      // 分页
      currentPage: 1,
      pagesize: 10,
	   fileList: [],
	   essayImg: [],
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
    let that = this;
    this.$axios
      .post(Question.classteacherget,{
		   ClassId: localStorage.getItem('classId'),
	  })
      .then(function(response) {
        // console.log("response", response.data.response);
        var ballList = [];
        for (var i = 0; i < response.data.data.length; i++) {
          ballList.push({
            value: response.data.data[i].ClassId,
            label: response.data.data[i].ClassName
          });
		  that.className = response.data.data[i].ClassName;
        }
		ballList.push({
		  value: "老师",
		  label: "老师"
		});
        that.options = ballList;
		
      })
      .catch(function(error) {
        console.log("error1", error);
      });
	  
	  this.getTeaOrClass();
  },
  methods: {
    getTeaOrClass() {
      let that = this;
      if (this.value1 == "老师") {
        this.teaOrStu = false;
        this.$axios
          .post(Question.teacher, {
          })
          .then(function(response) {
           
              that.numOfAll = response.data.data.length;
              var ballList = [];
              for (var i = 0; i < response.data.data.length; i++) {
                ballList.push({
                  id: response.data.data[i].Number,
                  stuName: response.data.data[i].UserName,
                  stuId: response.data.data[i].UserId,
                  department: response.data.data[i].Department,
                  date: response.data.data[i].CreateTime
                });
              }
              that.tableData = ballList;

          })
          .catch(function(error) {
            console.log("error1", error);
          });
      } else {
        this.teaOrStu = true;
        this.$axios
          .post(Question.student, {
            ClassId: localStorage.getItem('classId'),
          })
          .then(function(response) {
            console.log("response", response)
           
              that.numOfAll = response.data.data.length;
              var ballList = [];
              for (var i = 0; i < response.data.data.length; i++) {
                ballList.push({
                  id: response.data.data[i].Number,
                  stuName: response.data.data[i].StudentName,
                  stuId: response.data.data[i].StudentId,
                  department: response.data.data[i].Department,
                  date: response.data.data[i].CreateTime
                });
              }
              that.tableData = ballList;
          
          })
          .catch(function(error) {
            console.log("error1", error);
          });
      }
    },
    //添加班级
    addClass() {
      this.onNewClass = true;
    },
    endAddClass() {
      let that = this;
      // this.$axios
      //   .post(Question.addclass, {
      //     ClassName: this.newClassName,
      //     ThisUserNum: this.userNum
      //   })
      //   .then(function(response) {
      //     console.log("response", response);
      //     console.log("response", response.data.response);
      //     if (response.data.response == "权限不够") {
      //       that.$message({
      //         message: '您的权限不够，请联系管理员！',
      //         type: 'warning'
      //       });
      //     } else {
      //       that.$message({
      //         message: '班级添加成功！',
      //         type: 'error'
      //       });
      //       that.$router.go(0);
      //     }
      //   })
      //   .catch(function(error) {
      //     console.log("error1", error);
      //   });
	        that.$message({
	          message: '请联系管理员添加！',
	          type: 'warning'
	        });
	  
    },
    notAddClass() {
      this.onNewClass = false;
    },
	//添加班级
	addCourse() {
		this.essayImg=[];
		this.newCourseName="";
	  this.onNewCourse = true;
	},
	endAddCourse() {
	  let that = this;
	  console.log(" that.essayImg.toString(),",  that.essayImg.toString());
	 console.log(" this.newClassName,",   that.newCourseName);
	  this.$axios
	    .post(Question.addcourse, {
	      CourseName: that.newCourseName,
	      Img: that.essayImg.toString()
	    })
	    .then(function(response) {
	      console.log("response", response);
	      console.log("response", response.data.response);
	     if (response.data.status==200) {
			 that.$message({
			   message: '课程添加成功！',
			   type: 'success'
			 });
		 }
	      
	     //   that.$router.go(0);
	      
	    })
	    .catch(function(error) {
	      console.log("error1", error);
	    });
	        // that.$message({
	        //   message: '请联系管理员添加！',
	        //   type: 'warning'
	        // });
	   this.essayImg=[];
	   this.newCourseName="";
	    this.onNewCourse = false;
	},
	notAddCourse() {
		this.newCourseName="";
		this.essayImg=[];
	  this.onNewCourse = false;
	  
	},
    // 添加学生/老师
    onAddStuTeac(text) {
      this.StuTeacTitle = text;
      this.onAddStudent = true;
      this.valueName="";
      this.valuePhone="";
    },
    addTeaAndStu() {
      let that = this;
      if (that.StuTeacTitle == "添加学生") {
          console.log("添加学生");       
          that.$axios
            .post(Question.addstudent, {
              ClassId:  localStorage.getItem('classId'),
              StudentName: that.valueName,
              StudentNum: that.ThisUserNum,
            })
            .then(function(response) {
              console.log("response", response);
              if(response.data.status == 200) {
                that.$message({
                  message: '学生添加成功！',
                  type: 'success'
                });
                setTimeout(function() {
                  that.$router.go(0);
                }, 1000)
              } else {
                that.$message({
                  message: response.data.message,
                  type: 'error'
                });
              }
            })
            .catch(function(error) {
              console.log("error1", error);
            });
       
        
      } else if (that.StuTeacTitle == "添加老师") {
        // console.log("添加老师");
        // that.$axios
        //   .post(Question.addteacher, {
        //     UserNum: that.userNum,
        //     ClassName: that.value1,
        //     Name: that.valueName,
        //     ThisUserNum: that.ThisUserNum
        //   })
        //   .then(function(response) {
        //     console.log("response", response);
        //     console.log("response", response.data.response);
        //     that.onAddStudent = true;
        //     this.$message({
        //       message: '添加成功！',
        //       type: 'success'
        //     });
        //   })
        //   .catch(function(error) {
        //     console.log("error1", error);
        //   });
      }
    },
    //分页实现
    handleSizeChange: function(size) {
      this.pagesize = size;
    },
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage;
    },
    remove(row) {
      let that = this;
      var value1 = that.value1;
      console.log("row", row.stuId);
      that.$confirm('此操作将永久移除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // that.$axios
          //   .post(Question.remove, {
          //     ThisUserNum: that.userNum,
          //     UserNum: row.stuId,
          //   })
          //   .then(function(response) {
          //     console.log("是")
          //     console.log("response", response);
          //     if(response.data.Errcode == 0) {
          //       that.$message({
          //         type: 'success',
          //         message: '移除成功!'
          //       });
          //       that.value1 = value1;
          //       that.getTeaOrClass();
          //     } else {
          //       that.$message({
          //         type: 'error',
          //         message: response.data.ErrMsg
          //       });
          //     }
          //   })
		  that.$message({
		    message: '请联系管理员删除！',
		    type: 'warning'
		  });
        }).catch(() => {
          that.$message({
            type: 'info',
            message: '已取消移除'
          });          
        });
      
    },
	// methods
	fileExceed () {
	 // this.$message.error('别贪心！一次只能上传一个哦~');
	   this.$message.onsuccess('fileChange');
	},
	// methods
	fileChange (file) {
		let that = this;
	
	   let f = file.raw;
	      let reader = new FileReader();
		 
	      reader.readAsBinaryString(f);
	      reader.onload = function (e) {
	        let data = e.target.result;
	        let wb = XLSX.read(data, { type: 'binary' });
	         that.jsonQuestion = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);
			 let json= XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);
			 console.log(json)
			 that.submitFile(that.jsonQuestion)
	      };
		  console.log("jsonQuestion22",that.jsonQuestion)
		 
	},
	  // 自定义上传
	uploadFile (item) {
		let that = this;
    console.log("item", item);
	  const form = new FormData()
	   form.append('file', item.file)
	    console.log("form", form);
		this.$axios
		  .post(Question.teacher, {
			  Question: that.jsonQuestion,
		  })
		  .then(function(response) {
		    console.log("responseform", response);
		  })
		  .catch(function(error) {
		    console.log("error1", error);
		  });
	},
	submitFile (item) {
		let that = this;
      this.$axios
		    .post(Question.batchaddstudent, {
		  	Student: item,
		  	ClassId: localStorage.getItem('classId'),
		    })
		    .then(function(response) {
		      console.log("submit", response);
			if(response.data.status==200) {
			  that.$message({
			    type: 'success',
			    message: '上传成功!'
			  });
			   that.onAddStudent = false;
			  
			  } else {
				  that.$message({
				    type: 'warning',
				    message: '上传失败!'
				  });
			  }
		    })
		    .catch(function(error) {
		      console.log("error1", error);
		    });
	},
	// 上传图片
	imageInput(data) {
	  let that = this;
	  let file = data.target.files[0];
	  if(!/.(gif|jpg|jpeg|png|GIF|JPG|bmp)$/.test(file.name)) {
	    alert("图片类型必须是.gif,jpeg,jpg,png,bmp中的一种");
	    return false;
	  } else {
	    var reader = new FileReader();
	    reader.readAsDataURL(file);
	    reader.onload = () => {
	      this.$axios
	      .post(Question.photo, {
	        file_byte: reader.result
	      })
	      .then(function(res) {
	        if(res.data.err_code == 0) {
	          that.essayImg.push(res.data.url);
	          that.$message({
	            message: '图片上传成功！',
	            type: 'success'
	          });
	          console.log("图片", that.essayImg)
	        }
	      })
	      .catch(function(err) {
	        console.log("err", err);
	      });
	    };
	  }
	},
	// 删除数组图片
	spliceImg(num) {
	  this.essayImg.splice(num, 1)
	},
	// addCourse() {
	//   console.log("addCourse", "addCourse");
	//     this.$router.push({
	//       path: "/teachingSpace/notStart",
	//       query: {
	//         courseName: this.courseName,
	// 		phoneNum: this.phoneNum,
	// 		userNum:this.userNum ,
	// 		teacherName:this.teacherName,
	// 		myImage:this.myImage 
	//       }
	//     });
	// }

  }
};
</script>

<style lang="css" scoped>
@import '../../public/public.css';
/* 操作 */
.operation {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 30px;
}

/* 统计提示 */
.statiTips {
  color: black;
  font-size: 17px;
  line-height: 40px;
}

/* 分页 */
.el-pagination {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}

/* 新建班级 */
.el-dialog__body .el-input__inner {
  width: 80%;
}

/* 添加学生 */
.el-tabs__content {
  overflow: auto;
  height: 300px;
}

.el-upload,
.el-upload-dragger {
  width: 100%;
}
/* 上传图片 */
.upImg {
  overflow: hidden;
  position: relative;
  width: 130px;
  height: 45px;
  border-radius: 10px;
  border: none;
  margin: 30px;
  background-color: #66cccc;
}

.upImg input {
  opacity: 0;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 10px;
}

.upImg div {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  color: #fff;
  line-height: 45px;
  text-align: center;
}
.imgBox {
  position: relative;
  overflow: hidden;
  width: 180px;
  height: 180px;
  margin-bottom: 10px;
  border-radius: 10px;
  border: #eee 1px solid;
}
.imgText {
  display: block;
  margin: 85px;
  color: blue;
}

.delImg {
  position: absolute;
  top: 0;
  right: 0;
  width: 40px;
  height: 40px;
}

</style>
