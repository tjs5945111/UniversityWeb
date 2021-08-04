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
              style="color: #CC3333;"
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
            >知识点</router-link>
          </li>
        </ul>
        <div>
          <el-button type="danger" @click="addQue">添加题目</el-button>
          <el-button type="danger" @click="batchImport('批量导入')">批量导入题目</el-button>
          <el-button type="danger" @click="batchImportImag('批量导入图片')">批量导入图片</el-button>
          <el-button type="danger" @click="batchImportVideo('批量导入音频')">批量导入音频</el-button>
        </div>
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
          <el-select v-model="value2" placeholder="请选择" class="questionSelect">
            <el-option
              v-for="item in difficultytype"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-col>
        <!-- <el-col :span="2">
          <span class="outSpan">题目内容:</span>
        </el-col>
        <el-col :span="3">
          <el-input placeholder v-model="queTitle"></el-input>
        </el-col>-->
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
          <el-button type="danger" style="display: block; width: 30%;" @click="findQue">查询</el-button>
        </el-col>
      </el-row>

      <!-- 表单数据 -->
      <el-table
        :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
        border
        style="width:100%"
      >
        <el-table-column prop="num" label="序号" width="50" align="center"></el-table-column>
        <el-table-column prop="question" label="题目" align="center" :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <div v-html="scope.row.question"></div>
          </template>
        </el-table-column>
        <el-table-column prop="questionType" label="题型" width="100" align="center"></el-table-column>
        <el-table-column prop="testPartType" label="模块类型" align="center"></el-table-column>
        <el-table-column prop="knowledgePoint" label="知识点" align="center"></el-table-column>
        <el-table-column prop="degreeOfDifficulty" label="难易度" width="80" align="center"></el-table-column>
        <el-table-column fixed="right" label="操作" width="100" align="center">
          <template slot-scope="scope">
            <el-button type="text" size="small">
              <router-link
                :to="{path: '/data/dataEditing', query: { questionId: scope.row.id, phoneNum: phoneNum, courseName: courseName,testName: value1 }}"
              >编辑</router-link>
            </el-button>
            <el-button type="text" size="small" @click="deleteItem(scope.row.id)">移除</el-button>
          </template>
        </el-table-column>
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
    <el-dialog :title="boxTitle" :visible.sync="onAddQue">
      <el-tabs type="border-card">
        <el-upload
          class="upload-demo"
          drag
          action
          :http-request="uploadFile"
          :on-change="fileChange"
          :on-exceed="fileExceed"
          :show-file-list="false"
          accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">
            将文件拖到此处，或
            <em>点击上传</em>
          </div>
          <!-- <div class="el-upload__tip" slot="tip">只能上传Excel文件，且不超过500kb</div> -->
        </el-upload>
      </el-tabs>
    </el-dialog>

    <!-- 批量导入图片 -->
    <el-dialog :title="boxTitle" :visible.sync="onAddPic" width="40%">
      <el-tabs type="border-card">
        <input
          type="file"
          class="fileInput"
          id="upPic"
          ref="upFile"
          multiple
          @change="fileInput($event)"
        />
      </el-tabs>
    </el-dialog>

    <!-- 批量导入音频 -->
    <el-dialog :title="boxTitle" :visible.sync="onAddVideo" width="40%">
      <el-tabs type="border-card">
        <input
          type="file"
          class="fileInput"
          id="upPic"
          ref="upFile"
          multiple
          @change="fileInputMp3($event)"
        />
      </el-tabs>
    </el-dialog>
  </div>
</template>


