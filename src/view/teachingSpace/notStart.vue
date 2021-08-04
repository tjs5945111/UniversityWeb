<template>
  <div class="wrap">
    <!-- 教学空间-活动-进行中NEW-->
    <!-- 头部 -->
    <el-head></el-head>
    <div class="con">
      <div class="title">
        <h2>
          <span style="color: #CC3333 ;">课程名称:</span>
          {{ courseName }}
        </h2>
        <ul class="pagesNav">
          <li>
            <router-link
              :to="{path: '/teachingSpace/notStart', query: { courseName: courseName,phoneNum: phoneNum,userNum:userNum,teacherName:teacherName,myImage:myImage }}"
              style="color: #CC3333;"
            >活动</router-link>|
          </li>
          <li>
            <router-link
              :to="{path: '/statistics', query: { courseName: courseName,phoneNum: phoneNum,userNum:userNum,teacherName:teacherName,myImage:myImage }}"
            >统计</router-link>|
          </li>
          <li>
            <router-link
              :to="{path: '/data/queLibrary', query: { courseName: courseName,phoneNum: phoneNum,userNum:userNum,teacherName:teacherName,myImage:myImage }}"
            >资料</router-link>|
          </li>
          <li>
            <router-link
              :to="{path: '/adminis', query: { courseName: courseName,phoneNum: phoneNum,userNum:userNum,teacherName:teacherName,myImage:myImage }}"
              style="padding-right:0;"
            >管理</router-link>
          </li>
        </ul>
      </div>
      <div class="titleRight">
        <ul class="pagesNavRight">
          <li>
            <span v-on:click="onAddTestByHand('手动创建测验')" style="color:#CC3333;">手动创建测验</span>|
          </li>
          <li>
            <span v-on:click="onAddTestSmartPush('智能推送测验')" style="color:#CC3333;">智能推送测验</span>
          </li>
        </ul>
      </div>
      <div class="titleLeft">
        <ul class="pagesNav">
          <li>
            <router-link
              :to="{path: '/teachingSpace/notStart', query: { courseName: courseName,phoneNum: phoneNum,userNum:userNum ,teacherName:teacherName,myImage:myImage}}"
              style="padding-left:0; color: #CC3333;"
            >{{ activityNum1 }}</router-link>|
          </li>
          <li>
            <router-link
              :to="{path: '/teachingSpace/processing', query: { courseName: courseName,phoneNum: phoneNum,userNum:userNum,teacherName:teacherName,myImage:myImage }}"
            >{{ activityNum2 }}</router-link>|
          </li>
          <li>
            <router-link
              :to="{path: '/teachingSpace/over', query: { courseName: courseName,phoneNum: phoneNum,userNum:userNum,teacherName:teacherName,myImage:myImage }}"
            >{{ activityNum3 }}</router-link>
          </li>
        </ul>
      </div>
      <!-- 活动 -->
      <el-row class="activity" style="width: 100%" v-for="(list, index) in data" :key="index">
        <el-col :span="2">
          <div class="grid-content bg-purple-dark activityName">
            <span class>测验</span>
          </div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content bg-purple-dark activityMessage">
            <p>{{ list.name }}, {{ list.numOfStu }}</p>
            <p>
              测验时间:
              <span>{{list.time}}</span>分钟&nbsp;|&nbsp;已交:
              <span>{{list.numOfAll}}</span>&nbsp;/
              <span>{{list.numOfAll1}}</span>
            </p>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple-dark">
            <el-button
              class="activityState"
              type="danger"
              style="display: block; width: 35%;"
              @click="startEvent(list.testId,list.time)"
            >开始活动</el-button>
            <el-button
              class="activityState"
              type="danger"
              style="display: block; width: 35%;"
              @click="delEvent(list.testId)"
              v-model="testName"
            >删除</el-button>
          </div>
        </el-col>
      </el-row>
      <!-- 手动创建测验 -->
      <el-dialog :title="testTitle" :visible.sync="onAddTestBH">
        <el-tabs type="border-card">
          <el-form>
            <el-form-item label="选择试卷" :label-width="formLabelWidth">
              <el-select v-model="value1" placeholder="选择试卷">
                <el-option
                  v-for="item in optionsTest"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="测试名称" :label-width="formLabelWidth">
             <el-col :span="8">
               <div>
                 <el-input v-model="value2" placeholder="请输入测试名称"></el-input>
               </div>
             </el-col>
            </el-form-item>
            <el-row>
              <el-form-item label="设置时长" :label-width="formLabelWidth">
                <el-col :span="6">
                  <div>
                    <el-input v-model="hour" autocomplete="off" type="number" class="time"></el-input>时
                  </div>
                </el-col>
                <el-col :span="6">
                  <div>
                    <el-input v-model="minute" autocomplete="off" type="number" class="time"></el-input>分
                  </div>
                </el-col>
                <el-col :span="12"></el-col>
              </el-form-item>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-button
                  type="danger"
                  style="display: block; width: 50%; margin: 0 auto;"
                  @click="startTset"
                >立即发放</el-button>
              </el-col>
              <el-col :span="12">
                <el-button
                  type="danger"
                  style="display: block; width: 50%; margin: 0 auto;"
                  @click="saveTset"
                >保存</el-button>
              </el-col>
            </el-row>
          </el-form>
        </el-tabs>
      </el-dialog>
      <!-- 智能推送测验 -->
      <el-dialog :title="testTitle" :visible.sync="onAddTestSmart">
        <el-tabs type="border-card">
          <el-form>
            <el-form-item label="选择班级" :label-width="formLabelWidth">
              <el-select v-model="value" placeholder="选择班级">
                <el-option
                  v-for="item in optionsClass"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-row>
              <el-form-item label="设置时长" :label-width="formLabelWidth">
                <el-col :span="6">
                  <div>
                    <el-input autocomplete="off" class="time"></el-input>时
                  </div>
                </el-col>
                <el-col :span="6">
                  <div>
                    <el-input autocomplete="off" class="time"></el-input>分
                  </div>
                </el-col>
                <el-col :span="12"></el-col>
              </el-form-item>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-button type="danger" style="display: block; width: 50%; margin: 0 auto;">立即发放</el-button>
              </el-col>
              <el-col :span="12">
                <el-button type="danger" style="display: block; width: 50%; margin: 0 auto;">保存</el-button>
              </el-col>
            </el-row>
          </el-form>
        </el-tabs>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import elHead from "../../components/head";
