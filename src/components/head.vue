<template>
  <!-- 头部 -->
  <div class="head">
    <!-- 导航栏 -->
    <div class="nav">
      <h1 class="name">学在西渐</h1>
      <el-row type="flex" class="row-bg" justify="end">
        <!-- 头像 -->
		<router-link
              :to="{path: '/courseList', query: { userNum: userNum,teacherName: teacherName ,session_id: session_id ,myImage:myImage,classId:classId}}"
               ><span class="nav-nickName">主页</span></router-link>

		<div class="block">
          <el-avatar :size="40" :src="circleUrl"></el-avatar>
        </div>
		
        <!-- 昵称 -->
        <div class="nav-nickName">{{ teacherName }}</div>
        <!-- 更多 -->
        <el-dropdown>
          <div class="nav-more el-dropdown-link"></div>
          <el-dropdown-menu slot="dropdown">
            <!-- <el-dropdown-item><router-link to="/setting">个人设置</router-link></el-dropdown-item> -->
            <el-dropdown-item>
              <router-link
                :to="{path: '/courseList', query: { userNum: userNum,teacherName: teacherName ,session_id: session_id ,myImage:myImage,classId:classId}}"
              >课程菜单</router-link>
            </el-dropdown-item>
            <el-dropdown-item>
              <router-link
                :to="{path: '/setting', query: { userNum: userNum,teacherName: teacherName ,session_id: session_id ,myImage:myImage,classId:classId}}"
              >个人设置</router-link>
            </el-dropdown-item>
            <el-dropdown-item>
              <router-link
                :to="{path: '/login'}">退出登录</router-link>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
		
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      circleUrl: "",
      // "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      
      // 传递的数据
      teacherName: "",
      userNum: "",
      session_id: "",
      myImage: "",
	  classId: 0
    }
  },
  created() {
    this.userNum = localStorage.getItem("userNum");
    this.teacherName = localStorage.getItem("teacherName");
    this.session_id = localStorage.getItem("session_id");
    this.myImage = localStorage.getItem("myImage");
	this.classId = localStorage.getItem("classId");
    if (this.myImage == "") {
      this.circleUrl =
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png";
    } else {
      this.circleUrl = this.myImage;
    }
  },
  mounted() {
    
  },
  methods: {
    
  }
};
</script>

<style lang="css" scoped>
/* 头部 */
.head {
  width: 100%;
  height: 50px;
  background-color: #CC3333;
  background-size: 100% 100%;
}

/* 导航条 */
.nav {
  position: relative;
  width: 80%;
  height: 100%;
  margin: 0 auto;
  /* background: url("../assets/log.png") 0 center no-repeat; */
  /* background: url("../assets/title.png") 0 center no-repeat; */
  background-size: 112px 32px;
}
.name{
  color: #fff;
  position: absolute;
  top: 12px;
  left: 1px;
  font-size: 20px;
  font-weight: 600;
}
.row-bg {
  display: flex;
  align-items: center;
  height: 100%;
}

/* 昵称 */
.nav-nickName {
  font-size: 20px;
  padding: 0 15px;
  color: #fff;
  font-weight: 500;
}

/* 更多 */
.nav-more {
  width: 60px;
  height: 60px;
  background: url("../assets/nav-more.png") center center no-repeat;
  background-size: 68% 68%;
}
</style>


