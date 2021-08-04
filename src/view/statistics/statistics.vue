<template>
  <!-- 统计页面 -->
  <div class="wrap">
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
              style="color: #CC3333;"
            >统计</router-link>|
          </li>
          <li>
            <router-link
              :to="{path: '/data/queLibrary', query: { courseName: courseName,phoneNum: phoneNum,userNum:userNum ,teacherName:teacherName,myImage:myImage }}"
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

      <div class="breadCrumbNav">
        <ul class="pagesNav">
          <li>
            <router-link
              :to="{path: '/statistics', query: { courseName: courseName,phoneNum: phoneNum,userNum:userNum ,teacherName:teacherName,myImage:myImage }}"
              style="padding-left:0; color: #CC3333;"
            >班级统计</router-link>|
          </li>
          <li>
            <router-link
              :to="{path: '/statistics/analysis', query: { courseName: courseName,phoneNum: phoneNum,userNum:userNum ,teacherName:teacherName,myImage:myImage }}"
              style
            >课程统计</router-link>
          </li>
        </ul>
        <el-button type="danger" @click="export2Excel()">一键导出</el-button>
      </div>
      <!-- 选项栏 -->
      <div class="optionsBar">
        <el-row class="optionsBarCon">
          <el-col :span="5">
            选择班级
            <el-select v-model="value1" placeholder="请选择" @change="getTestName">
              <el-option
                v-for="item in classname"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-col>
          <el-col :span="5">
            选择测试
            <el-select v-model="value2" clearable placeholder="请选择">
              <el-option
                v-for="item in testname"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-col>
          <el-col :span="6">
            学号
            <el-input placeholder="学号" v-model="value3"></el-input>
          </el-col>
          <el-col :span="6">
            姓名
            <el-input placeholder="姓名" v-model="value4"></el-input>
          </el-col>
        </el-row>
        <el-row :span="24" style="padding-top: 20px;">
          <el-button type="danger" @click="findStu">查询</el-button>
        </el-row>
      </div>
      <!-- 表格 -->

      <el-table
        id="table"
        :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
        border
        show-summary
        :summary-method="getSummaries"
        style="width: 100%"
      >
        <el-table-column prop="id" label="序号" width="50" align="center"></el-table-column>
        <el-table-column prop="stuName" label="姓名" width="120" align="center" sortable></el-table-column>
        <el-table-column prop="stuId" label="学号" align="center" sortable></el-table-column>
        <el-table-column prop="test" label="测试" align="center"></el-table-column>-->
        <el-table-column prop="department" label="院系" align="center"></el-table-column>
        <el-table-column prop="grade" label="总分" align="center" sortable></el-table-column>
        <!-- <el-table-column
          v-for="(item, index) in tableData[0].partInfo"
          :key="index"
          :label="item.PaperPartType"
        >
          <template slot-scope="scope">
            {{scope.row.partInfo[index].PartTotalScore}}
            </template>
        </el-table-column> -->

        <el-table-column fixed="right" label="详细成绩" width="100" align="center">
          <template slot-scope="scope">
            <el-button type="text" size="small">
              <router-link
                :to="{path: '/statistics/detailsAnal', query: { classname: value1, testName:value2,stuName: scope.row.stuName, stuId: scope.row.stuId, courseName: courseName,phoneNum: phoneNum,userNum:userNum ,teacherName:teacherName,myImage:myImage }}"
              >详细成绩</router-link>
            </el-button>
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
    </div>
  </div>
</template>

<script>
import elHead from "../../components/head";
import Question from "../../api/get";
import FileSaver from "file-saver";
import XLSX from "xlsx";

