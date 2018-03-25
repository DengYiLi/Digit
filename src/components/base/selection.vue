<template>
  <!-- 下拉列表 -->
  <div class="selection-component">
    <div class="selection-show" @click="toggle">
      <span>{{selections[nowIndex].label}}</span>
      <div class="arrow"></div>
    </div>
    <div class="selection-list" v-if="isDrop">
      <ul>
        <li v-for="(item, index) in selections" @click="chooseSelection(index)">{{ item.label }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default{
      props: {
          selections: {
              type: Array,
              default: [{
                  label: 'test',
                  value: 0
              }]
          }
      },
      data() {
          return {
              isDrop: false, // 控制显示下拉框
              nowIndex: 0
          }
      },
      methods: {
          toggle() {
              this.isDrop = !this.isDrop
          },
          chooseSelection(index) {
              this.nowIndex = index
              this.isDrop = false
              this.$emit('on-change', this.selections[this.nowIndex])
          }
      }
  }
</script>

<style scoped>
  .selection-component{
    position:relative; /* 父元素相对定位 */
    display: inline-block;
  }
  .selection-show{
    padding: 0 20px 0 10px;
    display:inline-block;
    border: 1px solid #e3e3e3;
    position: relative;
    cursor: pointer;
    height: 25px;
    line-height: 25px;
    border-raduis: 3px;
    background: #FFF;
  }
  .selection-show .arrow{ /* 小倒三角 */
    display: inline-block;
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-top:5px solid #e3e3e3;
    width:0;
    height:0;
    margin-top:-1px;
    margin-left:6px;
    margin-right:-14px;
    vertical-align: middle;
  }
  .selection-list{ /* 选项绝对定位 */
    display: inline-block;
    position: absolute;
    left:0;
    top:25px;
    width:100%;
    background:#FFF;
    border-top:1px solid #e3e3e3;
    border-bottom:1px solid #e3e3e3;
    z-index:5;
  }
  .selection-list li{
    padding: 5px 15px 5px 10px;
    border-left: 1px solid #e3e3e3;
    border-right:1px solid #e3e3e3;
    cursor: pointer;
    background: #FFF;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .selection-list li:hover{
    background: #e3e3e3;
  }
</style>
