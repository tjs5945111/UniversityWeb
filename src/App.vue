<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {

  }
}
</script>

<style>
/* 样式重置文件 */
/* html{color:#000;background:#FFF;font-family:'Microsoft YaHei';} */
/* body {font-size: 14px;}
var,em,strong,i{font-style:normal;}
em,strong,th,var{font-style:inherit;font-weight:inherit;}*/
.clearfix {*zoom:1;}
.clearfix:after {content:'\200B';clear:both;display:block;height:0px;} 
body,div,dl,dt,dd,ul,ol,li,h1,h2,h3,h4,h5,h6,pre,code,form,fieldset,legend,input,button,textarea,p,blockquote,th,td,strong{padding:0;margin:0;}
li{list-style:none;}
img{border:0;}
input,button,textarea,select,optgroup,option{font-family:inherit; font-size:inherit;font-style:inherit;font-weight:inherit;}
input,button,textarea,select{*font-size:100%;}
input:focus,textarea:focus,button:focus{outline:none;}
a{text-decoration:none; color:#000; outline:none;}
a:hover{text-decoration:none;}
h1,h2,h3,h4,h5,h6{font-size:100%;font-weight:normal;} 
textarea{overflow:hidden;}
table{border-collapse:collapse;border-spacing:0;}
caption,th{text-align:left;}


#app {
  width: 100%;
  height: 100%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

html, body {
  min-width: 800px;
  height: 100%;
}

img {
  display: block;
}

</style>