import Question from "../../api/get";
export default {
  data() {
    return {
      // 活动名称
      courseName: localStorage.getItem('course'),
      phoneNum: "",
      userNum: "",
      teacherName: "",
      myImage:"",

      activityNum1: "",
      activityNum2: "",
      activityNum3: "",
      // 活动
      el: ".activity",
      data: [],
      optionsTest: [],
      value1: "",
      optionsClass: [],
      value2: "",
      hour: 0,
      minute: 0,
      testName: "",
      testTitle: "",
      // 手动添加试卷模态框
      onAddTestBH: false,
      formLabelWidth: "120px",
      // 自动添加试卷模态框
      onAddTestSmart: false,
      formLabelWidth: "120px",
      value: ""
    };
  },
  components: {
    elHead
  },
  created() {
    this.phoneNum = this.$route.query.phoneNum;
    this.userNum = this.$route.query.userNum;
    this.teacherName = this.$route.query.teacherName;
    this.myImage = this.$route.query.myImage;  
  },
  mounted() {
    console.log("that.$store.state.Course", this.$store.state.Course)
    let that = this;
    // 获取各种活动的数量
    that.$axios
      .post(Question.testmanage, {
        Course: localStorage.getItem('course'),
        ClassId: localStorage.getItem('classId')
      })
      .then(function(response) {
        console.log("userNum", that.userNum)
        console.log("response", response);
        that.activityNum1 =
          response.data.data[0][0] +
          "(" +
          response.data.data[0][1] +
          ")";
        that.activityNum2 =
          response.data.data[1][0] +
          "(" +
          response.data.data[1][1] +
          ")";
        that.activityNum3 =
          response.data.data[2][0] +
          "(" +
          response.data.data[2][1] +
          ")";
      })
      .catch(function(error) {
        console.log("error1", error);
      });

    // 获取未开始的活动
    that.$axios
      .post(Question.notstart, {
        Course: localStorage.getItem('course'),
        ClassId: localStorage.getItem('classId'),
		TestType: "0"
      })
      .then(function(response) {
          console.log("notstart", response);
        var test = [];
        if (response.data.data != null) {
          for (var i = 0; i < response.data.data.length; i++) {
            that.testName = response.data.data[i][0];
            test.push({
              name: response.data.data[i][0],
              time: response.data.data[i][1],
              numOfStu: response.data.data[i][2],
              numOfAll: response.data.data[i][3],
              numOfAll1: response.data.data[i][4],
			  testId: response.data.data[i][5]
            });
          }
          that.data = test;
        } else {
          // alert("数据为空");
        }
      })
      .catch(function(error) {
        console.log("error1", error);
      });
  },
  methods: {
    // 添加测验
    onAddTestByHand(text) {
      console.log("diaji")
      this.testTitle = text;
      this.onAddTestBH = true;
      let that = this;
      //得到全部测试名称
      this.$axios
       .post(Question.paperlibraryshow,{
       	ClassId   :localStorage.getItem('classId'),
       	CourseName:that.courseName,
       })
        .then(function(response) {
          var ballList = [];
          for (var i = 0; i < response.data.data.length; i++) {
            ballList.push({
              value: response.data.data[i].PaperId,
              label: response.data.data[i].PaperName
            });
          }
          that.optionsTest = ballList;
        })
        .catch(function(error) {
          console.log("error1", error);
        });

      // // 得到某个老师的全部班级名称
      // // console.log(this.PhoneNum);
      // this.$axios
      //   .post(Question.classname)
      //   .then(function(response) {
      //     console.log("班级", response);
      //     var ballList = [];
      //     for (var i = 0; i < response.data.ClassName.length; i++) {
      //       ballList.push({
      //         value: response.data.ClassName[i],
      //         label: response.data.ClassName[i]
      //       });
      //     }
      //     that.optionsClass = ballList;
      //   })
      //   .catch(function(error) {
      //     console.log("error1", error);
      //   });
    },
    onAddTestSmartPush(text) {
      this.testTitle = text;
      this.onAddTestSmart = true;
    },
    // 立即发放
    startTset() {
      let that = this;
      var testName = this.value1;
      var className = this.value2;
      var hour = parseInt(this.hour);
      var minute = parseInt(this.minute);
	  var duration=hour*60+minute
      // 处理本地时间  格式为：2018-08-08 11:11:11
      //var nowTime = new Date().toLocaleString();
      // var index = nowTime.indexOf("午");
      // var index1 = nowTime.indexOf(":");
      // var data = nowTime
      //   .substring(0, index - 1)
      //   .replace(new RegExp("/", "gm"), "-");
      // var time;
      // var hourString = nowTime.substring(index1 - 1, index1);
      // var hourInt = parseInt(hourString);
      // if (nowTime.substring(index - 1, index + 1) == "上午") {
      //   time = nowTime.substring(index + 1);
      // } else {
      //   hourInt = hourInt + 12;
      //   time = hourInt + nowTime.substring(index1);
      // }
      // var startTime = data + time;
	  var nowTime = new Date();
	  var newDate=new Date(nowTime);
	  newDate.setMinutes(newDate.getMinutes()+duration);
	  //由于时差问题，目前还未解决，暂时前端减8小时，东八区。
	  nowTime.setMinutes(nowTime.getMinutes()-480);
	  newDate.setMinutes(newDate.getMinutes()-480);
	  //var start=nowTime.getFullYear() + "-" + (nowTime.getMonth() + 1) + "-" + nowTime.getDate() + " " + nowTime.getHours() + ":" + nowTime.getMinutes()
	//  var end=newDate.getFullYear() + "-" + (newDate.getMonth() + 1) + "-" + newDate.getDate() + " " + newDate.getHours() + ":" + newDate.getMinutes()
       var start=nowTime.format("yyyy-MM-dd hh:mm:ss")
	   var end=newDate.format("yyyy-MM-dd hh:mm:ss")
	  if (testName != "") {
        if (className != "") {
          if (hour != 0 || minute != 0) {
            this.$axios
              .post(Question.savetest, {
               PaperId: testName.toString(),
               ClassId: localStorage.getItem('classId').toString(),
               TestName:className.toString(),
               Duration: duration.toString(),
               CourseName: localStorage.getItem('course').toString(), // 课程名
               StartTime: start.toString(),
			   EndTime: end.toString(),
			   Status:"1"
              })
              .then(function(response) {
                console.log("response1", response)
                if(response.data.status == 200) {
                  // that.$message({
                  //   message: response.data.data,
                  //   type: 'success'
                  // });
				   alert("保存成功");
				  that.onAddTestBH = false;
				 window.location.reload();
                } else {
                  that.$message.error('试卷发放失败');
                }
              })
              .catch(function(error) {
                console.log("error1", error);
              });
          } else {
            alert("时间不能为0！");
          }
        } else {
          alert("请选择班级名字！");
        }
      } else {
        alert("请选择周测名字！");
      }
      // window.location.reload();
    },
    // 保存试卷
    saveTset() {
      let that = this;
      var testName = this.value1;
      var className = this.value2;
      var hour = parseInt(this.hour);
      var minute = parseInt(this.minute);
	  var duration=hour*60+minute;
      if (testName != "") {
        if (className != "") {
          if (hour != 0 || minute != 0) {
            this.$axios
              .post(Question.savetest, {
                PaperId: testName.toString(),
                ClassId: localStorage.getItem('classId').toString(),
				TestName:className.toString(),
                Duration: duration.toString(),
                CourseName: localStorage.getItem('course').toString(), // 课程名
				Status:"0"
              })
              .then(function(response) {
                console.log("response", response);
                if(response.data.status == 200) {
                  // that.$message({
                  //   message: response.data.data,
                  //   type: 'success'
                  // });
				    alert("保存成功");
				  that.onAddTestBH = false;
				   window.location.reload();
                 
                } else {
                  that.$message.error('试卷保存失败');
                }
              })
              .catch(function(error) {
                console.log("error1", error);
              });
          } else {
            alert("时间不能为0！");
          }
        } else {
          alert("请输入测试名称！");
        }
      } else {
        alert("请选择测试试卷！");
      }
      // window.location.reload();
    },
    // 开始活动
    startEvent(test,time) {
      let that = this;
	  var nowTime = new Date();
	  var newDate=new Date(nowTime);
	  var temp=time-480
	  newDate.setMinutes(newDate.getMinutes()+temp);
	  //由于时差问题，目前还未解决，暂时前端减8小时，东八区。
	  nowTime.setMinutes(nowTime.getMinutes()-480);
	  var start=nowTime.format("yyyy-MM-dd hh:mm:ss");
	  var end=newDate.format("yyyy-MM-dd hh:mm:ss");
	   console.log("start", start);
	   console.log("end", end);
      this.$axios
        .post(Question.begintest, {
            TestId: test,
			State:"1",
			StartTime: start.toString(),
			EndTime: end.toString(),
			
        })
        .then(function(response) {
          console.log("response", response);
		  if(response.data.status == 200) {
		    // that.$message({
		    //   message: response.data.data,
		    //   type: 'success'
		    // });
		     alert("开始成功");
		  	window.location.reload();
		  } else {
		    that.$message.error('开始失败');
		  }
        })
        .catch(function(error) {
          console.log("error", error);
        });
      // window.location.reload();
    },
    // 删除
    delEvent(test) {
		 console.log("testId", test);
      let that = this;
    
	this.$confirm('此操作将永久移除该活动, 是否继续?', '提示', {
	    confirmButtonText: '确定',
	    cancelButtonText: '取消',
	    type: 'warning'
	  }).then(() => {
	    this.$axios
	      .post(Question.deletetest, {
	        TestId: test
	      })
	      .then(function(response) {
	        console.log("response", response);
	       if(response.data.status == 200) {
	         // that.$message({
	         //   message: response.data.data,
	         //   type: 'success'
	         // });
	           alert("删除成功");
	       			    window.location.reload();
	       } else {
	         that.$message.error('删除失败');
	       }
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
/**
 *对Date的扩展，将 Date 转化为指定格式的String
 *月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
 *年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
 *例子：
 *(new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
 *(new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
 */
Date.prototype.format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
</script>

<style lang="css" scoped>
  @import "./public.css";
</style>