<script>
import elHead from "../../components/head";
import Question, { batchvideo } from "../../api/get";
import XLSX from "xlsx";
export default {
  name: "addQuestion",
  data() {
    return {
      editorOption: {
        modules: {
          toolbar: false,
        },
      },
      courseName: "",
      phoneNum: "",
      userNum: "",
      teacherName: "",
      myImage: "",
      IndexId: "",
      jsonQuestion: [],
      currentTableData: [],
      tableData: [],
      // 下拉菜单
      directory: [],
      fileListPic: [],
      value1: "",
      queTitle: "",
      updateType: "", //上传的类型
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
      arr: [],
      allFileName: [],//用来保存找到的一一对应的题目的ID
      batchPic: [], //用来存放批量导入图片时返回的地址
      batchVideo: [], //用来存放批量导入音频时返回的地址
      // QuestionTopicId: [], 
      value5: "",
      value6: "",
      value7: "",
      // 批量导入弹框
      onAddQue: false,
      onAddPic: false,
      onAddVideo: false,
      boxTitle: "",
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
    this.value1 = this.$route.query.testName;
    this.IndexId = this.$route.query.id;
    this.allFileName = new Array();
    this.batchPic = new Array();
    this.batchVideo = new Array();
    this.QuestionTopicId = new Array();
  },
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      let that = this;
      console.log("id", this.IndexId.toString());
      this.$axios
        .post(Question.questionlibraryshow, {
          IndexId: this.IndexId.toString(),
        })
        .then(function (response) {
          // console
          console.log("全部题目", response);
          // console.log("response", response.data.data1);
          // var length = response.data.data1.length;
          // console.log("length", length);
          var ballList = [];
          for (var i = 0; i < response.data.data.length; i++) {
            ballList.push({
              id: response.data.data[i].Id,
              num: response.data.data[i].Num,
              question: response.data.data[i].Question,
              questionType: response.data.data[i].QuestionType,
              testPartType: response.data.data[i].TestPartType,
              knowledgePoint: response.data.data[i].KnowledgePoint,
              degreeOfDifficulty: response.data.data[i].DegreeOfDifficulty,
              audioName: response.data.data[i].AudioName,
              audioUrl: response.data.data[i].AudioUrl,
              picName: response.data.data[i].PictureName,
              picUrl: response.data.data[i].PictureUrl,
            });
          }
          that.tableData = ballList;
          console.log("tableData", that.tableData);
        })
        .catch(function (error) {
          console.log("error1", error);
        });
      // 难易度
      this.$axios.get(Question.difficultytypegetname).then(function (response) {
        console.log("难易度", response);
        // console.log("response.data.response", response.data.response);
        var ballList4 = [];
        for (var i = 0; i < response.data.data.length; i++) {
          ballList4.push({
            value: i + 1,
            // value: response.data.response[i],
            label: response.data.data[i],
          });
        }
        that.difficultytype = ballList4;
      });
      //模块类型--模块一
      this.$axios
        .post(Question.testparttype1, {
          CourseName: this.courseName,
        })
        .then(function (response) {
          console.log("模块类型--模块一", response);
          var ballList = [];
          for (var i = 0; i < response.data.data.length; i++) {
            ballList.push({
              value: response.data.data[i],
              label: response.data.data[i],
            });
          }
          that.questionPartLevel1 = ballList;
        });

      // 知识点1
      // this.$axios
      //   .get(Question.knowledgepointlevel1)
      //   .then(function(response) {
      //     var ballList1 = [];
      //     for (var i = 0; i < response.data.response.length; i++) {
      //       ballList1.push({
      //         value: response.data.response[i],
      //         label: response.data.response[i]
      //       });
      //     }
      //     that.KnowledgePoint1 = ballList1;
      //   })
      //   .catch(function(error) {
      //     console.log("error1", error);
      //   });
      // 获取模块类型
      // 获取题目
      // console.log("this.value1", this.value1);

      console.log("123123", this.escapeStringHTML("<p>123</p>"));
    },
    escapeStringHTML(str) {
      str = str.replace(/&lt;/g, "<");
      str = str.replace(/&gt;/g, ">");
      // str.creatt
      return str;
    },
    // 添加题目-跳转至添加题目界面
    addQue() {
      // if (this.courseName=="文科专业汉语教程") {
      this.$router.push({
        path: "/data/addTypeQuestionChinese",
        query: {
          phoneNum: this.phoneNum,
          courseName: this.courseName,
          testName: this.value1,
          id: this.IndexId,
        },
      });

      // } else {
      // 	this.$router.push({ path: '/data/addTypeQuestion', query: { phoneNum: this.phoneNum, courseName: this.courseName,testName: this.value1,id: this.IndexId,}});

      // }
    },
    //批量上传图片
    fileInput(data) {
      let fileBytes = new Array();
      let fileNames = new Array();
      var fileTypes = new Array();
      var readers = new Array();
      let that = this;
      let files = data.target.files;
      let fileName = []; //图片的文件名
      var tableArr = that.tableData;
      var picNameArr = [];
      let flag = 0;

      let type = files[0].name.toString().split(".")[1];
      const loading = this.$loading({
        lock: true,
        text: "图片上传中",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      for (let i = 0; i < files.length; i++) {
        let fileName = files[i].name.toString().split(".")[0];
        let fileType = files[i].name.toString().split(".")[1];
        if (!/image\/\w+/.test(files[i].type)) {
          /*可以把autio改成其他文件类型 比如 image*/
          alert("只能选择图片文件");
          return false;
        }
        var reader = new FileReader();
        readers.push(reader);
        readers[i].readAsDataURL(files[i]);
        readers[i].onload = () => {
          //二进制数组
          // console.log("file",that.files[i]);
          console.log(readers[0]);
          console.log(readers[1]);
          console.log(i);
          console.log("file byte", readers[i].result);
          fileBytes.push(readers[i].result);
          fileNames.push(fileName);
        };
      }

      // console.log("table",that.tableData);
      setTimeout(function () {
        that.$axios
          .post(Question.batchpicture, {
            FileByte: fileBytes,
            FileName: fileNames,
            Format: type,
          })
          .then(function (res) {
            console.log("res", res);
            console.log("URL", res.data.response.Url);
            that.batchPic = res.data.response.Url;//服务器返回的图片URL
            fileName = res.data.response.FileName;
            console.log("fileName", fileName);
            console.log("batchPic", that.batchPic);
            console.log(tableArr);

            for (let i = 0; i < fileName.length; i++) {
              for (let j = 0; j < tableArr.length; j++) {
                if (fileName[i] == tableArr[j].picName) {
                  picNameArr[flag++] = tableArr[j].id;
                }
              }
            }
            console.log("picNameArr",picNameArr);
            // 返回对应的ID
            that.allFileName = picNameArr;
            console.log("arr", that.allFileName);
            that.updataPic("picture");
            loading.close();


          })
          .catch(function (err) {
            loading.close();
            that.$message({
              message: "图片上传失败！",
              type: "warning",
            });
            console.log("err", err);
          });
      }, 4000);

      console.log("table", tableArr);
      console.log("fileName", fileName);
    },

    updataPic(text) {
      let that = this;
      console.log("text", text);
      console.log("QuestionTopicId", that.allFileName);
      console.log("MediaUrl", that.batchPic);
      this.$axios
        .post(Question.updateurl, {
          MediaType: text.toString(),
          QuestionTopicId: that.allFileName,
          MediaUrl: that.batchPic,
        })
        .then(function (res) {
          console.log("res", res);
          if (res.data.status == 200) {
              that.$message({
                message: "图片上传成功！",
                type: "success",
              });
              document.getElementById("upPic").value = null;
              that.onAddPic = false;
            } else {
              that.$message({
                message: "图片上传失败！",
                type: "warning",
              });
            }
        })
        .catch(function (err) {
          that.$message({
            message: "图片上传失败！",
            type: "warning",
          });
          console.log("err", err);
        });
    },

    fileInputMp3(data) {
      let fileBytes = new Array();
      let fileNames = new Array();
      var fileTypes = new Array();
      var readers = new Array();
      let that = this;
      let files = data.target.files;
      let fileName = [];
      let flag = 0;
      let flagElse = 0;
      let videoNameArr = [];
      let URL = [];

      let type = files[0].name.toString().split(".")[1];
      const loading = this.$loading({
        lock: true,
        text: "mp3上传中",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      for (let i = 0; i < files.length; i++) {
        let fileName = files[i].name.toString().split(".")[0];
        let fileType = files[i].name.toString().split(".")[1];
        if (!/audio\/\w+/.test(files[i].type)) {
          /*可以把audio改成其他文件类型 比如 image*/
          alert("只能选择mp3文件");
          return false;
        }
        var reader = new FileReader();
        readers.push(reader);
        readers[i].readAsDataURL(files[i]);
        readers[i].onload = () => {
          //二进制数组
          // console.log("file",that.files[i]);
          console.log(readers[0]);
          console.log(readers[1]);
          console.log(i);
          console.log("file byte", readers[i].result);
          fileBytes.push(readers[i].result);
          fileNames.push(fileName);
        };
      }
      setTimeout(function () {
        that.$axios
          .post(Question.batchvideo, {
            FileByte: fileBytes,
            FileName: fileNames,
            Format: type,
          })
          .then(function (res) {
            console.log("res", res);
            console.log("URL", res.data.response.Url);
            // 用来保存批量带入音频时返回的地址
            that.batchVideo = res.data.response.Url;

            // URL = res.data.response.Url;
            fileName = res.data.response.FileName;
            console.log("fileName", that.allFileName);
            console.log("batchVideo", that.batchVideo);
            var tableArr = that.tableData;
            console.log(tableArr);

            for (let i = 0; i < fileName.length; i++) {
              for (let j = 0; j < tableArr.length; j++) {
                if (fileName[i] == tableArr[j].audioName) {
                  videoNameArr[flag++] = tableArr[j].id;
                }
              }
            }
            // 返回对应的ID
            that.allFileName = videoNameArr;
            console.log("arr", that.allFileName);
            that.updataAudio("audio");
            loading.close();
           
          })
          .catch(function (err) {
            loading.close();
            that.$message({
              message: "mp3上传失败-----1",
              type: "warning",
            });
            console.log("err", err);
          });
      }, 4000);
    },
    updataAudio(text) {
      let that = this;
      console.log("text", text);
      console.log("QuestionTopicId", that.allFileName);
      console.log("MediaUrl", that.batchVideo);
      this.$axios
        .post(Question.updateurl, {
          MediaType: text.toString(),
          QuestionTopicId: that.allFileName,
          MediaUrl: that.batchVideo,
        })
        .then(function (res) {
          console.log("res", res);
          if (res.data.status == 200) {
              // loading.close();
              that.$message({
                message: "mp3上传成功！",
                type: "success",
              });
              // document.getElementById("upVid").value = null;
              that.onAddVideo = false;
            } else {
              // loading.close();
              that.$message({
                message: "mp3上传失败！-----2",
                type: "warning",
              });
            }
        })
        .catch(function (err) {
          that.$message({
            message: "mp3上传失败！-----3",
            type: "warning",
          });
          console.log("err", err);
        });
    },

    batchImportImag(text) {
      this.onAddPic = true;
      this.boxTitle = text;
    },
    batchImportVideo(text) {
      this.onAddVideo = true;
      this.boxTitle = text;
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
          Level1: this.value3,
        })
        .then(function (response) {
          // console.log("response", response);
          // console.log("模块类型--模块二", response.data.response);
          var ballList = [];
          for (var i = 0; i < response.data.data.length; i++) {
            ballList.push({
              value: response.data.data[i].PaperPartId,
              label: response.data.data[i].Level2,
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
          .then(function (response) {
            // console.log(response);
            // console.log("response.data.response", response.data.response);
            var ballList2 = [];
            for (var i = 0; i < response.data.response.length; i++) {
              ballList2.push({
                value: response.data.response[i],
                label: response.data.response[i],
              });
            }
            that.KnowledgePoint2 = ballList2;
            console.log("knowledgepoint2", that.KnowledgePoint2);
          })
          .catch(function (error) {
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
          .then(function (response) {
            console.log(response);
            console.log("response.data.response", response.data.response);
            var ballList3 = [];
            for (var i = 0; i < response.data.response.length; i++) {
              ballList3.push({
                value: response.data.response[i],
                label: response.data.response[i],
              });
            }
            that.KnowledgePoint3 = ballList3;
            console.log("knowledgepoint3", that.KnowledgePoint3);
          })
          .catch(function (error) {
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
          IndexId: that.IndexId.toString(),
          DifficultyType: that.value2.toString(),
          QuestionPartLevel2: that.value4.toString(),
        })
        .then(function (response) {
          console.log("response", response);
          console.log("IndexId", that.IndexId);
          console.log("Difficulty", that.value2);
          console.log("QuestionPartLevel1", that.value3);
          console.log("QuestionPartLevel2", that.value4);
          if (response.data.status == 200) {
            var ballList = [];
            for (var i = 0; i < response.data.data.length; i++) {
              ballList.push({
                id: response.data.data[i].Id,
                num: response.data.data[i].Num,
                question: response.data.data[i].Question,
                questionType: response.data.data[i].QuestionType,
                testPartType: response.data.data[i].TestPartType,
                // knowledgePoint:response.data.data[i].testPartType,
                degreeOfDifficulty: response.data.data[i].DegreeOfDifficulty,
              });
            }
            that.tableData = ballList;
            that.$message({
              type: "success",
              message: "查询成功！",
            });
          } else {
            that.$message({
              type: "error",
              message: "查询失败",
            });
          }
        })
        .catch(function (error) {
          console.log("error1", error);
        });
    },
    //分页实现
    handleSizeChange: function (size) {
      this.pagesize = size;
    },
    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage;
    },

    // 移除题目
    deleteItem(row) {
      let that = this;
      console.log("row", row);
      this.$confirm("此操作将永久移除该目录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$axios
            .post(Question.questionDelete, {
              Questionid: row.toString(),
            })
            .then(function (response) {
              console.log("response", response);
              that.getList();
              that.$message({
                type: "success",
                message: "删除成功!",
              });
            })
            .catch(function (error) {
              console.log("error1", error);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // methods
    fileExceed() {
      // this.$message.error('别贪心！一次只能上传一个哦~');
      this.$message.onsuccess("fileChange");
    },
    // methods
    fileChange(file) {
      let that = this;
      let f = file.raw;
      let reader = new FileReader();
      console.log("f", f);
      console.log("file", file);

      reader.readAsBinaryString(f);
      reader.onload = function (e) {
        let data = e.target.result;
        let wb = XLSX.read(data, { type: "binary" });

        that.jsonQuestion = XLSX.utils.sheet_to_json(
          wb.Sheets[wb.SheetNames[0]]
        );
        var str = JSON.stringify(
          XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]])
        );
        console.log("type", typeof str);

        console.log("jsonQuestion22", that.jsonQuestion);
        console.log("str", str);

        var re;
        var patt = /:[0-9.]+/g;
        var result = str.match(patt);
        if (result != null) {
          for (var i = 0; i < result.length; i++) {
            re = result[i].split(":");
            str = str.replace(result[i], ':"' + re[1] + '"');
          }
        }

        console.log("str1", str);
        str = JSON.parse(str);

        that.submitFile(str);
        that.onAddQue = false;
        that.getList();
      };
    },
    // 自定义上传
    uploadFile(item) {
      let that = this;
      console.log("item", item);
      const form = new FormData();
      //  form.append('file', item.file)
      console.log("form", item.file);
    },
    submitFile(item) {
      let that = this;
      console.log("id", that.IndexId);
      console.log("Question:", item);
      console.log("courseName ", String(that.courseName));
      console.log("classid ", localStorage.getItem("classId"));
      this.$axios
        .post(Question.batchupload, {
          QuestionArray: item,
          CourseName: String(that.courseName),
          ClassId: localStorage.getItem("classId"),
          QuestionTopicIndexId: that.IndexId,
        })
        .then(function (response) {
          console.log("submit", response);
          if (response.data.status == 200) {
            that.$message({
              type: "success",
              message: "上传成功!",
            });
            that.getList();
          } else {
            that.$message({
              type: "warning",
              message: "上传失败!",
            });
          }
        })
        .catch(function (error) {
          console.log("error1", error);
        });
    },
  },
};
</script>

<style lang="css" scoped>
@import "./public.css";

/* 题目内容 */
/* 题目中的下拉框 知识点 难易度 */
.questionSelect {
  margin-right: 15px;
}
.compositionQuestion {
  padding-left: 15px;
}

.questionRow .quill-editor .ql-snow {
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