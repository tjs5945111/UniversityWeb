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
          <el-col :span="18">
            <el-row>
              <!-- <el-tabs v-model="tabPosition" @tab-click="handleClick" ref="danxuanti"> -->
              <el-row v-if="questionType == '单选题'" class="questionType">
                <el-row class="questionRow" style="margin-bottom:15px;">
                  <el-col :span="4">
                    <span class="outSpan">综合阅读:</span>
                  </el-col>
                  <el-col :span="17" style="display:flex;align-items: center;margin-right:20px;">
                    <!-- <el-col :span="23" style="margin-right:10px;">
                        <quill-editor v-model="shortEssayTxt1" :options="editorOption"></quill-editor>
                    </el-col>-->
                    <el-col :span="1">
                      <el-radio
                        v-model="type2"
                        label="综合阅读"
                        @change="typeChange"
                        style="margin-top: 15px;"
                      >&nbsp;</el-radio>
                    </el-col>
                  </el-col>
                  <el-col :span="4" style="display:flex;align-items: center; width: 100%;">
                    <span style="font-size:20px;">听力:</span>
                    <button type="primary" class="upImg" style="background-color: #FF6A6A;">
                      <div v-if="!mp3Url">上传音频</div>
                      <div v-if="mp3Url">重新上传音频</div>
                      <input
                        type="file"
                        class="fileInput"
                        id="upImg"
                        ref="upFile"
                        @change="fileInput($event)"
                      />
                    </button>&nbsp;
                    <el-radio v-model="type2" label="听力理解" @change="typeChange">&nbsp;</el-radio>
                    <div v-if="mp3Url">
                      <audio :src="mp3Url" controls></audio>
                    </div>
                  </el-col>
                </el-row>
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
                    </el-col>-->
                  </el-col>
                </el-row>
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
                      <el-option
                        v-for="item in questionPartLevel1"
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
                      ref="quePart2"
                    >
                      <el-option
                        v-for="item in questionPartLevel2"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </el-col>
                </el-row>
              </el-row>
              <el-row v-if="questionType == '单选组合'">
                <el-row class="questionRow" style="margin-bottom:15px;">
                  <el-col :span="2">
                    <span class="outSpan">短文:</span>
                  </el-col>
                  <el-col :span="17" style="display:flex;align-items: center;margin-right:20px;">
                    <el-col :span="23" style="margin-right:10px;">
                      <quill-editor v-model="shortEssayTxt2" :options="singleEditorOption"></quill-editor>
                    </el-col>
                    <el-col :span="1">
                      <el-radio v-model="type2" label="综合阅读" @change="typeChange">&nbsp;</el-radio>
                    </el-col>
                  </el-col>
                  <el-col :span="4" style="display:flex;align-items: center; width: 100%;">
                    <span style="font-size:20px;">听力:</span>
                    <button type="primary" class="upImg" style="background-color: #FF6A6A;">
                      <div v-if="!mp3Url">上传音频</div>
                      <div v-if="mp3Url">重新上传音频</div>
                      <input
                        type="file"
                        class="fileInput"
                        id="upImg"
                        ref="upFile"
                        @change="fileInput($event)"
                      />
                    </button>&nbsp;
                    <el-radio v-model="type2" label="听力理解" @change="typeChange">&nbsp;</el-radio>
                    <div v-if="mp3Url">
                      <audio :src="mp3Url" controls></audio>
                    </div>
                  </el-col>
                </el-row>
                <el-row class="questionRow topicOfCombined">
                  <el-row v-for="(item, index) in list" :key="index">
                    <el-row class="optionRow">
                      <el-col :span="2">
                        <span class="outSpan">题干{{ index+1 }}:</span>
                      </el-col>
                      <el-col :span="17">
                        <!-- <el-input v-model="item.inputQueSC"></el-input> -->
                        <quill-editor v-model="item.inputQueSC" :options="editorOption"></quill-editor>
                      </el-col>
                      <el-col :span="2">
                        <el-button type="text" size="medium" @click="addQue">
                          &emsp;
                          <i class="el-icon-plus"></i>
                        </el-button>
                        <el-button type="text" size="medium" @click="delQue(index)">
                          &emsp;
                          <i class="el-icon-delete"></i>
                        </el-button>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="2">
                        <span class="outSpan">选项:</span>
                      </el-col>
                      <el-col :span="22">
                        <el-row class="optionRow">
                          <el-col :span="1">
                            <span class="outSpan">A.</span>
                          </el-col>
                          <el-col :span="18">
                            <!-- <el-input v-model="item.inputAswA"></el-input> -->
                            <quill-editor v-model="item.inputAswA" :options="editorOption"></quill-editor>
                          </el-col>
                          <el-col :span="2">
                            &emsp;
                            <el-radio v-model="item.setCorrect" label="A">&emsp;</el-radio>
                          </el-col>
                        </el-row>

                        <el-row class="optionRow">
                          <el-col :span="1">
                            <span class="outSpan">B.</span>
                          </el-col>
                          <el-col :span="18">
                            <!-- <el-input v-model="item.inputAswB"></el-input> -->
                            <quill-editor v-model="item.inputAswB" :options="editorOption"></quill-editor>
                          </el-col>
                          <el-col :span="2">
                            &emsp;
                            <el-radio v-model="item.setCorrect" label="B">&emsp;</el-radio>
                          </el-col>
                        </el-row>
                        <el-row class="optionRow">
                          <el-col :span="1">
                            <span class="outSpan">C.</span>
                          </el-col>
                          <el-col :span="18">
                            <!-- <el-input v-model="item.inputAswC"></el-input> -->
                            <quill-editor v-model="item.inputAswC" :options="editorOption"></quill-editor>
                          </el-col>
                          <el-col :span="2">
                            &emsp;
                            <el-radio v-model="item.setCorrect" label="C">&emsp;</el-radio>
                          </el-col>
                        </el-row>
                        <el-row class="optionRow">
                          <el-col :span="1">
                            <span class="outSpan">D.</span>
                          </el-col>
                          <el-col :span="18">
                            <!-- <el-input v-model="item.inputAswD"></el-input> -->
                            <quill-editor v-model="item.inputAswD" :options="editorOption"></quill-editor>
                          </el-col>
                          <el-col :span="2">
                            &emsp;
                            <el-radio v-model="item.setCorrect" label="D">&emsp;</el-radio>
                          </el-col>
                        </el-row>
                      </el-col>
                    </el-row>
                  </el-row>
                </el-row>
                <el-row class="questionRow">
                  <el-col :span="3">
                    <span class="outSpan">模块类型:</span>
                  </el-col>
                  <el-col :span="4">
                    <el-select v-model="value7" placeholder="请选择" class="questionSelect">
                      <el-option
                        v-for="item in questionPartLevel1"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="4">
                    <el-select v-model="value8" placeholder="请选择" class="questionSelect">
                      <el-option
                        v-for="item in questionPartLevel2"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </el-col>
                </el-row>
              </el-row>
              <el-row v-if="questionType == '填空题'">
                <el-row class="questionRow">
                  <el-col :span="2">
                    <span class="outSpan">题干:</span>
                  </el-col>
                  <el-col :span="20">
                    <!-- <el-input placeholder v-model="contextFB"></el-input> ref="myQuillEditor" -->
                    <quill-editor v-model="contextFB" :options="editorOption"></quill-editor>
                  </el-col>
                </el-row>
                <!-- 添加图片 -->
                <div class="addImg">
                  <el-row>
                    <el-col :span="8">
                      <ul>
                        <li class="imgBox" v-for="(item, index) in essayImg" :key="index">
                          <img :src="item" alt style="height: 100%; width: auto; margin: 0 auto;" />
                          <img
                            class="delImg"
                            src="../../assets/del.png"
                            alt
                            @click="spliceImg(index)"
                          />
                        </li>
                      </ul>
                      <!-- <quill-editor v-model="contextEssay" :options="editorOption"></quill-editor> -->
                    </el-col>
                    <el-col :span="16" style="display:flex;align-items: center; width: 100%;">
                      <span style="font-size:20px;">添加图片:</span>
                      <button type="primary" class="upImg" style="background-color: #FF6A6A;">
                        <div>添加图片</div>
                        <input
                          type="file"
                          class="fileInput"
                          id="upImg"
                          ref="upFile"
                          @change="imageInput($event)"
                        />
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
                      <el-option
                        v-for="item in questionPartLevel1"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="4">
                    <el-select v-model="value10" placeholder="请选择" class="questionSelect">
                      <el-option
                        v-for="item in questionPartLevel2"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </el-col>
                </el-row>
              </el-row>
              <el-row v-if="questionType == '填空组合'">
                <!-- 文本 -->
                <el-row class="questionRow">
                  <el-col :span="2">
                    <span class="outSpan">短文:</span>
                  </el-col>
                  <el-col :span="20">
                    <quill-editor v-model="contextFBC" :options="editorOption"></quill-editor>
                  </el-col>
                </el-row>
                <el-row class="questionRow">
                  <el-row v-for="(item, index) in listForFC" :key="index">
                    <el-row style="margin-bottom:15px;">
                      <el-col :span="2">
                        <span class="outSpan">题干{{ index+1 }}:</span>
                      </el-col>
                      <el-col :span="20">
                        <quill-editor v-model="item.inputQues" :options="editorOption"></quill-editor>
                      </el-col>
                      <el-col :span="2">
                        &emsp;
                        <el-button type="text" size="medium">
                          <i class="el-icon-plus" @click="addQueF"></i>
                        </el-button>
                        <el-button type="text" size="medium" @click="delQuef(index)">
                          &emsp;
                          <i class="el-icon-delete"></i>
                        </el-button>
                      </el-col>
                    </el-row>
                    <el-row style="margin-bottom:15px;">
                      <el-col :span="2">
                        <span class="outSpan">答案:</span>
                      </el-col>
                      <el-col :span="20">
                        <quill-editor v-model="item.inputAsw" :options="editorOption"></quill-editor>
                      </el-col>
                    </el-row>
                  </el-row>
                </el-row>
                <el-row class="questionRow">
                  <el-col :span="3">
                    <span class="outSpan">模块类型:</span>
                  </el-col>
                  <el-col :span="4">
                    <el-select v-model="value9" placeholder="请选择" class="questionSelect">
                      <el-option
                        v-for="item in questionPartLevel1"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="4">
                    <el-select v-model="value10" placeholder="请选择" class="questionSelect">
                      <el-option
                        v-for="item in questionPartLevel2"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </el-col>
                </el-row>
              </el-row>
              <el-row v-if="questionType == '作文题'">
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
                          <img :src="item" alt style="height: 100%; width: auto; margin: 0 auto;" />
                          <img
                            class="delImg"
                            src="../../assets/del.png"
                            alt
                            @click="spliceImg(index)"
                          />
                        </li>
                      </ul>
                      <!-- <quill-editor v-model="contextEssay" :options="editorOption"></quill-editor> -->
                    </el-col>
                    <el-col :span="16">
                      <button type="primary" class="upImg" style="background-color: #FF6A6A;">
                        <div>添加图片</div>
                        <input
                          type="file"
                          class="fileInput"
                          id="upImg"
                          ref="upFile"
                          @change="imageInput($event)"
                        />
                      </button>
                    </el-col>
                  </el-row>
                </div>
                <el-row class="questionRow">
                  <el-col :span="3">
                    <span class="outSpan">模块类型:</span>
                  </el-col>
                  <el-col :span="4">
                    <el-select v-model="value9" placeholder="请选择" class="questionSelect">
                      <el-option
                        v-for="item in questionPartLevel1"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="4">
                    <el-select v-model="value10" placeholder="请选择" class="questionSelect">
                      <el-option
                        v-for="item in questionPartLevel2"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </el-col>
                </el-row>
              </el-row>
              <!-- </el-tabs> -->
            </el-row>
            <el-row class="questionRow">
              <el-row v-for="(list, index) in listForKP" :key="index">
                <el-col :span="3">
                  <span class="outSpan">知识点{{index+1}}:</span>
                </el-col>
                <el-col :span="5">
                  <el-select
                    v-model="list.value1"
                    filterable
                    placeholder="请选择"
                    class="questionSelect"
                    @change="((selVal)=>{getKnowledgePoint2(listForKP,selVal, index)})"
                    ref="point1"
                  >
                    <el-option
                      v-for="item in list.KnowledgePoint1"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-col>
                <el-col :span="5">
                  <el-select
                    v-model="list.value2"
                    filterable
                    placeholder="请选择"
                    class="questionSelect"
                    ref="point2"
                    @change="((selVal)=>{getKnowledgePoint3(listForKP,selVal, index)})"
                  >
                    <el-option
                      v-for="(item,index) in list.KnowledgePoint2"
                      :key="index"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-col>
                <el-col :span="5">
                  <el-select
                    v-model="list.value3"
                    filterable
                    placeholder="请选择"
                    class="questionSelect"
                    ref="point3"
                  >
                    <el-option
                      v-for="(item,index) in list.KnowledgePoint3"
                      :key="index"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-col>
                <el-col :span="4">
                  <el-button type="text" size="medium">
                    <i class="el-icon-plus" @click="addQueKP"></i>
                  </el-button>
                  <el-button type="text" size="medium" @click="delQueKP(index)">
                    <i class="el-icon-delete"></i>
                  </el-button>
                </el-col>
              </el-row>
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
              <el-col :span="4">
                <el-button
                  type="danger"
                  style="display: block; width: 75%; margin: 0 auto;"
                  @click="saveTtopic(0)"
                >保存题目</el-button>
              </el-col>
              <el-col :span="5">
                <el-button
                  type="danger"
                  @click="returnTop()"
                  style="display: block; width: 75%; margin: 0 auto;"
                >返回上一级</el-button>
              </el-col>
              <!-- <el-col :span="4">
                <el-button type="primary" @click="saveTtopic(1)" style="display: block; width: 75%; margin: 0 auto;">继续出题</el-button>
              </el-col>-->
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
      questionId: "",
      dataList: null,
      courseName: "",
      phoneNum: "",
      userNum: "",
      teacherName: "",
      myImage: "",
      testName: "",

      singleEditorOption: {
        modules: {
          toolbar: [
            ["bold", "italic", "underline", "strike"],
            ["blockquote", "code-block"],
          ],
        },
        placeholder: "请输入短文",
      },

      editorOption: {
        modules: {
          toolbar: [
            ["bold", "italic", "underline", "strike"],
            ["blockquote", "code-block"],
          ],
        },
        placeholder: "不可为空",
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
          setCorrect: "",
        },
      ],
      // 填空组合
      contextFBC: "",
      listForFC: [
        {
          inputQues: "",
          inputAsw: "",
        },
      ],
      listForKP: [
        {
          value1: "",
          value2: "",
          value3: "",
          KnowledgePoint1: null,
          KnowledgePoint2: null,
          KnowledgePoint3: null,
        },
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
      // 听力 or 题干
      type1: "",
      type2: "",
      type_1: 0,
      type_2: "",
      questionType: "", // 题目类型
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
      // 作文题
      contextEssay: "",
      essayImg: [],
      // 听力链接
      mp3Url: "",
    };
  },
  components: {
    elHead,
  },
  created() {
    this.questionId = this.$route.query.questionId;
    this.userNum = this.$route.query.userNum;
    this.teacherName = this.$route.query.teacherName;
    this.myImage = this.$route.query.myImage;
    this.phoneNum = this.$route.query.phoneNum;
    this.courseName = this.$route.query.courseName;
    this.testName = this.$route.query.testName;
  },
  mounted() {
    let that = this;
    console.log("this.questionId", this.questionId);

    this.$axios
      .post(Question.questionIdPost, {
        QuestionId: this.questionId.toString(),
      })
      .then(function (res) {
        console.log("编辑", res);
        if (res.data.status == 200) {
          that.dataList = res.data;
          that.questionType = res.data.data.QuestionType;

          // 初始化默认
          if (res.data.data.QuestionType == "单选题") {
            if (res.data.data.QuestionPartLevel1 == "综合阅读") {
              that.typeChange("综合阅读");
            } else if (res.data.data.QuestionPartLevel1 == "听力理解") {
              that.typeChange("听力理解");
              that.mp3Url = res.data.data.Audio;
            }
            that.context = res.data.data.QuestionDescription; // 题干
            that.answerSA = res.data.data.Option1; // 选项A
            that.answerSB = res.data.data.Option2;
            that.answerSC = res.data.data.Option3;
            that.answerSD = res.data.data.Option4;
            that.correctAns = res.data.data.CorrectAnswer; // 正确答案
            that.value5 = res.data.data.QuestionPartLevel1; // 模块类型
            that.value6 = res.data.data.QuestionPartLevel2; // 模块类型
          } else if (res.data.data.QuestionType == "单选组合") {
            if (res.data.data.QuestionPartLevel1 == "综合阅读") {
              that.shortEssayTxt2 = res.data.data.Context;
              that.typeChange("综合阅读");
            } else if (res.data.data.QuestionPartLevel1 == "听力理解") {
              that.mp3Url = res.data.data.QuestionTopicUrl;
              that.typeChange("听力理解");
            }

            var list = [];
            for (var i = 0; i < res.data.data.Option1.length; i++) {
              list.push({
                inputQueSC: res.data.data.QuestionDescription[i],
                inputAswA: res.data.data.Option1[i],
                inputAswB: res.data.data.Option2[i],
                inputAswC: res.data.data.Option3[i],
                inputAswD: res.data.data.Option4[i],
                setCorrect: res.data.data.CorrectAnswer[i],
              });
            }
            that.list = list;
            that.value7 = res.data.data.QuestionPartLevel1;
            that.value8 = res.data.data.QuestionPartLevel2;
          } else if (res.data.data.QuestionType == "填空题") {
            that.contextFB = res.data.data.QuestionDescription; // 题干
            that.correctAnsFB = res.data.data.CorrectAnswer; // 答案
            that.value9 = res.data.data.QuestionPartLevel1; // 模块类型
            that.value10 = res.data.data.QuestionPartLevel2; // 模块类型
            that.essayImg.push(res.data.data.ImgUrl);
            that.handleClick(res.data.data.QuestionType);
          } else if (res.data.data.QuestionType == "填空组合") {
            that.contextFBC = res.data.data.Context;
            var list = [];
            for (var i = 0; i < res.data.data.QuestionDescription.length; i++) {
              list.push({
                inputQues: res.data.data.QuestionDescription[i],
                inputAsw: res.data.data.CorrectAnswer[i],
              });
            }

            that.listForFC = list;
            that.value9 = res.data.data.QuestionPartLevel1; // 模块类型
            that.value10 = res.data.data.QuestionPartLevel2; // 模块类型
            that.handleClick(res.data.data.QuestionType);
          } else if (res.data.data.QuestionType == "作文题") {
            that.contextEssay = res.data.data.QuestionDescription; // 作文题干
            var list = [];
            for (var i = 0; i < res.data.data.ImgUrl.length; i++) {
              list.push(res.data.data.ImgUrl[i]);
            }
            that.essayImg = list; // 作文图片
            that.value9 = res.data.data.QuestionPartLevel1; // 模块类型
            that.value10 = res.data.data.QuestionPartLevel2; // 模块类型
            that.handleClick(res.data.data.QuestionType);
          }

          that.value4 = res.data.data.DifficultyType; // 难易度
          // that.value1 = res.data.data.Level1; // 知识点1
          //  that.value2 = res.data.data.Level2; // 知识点2
          //  that.value3 = res.data.data.Level3; // 知识点3
          var ballList1 = [];
          for (var i = 0; i < res.data.data.Kn1.length; i++) {
            ballList1.push({
              value: res.data.data.Kn1[i].KnowledgeId,
              label: res.data.data.Kn1[i].KnowledgeLevel1,
            });
          }
          var list = [];
          for (var i = 0; i < res.data.data.Level1Arr.length; i++) {
            list.push({
              value1: res.data.data.Level1Arr[i],
              value2: res.data.data.Level2Arr[i],
              value3: res.data.data.Level3Arr[i],
              KnowledgePoint1: ballList1,
              KnowledgePoint2: null,
              KnowledgePoint3: null,
            });
          }

          that.listForKP = list;
        } else {
          that.$message.error(res.data.ErrMsg);
          that.returnLink();
        }
      })
      .catch(function (error) {
        console.log("error1", error);
      });

    // 知识点1
    this.$axios
      .post(Question.knowledgepointlevel1)
      .then(function (response) {
        var ballList1 = [];
        for (var i = 0; i < response.data.data.length; i++) {
          ballList1.push({
            value: response.data.data[i].KnowledgeId,
            label: response.data.data[i].KnowledgeLevel1,
          });
        }
        that.listForKP[0].KnowledgePoint1 = ballList1;
      })
      .catch(function (error) {
        console.log("error1", error);
      });
    // 难易度
    this.$axios.get(Question.difficultytypegetname).then(function (response) {
      // console.log("response", response);
      // console.log("response.data.response", response.data.response);
      var ballList4 = [];
      for (var i = 0; i < response.data.data.length; i++) {
        ballList4.push({
          value: i + 1,
          label: response.data.data[i],
        });
      }
      that.difficultytype = ballList4;
    });
  },
  methods: {
    // 返回上一级
    returnLink() {
      console.log("123456");
      this.$router.push({
        path: "/data/addQuestion",
        query: { testName: this.testName },
      });
    },
    // 题目没有听力可选
    handleClick(tab) {
      let that = this;
      console.log("tab", that.type2);
      console.log("questionPartLevel1", that.questionPartLevel1);
      that.questionPartLevel1 = [];
      that.questionPartLevel2 = [];
      this.value1 = "";
      this.value2 = "";
      this.value3 = "";
      this.value4 = "";
      var multiple = "";
      var type = "";
      var single = "";
      if (tab == "填空题") {
        multiple = "0";
        single = "1";
        type = "书面表达";
      } else if (tab == "填空组合") {
        multiple = "1";
        single = "1";
        type = "综合阅读";
      } else if (tab == "作文题") {
        multiple = "0";
        single = "2";
        type = "书面表达";
      } else if (tab == "单选题") {
        multiple = "0";
        single = "0";
        type = that.type2;
      } else if (tab == "单选组合") {
        multiple = "1";
        single = "0";
        type = that.type2;
      }

      // console.log("题目类型", tab.label);
      this.$axios
        .post(Question.testparttype, {
          Type: type,
          Multiple: multiple,
          Single: single,
        })
        .then(function (response) {
          console.log("handleClick", response);
          var ballList = [];
          for (var i = 0; i < response.data.data.length; i++) {
            that.questionPartLevel2.push({
              value: response.data.data[i].Id,
              label: response.data.data[i].Level2,
            });
          }
          that.questionPartLevel1.push({
            value: response.data.data[0].Id,
            label: response.data.data[0].Level1,
          });
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    // 题目有听力可选
    typeChange(radio) {
      console.log("初始化");
      let that = this;
      that.questionPartLevel1 = [];
      that.questionPartLevel2 = [];
      console.log("questionPartLevel1", that.questionPartLevel1);
      that.value5 = "";
      that.value6 = "";
      that.value7 = "";
      that.value8 = "";
      var queType = this.questionType;
      var type = radio;
      var multiple = "";
      if (type == "综合阅读") {
        this.type2 = "综合阅读";
        this.mp3Url = "";
      } else if (type == "听力理解") {
        this.type2 = "听力理解";
        this.shortEssayTxt2 = "";
      }
      if (queType == "单选题") {
        multiple = "0";
      } else if (queType == "单选组合") {
        multiple = "1";
      }
      this.$axios
        .post(Question.testparttype, {
          Type: type,
          Multiple: multiple,
          Single: "0",
        })
        .then(function (response) {
          console.log("response",response);
          var ballList = [];
          for (var i = 0; i < response.data.data.length; i++) {
            that.questionPartLevel2.push({
              value: response.data.data[i].Id,
              label: response.data.data[i].Level2,
            });
          }
          that.questionPartLevel1.push({
            value: response.data.data[0].Id,
            label: response.data.data[0].Level1,
          });
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    // 判断答案是否为空
    isEmpty() {},
    // 保存题目
    saveTtopic(isBao) {
      let that = this;
      var queType = this.questionType;
      var diffType = this.value4;
      var point1 = this.value1;
      var point2 = this.value2;
      var point3 = this.value3;
      var kp = [];
      for (var i = 0; i < that.listForKP.length; i++) {
        kp[i] = new Array();
        kp[i][0] = that.listForKP[i].value1;
        kp[i][1] = that.listForKP[i].value2;
        kp[i][2] = that.listForKP[i].value3;
      }
      console.log("listForKP", that.listForKP);
      console.log("KP", kp);
      if (diffType != "") {
        if (queType == "单选题") {
          var quePart1 = this.value5;
          var quePart2 = this.value6;
          var context = "";
          var answerA = this.answerSA;
          var answerB = this.answerSB;
          var answerC = this.answerSC;
          var answerD = this.answerSD;
          var mp3 = this.mp3Url;
          var correctAnswer = this.correctAns;
          var questionDescription = this.context;

          if (quePart1 != "") {
            console.log("this.correctAns", this.correctAns);
            if (String(this.correctAns) != "") {
              // if (this.type_1 == 1) {

              const loading = this.$loading({
                lock: true,
                text: "拼命加载中...",
                spinner: "el-icon-loading",
                background: "rgba(0, 0, 0, 0.7)",
              });
              this.$axios
                .post(Question.singleEdit, {
                  // QuestionType: 1,
                  QuestionId: this.questionId.toString(),
                  DifficultyType: diffType,
                  //知识点
                  Level1: point1,
                  Level2: point2,
                  Level3: point3,
                  QuestionDescription: questionDescription,
                  Option1: answerA,
                  Option2: answerB,
                  Option3: answerC,
                  Option4: answerD,
                  CorrectAnswer: correctAnswer,
                  //题目类型
                  QuestionPartLevel2: quePart2.toString(),
                  Audio: mp3,
                  KP: kp,
                })
                .then(function (response) {
                  console.log("response.data.response 编辑保存", response);
                  console.log(questionDescription);
                  console.log("音频", mp3);
                  if (response.data.status == 200) {
                    loading.close();
                    if (isBao == 0) {
                      that.$message({
                        message: "保存成功, 2秒后返回上一个页面！",
                        type: "success",
                      });

                      setTimeout(function () {
                        that.returnTop();
                      }, 2000);
                    }
                  } else {
                    loading.close();
                    that.$message({
                      message: "保存失败！",
                      type: "warning",
                    });
                    setTimeout(function () {}, 2000);
                  }
                })
                .catch(function (error) {
                  console.log(error);
                });

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
            alert("请至少选择一个模块类型");
          }
        } else if (queType == "单选组合") {
          var quePart1 = this.value7;
          var quePart2 = this.value8;
          var context = this.shortEssayTxt2;
          var answerA = [];
          var answerB = [];
          var answerC = [];
          var answerD = [];
          var setCorrect = [];
          var questionDescription = [];
          for (var i = 0; i < this.list.length; i++) {
            questionDescription.push(this.list[i].inputQueSC);
            answerA.push(this.list[i].inputAswA);
            answerB.push(this.list[i].inputAswB);
            answerC.push(this.list[i].inputAswC);
            answerD.push(this.list[i].inputAswD);
            setCorrect.push(this.list[i].setCorrect);
          }

          var count = 0;
          for (var i = 0; i < this.list.length; i++) {
            if (
              this.list[i].inputAswA != "" &&
              this.list[i].inputAswB != "" &&
              this.list[i].inputAswC != "" &&
              this.list[i].inputAswD != ""
            ) {
              count++;
            }
          }
          // console.log("questionDescription",questionDescription);
          // console.log("setCorrect",setCorrect);
          // console.log("correctAnswer",correctAnswer);
          if (quePart1 != "" && quePart2 != "") {
            // if (count == this.list.length) {
            if (String(setCorrect) != "") {
              // if (this.type_1 == 1) {
              if (that.shortEssayTxt2 != "" || that.type2 != "综合阅读") {
                const loading = this.$loading({
                  lock: true,
                  text: "拼命加载中...",
                  spinner: "el-icon-loading",
                  background: "rgba(0, 0, 0, 0.7)",
                });
                this.$axios
                  .post(Question.singleMultipleEdit, {
                    QuestionId: this.questionId.toString(),
                    DifficultyType: diffType,
                    Level1: point1,
                    Level2: point2,
                    Level3: point3,
                    Context: that.shortEssayTxt2,
                    QuestionDescription: questionDescription,
                    Option1: answerA,
                    Option2: answerB,
                    Option3: answerC,
                    Option4: answerD,
                    CorrectAnswer: setCorrect,
                    QuestionPartLevel2: quePart2.toString(),
                    QuestionTopicUrl: that.mp3Url,
                    KP: kp,
                  })
                  .then(function (response) {
                    console.log("response.data.response", response);
                    if (response.data.status == 200) {
                      loading.close();
                      if (isBao == 0) {
                        that.$message({
                          message: "保存成功, 2秒后返回上一个页面！",
                          type: "success",
                        });

                        setTimeout(function () {
                          that.returnTop();
                        }, 2000);
                      }
                    } else {
                      loading.close();
                      that.$message({
                        message: "保存失败！",
                        type: "warning",
                      });
                      setTimeout(function () {}, 2000);
                    }
                  })
                  .catch(function (error) {
                    console.log(error);
                  });
              } else {
                alert("选择短文或听力，题干不可以为空");
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
            alert("请至少选择一个模块类型");
          }
        } else if (queType == "填空题") {
          var quePart1 = this.value9;
          var quePart2 = this.value10;
          var correctAnswer = this.correctAnsFB;
          var content = this.contextFB;
          if (this.contextFB != "") {
            if (this.correctAnsFB != "") {
              if (quePart1 != "") {
                const loading = this.$loading({
                  lock: true,
                  text: "拼命加载中...",
                  spinner: "el-icon-loading",
                  background: "rgba(0, 0, 0, 0.7)",
                });
                this.$axios
                  .post(Question.completionEdit, {
                    QuestionId: this.questionId.toString(),
                    DifficultyType: diffType,
                    Level1: point1,
                    Level2: point2,
                    Level3: point3,
                    QuestionDescription: content,
                    CorrectAnswer: correctAnswer,
                    //题目模块
                    QuestionPartLevel2: quePart2.toString(),
                    //图片链接
                    ImgUrl: that.essayImg.toString(),
                    KP: kp,
                  })
                  .then(function (response) {
                    console.log("response", response);
                    if (response.data.status == 200) {
                      loading.close();
                      if (isBao == 0) {
                        that.$message({
                          message: "保存成功, 2秒后返回上一个页面！",
                          type: "success",
                        });

                        setTimeout(function () {
                          that.returnTop();
                        }, 2000);
                      }
                    } else {
                      loading.close();
                      that.$message({
                        message: "保存失败！",
                        type: "warning",
                      });
                      setTimeout(function () {}, 2000);
                    }
                  })
                  .catch(function (error) {
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
        } else if (queType == "填空组合") {
          var quePart1 = this.value9;
          var quePart2 = this.value10;
          var context = this.contextFBC;
          var correctAnswer = [];
          var content = [];
          for (var i = 0; i < this.listForFC.length; i++) {
            content.push(this.listForFC[i].inputQues);
            correctAnswer.push(this.listForFC[i].inputAsw);
          }
          var count1 = 0;
          var count2 = 0;
          for (var i = 0; i < this.listForFC.length; i++) {
            if (content[i] != "") {
              count1++;
            }
            if (correctAnswer[i] != "") {
              count2++;
            }
          }
          if (this.contextFBC != "") {
            if (count1 == this.listForFC.length) {
              if (count2 == this.listForFC.length) {
                if (quePart1 != "") {
                  const loading = this.$loading({
                    lock: true,
                    text: "拼命加载中...",
                    spinner: "el-icon-loading",
                    background: "rgba(0, 0, 0, 0.7)",
                  });
                  this.$axios
                    .post(Question.completionMultipleEdit, {
                      QuestionId: this.questionId.toString(),
                      DifficultyType: diffType,
                      Level1: point1,
                      Level2: point2,
                      Level3: point3,
                      Context: context,
                      QuestionDescription: content,
                      CorrectAnswer: correctAnswer,
                      QuestionPartLevel2: quePart2.toString(),
                      KP: kp,
                    })
                    .then(function (response) {
                      console.log("response", response);
                      if (response.data.status == 200) {
                        loading.close();
                        if (isBao == 0) {
                          that.$message({
                            message: "保存成功, 2秒后返回上一个页面！",
                            type: "success",
                          });
                          setTimeout(function () {
                            that.returnTop();
                          }, 2000);
                        }
                      } else {
                        loading.close();
                        that.$message({
                          message: "保存失败！",
                          type: "warning",
                        });
                        setTimeout(function () {}, 2000);
                      }
                    })
                    .catch(function (error) {
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
          } else {
            alert("短文不能为空");
          }
        } else if (queType == "作文题") {
          var quePart1 = this.value9;
          var quePart2 = this.value10;
          var context = this.contextEssay;
          if (this.contextEssay != "") {
            if (quePart1 != "") {
              const loading = this.$loading({
                lock: true,
                text: "拼命加载中...",
                spinner: "el-icon-loading",
                background: "rgba(0, 0, 0, 0.7)",
              });
              this.$axios
                .post(Question.completionEdit, {
                  QuestionId: this.questionId.toString(),
                  DifficultyType: diffType,
                  Level1: point1,
                  Level2: point2,
                  Level3: point3,
                  QuestionDescription: context,
                  CorrectAnswer: correctAnswer,
                  //题目模块
                  QuestionPartLevel2: quePart2.toString(),
                  //图片链接
                  ImgUrl: that.essayImg.toString(),
                  KP: kp,
                })
                .then(function (response) {
                  console.log("response", response);
                  console.log("quePart1", quePart1);
                  console.log("quePart2", quePart2);
                  console.log("that.value4", that.value4);
                  if (response.data.status == 200) {
                    loading.close();
                    if (isBao == 0) {
                      that.$message({
                        message: "保存成功, 2秒后返回上一个页面！",
                        type: "success",
                      });

                      setTimeout(function () {
                        that.returnTop();
                      }, 2000);
                    }
                  } else {
                    loading.close();
                    that.$message({
                      message: "保存失败！",
                      type: "warning",
                    });
                    setTimeout(function () {}, 2000);
                  }
                })
                .catch(function (error) {
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
    },
    getKnowledgePoint2(listForKP, selVal, index) {
      let that = this;
      that.listForKP[index].value2 = "";
      that.listForKP[index].value3 = "";
      console.log("listForKP", listForKP);
      console.log("selVal", selVal);
      console.log("index", index);
      if (!selVal != "请选择") {
        console.log(true);
        // 第二个知识点
        this.$axios
          .post(Question.knowledgepointlevel2, { Level1: selVal })
          .then(function (response) {
            console.log(response);
            // console.log("response.data.response", response.data.response);
            var ballList2 = [];
            for (var i = 0; i < response.data.data.length; i++) {
              ballList2.push({
                value: response.data.data[i].KnowledgeId,
                label: response.data.data[i].KnowledgeLevel2,
              });
            }
            that.listForKP[index].KnowledgePoint2 = ballList2;
            console.log("knowledgepoint2", listForKP);
          })
          .catch(function (error) {
            console.log(error);
          });
      } else {
        console.log(false);
      }
    },
    getKnowledgePoint3(listForKP, selVal, index) {
      let that = this;
      that.listForKP[index].value3 = "";
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
            for (var i = 0; i < response.data.data.length; i++) {
              ballList3.push({
                value: response.data.data[i].KnowledgeId,
                label: response.data.data[i].KnowledgeLevel3,
              });
            }
            that.listForKP[index].KnowledgePoint3 = ballList3;
            console.log("knowledgepoint3", that.KnowledgePoint3);
          })
          .catch(function (error) {
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
        setCorrect: "",
      };
      //添加新的行数
      this.list.push(newValue);
    },
    // 单选组合-删除题干
    delQue(num) {
      if (num != 0 || this.list.length != 1) {
        this.list.splice(num, 1);
        this.$message({
          message: "删除成功！",
          type: "success",
        });
      } else {
        this.$message({
          message: "必须有一个题干！",
          type: "error",
        });
      }
    },
    // 填空组合-添加题目
    addQueF() {
      var newValue = {
        inputQues: "",
        inputAsw: "",
      };
      //添加新的行数
      this.listForFC.push(newValue);
    },
    // 填空组合-删除题目
    delQuef(num) {
      if (num != 0 || this.listForFC.length != 1) {
        this.listForFC.splice(num, 1);
        this.$message({
          message: "删除成功！",
          type: "success",
        });
      } else {
        this.$message({
          message: "必须有一个题干！",
          type: "error",
        });
      }
    },
    // 知识点-添加题目
    addQueKP() {
      // 知识点1
      let that = this;
      var ballList1 = [];
      this.$axios
        .post(Question.knowledgepointlevel1)
        .then(function (response) {
          for (var i = 0; i < response.data.data.length; i++) {
            ballList1.push({
              value: response.data.data[i].KnowledgeId,
              label: response.data.data[i].KnowledgeLevel1,
            });
          }
        })
        .catch(function (error) {
          console.log("error1", error);
        });
      var newValue = {
        value1: "",
        value2: "",
        value3: "",
        KnowledgePoint1: ballList1,
        KnowledgePoint2: null,
        KnowledgePoint3: null,
      };
      //添加新的行数
      this.listForKP.push(newValue);
      console.log(" this.listForKP", this.listForKP);
    },
    // 知识点-删除题目
    delQueKP(num) {
      if (num != 0 || this.listForKP.length != 1) {
        this.listForKP.splice(num, 1);
        this.$message({
          message: "删除成功！",
          type: "success",
        });
      } else {
        this.$message({
          message: "必须有一个知识点！",
          type: "error",
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
          text: "音频上传中",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.7)",
        });
        this.$axios
          .post(Question.mp3, {
            file_byte: reader.result,
          })
          .then(function (res) {
            console.log("res", res);
            if (res.data.err_code == 0) {
              //  that.typeChange('听力理解');
              loading.close();
              that.mp3Url = res.data.url;
              that.$message({
                message: "音频上传成功！",
                type: "success",
              });
            }
          })
          .catch(function (err) {
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
        `当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    // 删除数组图片
    spliceImg(num) {
      this.essayImg.splice(num, 1);
    },
    // 上传图片
    imageInput(data) {
      let that = this;
      let file = data.target.files[0];
      if (!/.(gif|jpg|jpeg|png|GIF|JPG|bmp)$/.test(file.name)) {
        alert("图片类型必须是.gif,jpeg,jpg,png,bmp中的一种");
        return false;
      } else {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          console.log("file byte", reader.result);
          this.$axios
            .post(Question.photo, {
              file_byte: reader.result,
            })
            .then(function (res) {
              if (res.data.err_code == 0) {
                that.essayImg.push(res.data.url);
                that.$message({
                  message: "图片上传成功！",
                  type: "success",
                });
                console.log("图片", that.essayImg);
              }
            })
            .catch(function (err) {
              console.log("err", err);
            });
        };
      }
    },
    returnTop() {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="css" scoped>
@import "./public.css";

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
