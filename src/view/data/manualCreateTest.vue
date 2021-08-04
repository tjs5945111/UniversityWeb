<template>
  <!-- 资料-试卷库-手动创建 -->
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
      <!-- 试卷标题 -->
      <el-row class="operation">
        <el-col :span="8">
          <h2 style="float:left;">试卷标题：</h2>
          <el-input v-model="testName" disabled style="width:150px; float:left;"></el-input>
        </el-col>
        <el-col :span="6">
          <h2>
            满分：
            <el-input v-model="inputScore" disabled placeholder="100" style="width:100px;"></el-input>
          </h2>
        </el-col>
        <el-col :span="6">
          <!-- <h2 style="float:left;">
            依据&nbsp;&nbsp;
            <el-select
              v-model="value1"
              placeholder="请选择"
              class="questionSelect"
              style="width:100px;"
              @change="selectDirectory"
            >
              <el-option
                v-for="item in directory"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </h2> -->
        </el-col>
        <el-col :span="4">
          <el-button type="danger" @click="empty()">清空目录</el-button>
        </el-col>
      </el-row>
      <!-- 听力理解 -->
      <div class="body" v-for="(list, index1) in module1" :key="index1">
        <div class="left">
          <div class="listening">
            <div>
              <h2>{{ list.title1 }}</h2>
            </div>
            <div>
              <h2 style="margin-right:15px;">题型选择:</h2>
              <el-select v-model="list.title2" placeholder="请选择" style="width:150px;">
                <el-option
                  v-for="item in questionPartLevel2_1"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </div>
            <div>
              <h2 style="margin-right:15px;">题型说明:</h2>
              <el-input
                v-model="list.QuestionExplain"
                placeholder
                style="width:150px;"
                type="textarea"
              ></el-input>
            </div>
            <div>
              <h2 style="margin-right:15px;">总分:</h2>
              <el-input v-model="list.grade" placeholder style="width:60px;"></el-input>
            </div>
            <div>
              <el-button
                type="text"
                size="medium"
                @click="addQues(list.title1,list.title2, list.questionsID,index1,list.questionexplain)"
              >
                添加
                <!-- <router-link
                  :to="{path: '/data/manuallyCreateQueBank', query: { courseName: courseName,testName:testName,part1:list.title1,part2:list.title2 }}"
                ></router-link>-->
              </el-button>
            </div>
          </div>
          <div>
            
          </div>
          <ul style="margin: 10px 0 0  8%;">
            <li v-for="(item, index1_1) in list.questions" :key="index1_1">
              <h2 style="display: inline; margin-right: 30px;">
                题目{{ index1_1+1 }}:
                <span
                  style="font-size:18px;font-weight:500;"
                >{{ list.questions[index1_1]}}</span>
              </h2>
              <el-button type="text" size="medium" @click="delTheTitle(module1, index1, index1_1)">
                <i class="el-icon-delete"></i>
              </el-button>
            </li>
          </ul>
        </div>
        <div>
          <div style="margin-left:30px;margin-top:20px;">
            <el-button type="text" size="medium" @click="addModule('听力理解')">
              <i class="el-icon-plus"></i>
            </el-button>
          </div>
          <div style="margin-left:30px;margin-top:10px;">
            <el-button type="text" size="medium" @click="reduceModule1(index1)">
              <i class="el-icon-delete"></i>
            </el-button>
          </div>
        </div>
      </div>
      <!-- 综合阅读 -->
      <div class="body" v-for="(list, index2) in module2" :key="'index' + index2">
        <div class="left">
          <div class="compreh">
            <div>
              <h2>{{ list.title1 }}</h2>
            </div>
            <div>
              <h2 style="margin-right: 15px;">题型选择:</h2>
              <el-select v-model="list.title2" placeholder="请选择" style="width:150px;">
                <el-option
                  v-for="item in questionPartLevel2_2"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </div>
            <div>
              <h2 style="margin-right:15px;">题型说明:</h2>
              <el-input
                v-model="list.QuestionExplain"
                placeholder
                style="width:150px;"
                type="textarea"
              ></el-input>
            </div>
            <div>
              <h2 style="margin-right: 15px;">总分:</h2>
              <el-input v-model="list.grade" placeholder style="width:150px;"></el-input>
            </div>
            <div>
              <el-button
                type="text"
                size="medium"
                @click="addQues(list.title1,list.title2, list.questionsID,index2,list.questionexplain)"
              >
                添加
                <!-- <router-link
                  :to="{path: '/data/manuallyCreateQueBank', query: { courseName: courseName,testName:testName,part1:list.title1,part2:list.title2 }}"
                ></router-link>-->
              </el-button>
            </div>
          </div>
          <ul style="margin: 10px 0 0  8%;">
            <li v-for="(item, index2_1) in list.questions" :key="index2_1">
              <h2 style="display: inline; margin-right: 30px;">
                题目{{ index2_1+1 }}:
                <span
                  style="font-size:18px;font-weight:500;"
                >{{ list.questions[index2_1]}}</span>
              </h2>
              <el-button type="text" size="medium" @click="delTheTitle(module2, index2, index2_1)">
                <i class="el-icon-delete"></i>
              </el-button>
            </li>
          </ul>
        </div>
        <div>
          <div style="margin-left:30px;margin-top:20px;">
            <el-button type="text" size="medium" @click="addModule('综合阅读')">
              <i class="el-icon-plus"></i>
            </el-button>
          </div>
          <div style="margin-left:30px;margin-top:10px;">
            <el-button type="text" size="medium" @click="reduceModule2(index2)">
              <i class="el-icon-delete"></i>
            </el-button>
          </div>
        </div>
      </div>
      <!-- 书面表达 -->
      <div class="body" v-for="(list, index3) in module3" :key="'ball' + index3">
        <div class="left">
          <div class="written">
            <div>
              <h2>{{ list.title1 }}</h2>
            </div>
            <div>
              <h2 style="margin-right:15px;">题型选择:</h2>
              <el-select v-model="list.title2" placeholder="请选择" style="width:150px;">
                <el-option
                  v-for="item in questionPartLevel2_3"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </div>
            <div>
              <h2 style="margin-right:15px;">题型说明:</h2>
              <el-input
                v-model="list.QuestionExplain"
                placeholder
                style="width:150px;"
                type="textarea"
              ></el-input>
            </div>
            <div>
              <h2 style="margin-right:15px;">总分:</h2>
              <el-input v-model="list.grade" placeholder style="width:150px;"></el-input>
            </div>
            <div>
              <el-button
                type="text"
                size="medium"
                @click="addQues(list.title1,list.title2, list.questionsID,index3,list.questionexplain)"
              >添加</el-button>
            </div>
          </div>
          <ul style="margin: 10px 0 0  8%;">
            <li v-for="(item, index3_1) in list.questions" :key="index3_1">
              <h2 style="display: inline; margin-right: 30px;">
                题目{{ index3_1+1 }}:
                <span
                  style="font-size:18px;font-weight:500;"
                >{{ list.questions[index3_1]}}</span>
              </h2>
              <el-button type="text" size="medium" @click="delTheTitle(module3, index3, index3_1)">
                <i class="el-icon-delete"></i>
              </el-button>
            </li>
          </ul>
          <!-- <ul>
            <li style="margin-left:150px;">
              <el-button type="text" size="medium">作文题目</el-button>
            </li>
          </ul>-->
        </div>
        <div>
          <div style="margin-left:30px;margin-top:20px;">
            <el-button type="text" size="medium" @click="addModule('书面表达')">
              <i class="el-icon-plus"></i>
            </el-button>
          </div>
          <div style="margin-left:30px;margin-top:10px;">
            <el-button type="text" size="medium" @click="reduceModule3(index3)">
              <i class="el-icon-delete"></i>
            </el-button>
          </div>
        </div>
      </div>

      <!-- 新添加的模块 -->
      <div class="body" v-for="(list, index4) in otherModule" :key="'index' + index4">
        <div class="left">
          <div class="compreh">
            <div>
              <h2>{{ list.title1 }}</h2>
            </div>
            <div>
              <h2 style="margin-right: 15px;">题型选择:</h2>
              <el-select v-model="list.title2" placeholder="请选择" style="width:150px;">
                <el-option
                  v-for="item in questionPartLevel2_2"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </div>
            <div>
              <h2 style="margin-right:15px;">题型说明:</h2>
              <el-input
                v-model="list.QuestionExplain"
                placeholder
                style="width:150px;"
                type="textarea"
              ></el-input>
            </div>
            <div>
              <h2 style="margin-right: 15px;">总分:</h2>
              <el-input v-model="list.grade" placeholder style="width:150px;"></el-input>
            </div>
            <div>
              <el-button
                type="text"
                size="medium"
                @click="addQues(list.title1,list.title2, list.questionsID,index2,list.questionexplain)"
              >
                添加
                <!-- <router-link
                  :to="{path: '/data/manuallyCreateQueBank', query: { courseName: courseName,testName:testName,part1:list.title1,part2:list.title2 }}"
                ></router-link>-->
              </el-button>
            </div>
          </div>
          <ul style="margin: 10px 0 0  8%;">
            <li v-for="(item, index2_1) in list.questions" :key="index2_1">
              <h2 style="display: inline; margin-right: 30px;">
                题目{{ index4_1+1 }}:
                <span
                  style="font-size:18px;font-weight:500;"
                >{{ list.questions[index4_1]}}</span>
              </h2>
              <el-button type="text" size="medium" @click="delTheTitle(otherModule, index2, index4_1)">
                <i class="el-icon-delete"></i>
              </el-button>
            </li>
          </ul>
        </div>
        <div>
          <div style="margin-left:30px;margin-top:20px;">
            <el-button type="text" size="medium" @click="addModule('综合阅读')">
              <i class="el-icon-plus"></i>
            </el-button>
          </div>
          <div style="margin-left:30px;margin-top:10px;">
            <el-button type="text" size="medium" @click="reduceModule2(index2)">
              <i class="el-icon-delete"></i>
            </el-button>
          </div>
        </div>
      </div>


      <div style="display:flex;justify-content:center">
        <el-button type="danger" size="medium" @click="ball()" hidden="true">保存</el-button>
        <el-button type="danger" size="medium" @click="ball1()" style="margin-left: 30px;">完成</el-button>
        <el-button type="danger" @click="returnTop()" style="margin-left: 30px;">返回</el-button>
      </div>
      <div style="height:50px;"></div>
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
      teacherName: "",
      myImage: "",
      paperId: "",
      directory: [],
      value1: "",
      allId: [],
      questionPartLevel2_1: [],
      questionPartLevel2_2: [],
      questionPartLevel2_3: [],
      value2: "",
      value3: "",
      value4: "",
      index: 0,
      otherModule:[],
      module1: [
        {
          title1: "听力理解",
          title2: "",
          grade: "",
          questionexplain: "",
          questions: [],
          questionsID: [],
        },
      ],
      module2: [
        {
          title1: "综合阅读",
          title2: "",
          grade: "",
          questionexplain: "",
          questions: [],
          questionsID: [],
        },
      ],
      module3: [
        {
          title1: "书面表达",
          title2: "",
          grade: "",
          questionexplain: "",
          questions: [],
          questionsID: [],
        },
      ],
      value: "",
      testName: "",
      inputScore: "",
      inputShort: "",

      selection: [],
    };
  },
  components: {
    elHead,
  },
  activated() {
    let that = this;
    // 这里是在题库选择的内容
    this.phoneNum = this.$route.query.phoneNum;
    this.courseName = this.$route.query.courseName;
    this.userNum = this.$route.query.userNum;
    this.teacherName = this.$route.query.teacherName;
    this.myImage = this.$route.query.myImage;
    this.selection = this.$route.query.selection;
    this.index = this.$route.query.index;
    console.log("this.selection1", this.selection);
    this.testName = this.$route.query.testName;
    this.paperId = this.$route.query.paperId;
    console.log("paperID",this.paperId);
    // 处理从题库加入的数据
    console.log("this.testName", this.testName);
    if (this.selection) {
      this.dataProce();
    } else {
      this.$axios
        .post(Question.papermanageshow1, {
          PaperId: this.paperId.toString(),
        })
        .then(function (response) {
          console.log("papermanageshow1", response);
          that.module1 = response.data.data[0].Model1;
          that.module2 = response.data.data[0].Model2;
          that.module3 = response.data.data[0].Model3;
          console.log("module1", that.module1);
          console.log("(that.module1.length", that.module1.length);
          console.log("(that.module2.length", that.module2.length);
          console.log("(that.module3.length", that.module3.length);
          if (that.module1.length == 0) {
            console.log("听力理解空", that.module1.length);
            that.module1 = [
              {
                title1: "听力理解",
                title2: "",
                grade: "",
                questionexplain: "",
                questions: [],
                questionsID: [],
              },
            ];
            console.log("听力理解空", that.module1.length);
          }
          if (that.module2.length == 0) {
            console.log("综合阅读空", that.module2.length);
            that.module2 = [
              {
                title1: "综合阅读",
                title2: "",
                grade: "",
                questionexplain: "",
                questions: [],
                questionsID: [],
              },
            ];
            console.log("综合阅读空", that.module2.length);
          }
          if (that.module3.length == 0) {
            console.log("书面表达空", that.module3.length);
            that.module3 = [
              {
                title1: "书面表达",
                title2: "",
                grade: "",
                questionexplain: "",
                questions: [],
                questionsID: [],
              },
            ];
            console.log("书面表达空", that.module3.length);
          }
        })
        .catch(function (error) {
          console.log("error", error);
        });
    }
  },

  mounted() {
    let that = this;
    console.log("this.testName", this.testName);
    this.$axios
      .post(Question.papermanageshow1, {
        PaperId: this.paperId.toString(),
      })
      .then(function (response) {
        console.log("papermanageshow2", response);
        //    that.module1 =response.data.data[0].Model1;
        // that.module2 =response.data.data[0].Model2;
        // that.module3 =response.data.data[0].Model3;
      })
      .catch(function (error) {
        console.log("error", error);
      });

    this.$axios
      .post(Question.directorylibraryshow, {})
      .then(function (response) {
        console.log("directorylibraryshow",response);
        var ballList = [];
        for (var i = 0; i < response.data.response.length; i++) {
          ballList.push({
            value: response.data.response[i].Directory,
            label: response.data.response[i].Directory,
          });
        }
        that.directory = ballList;
      })
      .catch(function (error) {
        console.log("error", error);
      });

    this.$axios
      .post(Question.testparttype2, {
        Level1: "听力理解",
      })
      .then(function (response) {
        // console.log("听力理解:",response.data);

        for (var i = 0; i < response.data.data.length; i++) {
          that.questionPartLevel2_1.push({
            value: response.data.data[i].PaperPartId.toString(),
            label: response.data.data[i].Level2,
          });
        }
      });
    this.$axios
      .post(Question.testparttype2, {
        Level1: "综合阅读",
      })
      .then(function (response) {
        console.log("response", response);

        for (var i = 0; i < response.data.data.length; i++) {
          that.questionPartLevel2_2.push({
            value: response.data.data[i].PaperPartId.toString(),
            label: response.data.data[i].Level2,
          });
        }
      });

    this.$axios
      .post(Question.testparttype2, {
        Level1: "书面表达",
      })
      .then(function (response) {
        for (var i = 0; i < response.data.data.length; i++) {
          that.questionPartLevel2_3.push({
            value: response.data.data[i].PaperPartId.toString(),
            label: response.data.data[i].Level2,
          });
        }
      });
  },

  methods: {
    // 判断属于哪个模块
    findModule(text) {
      if (text != this.module1[0].title1) {
        if (text != this.module2[0].title1) {
          if (text != this.module3[0].title1) {
            console.log("不存在");
            // alert("不存在");
          } else {
            return "module3" + this.module3[0].title1;
          }
        } else {
          return "module2" + this.module2[0].title1;
        }
      } else {
        return "module1" + this.module1[0].title1;
      }
    },
    // selectDirectory() {
    //   // 清空模块目录
    //   this.empty();
    //   console.log("被调用");
    //   const loading = this.$loading({
    //     lock: true,
    //     text: "拼命加载中...",
    //     spinner: "el-icon-loading",
    //     background: "rgba(0, 0, 0, 0.7)",
    //   });
    //   let that = this;
    //   this.$axios
    //     .post(Question.papermanagecatalogue, {
    //       Catalogue: that.value1,
    //     })
    //     .then(function (response) {
    //       console.log("response", response);
    //       loading.close();
    //       if (response.data.ErrCode == 0) {
    //         for (var i = 0; i < response.data.Temp.length; i++) {
    //           if (response.data.Temp[i].Testparttype1 == "听力理解") {
    //             var obj = {
    //               title1: response.data.Temp[i].Testparttype1,
    //               title2: response.data.Temp[i].Testparttype2,
    //               grade: "",
    //               questionexplain: "",
    //               questions: [],
    //               questionsID: [],
    //             };

    //             var questionsId = response.data.Temp[i].QuestionId;
    //             var text =
    //               response.data.Temp[i].QuestionId +
    //               "-" +
    //               response.data.Temp[i].Testparttype1 +
    //               "-" +
    //               response.data.Temp[i].Questiontype +
    //               "-" +
    //               response.data.Temp[i].Difficulty;
    //             if (response.data.Temp[i].Testparttype2 == "听句子") {
    //               for (var j = 0; j < that.module1.length; j++) {
    //                 if (that.module1[j].title2 == "听句子") {
    //                   that.module1[j].questions.push(text);
    //                   that.module1[j].questionsID.push(questionsId);
    //                 } else if (that.module1[j].title2 == "") {
    //                   that.module1[j].questions.push(text);
    //                   that.module1[j].questionsID.push(questionsId);
    //                   that.module1[j].title2 = "听句子";
    //                 } else if (j == that.module1.length - 1) {
    //                   obj.questions.push(text);
    //                   obj.questionsID.push(questionsId);
    //                   that.module1.push(obj);
    //                   break;
    //                 }
    //               }
    //             } else if (response.data.Temp[i].Testparttype2 == "听短对话") {
    //               for (var j = 0; j < that.module1.length; j++) {
    //                 if (that.module1[j].title2 == "听短对话") {
    //                   that.module1[j].questions.push(text);
    //                   that.module1[j].questionsID.push(questionsId);
    //                 } else if (that.module1[j].title2 == "") {
    //                   that.module1[j].questions.push(text);
    //                   that.module1[j].questionsID.push(questionsId);
    //                   that.module1[j].title2 = "听短对话";
    //                 } else if (j == that.module1.length - 1) {
    //                   obj.questions.push(text);
    //                   obj.questionsID.push(questionsId);
    //                   that.module1.push(obj);
    //                   break;
    //                 }
    //               }
    //             } else if (response.data.Temp[i].Testparttype2 == "听长对话") {
    //               for (var j = 0; j < that.module1.length; j++) {
    //                 if (that.module1[j].title2 == "听长对话") {
    //                   that.module1[j].questions.push(text);
    //                   that.module1[j].questionsID.push(questionsId);
    //                 } else if (that.module1[j].title2 == "") {
    //                   that.module1[j].questions.push(text);
    //                   that.module1[j].questionsID.push(questionsId);
    //                   that.module1[j].title2 = "听长对话";
    //                 } else if (j == that.module1.length - 1) {
    //                   obj.questions.push(text);
    //                   obj.questionsID.push(questionsId);
    //                   that.module1.push(obj);
    //                   break;
    //                 }
    //               }
    //             } else if (response.data.Temp[i].Testparttype2 == "听讲话") {
    //               for (var j = 0; j < that.module1.length; j++) {
    //                 if (that.module1[j].title2 == "听讲话") {
    //                   that.module1[j].questions.push(text);
    //                   that.module1[j].questionsID.push(questionsId);
    //                 } else if (that.module1[j].title2 == "") {
    //                   that.module1[j].questions.push(text);
    //                   that.module1[j].questionsID.push(questionsId);
    //                   that.module1[j].title2 = "听讲话";
    //                 } else if (j == that.module1.length - 1) {
    //                   obj.questions.push(text);
    //                   obj.questionsID.push(questionsId);
    //                   that.module1.push(obj);
    //                   break;
    //                 }
    //               }
    //             }
    //           } else if (response.data.Temp[i].Testparttype1 == "综合阅读") {
    //             var obj = {
    //               title1: response.data.Temp[i].Testparttype1,
    //               title2: response.data.Temp[i].Testparttype2,
    //               grade: "",
    //               questionexplain: "",
    //               questions: [],
    //               questionsID: [],
    //             };

    //             var questionsId = response.data.Temp[i].QuestionId;
    //             var text =
    //               response.data.Temp[i].QuestionId +
    //               "-" +
    //               response.data.Temp[i].Testparttype1 +
    //               "-" +
    //               response.data.Temp[i].Questiontype +
    //               "-" +
    //               response.data.Temp[i].Difficulty;
    //             if (response.data.Temp[i].Testparttype2 == "理解词语") {
    //               for (var j = 0; j < that.module2.length; j++) {
    //                 if (that.module2[j].title2 == "理解词语") {
    //                   that.module2[j].questions.push(text);
    //                   that.module2[j].questionsID.push(questionsId);
    //                 } else if (that.module2[j].title2 == "") {
    //                   that.module2[j].questions.push(text);
    //                   that.module2[j].questionsID.push(questionsId);
    //                   that.module2[j].title2 = "理解词语";
    //                 } else if (j == that.module2.length - 1) {
    //                   obj.questions.push(text);
    //                   obj.questionsID.push(questionsId);
    //                   that.module2.push(obj);
    //                   break;
    //                 }
    //               }
    //             } else if (response.data.Temp[i].Testparttype2 == "完成句子") {
    //               for (var j = 0; j < that.module2.length; j++) {
    //                 if (that.module2[j].title2 == "完成句子") {
    //                   that.module2[j].questions.push(text);
    //                   that.module2[j].questionsID.push(questionsId);
    //                 } else if (that.module2[j].title2 == "") {
    //                   that.module2[j].questions.push(text);
    //                   that.module2[j].questionsID.push(questionsId);
    //                   that.module2[j].title2 = "完成句子";
    //                 } else if (j == that.module2.length - 1) {
    //                   obj.questions.push(text);
    //                   obj.questionsID.push(questionsId);
    //                   that.module2.push(obj);
    //                   break;
    //                 }
    //               }
    //             } else if (response.data.Temp[i].Testparttype2 == "选词填空") {
    //               for (var j = 0; j < that.module2.length; j++) {
    //                 if (that.module2[j].title2 == "选词填空") {
    //                   that.module2[j].questions.push(text);
    //                   that.module2[j].questionsID.push(questionsId);
    //                 } else if (that.module2[j].title2 == "") {
    //                   that.module2[j].questions.push(text);
    //                   that.module2[j].questionsID.push(questionsId);
    //                   that.module2[j].title2 = "选词填空";
    //                 } else if (j == that.module2.length - 1) {
    //                   obj.questions.push(text);
    //                   obj.questionsID.push(questionsId);
    //                   that.module2.push(obj);
    //                   break;
    //                 }
    //               }
    //             } else if (response.data.Temp[i].Testparttype2 == "句子匹配") {
    //               for (var j = 0; j < that.module2.length; j++) {
    //                 if (that.module2[j].title2 == "句子匹配") {
    //                   that.module2[j].questions.push(text);
    //                   that.module2[j].questionsID.push(questionsId);
    //                 } else if (that.module2[j].title2 == "") {
    //                   that.module2[j].questions.push(text);
    //                   that.module2[j].questionsID.push(questionsId);
    //                   that.module2[j].title2 = "句子匹配";
    //                 } else if (j == that.module2.length - 1) {
    //                   obj.questions.push(text);
    //                   obj.questionsID.push(questionsId);
    //                   that.module2.push(obj);
    //                   break;
    //                 }
    //               }
    //             } else if (
    //               response.data.Temp[i].Testparttype2 == "理解短文（阅读理解）"
    //             ) {
    //               for (var j = 0; j < that.module2.length; j++) {
    //                 if (that.module2[j].title2 == "理解短文（阅读理解）") {
    //                   that.module2[j].questions.push(text);
    //                   that.module2[j].questionsID.push(questionsId);
    //                 } else if (that.module2[j].title2 == "") {
    //                   that.module2[j].questions.push(text);
    //                   that.module2[j].questionsID.push(questionsId);
    //                   that.module2[j].title2 = "理解短文（阅读理解）";
    //                 } else if (j == that.module2.length - 1) {
    //                   obj.questions.push(text);
    //                   obj.questionsID.push(questionsId);
    //                   that.module2.push(obj);
    //                   break;
    //                 }
    //               }
    //             } else if (
    //               response.data.Temp[i].Testparttype2 == "读后填空（阅读理解）"
    //             ) {
    //               for (var j = 0; j < that.module2.length; j++) {
    //                 if (that.module2[j].title2 == "读后填空（阅读理解）") {
    //                   that.module2[j].questions.push(text);
    //                   that.module2[j].questionsID.push(questionsId);
    //                 } else if (that.module2[j].title2 == "") {
    //                   that.module2[j].questions.push(text);
    //                   that.module2[j].questionsID.push(questionsId);
    //                   that.module2[j].title2 = "读后填空（阅读理解）";
    //                 } else if (j == that.module2.length - 1) {
    //                   obj.questions.push(text);
    //                   obj.questionsID.push(questionsId);
    //                   that.module2.push(obj);
    //                   break;
    //                 }
    //               }
    //             }
    //           } else if (response.data.Temp[i].Testparttype1 == "书面表达") {
    //             var obj = {
    //               title1: response.data.Temp[i].Testparttype1,
    //               title2: response.data.Temp[i].Testparttype2,
    //               grade: "",
    //               questionexplain: "",
    //               questions: [],
    //               questionsID: [],
    //             };

    //             var questionsId = response.data.Temp[i].QuestionId;
    //             var text =
    //               response.data.Temp[i].QuestionId +
    //               "-" +
    //               response.data.Temp[i].Testparttype1 +
    //               "-" +
    //               response.data.Temp[i].Questiontype +
    //               "-" +
    //               response.data.Temp[i].Difficulty;
    //             if (response.data.Temp[i].Testparttype2 == "写汉字") {
    //               for (var j = 0; j < that.module3.length; j++) {
    //                 if (that.module3[j].title2 == "写汉字") {
    //                   that.module3[i].questions.push(text);
    //                   that.module3[j].questionsID.push(questionsId);
    //                 } else if (that.module3[j].title2 == "") {
    //                   that.module3[j].questions.push(text);
    //                   that.module3[j].questionsID.push(questionsId);
    //                   that.module3[j].title2 = "写汉字";
    //                 } else if (j == that.module3.length - 1) {
    //                   obj.questions.push(text);
    //                   obj.questionsID.push(questionsId);
    //                   that.module3.push(obj);
    //                   break;
    //                 }
    //               }
    //             } else if (response.data.Temp[i].Testparttype2 == "作文") {
    //               for (var j = 0; j < that.module3.length; j++) {
    //                 if (that.module3[j].title2 == "作文") {
    //                   that.module3[j].questions.push(text);
    //                   that.module3[j].questionsID.push(questionsId);
    //                 } else if (that.module3[j].title2 == "") {
    //                   that.module3[j].questions.push(text);
    //                   that.module3[j].questionsID.push(questionsId);
    //                   that.module3[j].title2 = "作文";
    //                 } else if (j == that.module3.length - 1) {
    //                   obj.questions.push(text);
    //                   obj.questionsID.push(questionsId);
    //                   that.module3.push(obj);
    //                   break;
    //                 }
    //               }
    //             }
    //           }
    //         }
    //       } else {
    //         that.$message.error(response.data.ErrMsg);
    //       }
    //     })
    //     .catch(function (error) {
    //       console.log("error", error);
    //     });
    // },
    addModule(text) {
      console.log("添加模块", text);
      var newValue = {
        title1: text,
        title2: "",
        grade: "",
        questionexplain: "",
        questions: [],
        questionsID: [],
      };
      this.otherModule.push(newValue);
      // if (text == "听力理解") {
      //   this.module1.push(newValue);
      // } else if (text == "综合阅读") {
      //   this.module2.push(newValue);
      // } else if (text == "书面表达") {
      //   this.module3.push(newValue);
      // }
      let that = this;
      // this.$axios
      //   .post(Question.papermanageaddmodule, {
      //     Testparttype: text,
      //   })
      //   .then(function (response) {
      //     console.log("response", response);
      //   })
      //   .catch(function (error) {
      //     console.log("error", error);
      //   });
    },

    reduceModule1(text) {
      if (this.module1.length == 1) {
        this.$message.error("不少于一条！");
      } else {
        this.module1.splice(text, 1);
      }
    },

    reduceModule2(text) {
      if (this.module2.length == 1) {
        this.$message.error("不少于一条！");
      } else {
        this.module2.splice(text, 1);
      }
    },

    reduceModule3(text) {
      if (this.module3.length == 1) {
        this.$message.error("不少于一条！");
      } else {
        this.module3.splice(text, 1);
      }
    },

    // papercreate() {
    //   console.log("保存试卷");
    //   let that = this;
    //   // var question = [[], []];
    //   this.$axios
    //     .post(Question.papermanagecreate, {
    //       Testname: that.testName,
    //       // Question: question
    //     })
    //     .then(function (response) {
    //       console.log("response", response);
    //       console.log("response", response.data);
    //     })
    //     .catch(function (error) {
    //       console.log("error", error);
    //     });
    // },
    dataProce() {
      console.log("this.selection", this.selection);
      var that = this;
      var item = [];
      var itemID = [];
      for (var i = 0; i < that.selection.length; i++) {
        item[i] =
          that.selection[i].num +
          "-" +
          that.selection[i].testPartType +
          "-" +
          that.selection[i].degreeOfDifficulty;
        itemID[i] = that.selection[i].id.toString();
      }
      console.log("item", item);
      console.log("itemID", itemID);
      console.log("模块类型", that.selection[0].testPartType);
      var index = that.selection[0].testPartType.indexOf("-");
      console.log("模块1", that.selection[0].testPartType.substring(0, index));
      var first = that.selection[0].testPartType.substring(0, index);
      console.log("模块2", that.selection[0].testPartType.substring(index + 1));
      var second = that.selection[0].testPartType.substring(index + 1);
      console.log(
        "that.selection[0].testPartType.substring(0, index)",
        that.selection[0].testPartType.substring(0, index)
      );
      var test = that.findModule(
        that.selection[0].testPartType.substring(0, index)
      );

      console.log("testtesttest", test);
      var moduleIndex = this.index;
      console.log("moduleIndex", moduleIndex);
      if (test.startsWith("module1")) {
        //   for (var i = 0; i < that.module1.length; i++) {
        //  if (that.module1[i].title2 == second) {
        console.log("testtesttestmodule1", that.module1);
        for (var j = 0; j < item.length; j++) {
          that.module1[moduleIndex].questions.push(item[j]);
          that.module1[moduleIndex].questionsID.push(itemID[j]);
        }
        //  }
        //   }
      } else if (test.startsWith("module2")) {
        // for (var i = 0; i < that.module2.length; i++) {
        //   if (that.module2[i].title2 == second) {
        for (var j = 0; j < item.length; j++) {
          that.module2[moduleIndex].questions.push(item[j]);
          that.module2[moduleIndex].questionsID.push(itemID[j]);
        }
        //   }
        // }
      } else if (test.startsWith("module3")) {
        // for (var i = 0; i < that.module3.length; i++) {
        //   if (that.module3[i].title2 == second) {
        for (var j = 0; j < item.length; j++) {
          that.module3[moduleIndex].questions.push(item[j]);
          that.module3[moduleIndex].questionsID.push(itemID[j]);
        }
        //   }
        // }
      }
    },
    addQues(part1, part2, existList, index, explain) {
      console.log("part1", part1);
      console.log("part2", part2);
      console.log("index", index);
      console.log("explain", explain);
      console.log("existList", existList);
      if (part2 == "") {
        alert("请选择模块类型");
      } else {
        this.$router.push({
          path: "/data/manuallyCreateQueBank",
          query: {
            courseName: this.courseName,
            testName: this.testName,
            part1: part1,
            part2: part2,
            explain: explain,
            existList: existList,
            userNum: this.userNum,
            teacherName: this.teacherName,
            myImage: this.myImage,
            paperId: this.paperId,
            index: index,
          },
        });
      }
    },
    // 删除模块的题目
    delTheTitle(module, row, index) {
      // console.log("index", module, row, index)
      module[row].questions.splice(index, 1);
    },
    // 保存试卷
    ball() {
      var num = 0;
      var sum = 0;
      var flag = 1;
      for (var i = 0; i < this.module1.length; i++) {
        num += Number(this.module1[i].grade);
        sum += this.module1[i].questions.length;
        if (
          (Number(this.module1[i].grade) == 0 &&
            this.module1[i].questions.length != 0) ||
          (Number(this.module1[i].grade) != 0 &&
            this.module1[i].questions.length == 0)
        ) {
          flag = 0;
        }
      }

      for (var i = 0; i < this.module2.length; i++) {
        num += Number(this.module2[i].grade);
        sum += this.module2[i].questions.length;
        if (
          (Number(this.module2[i].grade) == 0 &&
            this.module2[i].questions.length != 0) ||
          (Number(this.module2[i].grade) != 0 &&
            this.module2[i].questions.length == 0)
        ) {
          flag = 0;
        }
      }
      for (var i = 0; i < this.module3.length; i++) {
        num += Number(this.module3[i].grade);
        sum += this.module3[i].questions.length;
        if (
          (Number(this.module3[i].grade) == 0 &&
            this.module3[i].questions.length != 0) ||
          (Number(this.module3[i].grade) != 0 &&
            this.module3[i].questions.length == 0)
        ) {
          flag = 0;
        }
      }

      // var sum1 = this.module1[0].questions.length;
      // var sum2 = this.module2[0].questions.length;
      // var sum3 = this.module3[0].questions.length;
      // sum=sum1 + sum2 + sum3;
      console.log("sum", sum);
      console.log("flag", flag);

      if (sum == 0) {
        this.$message.error("未选择题目，保存失败！");
      } else if (flag == 0) {
        this.$message.error("选择错误，保存失败！");
      } else if (num != 100) {
        this.$message.error("试卷总分不是100，请重新输入！");
      } else {
        const loading = this.$loading({
          lock: true,
          text: "Loading",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.7)",
        });
        var Questions = [];
        var num =
          this.module1.length + this.module2.length + this.module3.length;
        console.log("num:", num);
        for (var i = 0; i < num; i++) {
          Questions.push([0]);
        }

        console.log("module1",this.module1);
        for (var i = 0; i < num; i++) {
          if (i < this.module1.length) {
            for (var j = 0; j < this.module1.length; j++) {
              Questions[i][0] = this.module1[j].title1;
              Questions[i][1] = this.module1[j].title2;
              Questions[i][2] = this.module1[j].grade;
              Questions[i][3] = this.module1[j].questionexplain;
              for (var k = 0; k < this.module1[j].questions.length; k++) {
                Questions[i][k + 3] = this.module1[j].questionsID[k];
              }
            }
          } else if (
            i < this.module1.length + this.module2.length &&
            i >= this.module1.length
          ) {
            for (var j = 0; j < this.module2.length; j++) {
              Questions[i][0] = this.module2[j].title1;
              Questions[i][1] = this.module2[j].title2;
              Questions[i][2] = this.module2[j].grade;
              Questions[i][3] = this.module2[j].questionexplain;
              for (var k = 0; k < this.module2[j].questions.length; k++) {
                Questions[i][k + 3] = this.module2[j].questionsID[k];
              }
            }
          } else if (
            i < num &&
            i >= this.module1.length + this.module2.length
          ) {
            for (var j = 0; j < this.module3.length; j++) {
              Questions[i][0] = this.module3[j].title1;
              Questions[i][1] = this.module3[j].title2;
              Questions[i][2] = this.module3[j].grade;
              Questions[i][3] = this.module3[j].questionexplain;
              for (var k = 0; k < this.module3[j].questions.length; k++) {
                Questions[i][k + 3] = this.module3[j].questionsID[k];
              }
            }
          }
        }
        this.$axios
          .post(Question.papermanagecreate1, {
            PaperId: this.paperId.toString(),
            Model1: this.module1,
            Model2: this.module2,
            Model3: this.module3,
          })
          .then((response) => {
            console.log("response", response);
            loading.close();
            if (response.data.status == 200) {
              // 清空模块目录

              this.$message({
                message: "试卷保存成功！",
                type: "success",
              });
            } else {
              this.$message.error(response.data.ErrMsg);
            }
          })
          .catch(function (err) {
            console.log("err", err);
          });
      }
    },
    // 完成试卷
    ball1() {
      var num = 0;
      console.log("length", this.module1.length);

      for (var i = 0; i < this.module1.length; i++) {
        num += Number(this.module1[i].grade);
      }
      for (var i = 0; i < this.module2.length; i++) {
        num += Number(this.module2[i].grade);
      }
      for (var i = 0; i < this.module3.length; i++) {
        num += Number(this.module3[i].grade);
      }

      if (num != 100) {
        this.$message.error("试卷总分不是100，请重新输入！");
      } else {
        const loading = this.$loading({
          lock: true,
          text: "Loading",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.7)",
        });
        var Questions = [];
        var num =
          this.module1.length + this.module2.length + this.module3.length;
        console.log("num:", num);
        for (var i = 0; i < num; i++) {
          Questions.push([0]);
        }
        for (var i = 0; i < num; i++) {
          if (i < this.module1.length) {
            for (var j = 0; j < this.module1.length; j++) {
              Questions[i][0] = this.module1[j].title1;
              Questions[i][1] = this.module1[j].title2;
              Questions[i][2] = this.module1[j].grade;
              Questions[i][3] = this.module1[j].questionexplain;
              for (var k = 0; k < this.module1[j].questions.length; k++) {
                Questions[i][k + 3] = this.module1[j].questionsID[k];
              }
            }
          } else if (
            i < this.module1.length + this.module2.length &&
            i >= this.module1.length
          ) {
            for (var j = 0; j < this.module2.length; j++) {
              Questions[i][0] = this.module2[j].title1;
              Questions[i][1] = this.module2[j].title2;
              Questions[i][2] = this.module2[j].grade;
              Questions[i][3] = this.module2[j].questionexplain;
              for (var k = 0; k < this.module2[j].questions.length; k++) {
                Questions[i][k + 3] = this.module2[j].questionsID[k];
              }
            }
          } else if (
            i < num &&
            i >= this.module1.length + this.module2.length
          ) {
            for (var j = 0; j < this.module3.length; j++) {
              Questions[i][0] = this.module3[j].title1;
              Questions[i][1] = this.module3[j].title2;
              Questions[i][2] = this.module3[j].grade;
              Questions[i][3] = this.module3[j].questionexplain;
              for (var k = 0; k < this.module3[j].questions.length; k++) {
                Questions[i][k + 3] = this.module3[j].questionsID[k];
              }
            }
          }
        }
        this.$axios
          .post(Question.papermanagecreate1, {
            PaperId: this.paperId.toString(),
            Model1: this.module1,
            Model2: this.module2,
            Model3: this.module3,
          })
          .then((response) => {
            console.log("response", response);
            loading.close();
            if (response.data.status == 200) {
              // 清空模块目录

              this.$message({
                message: "试卷生成成功！",
                type: "success",
              });
            } else {
              this.$message.error(response.data.ErrMsg);
            }
          })
          .catch(function (err) {
            console.log("err", err);
          });
      }
    },
    // 清空模块目录
    empty() {
      this.module1 = [
        {
          title1: "听力理解",
          title2: "",
          grade: "",
          questionexplain: "",
          questions: [],
          questionsID: [],
        },
      ];

      this.module2 = [
        {
          title1: "综合阅读",
          title2: "",
          grade: "",
          questionexplain: "",
          questions: [],
          questionsID: [],
        },
      ];

      this.module3 = [
        {
          title1: "书面表达",
          title2: "",
          grade: "",
          questionexplain: "",
          questions: [],
          questionsID: [],
        },
      ];
    },
    returnTop() {
      this.$router.push({
        path: "/data/testLibrary",
        query: {
          courseName: this.courseName,
          phoneNum: this.phoneNum,
          userNum: this.userNum,
          teacherName: this.teacherName,
          myImage: this.myImage,
        },
      });
    },
  },
};
</script>


<style lang="css" scoped>
@import "./public.css";

.body {
  display: flex;
  width: 100%;
  margin-bottom: 10px;
}

.left {
  width: 95%;
  height: 100%;
  padding: 30px 0;
  border: 1px solid #006699;
}

.listening,
.compreh,
.written {
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  height: 100%;
}

.listening > div,
.compreh > div,
.written > div {
  display: flex;
  align-items: center;
}

.body h2 {
  font-size: 20px;
  font-weight: 600;
}
</style>
