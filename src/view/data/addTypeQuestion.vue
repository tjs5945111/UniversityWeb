<template>
  <div class="wrap">
    <!-- 资料-题库-添加 单选 填空作文题 -->
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
      <!-- 作文题目-题型-题干-知识点-难易度 -->
      <div class="typeQuestion">
        <el-row>
          <el-col :span="16">
            <el-row>
              <el-col :span="2">
                <span class="outSpan">题型:</span>
              </el-col>
              <el-col :span="22">
                <el-tabs v-model="tabPosition" @tab-click="handleClick" ref="danxuanti">
                  <el-tab-pane label="选择题" class="questionType" name="选择题" >
                    
                    <el-row class="questionRow">
                      <el-col :span="2">
                        <span class="outSpan">题干:</span>
                      </el-col>
                      <el-col :span="17" style="display:flex;align-items: center;margin-left:20px;">
                        <el-col :span="23" style="margin-right:10px;">
                          <quill-editor v-model="context" :options="editorOption"></quill-editor>
                        </el-col>
                        <!-- <el-col :span="1">
                          <el-radio v-model="type1" label="题干" @change="typeChange">&nbsp;</el-radio>
                        </el-col> -->
                      </el-col>
                    </el-row>
					<div class="addImg" >
					  <el-row>
					    <el-col :span="8">
					      <ul>
					        <li class="imgBox" v-for="(item, index) in essayImg" :key="index">
					          <img :src="item" alt="" style="height: 100%; width: auto; margin: 0 auto;">
					          <img class="delImg" src="../../assets/del.png" alt="" @click="spliceImg(index)">
					        </li>
					      </ul>
					      <!-- <quill-editor v-model="contextEssay" :options="editorOption"></quill-editor> -->
					    </el-col>
					    <el-col :span="16"  style="display:flex;align-items: center; width: 100%;" >
							<span style="font-size:20px;">添加图片:</span>
					      <button type="primary" class="upImg" style="background-color: #FF6A6A;">
					        <div>添加图片</div>
					        <input type="file" class="fileInput" id="upImg" ref="upFile" @change="imageInput($event)" />
					      </button>
					    </el-col>
					  </el-row>
					</div>
                    <el-row class="questionRow">
                      <el-col :span="20" style="display:flex;align-items:center;">
                        <el-col :span="2">
                          <span class="outSpan">选项:</span>
                        </el-col>
                        <el-col :span="1">
                          <span class="outSpan">A.</span>
                        </el-col>
                        <el-col :span="19">
                          <quill-editor v-model="answerSA" :options="editorOption"></quill-editor>
                        </el-col>
                        <el-col :span="2">
                          &emsp;
                          <el-radio v-model="correctAns" label="A" ref="correctAns">&nbsp;</el-radio>
                        </el-col>
                      </el-col>
                      <el-col :span="20" style="display:flex;align-items:center;margin-top:10px;">
                        <el-col :span="2"></el-col>
                        <el-col :span="1">
                          <span class="outSpan">B.</span>
                        </el-col>
                        <el-col :span="19">
                          <!-- <el-input v-model="answerSB" ref="answerB"></el-input> -->
                          <quill-editor v-model="answerSB" :options="editorOption"></quill-editor>
                        </el-col>
                        <el-col :span="2">
                          &emsp;
                          <el-radio v-model="correctAns" label="B" ref="correctAns">&nbsp;</el-radio>
                        </el-col>
                      </el-col>
                      <el-col :span="20" style="display:flex;align-items:center;margin-top:10px;">
                        <el-col :span="2"></el-col>
                        <el-col :span="1">
                          <span class="outSpan">C.</span>
                        </el-col>
                        <el-col :span="19">
                          <quill-editor v-model="answerSC" :options="editorOption"></quill-editor>
                        </el-col>
                        <el-col :span="2">
                          &emsp;
                          <el-radio v-model="correctAns" label="C" ref="correctAns">&nbsp;</el-radio>
                        </el-col>
                      </el-col>
                      <el-col :span="20" style="display:flex;align-items:center;margin-top:10px;">
                        <el-col :span="2"></el-col>
                        <el-col :span="1">
                          <span class="outSpan">D.</span>
                        </el-col>
                        <el-col :span="19">
                          <quill-editor v-model="answerSD" :options="editorOption"></quill-editor>
                        </el-col>
                        <el-col :span="2">
                          &emsp;
                          <el-radio v-model="correctAns" label="D" ref="correctAns">&nbsp;</el-radio>
                        </el-col>
                      </el-col>
                    </el-row>
                    <el-row class="questionRow">
                      <el-col :span="3">
                        <span class="outSpan">模块类型:</span>
                      </el-col>
                      <el-col :span="4">
                        <el-select
                          v-model="value5"
                          placeholder="请选择"
                          class="questionSelect"
                          ref="quePart1"
                        >
                         <el-option label="选择题" value="1"></el-option>
                        </el-select>
                      </el-col>
                    
                    </el-row>
                  </el-tab-pane>
                 
                  <el-tab-pane label="填空题" name="填空题">
                    <el-row class="questionRow">
                      <el-col :span="2">
                        <span class="outSpan">题干:</span>
                      </el-col>
                      <el-col :span="20">
                        <!-- <el-input placeholder v-model="contextFB"></el-input> ref="myQuillEditor" -->
                        <quill-editor v-model="contextFB" :options="editorOption"></quill-editor>
                      </el-col>
                    </el-row>
					<div class="addImg" >
					  <el-row>
					    <el-col :span="8">
					      <ul>
					        <li class="imgBox" v-for="(item, index) in essayImg" :key="index">
					          <img :src="item" alt="" style="height: 100%; width: auto; margin: 0 auto;">
					          <img class="delImg" src="../../assets/del.png" alt="" @click="spliceImg(index)">
					        </li>
					      </ul>
					      <!-- <quill-editor v-model="contextEssay" :options="editorOption"></quill-editor> -->
					    </el-col>
					    <el-col :span="16"  style="display:flex;align-items: center; width: 100%;" >
							<span style="font-size:20px;">添加图片:</span>
					      <button type="primary" class="upImg" style="background-color: #FF6A6A;">
					        <div>添加图片</div>
					        <input type="file" class="fileInput" id="upImg" ref="upFile" @change="imageInput($event)" />
					      </button>
					    </el-col>
					  </el-row>
					</div>
                    <el-row class="questionRow">
                      <el-col :span="2">
                        <span class="outSpan">答案:</span>
                      </el-col>
                      <el-col :span="20">
                        <!-- <el-input placeholder v-model="correctAnsFB"></el-input> ref="myQuillEditor" -->
                        <quill-editor v-model="correctAnsFB" :options="editorOption"></quill-editor>
                      </el-col>
                    </el-row>
                    <el-row class="questionRow">
                      <el-col :span="3">
                        <span class="outSpan">模块类型:</span>
                      </el-col>
                      <el-col :span="4">
                        <el-select v-model="value9" placeholder="请选择" class="questionSelect">
                          <el-option label="填空题" value="2"></el-option>
                          </el-select>
                        </el-select>
                      </el-col>
                     
                    </el-row>
                  </el-tab-pane>
                 
                  <el-tab-pane label="计算题" name="计算题">
                    <el-row class="questionRow">
                      <el-col :span="2">
                        <span class="outSpan">题干:</span>
                      </el-col>
                      <el-col :span="20">
                        <!-- <el-input placeholder v-model="contextEssay"></el-input> -->
                        <quill-editor v-model="contextEssay" :options="editorOption"></quill-editor>
                      </el-col>
                    </el-row>
                    <!-- 添加图片 -->
                    <div class="addImg">
                      <el-row>
                        <el-col :span="8">
                          <ul>
                            <li class="imgBox" v-for="(item, index) in essayImg" :key="index">
                              <img :src="item" alt="" style="height: 100%; width: auto; margin: 0 auto;">
                              <img class="delImg" src="../../assets/del.png" alt="" @click="spliceImg(index)">
                            </li>
                          </ul>
                          <!-- <quill-editor v-model="contextEssay" :options="editorOption"></quill-editor> -->
                        </el-col>
                        <el-col :span="16"  style="display:flex;align-items: center; width: 100%;">
							<span style="font-size:20px;">添加图片:</span>
                          <button type="primary" class="upImg" style="background-color: #FF6A6A;">
                            <div>添加图片</div>
                            <input type="file" class="fileInput" id="upImg" ref="upFile" @change="imageInput($event)" />
                          </button>
                        </el-col>
                      </el-row>
                    </div>
					<el-row class="questionRow">
					  <el-col :span="2">
					    <span class="outSpan">答案:</span>
					  </el-col>
					  <el-col :span="20">
					    <!-- <el-input placeholder v-model="correctAnsFB"></el-input> ref="myQuillEditor" -->
					    <quill-editor v-model="correctAnsCA" :options="editorOption"></quill-editor>
					  </el-col>
					</el-row>
                    <el-row class="questionRow">
                      <el-col :span="3">
                        <span class="outSpan">模块类型:</span>
                      </el-col>
                      <el-col :span="4">
                        <el-select v-model="value11" placeholder="请选择" class="questionSelect">
                           <el-option label="计算题" value="3"></el-option>
                        </el-select>
                      </el-col>
					  
                     
                    </el-row>
                  </el-tab-pane>
                </el-tabs>
              </el-col>
            </el-row>
            <el-row class="questionRow">
              <el-col :span="3">
                <span class="outSpan">知识点:</span>
              </el-col>
              <el-col :span="5">
                <el-select
                  v-model="value1"
                  placeholder="请选择"
                  class="questionSelect"
                  @change="getKnowledgePoint2"
                  ref="point1"
                >
                  <el-option
                    v-for="item in KnowledgePoint1"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-col>
              <el-col :span="5">
                <el-select
                  v-model="value2"
                  placeholder="请选择"
                  class="questionSelect"
                  ref="point2"
                  @change="getKnowledgePoint3"
                >
                  <el-option
                    v-for="(item,index) in KnowledgePoint2"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-col>
              <el-col :span="5">
                <el-select v-model="value3" placeholder="请选择" class="questionSelect" ref="point3">
                  <el-option
                    v-for="(item,index) in KnowledgePoint3"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-col>
            </el-row>
            <el-row class="questionRow">
              <el-col :span="3">
                <span class="outSpan">难易度:</span>
              </el-col>
              <el-col :span="4">
                <el-select v-model="value4" placeholder="请选择" class="questionSelect" ref="diffType">
                  <el-option
                    v-for="item in difficultytype"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-col>
            </el-row>
            <el-row class="questionRow questionSub">
              <el-col :span="5">
                <el-button
                  type="danger"
                  style="display: block; width: 75%; margin: 0 auto;"
                  @click="saveTtopic(0)"
                >保存题目</el-button>
              </el-col>
              <el-col :span="5">
                <el-button type="danger" @click="saveTtopic(1)" style="display: block; width: 75%; margin: 0 auto;">继续出题</el-button>
              </el-col>
              <el-col :span="5">
                <el-button type="danger" @click="returnTop()" style="display: block; width: 75%; margin: 0 auto;">返回上一级</el-button>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </div>
    </div>
    <!-- <input type="file" id="fileInput" ref="upFile" @change="fileInput" /> -->
  </div>
