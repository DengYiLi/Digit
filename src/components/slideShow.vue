<template>
  <div class="slide-show" @mouseover="clearInv" @mouseout="runInv">
    <div class="slide-img">
      <a :href="slides[nowIndex].href">
        <!-- 实现移入移出的动画 -->
        <transition name="slide-trans">
          <img v-if="isShow" :src="slides[nowIndex].src">
        </transition>
        <transition name="slide-trans-old">
          <img v-if="!isShow" :src="slides[nowIndex].src">
        </transition>
      </a>
    </div>
    <h2>{{slides[nowIndex].title}}</h2>
    <ul class="slide-pages">
      <li @click="gotoIndex(prevIndex)">&lt;</li>
      <li v-for="(item, index) in slides" @click="gotoIndex(index)">
        <a :class="{active: index === nowIndex}">{{index+1}}</a>
      </li>
      <li @click="gotoIndex(nextIndex)">&gt;</li>
    </ul>
  </div>
</template>

<script>
  export default{
    props:{
        slides:{
            type: Array,
            default: []
        },
        inv: {
            type: Number,
            default: 1000
        }
    },
    data(){
      return {
          nowIndex: 0,
          isShow: true
      }
    },
    computed:{
      prevIndex(){
          if (this.nowIndex === 0){
              return this.slides.length - 1
          }
          else{
              return this.nowIndex - 1
          }
      },
      nextIndex(){
          if (this.nowIndex === (this.slides.length - 1)){
              return 0
          }
          else{
             return this.nowIndex + 1
          }
      }
    },
    methods: {
        gotoIndex(index){
            this.isShow = false
            setTimeout(() => { // 指定时间后执行
                this.isShow = true
                this.nowIndex = index
            },10)
        },
        runInv() { // 幻灯片
            this.invId = setInterval(() => {
              this.gotoIndex(this.nextIndex)
          }, this.inv)
        },
        clearInv(){
            clearInterval(this.invId)
        }
    },
    mounted(){
        this.runInv()
    }
  }
</script>

<style scope>
  /* 动画的实现 */
  .slide-trans-enter-active{
    transition: all .5s;
  }
  .slide-trans-enter{ /* 进入时从900px位置开始移动 */
    transform: translateX(900px);
  }
  .slide-trans-old-leave-active{
    transition: all .5s;
    transform: translateX(-900px);
  }
  .slide-show{
    width: 100%;
    height:400px;
    backgorund-color:red;
    overflow:hidden;
    margin: 15px 15px 15px 0;
    position:relative;
  }
  .slide-show h2{
    position: absolute;
    width: 100%;
    height: 100%;
    color:#FFF;
    background:#000;
    opacity: 0.5;
    bottom: 0px;
    height:30px;
    text-align:left;
    padding-left:15px;
    padding-top: 5px;
  }
  .slide-img{
    width:100%;
  }
  .slide-img img{
    width:100%;
    position:absolute;
    top:0;
  }
  .slide-pages{
    position:absolute;
    bottom: 10px;
    right: 15px;
    color: #FFF;
    margin-top: 5px;
  }
  .slide-pages li{
    display: inline-block;
    padding: 0 10px;
    cursor: pointer;
  }
  .slide-pages li .active{
    text-decoration: underline;
  }
</style>
