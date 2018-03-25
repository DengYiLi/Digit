<template>
  <div class="counter-component">
    <div class="counter-btn" @click="minus"> - </div>
    <div class="counter-show">
      <input type="text" v-model="number" @keyup="fixNumber">
    </div>
    <div class="counter-btn" @click="add"> + </div>
  </div>
</template>

<script>
  export default{
      props: {
          max: { /* 最大值 */
              type: Number,
              default: 5
          },
          min: { /* 最小值 */
              type: Number,
              default: 1
          }
      },
      data() {
          return {
              number: this.min
          }
      },
      watch: {
        number() {
            this.$emit('on-change', this.number)
        }
      },
      methods:{
          // 当键盘键被松开时发生 keyup 事件
          fixNumber() {
            let ans
            if (typeof this.number === 'string') {
                ans = Number(this.number.replace(/\D/g, '')) //把非数字都替换成''
            }
            else{
                ans = this.number
            }
            if (ans > this.max || ans < this.min) {
                ans = this.min
            }
            this.number = ans
          },
          minus() {
              if (this.number <= this.min) {
                  return
              }
              this.number--
          },
          add() {
              if (this.number >= this.max) {
                  return
              }
              this.number++
          }
      }
  }
</script>

<style scoped>
  .counter-component{
    position: relative;
    display: inline-block;
    overflow: hidden;
    vertical-align: middle;
  }
  .counter-show{
    float:left;
  }
  .counter-btn{
    border: 1px solid #e3e3e3;
    float: left;
    height: 25px;
    line-height:25px;
    width: 25px;
    text-align: center;
    cursor: pointer;
  }
  .counter-btn:hover{
    border-color: yellowgreen;
    background: yellowgreen;
    color: #fff;
  }
  .counter-show input{
    border: none;
    border-top: 1px solid #e3e3e3;
    border-bottom: 1px solid #e3e3e3;
    height: 23px;
    line-height:23px;
    width:30px;
    outline: none; /* outline （轮廓）是绘制于元素周围的一条线，位于边框边缘的外围，可起到突出元素的作用 */
    text-indent: 4px;
  }
</style>