</template>

<script>
import elHead from "../../components/head";
import Question from "../../api/get";
import { quillEditor } from "vue-quill-editor";
export default {
  data() {
    return {
      courseName: "",
      phoneNum: "",
      userNum: "",
      teacherName: "",
      myImage: "",
      testName:"",
	  indexId:"",
      singleEditorOption: {
        modules: {
          toolbar: [
            ["bold", "italic", "underline", "strike"], 
            ["blockquote", "code-block"]
          ]
        },
        placeholder: '请输入短文'
      },

      editorOption: {
        modules: {
          toolbar: [
            ["bold", "italic", "underline", "strike"], 
            ["blockquote", "code-block"]
			
          ]
        },
        placeholder: '不可为空'
      },

      shortEssayTxt1: "", // 短文
      shortEssayTxt2: "", // 短文

      // 单选组合
      contextSC: "",
      list: [
        {
          inputQueSC: "",
          inputAswA: "",
          inputAswB: "",
          inputAswC: "",
          inputAswD: "",
          setCorrect: ""
        }
      ],
      // 填空组合
      contextFBC: "",
      listForFC: [
        {
          inputQues: "",
          inputAsw: ""
        }
      ],
      // 上传文件名称
      fileList: [],
      // 知识点
      KnowledgePoint1: null,
      KnowledgePoint2: null,
      KnowledgePoint3: null,
      value1: "",
      value2: "",
      value3: "",
      // 难易度 
      difficultytype: [],
      value4: "",
      // 模块
      questionPartLevel1: [],
      questionPartLevel2: [],
      value5: "",
      value6: "",
      value7: "",
      value8: "",
      value9: "",
      value10: "",
	  value11: "",
      // 听力 or 题干
      type1: "",
      type2: "",
      type_1: 0,
      type_2: "",
      tabPosition: "选择题",
      //单选题
      context: "",
      correctAns: "",
      answerSA: "",
      answerSB: "",
      answerSC: "",
      answerSD: "",
      // 填空题
      contextFB: "",
      correctAnsFB: "",
	  correctAnsCA: "",
      // 作文题
      contextEssay: "",
      essayImg: [],
      // 听力链接
      mp3Url:""
    };
  },
  components: {
    elHead
  },
  created() {
    this.userNum = this.$route.query.userNum;
    this.teacherName = this.$route.query.teacherName;
    this.myImage = this.$route.query.myImage;
    this.phoneNum = this.$route.query.phoneNum;
    this.courseName = this.$route.query.courseName;
    this.testName = this.$route.query.testName;
	this.indexId = this.$route.query.id;
  },
  mounted() {
    // 知识点1
    let that = this;
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

    
  },
  methods: {
    // 返回上一级
    returnLink() {
      console.log("123456")
      this.$router.push({ path: '/data/addQuestion', query: { testName: this.testName }})
    },
   
    // 题目有听力可选
    typeChange(radio) {
      console.log("初始化")
      let that = this;
      that.questionPartLevel1 = [];
      that.questionPartLevel2 = [];
      that.value5 = "";
      that.value6 = "";
      that.value7 = "";
      that.value8 = "";
      var queType = this.$refs.danxuanti.value;
      var type = radio;
      if (type == "短文") {
        this.type_1 = 1;
        this.type_2 = 0;
        this.type2 = "短文";
        this.mp3Url = '';
      } else if (type == "听力") {
        this.type_1 = 0;
        this.type_2 = 1;
        this.type2 = "听力";
        this.mp3Url = '';
        this.shortEssayTxt1 = '';
        this.shortEssayTxt2 = '';
      }
      this.$axios
        .post(Question.testparttype, {
          QuestionType: queType,
          Type: type
        })
        .then(function(response) {
          var ballList = [];
          if (response.data.response.length == 1) {
            that.questionPartLevel1.push({
              value: response.data.response[0],
              label: response.data.response[0]
            });
          } else if (response.data.response.length >= 1) {
            for (var i = 0; i < response.data.response.length; i++) {
              if (i == 0) {
                that.questionPartLevel1.push({
                  value: response.data.response[i],
                  label: response.data.response[i]
                });
              } else {
                that.questionPartLevel2.push({
                  value: response.data.response[i],
                  label: response.data.response[i]
                });
              }
            }
          } else {
            console.log("数据不能为空");
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    // 判断答案是否为空
    isEmpty() {},
    // 保存题目
    saveTtopic(isBao) {
      let that = this;
      var queType = this.$refs.danxuanti.value;
      var diffType = this.value4;
      var point1 = this.value1;
      var point2 = this.value2;
      var point3 = this.value3;
      // if (point1 != "") {
		  
        if (diffType != "") {
          if (queType == "选择题") {
            var quePart1 = this.value5;
          //  var quePart2 = this.value6;
            var context = "";
			
            // var answerA = [this.answerSA.replace(/(.{3})/, "$1A.")];
            // var answerB = [this.answerSB.replace(/(.{3})/, "$1B.")];
            // var answerC = [this.answerSC.replace(/(.{3})/, "$1C.")];
            // var answerD = [this.answerSD.replace(/(.{3})/, "$1D.")];
			var answerA  = this.answerSA;
			var answerB  = this.answerSB;
			var answerC  = this.answerSC;
			var answerD  = this.answerSD;
            var correctAnswer = this.correctAns;
            var questionDescription = this.context;
            var answer = [answerA, answerB, answerC, answerD];
			
              if (quePart1 != "") {
                  console.log("this.correctAns", questionDescription)
                  console.log("this.correctAns", this.correctAns)
                  if (String(this.correctAns) != "") {
                    // if (this.type_1 == 1) {
                      if (questionDescription != "") {
                        const loading = this.$loading({
                          lock: true,
                          text: '拼命加载中...',
                          spinner: 'el-icon-loading',
                          background: 'rgba(0, 0, 0, 0.7)'
                        });
                        this.$axios
                          .post(Question.question, {
                           // QuestionType: 1,
                            DifficultyType: diffType,
							//知识点
                            // Level1: point1,
                            // Level2: point2,
                            // Level3: point3,
                            QuestionDescription: questionDescription,
                            Option1: answerA,
                            Option2: answerB,
                            Option3: answerC,
                            Option4: answerD,
                            CorrectAnswer: correctAnswer,
							//题目类型
                            QuestionPartLevel2: quePart1,
							//图片链接
							ImgUrl: that.essayImg.toString(),
                            IndexId:this.indexId.toString(),
                          })
                          .then(function(response) {
                            console.log("response.data.response",response);
                            if(response.data.status==200) {
                              loading.close();
                              if(isBao == 0) {
                                that.$message({
                                  message: '保存成功, 2秒后返回上一个页面！',
                                  type: 'success'
                                });

                                setTimeout(function() {
                                that.returnTop()();
                                }, 2000)
                              } else if(isBao == 1) {
                                that.context = "";
                                that.correctAns = "";
                                that.answerSA = "";
                                that.answerSB = "";
                                that.answerSC = "";
                                that.answerSD = "";
								that.essayImg = [];
                                that.mp3Url = "";
                                that.$message({
                                  message: '保存成功, 请继续出题！',
                                  type: 'success'
                                });
								setTimeout(function() {
								
								}, 2000)
                              }
                            } else {
								  loading.close();
								that.$message({
								  message: '保存失败！',
								  type: 'warning'
								});
								setTimeout(function() {
								
								}, 2000)
							}
                          })
                          .catch(function(error) {
                            console.log(error);
                          });
                      } else {
                        alert("选择题干，题干不可以为空");
                      }
                    // } else if (this.type_2 == 1) {
                    //   alert("请上传音频");
                    // }
                  } else {
                    alert("正确答案不可以为空");
                  }
                // } else {
                //   alert("选择答案不完整");
                // }
              } else {
                alert("请选择模块类型");
              }
            
          } else if (queType == "填空题") {
            var quePart1 = this.value9;
           // var quePart2 = this.value10;
            var correctAnswer = this.correctAnsFB;
            var content = this.contextFB;
            if (this.contextFB != "") {
              if (this.correctAnsFB != "") {
                if (quePart1 != "") {
                  const loading = this.$loading({
                    lock: true,
                    text: '拼命加载中...',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                  });
                  this.$axios
                    .post(Question.questioncompletion, {
                      DifficultyType: diffType,
                      // Level1: point1,
                      // Level2: point2,
                      // Level3: point3,
                      QuestionDescription: content,
                      CorrectAnswer: correctAnswer,
					  //题目模块
                      QuestionPartLevel2: quePart1,
                     //图片链接
                     //图片链接
                      ImgUrl: that.essayImg.toString(),
                      IndexId:this.indexId.toString(),
                    })
                    .then(function(response) {
						  console.log("填空题",response);
                      if(response.data.status==200) {
                        loading.close();
                        if(isBao == 0) {
                          that.$message({
                            message: '保存成功, 2秒后返回上一个页面！',
                            type: 'success'
                          });

                          setTimeout(function() {
                           that.returnTop()();
                          }, 2000)
                        } else if(isBao == 1) {
                          that.$message({
                            message: '保存成功, 请继续出题！',
                            type: 'success'
                          });

                          that.contextFB = "";
                          that.correctAnsFB = "";
						  that.essayImg = [];
                        }
                      } 
					  else {
						loading.close();
					  	that.$message({
					  	  message: '保存失败！',
					  	  type: 'warning'
					  	});
					  	setTimeout(function() {
					  	
					  	}, 2000)
					  }
                    })
                    .catch(function(error) {
                      console.log(error);
                    });
                } else {
                  alert("请至少选择一个模块类型");
                }
              } else {
                alert("答案不能为空");
              }
            } else {
              alert("题干不能为空");
            }
          } else if (queType == "计算题") {
            var quePart1 = this.value11;
        //    var quePart2 = this.value10;
            var context = this.contextEssay;
			 var correctAnswer = this.correctAnsCA;
			
            if (this.contextEssay != "") {
              if (quePart1 != "") {
                const loading = this.$loading({
                  lock: true,
                  text: '拼命加载中...',
                  spinner: 'el-icon-loading',
                  background: 'rgba(0, 0, 0, 0.7)'
                });
                this.$axios
                  .post(Question.questioncalculation, {
                    DifficultyType: diffType,
                    // Level1: point1,
                    // Level2: point2,
                    // Level3: point3,
                    QuestionDescription: context,
                   // Context: that.essayImg,
                    CorrectAnswer: correctAnswer,
                    QuestionPartLevel2: quePart1,
					//图片链接
					ImgUrl: that.essayImg.toString(),
                    IndexId:this.indexId.toString(),
                  })
                  .then(function(response) {
                    console.log("计算题", response)
                    if(response.data.status==200) {
                      loading.close();
                      if(isBao == 0) {
                        that.$message({
                          message: '保存成功, 2秒后返回上一个页面！',
                          type: 'success'
                        });

                        setTimeout(function() {
                          that.returnTop()();
                        }, 2000)
                      } else if(isBao == 1) {
                        that.$message({
                          message: '保存成功, 请继续出题！',
                          type: 'success'
                        });
						that.correctAnsCA= "";
                        that.contextEssay = "";
                        that.essayImg = [];
                      }
                    }  else {
						loading.close();
					  	that.$message({
					  	  message: '保存失败！',
					  	  type: 'warning'
					  	});
					  	setTimeout(function() {
					  	
					  	}, 2000)
					  }
                  })
                  .catch(function(error) {
                    console.log(error);
                  });
              } else {
                alert("请至少选择一个模块类型");
              }
            } else {
              alert("题干不能为空");
            }
          }
        } else {
          alert("难易度不能为空");
        }
    //  }
	   // else {
    //     alert("请至少选择一个知识点");
    //   }
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
    // 单选组合-添加题目
    addQue() {
      var newValue = {
        inputQueSC: "",
        inputAswA: "",
        inputAswB: "",
        inputAswC: "",
        inputAswD: "",
        setCorrect: ""
      };
      //添加新的行数
      this.list.push(newValue);
    },
    // 单选组合-删除题干
    delQue(num) {
      if(num != 0 || this.list.length != 1) {
        this.list.splice(num, 1)
        this.$message({
          message: '删除成功！',
          type: 'success'
        });
      } else {
        this.$message({
          message: '必须有一个题干！',
          type: 'error'
        });
      }
    },
    // 填空组合-添加题目
    addQueF() {
      var newValue = {
        inputQues: "",
        inputAsw: ""
      };
      //添加新的行数
      this.listForFC.push(newValue);
    }, 
    // 填空组合-删除题目
    delQuef(num) {
      if(num != 0 || this.listForFC.length != 1) {
        this.listForFC.splice(num, 1)
        this.$message({
          message: '删除成功！',
          type: 'success'
        });
      } else {
        this.$message({
          message: '必须有一个题干！',
          type: 'error'
        });
      }
    },
    // 上传文件
    fileInput(data) {
      let that = this;
      let file = data.target.files[0];
      if (!/audio\/\w+/.test(file.type)) {
        /*可以把autio改成其他文件类型 比如 image*/
        alert("只能选择音频文件");
        return false;
      }
      // console.log(file.type); /*文件类型*/
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const loading = this.$loading({
          lock: true,
          text: '音频上传中',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        this.$axios
          .post(Question.mp3, {
            file_byte: reader.result
          })
          .then(function(res) {
            console.log("res", res)
            if(res.data.err_code == 0) {
             
              loading.close();
              that.mp3Url = res.data.url;
              that.$message({
                message: '音频上传成功！',
                type: 'success'
              });
            }
          })
          .catch(function(err) {
            console.log("err", err);
          });
      };
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    // 删除数组图片
    spliceImg(num) {
      this.essayImg.splice(num, 1)
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
    returnTop() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="css" scoped>
 @import './public.css';

/* 导航栏的中的一些设置 */
.el-tabs__item {
  font-size: 20px;
}
.el-tabs__content {
  margin-left: -66px;
  margin-right: -200px;
}

/* 题目中的下拉框 知识点 难易度 */
.questionSelect {
  margin-right: 15px;
}
.compositionQuestion {
  padding-left: 15px;
}

.el-button {
  padding: 9px 5px;
  font-size: 15px;
}
/* 题目中的每一行元素 题型 题干等 */
.questionRow {
  margin-bottom: 20px;
}
.optionRow {
  margin-bottom: 10px;
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

.textBox {
  width: 100%;
  height: 200px;
  font-size: 25px;
  border: black 1px solid;
}

/* 作文图片 */
.addImg {
  padding-left: 65px;
  margin-bottom: 20px;
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

.questionSub {
  display: flex;
  justify-content: flex-end;
  padding-right: 100px;
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
</style>
