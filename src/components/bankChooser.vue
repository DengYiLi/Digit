<template>
  <!-- 银行选择组件 -->
  <div class="chooser-component">
    <ul class="chooser-list">
      <li v-for="(item, index) in banks" @click="chooseSelection(index)"
       :title="item.label" :class="[item.name, {active: index === nowIndex}]">
      </li>
    </ul>
  </div>
</template>

<script>
  export default{
    data() {
        return{
            nowIndex: 0,
            banks: [
              {
                  id: 201,
                  label: '招商银行',
                  name: 'zhaoshang'
              },
              {
                  id: 301,
                  label: '中国建设银行',
                  name: 'jianshe'
              },
              {
                id: 1101,
                label: '交通银行',
                name: 'jiaotong'
              },
              {
                id: 101,
                label: '中国工商银行',
                name: 'gongshang'
              },
              {
                id: 401,
                label: '中国农业银行',
                name: 'nongye'
              },
              {
                id: 1201,
                label: '中国银行',
                name: 'zhongguo'
              },
              {
                id: 501,
                label: '中信银行',
                name: 'zhongxin'
              }
            ]
        }
    },
    methods: {
        chooseSelection(index) {
            this.nowIndex = index
            this.$emit('on-change', this.banks[index])
        }
    }
  }
</script>

<style scoped>
  .chooser-component{
    position: relative;
    display: inline-block
  }
  .chooser-list li.active{ /* 点击显示边框 */
    border: 1px solid yellowgreen;
  }
  .chooser-list li{
    display: inline-block;
    width: 117px;
    height: 32px;
    background-image: url(../assets/banks/banks.png);
    background-repeat: no-repeat;
    margin: 5px;
    border: 1px solid #e3e3e3;
    cursor: pointer;
  }
  /* 不同银行图片样式 */
  .zhaoshang{
    background-position:-2160px 0;
  }
  .jianshe {
    background-position: -720px 0;
  }
  .jiaotong {
    background-position: -3120px 0;
  }
  .gongshang {
    background-position: -2640px 0;
  }
  .nongye {
    background-position: -1680px 0;
  }
  .zhongguo {
    background-position: -2520px 0;
  }
  .zhongxin {
    background-position: -480px 0;
  }
</style>
