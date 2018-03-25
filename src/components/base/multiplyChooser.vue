<template>
  <!-- 多选 -->
  <div class="chooser-component">
    <ul class="chooser-list">
      <li v-for="(item, index) in selections"
       @click="toggleSelection(index)" :title="item.label"
       :class="{active: checkActive(index)}">
        {{item.label}}
      </li>
    </ul>
  </div>
</template>

<script>
  import _ from 'lodash'
  // lodash内部封装了很多对字符串、数组、对象等常见数据类型的处理函数

  export default{

    props: {
        selections:{ // 被选择的项构成的组
            type: Array,
            default: [{
                label: 'test',
                value: 0
            }]
        }
    },
    data() {
        return {
            nowIndexes: [0] // 数组
        }
    },
    methods:{
      toggleSelection(index) {
          if (this.nowIndexes.indexOf(index) === -1) {
              this.nowIndexes.push(index) // 如果没有就放入数组
          }
          else{
              // 从数组中删除这个已有的项, 并且返回移除元素的集合
              this.nowIndexes = _.remove(this.nowIndexes,(idx) => {
                  return idx !== index
              })
          }
          let nowObjectArray = _.map(this.nowIndexes, (idx) => {
              return this.selections[idx]
          })
          this.$emit('on-change', nowObjectArray)
      },
      checkActive(index) {
          return this.nowIndexes.indexOf(index) !== -1 // 数组中有该选项
      }
    }
  }
</script>

<style scoped>
  .chooser-component{
    position: relative;
    display: inline-block;
  }
  .chooser-list li{
    display: inline-block;
    border: 1px solid #e3e3e3;
    height: 25px;
    line-height: 25px;
    padding: 0 8px;
    margin-right: 5px;
    border-radius: 3px;
    text-align: center;
    cursor: pointer;
  }
  .chooser-list li.active{
    border-color: yellowgreen;
    background: yellowgreen;
    color: #FFF;
  }
</style>
