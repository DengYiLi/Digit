<template>
  <!-- 订单列表页面 -->
  <div class="order-wrap">
    <h3>您的产品</h3>
    <div class="order-list-choose">
      <div class="order-list-option">
        选择产品:
        <v-selection :selections="products" @on-change="productChange"></v-selection>
      </div>

      <div class="order-list-option">
        开始日期:
        <v-date-picker @on-change="getStartDate"></v-date-picker>
      </div>

      <div class="order-list-option">
        结束日期:
        <v-date-picker @on-change="getEndDate"></v-date-picker>
      </div>

      <div class="order-list-option">
        关键字词:
        <input type="text" v-model.lazy="query" class="order-query"><!-- .lazy修饰符:当输入框失去焦点后触发change事件时，改变值-->
      </div>
    </div>
    <div class="order-list-table">
      <table>
        <tr>
          <th v-for="head in tableHeads" @click="changeOrderType(head)" :class="{active: head.active}">
            {{head.label}}
          </th>
        </tr>
        <tr v-for="item in tableData" :key="item.period">
          <td v-for="head in tableHeads">
            {{ item[head.key] }}
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
  import VSelection from '../components/base/selection'
  import VDatePicker from '../components/base/datepicker'
  import _ from 'lodash'

  export default{
      components: {
          VSelection,
          VDatePicker
      },
      data() {
          return {
              query: '',  // 关键字
              productId: 0,
              startDate: '',
              endDate: '',
              products: [
                {
                    label: '数据统计',
                    value: 0
                },
                {
                    label: '数据预测',
                    value: 1
                },
                {
                  label: '流量分析',
                  value: 2
                },
                {
                  label: '广告发布',
                  value: 3
                }
              ],
              tableHeads: [
                {
                    label: '订单号',
                    key: 'orderId'
                },
                {
                    label: '购买商品',
                    key: 'product'
                },
                {
                    label: '版本类型',
                    key: 'version'
                },
                {
                    label: '有效时间',
                    key: 'period'
                },
                {
                    label: '购买日期',
                    key: 'date'
                },
                {
                    label: '数量',
                    key: 'buyNum'
                },
                {
                    label: '总价',
                    key: 'amount'
                }
              ],
              currentOrder: 'asc',
              tableData: []
          }
      },
      watch: {
          query() { // 用于观察Vue实例上的数据变动
              this.getList()
          }
      },
      methods: {
          productChange(obj) {
              this.productId = obj.value
              this.getList()
          },
          getStartDate(date){
              this.startDate = date
              this.getList()
          },
          getEndDate(date) {
              this.endDate = date
              this.getList()
          },
          getList() {
              let reqParams = {
                  query: this.query,
                  productId: this.productId,
                  startDate: this.startDate,
                  endDate: this.endDate
              }
              // 传递参数给后台处理，返回对应数据
//              this.$http.post('/api/getOrderList', reqParams)
//                .then((res) => {
//                  this.tableData = res.data.list
//                }, (err) => {
//
//                })
              this.$http.get('/api/getOrderList')
                .then((res) => {
                  this.tableData = res.data.list
                  console.log(res.data.list)
                }, (err) => {
                  console.log('出错了!!')
                })
          },
          changeOrderType(headItem) {
              // 数组的map方法，参数是一个函数 Array.map(function(){})
              this.tableHeads.map((item) => {
                  item.active = false // 初始化为false
                  return item
              })
              headItem.active = true // 当前点击为true
              // 排序方式的变换
              if (this.currentOrder === 'asc'){
                  this.currentOrder = 'desc'
              }
              else if(this.currentOrder === 'desc'){
                  this.currentOrder = 'asc'
              }
              this.tableData = _.orderBy(this.tableData, headItem.key, this.currentOrder)// 排序
          }
      },
      mounted() { // mounted在整个实例中只执行一次
            // 一般做一些ajax请求获取数据，进行数据初始化
          this.getList()
      }
  }
</script>

<style scoped>
  .order-wrap{
    width: 1050px;
    min-height: 600px;
    margin: 0 auto;
    margin-top: 20px;
    overflow: hidden;
  }
  /* 媒体查询 */
  @media screen and (max-width: 900px){
    .order-wrap{
      width: 100%;
      min-height: 400px;
    }
    .order-list-option{
      display: block;
      padding-top: 15px;
    }
  }
  @media screen and (min-width: 900px){
    .order-wrap{
      width: 100%;
    }
    .order-list-option{
      display: inline-block;
      padding-top: 15px;
    }
  }

  .order-wrap h3{
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 20px;
  }
  .order-query{
    height: 25px;
    line-height: 25px;
    border: 1px solid #e3e3e3;
    outline: none;/* （轮廓）是绘制于元素周围的一条线，位于边框边缘的外围，可起到突出元素的作用 */
    text-indent: 10px; /* 缩进 */
  }
  .order-list-option{
    display: inline-block;
  }
  .order-list-option:first-child{
    padding-left:0;
  }
  .order-list-table{
    margin-top: 20px;
  }
  .order-list-table table{
    width: 100%;
    background: #FFF;
  }
  .order-list-table td, .order-list-table th{
    border: 1px solid #e3e3e3;
    text-align: center;
    padding: 10px 0;
  }
  .order-list-table th{
    background: yellowgreen;
    color: #FFF;
    border: 1px solid yellowgreen;
    cursor: pointer;
  }
  .order-list-table th.active{
    background: #35495e;
  }
</style>
