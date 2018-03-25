<template>
  <!-- 支付确认组件 -->
  <div>
    <this-dialog :is-show="isShowCheckDialog" @on-close="checkStatus">
      请检查你的支付状态！
      <div class="button btn-style" @click="checkStatus">
        支付成功
      </div>
      <div class="button btn-style" @click="checkStatus">
        支付失败
      </div>
    </this-dialog>
    <!-- 购买成功、失败均跳转至orderList页面 -->
    <this-dialog :is-show="isShowSuccessDialog" @on-close="toOrderList">
      购买成功!
    </this-dialog>
    <this-dialog :is-show="isShowFailDialog" @on-close="toOrderList">
      购买失败!
    </this-dialog>
  </div>
</template>

<script>
  import Dialog from './dialog'

  export default{
    components: {
        thisDialog: Dialog
    },
    props: {
        isShowCheckDialog: {
            type: Boolean,
            default: false
        },
        orderId: {
            type: [String, Number]
        }
    },
    data() {
        return{
            isShowSuccessDialog: false, // 成功的弹出框
            isShowFailDialog: false // 失败的弹出框
        }
    },
    methods: {
        checkStatus() {
          // 后台检查支付的状态
          this.$http.post('/api/createOrder', {
              orderId: this.orderId
          }).then((res) => {
              this.isShowSuccessDialog = true
              this.$emit('on-close-check-dialog')
          }, (err) => {
              this.isShowFailDialog = true
              this.$emit('on-close-check-dialog')
          })
        },
      toOrderList() {
            this.$router.push({path: '/orderList'}) // 想要导航到不同的 URL，则使用 router.push 方法
      }
    }
  }
</script>

<style scoped>
  .btn-style{
    margin-top:20px;
  }
</style>
