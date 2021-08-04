// 接口请求api
var host = 'https://lic2.luckyzune.com';
var host2 = 'https://lic2.luckyzune.com';

var conFig = {
    host,
    // 登录
    login : `${host}/user/login`,          //密码登录
    login1 : `${host}/sms/send/code`,     //获取验证码
    login2 : `${host}/sms/login`,         //验证码登录
    login3 : `${host}/pwd/login/teacher`, //验证码登录
    userpost: `${host}/user/info/edit`,         //修改个人信息
	userpostimage: `${host}/user/image/edit`,         //修改头像

    courseNameGet: `${host}/course/all`, // 选择下拉课程
    courseInsert: `${host}/course/insert`, // 添加课程
    teachCourse: `${host}/course/course`, // 课程列表
    coursedelete: `${host}/course/delete`, // 删除课程


    question: `${host}/question/single`, //提交单选题
	questionmultiple: `${host}/question/single/multiple`, //提交单选组合题
	questioncompletion: `${host}/question/completion`, //提交填空
	questioncompletionmultiple: `${host}/question/completion/multiple`, //提交填空组合
	questioncalculation: `${host}/question/calculation`, //提交填空
	batchupload: `${host}/question/question/insert`, //批量提交题目
    // 创建题目时所需获取内容
    knowledgepointlevel1:`${host}/knowledge/select/level1`,   //知识点1
    knowledgepointlevel2:`${host}/knowledge/select/level2`,   //知识点2
    knowledgepointlevel3:`${host}/knowledge/select/level3`,   //知识点3
    difficultytypegetname:`${host}/question/difficulty/type`, //难易度
    testparttype:`${host}/question/module`,                   //模块类型
    
    // 教学空间--创建测验--仅手动创建
    testname:`${host}/paper/directory`,    //获取测试名字
    classname:`${host}/class/class/name`,  //获取班级名称
    createtest:`${host}/createtest`,//创建测验并开始
    savetest:`${host}/test/init/insert`,    //创建测验并保存
    coursepart:`${host}/course/find/coursepart`, //每一科中有几课
    
    testmanage:`${host}/test/manage`,  //获取各种类型活动的数据
    notstart:`${host}/test/data`,      //未开始的活动
    begintest:`${host}/test/update`,    //未开始的活动--可开始
    deletetest:`${host}/test/delete`,  //未开始的活动--可删除
    onstart:`${host}/test/data`,        //已开始的活动
    endtest:`${host}/test/update`,        //已开始的活动--可结束
    finishstart:`${host}/test/data`,//已结束的活动
    correct:`${host}/test/composition`,       // 批阅作文
    oncorrect:`${host}/test/composition/detail`,       // 批阅作文
    composition:`${host}/test/test/score/composition`,       // 批阅作文

    // 上传图片和音频 userpost
    photo:`${host}/oss/photo`,
    mp3:`${host}/oss/mp3`,
    batchpicture: `${host}/oss/batch/photo`,
    batchvideo: `${host}/oss/batch/mp3`,

    // 统计 
    classStatistical:`${host}/statistics/class`,  //统计--班级 查询学生
    test:`${host}/test`,                          //统计--课程统计 测试名称
    testname1:`${host}/test/name`,                //获取测试名字
	statistical:`${host}/statistics/course`,            //统计--课程统计 查询测试对应班级
    detail:`${host}/statistics/class/detail`,                      //统计--课程统计 查询测试对应班级

    // 管理
    classteacherget:`${host}/class/class/name/single`, ////获取某个班级名称
    student:`${host}/class/manager/student`,                 //获取班级学生
    teacher:`${host}/class/manager/teacher`,                 //获取全部老师
    addclass:`${host}/addclass`,               //添加班级
    addcourse:`${host}/course/manager/course/insert`,               //添加班级
    addstudent:`${host}/class/manager/student/insert`,           //添加学生
	batchaddstudent:`${host}/class/manager/student/insert/batch`,          //批量添加学生
    addteacher:`${host}/addteacher`,           //添加老师
    remove:`${host}/remove`,                   //移除老师、学生
    delete:`${host}/question/questiontopicindex/delete`,   //移除题库

    alldirectory:`${host}/material/select`,               //移除老师、学生
    uploadcourse:`${host}/material/upload/course`,               //上传课程资料
    addblankpassage:`${host2}/addblankpassage` ,       // 创建 填空 && 填空组合 && 作文题
    questionlibraryshow:`${host2}/question/question`,// 题库
    knowledgelibraryshow:`${host2}/knowledge/select`,// 知识点
    paperlibraryshow:`${host2}/paper/directory`,      //试卷库
    paperlibraryaddhand: `${host2}/paper/insert`, // 创建试卷
    paperlibrarydelete: `${host2}/paper/delete`, // 删除试卷
    paperlibraryalterex: `${host2}/paper/update`, // 修改试卷名/注释
    testparttype1:`${host2}/paper/level/one`,            //模块类型
    testparttype2:`${host2}/paper/level/two`  ,           //模块类型
    addcomposition: `${host}/addcomposition`,           // 保存作文题
    questionDelete: `${host2}/question/question/delete`, // 题库题目删除
    papermanageshow1:`${host2}/paper/paper/detail`  ,           //模块类型  papermanageshow1
    papermanagecatalogue:`${host2}/papermanagecatalogue`  ,   //
    papermanageaddquestion:`${host2}/papermanageaddquestion`,
    papermanageaddmodule:`${host2}/papermanageaddmodule`,     //
    papermanagecreate1:`${host2}/paper/paper/update`,  
    directorylibraryshow:`${host2}/question/directory`,  
    updateurl: `${host2}/question/update/media`,//批量插入图片、音频到数据库

    // 资料
    directorynameedit: `${host}/question/directoryname/edit`,   //修改目录名
    directorylibraryadd: `${host}/question/index`, // 保存题库目录
    directorylibrarydelete: `${host}/directorylibrarydelete`, // 删除题库目录
    directorylibrarynotes: `${host}/question/directorylibrarynotes`, // 添加注释
    directorydelete: `${host}/material/delete`, // 删除课程资料目录
    questionIdPost: `${host}/question/question/detail`, // 资料编辑
    singleEdit: `${host}/question/single/edit`, //  保存编辑
    singleMultipleEdit: `${host}/question/single/multiple/edit`, //  保存编辑
    completionEdit: `${host}/question/completion/edit`, //  保存编辑
	completionMultipleEdit: `${host}/question/completion/multiple/edit`, //  保存编辑
	
    // 批阅写汉字
    clickWrite: `${host}/test/handwriting`,
    editwrite: `${host}/test/handwriting/detail`,
    savewrite: `${host}/savewrite`,


    // 阅读理解
    clickread: `${host}/test/read`,
    editread: `${host}/test/reading/detail`,
    saveread: `${host}/test/test/score`
}

module.exports = conFig;