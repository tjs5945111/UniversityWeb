<!--
 * @Author: tongjsh
 * @Date: 2020-07-07 21:13:10
 * @LastEditors: tongjsh
 * @LastEditTime: 2021-08-11 13:48:50
 * @Description: 
-->
<template>
  
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


