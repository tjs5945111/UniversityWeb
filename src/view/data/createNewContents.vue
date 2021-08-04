<template>
    <!-- 资料-课程资料-新建目录 -->
    <div class='wrap'>
        <!-- 头部 -->
        <el-head></el-head>
        <div class="con">
            <!-- 标题 -->
            <div class="title">
                <h2><span>课程名称: </span>{{course}}</h2>
                <ul class="pagesNav">
                    <li>
                        <span>活动</span>
                    </li>
                    <li>
                        <span>统计</span>/
                    </li>
                    <li>
                        <span style="color:#000;">资料</span>/
                    </li>
                    <li>
                        <span>管理</span>
                    </li>
                </ul>
            </div>
            <!-- 操作 -->
            <div class="operation">
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item :to="{ path: '/data' }">课程资料</el-breadcrumb-item>
                    <el-breadcrumb-item><span>题库</span></el-breadcrumb-item>
                    <el-breadcrumb-item><span>试卷库</span></el-breadcrumb-item>
                </el-breadcrumb>
                <div>
                    <el-button type="primary" @click="onNewContents=true">新建目录</el-button>
                    <el-button type="primary" @click="onNewData=true">添加资料</el-button>
                </div>
            </div> 
            <el-table
                :data="tableData"
                border
                style="width:100%">
                <el-table-column
                    prop="num"
                    label="序号"
                    width="180"
                    align="center">
                </el-table-column>
                <el-table-column
                    prop="contentName"
                    label="目录/文件名"
                    width="180"
                    align="center">
                    <template>
                        <el-input style="width:100px" placeholder="请输入内容"></el-input>
                        <el-button type="text" size="small">编辑</el-button>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="上传者"
                    align="center">
                </el-table-column>
                <el-table-column
                    prop="size"
                    label="大小"
                    align="center">
                </el-table-column>
                <el-table-column
                    prop="createTime"
                    label="创建时间"
                    align="center">
                </el-table-column>
                <el-table-column
                    fixed="right"
                    label="操作"
                    width="100"
                    align="center">
                    <el-button type="text" size="small">移除</el-button>
                </el-table-column>
            </el-table>
            <!-- 分页器 -->
            <el-pagination
                background
                layout="prev, pager, next"
                :total="1000">
            </el-pagination>
        </div>
    </div>    
</template>


<script>
import elHead from '../../components/head';
export default {
    data(){
        return {
            course:'语文',
            tableData:[{
                num:'1',
                contentName:'课件',
                name:'张三',
                size:'17K',
                createTime:'20190724'
            }],
        }
    },
    components:{
        elHead
    },
}
</script>

<style lang="css" scoped>
 @import './public.css';
</style>

