<template>
  <div class="login-form">
    <div class="global-form">
      <div class="global-form-item">
        <span class="global-from-label">用户名：</span>
        <div class="global-form-input">
          <input type="text" v-model="username" placeholder="请输入用户名">
        </div>
        <span class="global-form-error">{{userError.errorText}}</span>
      </div>
      <div class="global-form-item">
        <span class="global-from-label">密 &nbsp;&nbsp;码：</span>
        <div class="global-form-input">
          <input type="password" v-model="password" placeholder="请输入密码">
        </div>
        <span class="global-form-error">{{passwordError.errorText}}</span>
      </div>
      <div class="global-form-item">
        <div class="global-form-btn">
          <a class="button" @click="onLogin">登 录</a>
        </div>
      </div>
      <p>{{errorText}}</p>
    </div>
  </div>
</template>

<script>
  export default{
    data() {
        return {
            username:'',
            password:'',
            errorText:''
        }
    },
    methods: {
        onLogin() {
          console.log('点击')
          if(!this.userError.status || !this.passwordError.status){
              this.errorText = '部分选项未通过'
          }
          else{
              this.errorText = ''
              this.$http.get('api/login').then((res) => {
                  this.$emit('on-log',res.data)
              }, (error) => {
                  console.log(error)
              })
          }
        }
    },
    computed: {
        userError() {
            let errorText, status
            // 每次改变验证
            if (!/@/g.test(this.username)) { // 正则
                status = false,
                errorText = '不包含@'
            }
            else{
                status = true,
                errorText = ''
            }
            if (!this.userFlag) {
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
        }
    }
  }
</script>

<style scoped>
</style>
