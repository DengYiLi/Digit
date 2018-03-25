<template>
  <div>
    <div class="app-header">
      <div class="app-head-inner">
        <router-link :to="{ path: '/'}">
          <img class="head-logo" src="../assets/logo.png">
        </router-link>
        <div class="head-nav">
          <ul class="nav-list">
            <li>{{ username }}</li>
            <li class="nav-pile" v-if="username !== ''">|</li>
            <li v-if="username !== ''" @click="quit">退出</li>
            <li @click="loginDialog" v-if="username === ''">登录</li>
            <li class="nav-pile" v-if="username === ''">|</li>
            <li @click="registDialog" v-if="username === ''">注册</li>
            <li class="nav-pile">|</li>
            <li @click="aboutDialog">关于</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="app-content">
      <keep-alive> <!-- 对访问过的网页进行缓存 -->
        <router-view></router-view>
      </keep-alive>
    </div>
    <div class="app-footer">
      <p>@ 2018 finished by Deng</p>
    </div>
    <my-dialog :is-show="isShowLoginDialog" @on-close="closeDialog('isShowLoginDialog')">
      <log-form @on-log="onSuccess"></log-form>
    </my-dialog>
    <my-dialog :is-show="isShowRegistDialog" @on-close="closeDialog('isShowRegistDialog')">
      <reg-form></reg-form>
    </my-dialog>
    <my-dialog :is-show="isShowAboutDialog" @on-close="closeDialog('isShowAboutDialog')">
      <div class="about-box">
        <div class="about-box-head">
          <p>我们的价值观</p>
        </div>
        <div class="about-box-content">
          <p>
            前端开发工程师是一个很新的职业，
            在国内乃至国际上真正开始受到重视的时间是从2005年开始的，
            是指Web前端开发工程师的简称。
            Web前端开发是从美工演变而来的，
            名称上有很明显的时代特征。在互联网的演化进程中，
            Web 1.0时代，网站的主要内容都是静态的，
            用户使用网站的行为也以浏览为主。
            如2005年以后，互联网进入Web 2.0时代，
            各种类似桌面软件的Web应用大量涌现，
            网站的前端由此发生了翻天覆地的变化网页不再只是承载单一的文字和图片，
            各种富媒体让网页的内容更加生动，网页上软件化的交互形式为用户提供了更好的使用体验，
            这些都是基于前端技术实现的。
          </p>
        </div>
      </div>
    </my-dialog>
  </div>
</template>

<script>
  import Dialog from './dialog'
  import LogForm from './logForm'
  import RegForm from './regForm'

  export default{
    components: {
      myDialog: Dialog,
      logForm: LogForm,
      regForm: RegForm
    },
    data(){
        return {
          isShowAboutDialog: false,
          isShowRegistDialog: false,
          isShowLoginDialog: false,
          username: ''
        }
    },
    methods:{
      aboutDialog(){
        this.isShowAboutDialog = true;
      },
      loginDialog(){
        this.isShowLoginDialog = true;
      },
      registDialog(){
        this.isShowRegistDialog = true;
      },
      closeDialog(str){
          this[str] = false;
      },
      onSuccess(data) {
          this.closeDialog('isShowLoginDialog')
          this.username = data.username
      },
      quit() {
          this.username = ''
      }
    }
  }
</script>

<style>
  /* reset.css样式 */
  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure,
  footer, header, hgroup, menu, nav, section {
    display: block;
  }
  body {
    line-height: 1;
  }
  ol, ul {
    list-style: none;
  }
  blockquote, q {
    quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  a {
    color: inherit;
    text-decoration: none;
  }
  body {
    background: #f0f2f5;
    font-family: "微软雅黑",Helvetica,Arial,sans-serif;
    font-size: 14px;
    color: #444;
  }
  /* 组件样式*/
  .app-header{
    background: #363636;
    color: #b2b2b2;
    height: 90px;
    width:100%;
    line-height:90px;
  }
  .app-head-inner{
    width: 80%;
    margin: 0 auto;
  }
  .head-logo{
    float:left;
    width:90px;
    height:90px;
  }
  .head-nav{
    float:right;
  }
  .head-nav ul{
    overflow:hidden;
  }
  .head-nav ul li{
    cursor:pointer;
    float:left;
  }
  .nav-pile{
    padding:0 10px;
  }

  /* content */
  .app-content{
    width:80%;
    margin:0 auto;
  }

  /* footer */
  .app-footer{
    text-align:center;
    height:80px;
    width:100%;
    line-height:80px;
    background:#e3e4e8;
    clear:both;
    margin-top:30px;
  }
  /* about-box的样式 */
  .about-box{
    width: 100%;
    height:100%;
  }
  .about-box-head{
    width:100%;
    height: 50px;
    border-bottom: 1px solid #464068;
  }
  .about-box-head p{
    text-align: center;
    font-size: 18px;
    font-weight: bold;
    line-height: 50px;
  }
  .about-box-content{
    width: 100%;
    height: auto;
    padding-top: 15px;
  }
  .about-box-content p{
    text-indent: 30px;/* 首行缩进 */
  }

  /* 表单全局样式 */
  .global-form{
  }
  .global-form-item{
    width:450px;
    padding:15px 0;
    margin:0 auto;
  }
  .global-form-label{
    width:200px;
    font-size:16px;
    display:inline-block;
  }
  .global-form-input{
    display: inline-block;
  }
  .global-form-input input{
    height: 30px;
    width:250px;
    line-height:30px;
    vertical-align:middle;  /*设置垂直对齐方式*/
    padding:0 10px;
    border:1px solid #CCC;
  }
  .global-form-btn{
    width:200px;
    height:30px;
    line-height:30px;
    font-size:18px;
    color:#FFF;
    font-weight:bold;
    border-radius:2px;
    background:yellowgreen;
    text-align:center;
    word-spacing:2px;
    margin-left:90px;
  }
  .global-form-error{
    color:red;
    padding-left:10px;
  }
</style>
