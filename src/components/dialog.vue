<template>
  <div>
    <div class="dialog-wrap">
      <div class="dialog-cover" @click="closeMyself"  v-if="isShow"></div>
      <transition name="drop">
        <div class="dialog-content"  v-if="isShow">
          <p class="dialog-close" @click="closeMyself">×</p>
          <slot>empty</slot> <!-- 插入具体内容 -->
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
  export default{
      props:{
          isShow:{
              type: Boolean,
              default: false
          }
      },
      methods:{
        closeMyself() {
            this.$emit('on-close') // 发布自定义事件
        }
      }
  }
</script>

<style scoped>
  /* 过渡效果 */
  .drop-enter-active{
    transition: all .5s ease;
  }
  .drop-enter{
    transform: translateY(-500px);
  }
  .drop-leave-active{
    transform: translateY(-500px);
    transition: all 0.3s ease;
  }

  .dialog-wrap{
    position: fixed;
    width: 100%;
    height:100%;
  }
  .dialog-cover{
    position:fixed;
    z-index: 5;
    opacity: .3;
    background: #000;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }
  .dialog-content{
    width: 50%;
    position: fixed;
    max-height: 50%;
    overflow: auto; /* auto属性只会在它需要的时候给盒子一个滚动条 */
    background: #FFF;
    z-index: 10;
    top: 20%;
    left: 50%;
    margin-left: -25%;
    border: 2px solid #464068;
    padding: 2%;
    line-height:1.6;/* 无单位时继承了系数，子元素会分别计算各自行距 */
  }
  .dialog-close{
    position: absolute;
    right: 5px;
    top:5px;
    width: 20px;
    height: 20px;
    text-align: center;
    cursor: pointer;
  }
  .dialog-close:hover{
    color: #4fc08d;
  }
</style>
