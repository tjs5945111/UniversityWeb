<template>
  <!-- 统计-成绩详情 -->
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
      <!-- 面包屑 -->
      <div class="breadCrumbNav">
        <ul class="pagesNav">
          <li>
            <router-link
              :to="{path: '/statistics', query: { courseName: courseName,phoneNum: phoneNum,userNum:userNum ,teacherName:teacherName,myImage:myImage }}"
              style="padding-left:0;"
            >班级统计</router-link>|
          </li>
          <li>
            <router-link
              :to="{path: '/statistics/analysis', query: { courseName: courseName,phoneNum: phoneNum,userNum:userNum ,teacherName:teacherName,myImage:myImage }}"
              style="color: #CC3333;"
            >课程统计</router-link>
          </li>
        </ul>
        <el-button type="danger" @click="exportExcel()">一键导出</el-button>
      </div>
      <!-- 选项栏 -->
      <div class="optionsBar">
        <div class="optionsBarCon">
          <div>
            选择测试
            <el-select v-model="value" clearable placeholder="请选择" @change="getClassName">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
        </div>
      </div>
      <!-- 表格 -->
      <el-table :data="tableData" border style="width: 100%" id="table">
        <el-table-column prop="className" label="班级名称" width="100" align="center"></el-table-column>
        <el-table-column prop="stuNum" label="学生数" width="180" align="center"></el-table-column>
        <el-table-column prop="highestScore" label="最高分" align="center"></el-table-column>
        <el-table-column prop="lowestScore" label="最低分" align="center"></el-table-column>
        <el-table-column prop="averageScore" label="平均分" align="center"></el-table-column>
        <el-table-column prop="passingRate" label="及格率" align="center"></el-table-column>
        <el-table-column prop="excellentRate" label="优良率" align="center"></el-table-column>
      </el-table>
      <!-- 分页器 -->
      <!-- <el-pagination background layout="prev, pager, next" :total="1000"></el-pagination> -->
    </div>
  </div>
</template>


<script>
import elHead from "../../components/head";
import Question from "../../api/get";
  import FileSaver from 'file-saver';
  import XLSX from 'xlsx';
export default {
  data() {
    return {
      courseName: "",
      phoneNum: "",
      userNum: "",
      teacherName: "",
      myImage: "",
      // 表格
      tableData: [],
      options: [],
      value: ""
    };
  },
  components: {
    elHead
  },
  created() {
    this.phoneNum = this.$route.query.phoneNum;
    this.courseName = this.$route.query.courseName;
    this.teacherName = this.$route.query.teacherName;
    this.userNum = this.$route.query.userNum;
    this.myImage = this.$route.query.myImage;
  },
  mounted() {
    let that = this;
   that.$axios
     .post(Question.testname1, {
       ClassId:localStorage.getItem('classId'),
   	   CourseName: that.courseName
     })
      .then(function(response) {
        // console.log("response", response.data.response);
        var ballList = [];
        for (var i = 0; i < response.data.data.length; i++) {
          ballList.push({
           value: response.data.data[i].TestId,
           label: response.data.data[i].TestName
          });
		 
        }
        that.options = ballList;
      })
      .catch(function(error) {
        console.log("error1", error);
      });
  },
  methods: {
    getClassName(selVal) {
      let that = this;
      this.tableData = [];
      if (selVal != "请选择") {
        that.$axios
          .post(Question.statistical, {
            TestId: selVal.toString()
          })
          .then(function(response) {
            console.log("response", response);
            if (response.data.status == 200) {
              var ballList = [];
                ballList.push({
                  className: response.data.data.ClassName,
                  stuNum: response.data.data.StudentNumber,
                  highestScore: response.data.data.MaxScore,
                  lowestScore: response.data.data.MinScore,
                  averageScore: response.data.data.AverageScore,
                  passingRate: response.data.data.PassingRate,
                  excellentRate: response.data.data.ExcellentRate
                });
            
              that.tableData = ballList;
            } else {
              that.$message.error(response.data.ErrMsg);
            }
          })
          .catch(function(error) {
            console.log("error1", error);
          });
      }
    },
	               exportExcel(){
					    this.pagesize =30;//表格长度变长
					    this.currentPage= 1;

	                  let fix = document.querySelector('.el-table__fixed-right');
	                  let wb;
	                  if(fix){ //判断要导出的节点中是否有fixed的表格，如果有，转换excel时先将该dom移除，然后append回去
	                    wb = XLSX.utils.table_to_book(document.querySelector('#table').removeChild(fix));
	                    document.querySelector('#table').appendChild(fix);
	                  }else{
	                    wb = XLSX.utils.table_to_book(document.querySelector('#table'));
	                  }
	                  let wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
	                  try {
	                      FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), '班级统计.xlsx')
	                  } catch (e) { 
	                      if (typeof console !== 'undefined') console.log(e, wbout) 
	                  }
					   this.pagesize = 10;//表格还原
	                  return wbout
	                },
  }
};
</script>

<style lang="css" scoped>
  @import './public.css';
</style>
