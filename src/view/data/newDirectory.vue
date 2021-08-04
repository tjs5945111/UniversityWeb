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
          {{course}}
        </h2>
        <el-breadcrumb separator="/" class="pagesNav">
          <el-breadcrumb-item>
            <a href="../teachingSpace/notStart">活动</a>
          </el-breadcrumb-item>
          <el-breadcrumb-item><a href="/statistics">统计</a></el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/' }">资料</el-breadcrumb-item>
          <el-breadcrumb-item>管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!-- 操作 -->
      <div class="operation">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item>
            <a href="../data/">
              <span>课程资料</span>
            </a>
          </el-breadcrumb-item>
          <el-breadcrumb-item>
            <a href="../data/addQuestion">题库</a>
          </el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/data/testLibrary' }">
            <span>试卷库</span>
          </el-breadcrumb-item>
        </el-breadcrumb>
        <div>
          <el-button type="primary">新建目录</el-button>
        </div>
      </div>
      <el-table
        :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
        border
        style="width:100%"
      >
        <el-table-column prop="num" label="序号" width="180" align="center"></el-table-column>
        <el-table-column prop="diretory" label="目录" width="180" align="center"></el-table-column>
        <el-table-column prop="creator" label="创建者" align="center"></el-table-column>
        <el-table-column prop="createTime" label="创建时间" align="center"></el-table-column>
        <el-table-column fixed="right" label="操作" align="center">
          <el-button type="text" size="small">下载</el-button>
          <el-button type="text" size="small">移除</el-button>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <el-pagination
        background
        :total="1000"
        :page-size="2"
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
export default {
  data() {
    return {
      course: "语文",
      currentTableData: [],
      tableData: [
        {
          num: "1",
          diretory: "周测1",
          creator: "张三",
          createTime: "20190724"
        },
        {
          num: "2",
          diretory: "周测2",
          creator: "张三",
          createTime: "20190724"
        },
        {
          num: "3",
          diretory: "周测2",
          creator: "张三",
          createTime: "20190724"
        },
        {
          num: "4",
          diretory: "周测2",
          creator: "张三",
          createTime: "20190724"
        }
      ],
      currentPage: 1,
      pagesize: 2
    };
  },
  components: {
    elHead
  },
  methods: {
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