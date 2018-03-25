<template>
  <!-- 注册用户 -->
  <div class="regist-form">
    <div class="global-form-item">
      <span class="global-from-label">用户名：&nbsp;&nbsp;&nbsp;&nbsp;</span>
      <div class="global-form-input">
        <input type="text" v-model="username" placeholder="请输入用户名">
      </div>
      <span class="global-form-error">{{userError.errorText}}</span>
    </div>
    <div class="global-form-item">
      <span class="global-from-label">密 &nbsp;&nbsp;码：</span>
      <div class="global-form-input">
        &nbsp;&nbsp;&nbsp;&nbsp;<input type="password" v-model="password" placeholder="请输入密码">
      </div>
      <span class="global-form-error">{{passwordError.errorText}}</span>
    </div>
    <div class="global-form-item">
      <span class="global-from-label">确认密码：</span>
      <div class="global-form-input">
        <input type="password" v-model="passagain" placeholder="请再次输入密码">
      </div>
      <span class="global-form-error">{{passagainError.errorText}}</span>
    </div>
    <div class="global-form-item">
      <div class="global-form-btn">
        <a class="button" @click="onRegist">注 册</a>
      </div>
    </div>
    <my-dialog :is-show="isShowDialog" @on-close="hideDialog">
      {{ mark }}
    </my-dialog>
  </div>
</template>

<script>
  import Dialog from './dialog'

  export default{
      components: {
          myDialog: Dialog
      },
      data() {
         return {
           username:'',
           password:'',
           passagain: '',
           errorText: '',
           mark: '',
           isShowDialog: false
         }
      },
      methods: {
         hideDialog(){
           this.isShowDialog = false
         },
         onRegist(){
             // 数据传递给后台处理
           if(!this.userError.status || !this.passwordError.status || !this.passagainError.status){
             this.errorText = '部分选项未通过'
           }
           else{
//             console.log('成功进入。。。')
             this.isShowDialog = true
             this.errorText = ''
             this.$http.get('api/register').then((res) => {
                this.mark = res.data.cont
                console.log(this.mark)
             }, (error) => {
               console.log(error)
             })
           }
         }
      },
      computed: {
          // 检查基础格式是否符合
          userError() {
            let errorText, status
            // 每次改变验证
            if (!/@/g.test(this.username)) { // 正则，必须含有@符号
                status = false,
                errorText = '不包含@'
            }
            else{
                status = true,
                errorText = ''
            }
            if (!this.userFlag) { // 初始时候，errorText无显示内容
              errorText = ''
              this.userFlag = true
            }
            return {
              status: status,
              errorText: errorText
            }
          },
          passwordError() {
            let errorText, status
            // 每次改变验证
            if (!/^\w{1,6}$/g.test(this.password)) { // 正则
                status = false,
                errorText = '密码不是1~6位'
            }
            else{
                status = true,
                errorText = ''
            }
            if (!this.passFlag) {
              errorText = ''
              this.passFlag = true
            }
            return {
              status: status,
              errorText: errorText
            }
          },
          passagainError() {
            let errorText, status
            // 每次改变验证
            if(this.passagain && this.password !== this.passagain){
                status = true,
                errorText = '两次密码输入不一致'
            }else {
                status = true,
                errorText = ''
            }
            if (!this.passagainFlag) {
              errorText = ''
              this.passagainFlag = true
            }
            return {
              status: status,
              errorText: errorText
            }
          }
      }
  }
</script>
<style scoped>
</style>
