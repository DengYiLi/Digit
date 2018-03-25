<template>
  <!-- 商品详情页面 -->
  <div class="detail-wrap">
    <div class="detail-left">
      <div class="product-board">
        <img :src="productIcon">
        <ul>
          <router-link v-for="(item, key) in products" :key="key" :to="{path: item.path}"
           tag="li" active-class="active">{{item.name}}</router-link>
        </ul>
      </div>
    </div>
    <div class="detail-right">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script>
  export default{
    data() {
        return {
          products: [
            {
              name: '数据统计',
              path: 'digitcount', // path跳转不能加 '/ ', 不然就回到根目录
              active: false
            },
            {
              name: '数据预测',
              path: 'forecast',
              active: false
            },
            {
              name: '流量分析',
              path: 'analysis',
              active: false
            },
            {
              name: '广告发布',
              path: 'publish',
              active: false
            }
          ],
          imgMap: {
            '/detail/digitcount': require("../assets/car.png"),
            '/detail/forecast': require("../assets/earth.png"),
            '/detail/analysis': require("../assets/loud.png"),
            '/detail/publish': require("../assets/mountain.png")
          }
        }
    },
    computed: {
        productIcon(){
            return this.imgMap[this.$route.path]
        }
    }
  }
</script>

<style>
  .detail-wrap{
    width:1200px;
    margin: 0 auto;
    overflow: hidden;
    padding-top: 20px;
  }
  .detail-left{
    float:left;
    width:200px;
    text-align:center;
  }
  .detail-right{
    float:left;
    width:880px;
    margin-left:20px;
  }
  .product-board{
    background:#FFF;
    padding: 20px 0;
  }
  .product-board ul{
    margin-top:20px;
  }
  .product-board ul li{
    text-align:left;
    padding:10px 15px;
    cursor: pointer;
  }
  .product-board ul li.active,.product-board ul li:hover{
    background:yellowgreen;
    color:#FFF;
  }
  .product-board li a{
    display: block;
  }

  /* 子组件样式 */
  .sales-board{
    background:#FFF;
  }
  .sales-board-intro h2{
    font-size: 20px;
    padding:20px;
  }
  .sales-board-intro p{
    background: #F7FCFF;
    padding:10px 20px;
    color:#999;
    line-height: 1.8;
    /*text-align:center;*/
  }
  .sales-board-form{
    padding: 30px 20px;
    font-size:14px;
  }
  .sales-board-item{
    clear:both;
    padding-bottom: 20px;
  }
  .sales-board-item-left{
    display: inline-block;
    width: 100px;
  }
  .sales-board-item-right{
    display:inline-block;
    width:75%;
  }
  .button{
    width:200px;
    height:30px;
    line-height:30px;
    font-size:18px;
    color:#FFF;
    border-radius:2px;
    background:yellowgreen;
    text-align:center;
    word-spacing:2px;
    margin:0 auto;
  }

  .sales-board-des{
    border-top: 20px solid #F0F2F5;
    padding: 15px 20px;
  }
  .sales-board-des p{
    line-height:1.6;
    background: #F7FCFF;
    padding:10px 20px;
    color:#999;
  }
  .sales-board-des h2{
    font-size: 20px;
    padding-bottom: 15px;
  }
  .sales-board-des h3{
    font-size:18px;
    font-weight:bold;
    padding: 20px 0 10px 0;
  }
  .sales-board-des li{
    padding: 5px 0;
  }
  .sales-board-table{
    width:100%;
    margin-top: 20px;
  }
  .sales-board-table .col-first{
    background: yellowgreen;
    color:#fff;
  }
  .sales-board-table td{
    border: 1px solid #f0f2f5;
    padding: 15px;
  }
</style>
