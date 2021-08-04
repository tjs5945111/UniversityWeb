// 引入vue
import Vue from 'vue';
// 引入router
import VueRouter from 'vue-router';


// router路由
import Login from '../view/account/login.vue'; // 登录
import Head from '../components/head.vue'; // 头部组件
import Courselist from '../view/courseList/courseList.vue'; // 课程列表
import Setting from '../view/setting/setting.vue'; // 个人设置
import Adminis from '../view/adminis/adminis.vue'; // 管理
import Consult from '../view/activity/consult.vue'; // 活动/查阅
import Marking from '../view/activity/marking.vue'; // 活动/批阅
import Statistics from '../view/statistics/statistics.vue'; // 统计
import Analysis from '../view/statistics/analysis.vue'; // 活动/分析
import DetailsAnal from '../view/statistics/detailsAnal'; // 活动/成绩
import Processing from '../view/teachingSpace/processing'; // 教学空间/活动进行中NEW
import NotStart from '../view/teachingSpace/notStart'; // 教学空间/活动未开始NEW
import Over from '../view/teachingSpace/over'; // 教学空间/活动已结束NEW
import AddCourseData from '../view/data/addCourseData.vue';//资料/添加课程资料
import CreateNewContent from '../view/data/createNewContents.vue';//资料/新建目录
import TestLibrary from '../view/data/testLibrary.vue';//资料/试卷库
import AddTestQue from '../view/data/addTestQue.vue';//资料/试卷库
import QueLibrary from '../view/data/queLibrary.vue';//资料/题库
import Knowledge from '../view/data/knowledge.vue';//知识点
import ManualCreateTest from '../view/data/manualCreateTest.vue';//资料/试卷库/手动创建
import DataEditing from '../view/data/dataEditing.vue';//资料/编辑

import NewDirectory from '../view/data/newDirectory.vue';//资料/题库/新建目录
import AddQuestion from '../view/data/addQuestion.vue';//资料/题库/添加题目
import ManuallyCreateQueBank from '../view/data/manuallyCreateQueBank.vue';//资料/题库/手动创建-添加

import AddTypeQuestion from '../view/data/addTypeQuestion.vue';//资料/题库/添加题目 各种类型
import AddTypeQuestionChinese from '../view/data/addTypeQuestionChinese.vue';//资料/题库/添加题目 各种类型
import Demo from '../view/demo/demo.vue';// 案例
import Demo1 from '../view/demo/demo1.vue';// 案例

import Handwritten from '../view/handwritten/list.vue'; // 批阅手写列表
import HandwrMarking from '../view/handwritten/marking'; 

import ReadingList from '../view/reading/list.vue'; // 批阅手写列表
import ReadingMark from '../view/reading/marking'; 




// 安装router
Vue.use(VueRouter)
// 创建路由对象并配置路由规则导出
export default new VueRouter({
  mode: 'history',  // 去掉#
  routes: [
    { path: '/', redirect: 'login' },
    { path: '/login', component: Login, name: 'login' },
    { path: '/head', component: Head },
    { path: '/courselist', component: Courselist },
    { path: '/setting', component: Setting },
    { path: '/adminis', component: Adminis },
    { path: '/activity/consult', component: Consult },
    { path: '/activity/marking', component: Marking },
    { path: '/handwritten/list', component: Handwritten }, // 批阅手写列表
    { path: '/handwritten/marking', component: HandwrMarking }, // 批阅手写列表
    { path: '/reading/list', component: ReadingList }, // 阅读理解列表
    { path: '/reading/marking', component: ReadingMark }, // 阅读理解列表
    { path: '/statistics', component: Statistics },
    { path: '/statistics/analysis', component: Analysis },
    { path: '/statistics/detailsAnal', component: DetailsAnal },
    { path: '/teachingSpace/processing', component: Processing },
    { path: '/teachingSpace/notStart', component: NotStart },
    { path: '/teachingSpace/over', component: Over },
    { path: '/data/addCourseData', component: AddCourseData },
    { path: '/data/dataEditing', component: DataEditing },
    { path: '/data/createNewContents', component: CreateNewContent },
    { path: '/data/testLibrary', component: TestLibrary },
    { path: '/data/addTestQue', component: AddTestQue },
    { path: '/data/queLibrary', component: QueLibrary },
    { path: '/data/knowledge', component: Knowledge },
    {
      path: '/data/manualCreateTest', component: ManualCreateTest, name: ManualCreateTest,
      meta: {
        keepAlive: true // 需要被缓存
      }
    },
    { path: '/data/NewDirectory', component: NewDirectory },
    { path: '/data/addQuestion', component: AddQuestion, name: 'addQuestion' },
    { path: '/data/manuallyCreateQueBank', component: ManuallyCreateQueBank },
    { path: '/data/addTypeQuestion', component: AddTypeQuestion },
	{ path: '/data/addTypeQuestionChinese', component: AddTypeQuestionChinese },
    {
      path: '/demo',
      component: Demo,
      name: 'demo',
      meta: {
        keepAlive: true // 需要被缓存
      }
    },
    {
      path: '/demo1',
      name: 'demo1',
      component: Demo1
    },
  ]
})