export default {
  data() {
    return {
      courseName: "",
      phoneNum: "",
      userNum: "",
      teacherName: "",
      myImage: "",
      // 表格
      currentTableData: [],
      tableData: [],
      options: [],
      classname: [],
      testname: [],
      scoreTable: [], //保存各个模块及分数
      value1: "",
      value2: "",
      value3: "",
      value4: "",
      currentPage: 1,
      pagesize: 10,
      value: "",
      typeName: [],
      paperpart_type:[],
      paperpart_score:[]
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
    this.paperpart_type=new Array()
    this.paperpart_score=new Array()
  },
  mounted() {
    let that = this;
    this.$axios
      .post(Question.classname)
      .then(function (response) {
        console.log("response", response);
        if (response.data.status == 200) {
          var ballList = [];
          for (var i = 0; i < response.data.data.length; i++) {
            ballList.push({
              value: response.data.data[i].ClassId,
              label: response.data.data[i].ClassName,
            });
          }
          that.classname = ballList;
          console.log("总条数", that.classname);
        } else {
          that.$message.error(response.data.ErrMsg);
        }
      })
      .catch(function (error) {
        console.log("error1", error);
      });
  },
  methods: {
    getTestName(selVal) {
      let that = this;
      if (selVal != "请选择") {
        that.$axios
          .post(Question.testname1, {
            ClassId: selVal.toString(),
            CourseName: that.courseName,
          })
          .then(function (response) {
            console.log("response", response);
            var ballList = [];
            for (var i = 0; i < response.data.data.length; i++) {
              ballList.push({
                value: response.data.data[i].TestId,
                label: response.data.data[i].TestName,
              });
            }
            that.testname = ballList;
          })
          .catch(function (error) {
            console.log("error1", error);
          });
      }
    },
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      var add;
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "平均分";
        } else if (index >= 5) {
          const values = data.map((item) => Number(item[column.property]));
          console.log("values", values.length);
          if (!values.every((value) => isNaN(value))) {
            add = values.reduce((prev, curr) => {
              const value = Number(curr);
              // console.log("curr", curr);
              // console.log("prev", prev);
              if (!isNaN(value)) {
                // flag++;
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
            sums[index] = Number(add / values.length).toFixed(2);
          } else {
            sums[index] = "N/A";
          }
        } else {
          sums[index] = "--";
        }
      });
      console.log("sums", sums);
      return sums;
    },
    findStu() {
      let that = this;
      
      // let allScore = new Array(new Array().fill(0),new Array().fill(0));
      // console.log(allScore);
      if (String(this.value2) != "" && String(this.value1) != "") {
        this.$axios
          .post(Question.classStatistical, {
            TestId: this.value2.toString(),
          })
          .then(function (response) {
            console.log("response", response);
            var ballList = [];
            
            for (
              let j = 0;
              j < response.data.data[0].PaperpartInfo.length;
              j++
            ) {
              that.typeName[j] =
                response.data.data[0].PaperpartInfo[j].PaperPartType;
              // score: response.data.data[0].PaperpartInfo[j].PartTotalScore,
            }
            

            console.log("typeName", that.typeName);

            for (var i = 0; i < response.data.data.length; i++) {
              ballList.push({
                id: response.data.data[i].Number.toString(),
                stuName: response.data.data[i].StudentName,
                stuId: response.data.data[i].StudentId,
                test: response.data.data[i].TestName,
                department: response.data.data[i].Department,
                grade: response.data.data[i].Score,
                partInfo: response.data.data[i].PaperpartInfo,
              });
              //   for(let j=0;j<typeName.length;j++){
              //     ballList.push({
              //       typeName:
              //     })
              // }
            }

            console.log("ballList", ballList);
            console.log("partInfo", ballList[0].partInfo);
            for (var i = 0; i < ballList.length; i++) {
              that.paperpart_type[i]=new Array()
              that.paperpart_score[i]=new Array()
              for (var j = 0; j < ballList[i].partInfo.length; j++) {
                that.paperpart_type[i][j]=ballList[i].partInfo[j].PaperPartType
                that.paperpart_score[i][j]=ballList[i].partInfo[j].PartTotalScore
              } 
            }
            console.log("paperpart_type", that.paperpart_type);
            console.log("paperpart_score", that.paperpart_score);

            for (var i = 0; i < ballList.length; i++) {
              if (ballList[i].grade == "") ballList[i].grade = "0.00";
            }
            that.tableData = ballList;
            console.log("tableData",that.tableData);
          })
          .catch(function (error) {
            console.log("error1", error);
          });
      } else {
        that.$message({
          message: "请选择班级以及测试！",
          type: "warning",
        });
      }
    },
    export2Excel() {
      // this.pagesize = 30; //表格长度变长
      // this.currentPage = 1;

      // let fix = document.querySelector(".el-table__fixed-right");
      // let wb;
      // if (fix) {
      //   //判断要导出的节点中是否有fixed的表格，如果有，转换excel时先将该dom移除，然后append回去
      //   wb = XLSX.utils.table_to_book(
      //     document.querySelector("#table").removeChild(fix)
      //   );
      //   document.querySelector("#table").appendChild(fix);
      // } else {
      //   wb = XLSX.utils.table_to_book(document.querySelector("#table"));
      // }
      // let wbout = XLSX.write(wb, {
      //   bookType: "xlsx",
      //   bookSST: true,
      //   type: "array",
      // });
      // try {
      //   FileSaver.saveAs(
      //     new Blob([wbout], { type: "application/octet-stream" }),
      //     "班级统计.xlsx"
      //   );
      // } catch (e) {
      //   if (typeof console !== "undefined") console.log(e, wbout);
      // }
      // this.pagesize = 10; //表格还原
      // return wbout;

      require.ensure([],()=>{
        const {export_json_to_excel} = require('../../vendor/Export2Excel');
        const tHeader = ['姓名','学号','所属学院','测试名','总分'];
        const filterVal = ['stuName','stuId','department','test','grade'];
        const list = this.tableData;
        const data = this.formatJson(filterVal,list);
        console.log("list",list)
        console.log("data",data)
        for (var i = 0; i < this.paperpart_type[0].length; i++) {
          tHeader.push(this.paperpart_type[0][i])
        }
        for (var i = 0; i < data.length; i++) {
          for(var j = 0; j < this.paperpart_score[i].length; j++){
            data[i].push(this.paperpart_score[i][j])
          }
        }
        console.log("tHeader",tHeader)
        console.log("data",data)
        // data[data.length] = ['平均分',' ',' ',' '];
        var sumArr = new Array();
        var numArr = new Array();
        sumArr.push('各题平均分');
        sumArr.push(' ');
        sumArr.push(' ');
        sumArr.push(' ');
        numArr.push('参考总人数');
        numArr.push(' ');
        numArr.push(' ');
        numArr.push(' ');
        
        console.log("length",data.length);
        for(let i=0;i<=this.paperpart_type[0].length; i++){
          var sum=0;
          for(let j=0;j<data.length;j++){
            if(data[j][i+4] == null)
              data[j][i+4] = 0;
            sum = sum + Number(data[j][i+4]);
          }
          console.log("sum",sum);
          sumArr.push((sum/data.length).toFixed(2));
          numArr.push(data.length);
        }

        console.log("sumArr",sumArr);
        data[data.length] = numArr;
        data[data.length] = sumArr;
        console.log('data',data);
        export_json_to_excel(tHeader,data,'导出成绩');
      })

    },
    formatJson(filterVal,jsonData){
      return jsonData.map(v=>filterVal.map(j=>v[j]))
    },
    //处理parinfo数据格式
    handleExcelData(){

    },
    // 打开学生周测的详细成绩
    detailed() {
      window.open("../statistics/detailsAnal");
    },
    //分页实现
    handleSizeChange: function (size) {
      this.pagesize = size;
    },
    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage;
    },
  },
};
</script>

<style lang="css" scoped>
@import "./public.css";
</style>
