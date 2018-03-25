<template>
  <div class="index-wrap">
    <div class="index-left">
      <!-- 左边列表 -->
      <div class="index-left-block">
        <h2>全部产品</h2>
        <template v-for="product in productList">
          <h3>{{product.title}}</h3>
          <ul>
            <li v-for="item in product.list">
              <a :href="item.url">{{item.name}}</a>
              <span v-if="item.hot" class="hot-tag">HOT</span>
            </li>
          </ul>
          <div v-if="!product.last" class="hr"></div>
        </template>
      </div>
      <div class="index-left-block lastest-news">
        <h2>最新消息</h2>
        <ul>
          <li v-for="item in newsList">
            <a :href="item.url" class="new-item">{{item.title}}</a>
            <ul>
              <li v-for="itemSon in item.newSon">
                <a :href="itemSon.url" class="new-itemSon"><span class="circle"></span>{{itemSon.title}}</a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
    <div class="index-right">
      <slide-show :slides="slides" :inv="slideSpeed"></slide-show>
      <div class="index-board-list">
        <div class="index-board-item"
         v-for="(item,index) in boardeList"
         :class="{'line-last': index % 2 !== 0}">
         <img class="index-board-img" :src="item.imgUrl" alt="无法显示"/>
          <div class="index-board-item-inner">
            <h2>{{item.title}}</h2>
            <p>{{item.description}}</p>
            <div class="index-board-button">
              <a href="" class="button">立即购买</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import slideShow from '../components/slideShow'

  export default{
      // 组件创建完毕后
      created(){
        this.$http.get('api/getNewsList')
          .then((res) => {
              this.newsList = res.data
            console.log(res)
          }, (err) => {
              console.log(err)
          })
      },
      data(){
          return{
              slideSpeed: 2000,
              boardeList:[
                {
                  title:'开放产品',
                  imgUrl: require('../assets/earth.png'),
                  description:'开放产品实际是一款开放产品',
                  saleout:false
                },
                {
                  title:'品牌营销',
                  imgUrl:require('../assets/car.png'),
                  description:'帮助你的产品更好地找到定位',
                  saleout:false
                },
                {
                  title:'使命必达',
                  imgUrl:require('../assets/loud.png'),
                  description:'快速迭代永远保持最前端的速度',
                  saleout:true
                },
                {
                  title:'勇攀高峰',
                  imgUrl:require('../assets/mountain.png'),
                  description:'帮你勇闯高峰，到达事业的顶峰',
                  saleout:false
                }
              ],
              newsList:[],
              productList:{
                  pc:{
                      title:'PC产品',
                      list:[
                        {
                          name:'数据统计',
                          url:'http://starcraft.com'
                        },
                        {
                          name:'数据预测',
                          url:'http://warcraft.com'
                        },
                        {
                          name:'流量分析',
                          url:'http://overwatch.com',
                          hot:true
                        },
                        {
                          name:'广告发布',
                          url:'http://hearstone.com'
                        }
                      ]
                  },
                  app:{
                      title:'手机应用类',
                      last: true,
                      list:[
                        {
                            name:'91助手',
                            url:'http://weixin.com'
                        },
                        {
                            name:'产品助手',
                            url:'http://twitter.com',
                            hot:true
                        },
                        {
                            name:'智能地图',
                            url: 'http://maps.com'
                        },
                        {
                            name:'团队语音',
                            url:'http://phone.com'
                        }
                      ]
                  }
              },
              slides:[
                {
                  // 使用require将图片引入进来，require会通过webpack
                  // 将图片解析到相应的位置（根据webpack自己的规则进行解析）
                  // 图片需要通过js引入到项目、模板内的时候需要使用require，否则图片不会被打包到最后的项目文件里
                    src: require('../assets/slideShow/pic1.jpg'),
                    title:'图片一',
                    href: 'detail/analysis'
                },
                {
                  src: require('../assets/slideShow/pic2.jpg'),
                  title:'图片二',
                  href: 'detail/publish'
                },
                {
                  src: require('../assets/slideShow/pic3.jpg'),
                  title:'图片三',
                  href: 'detail/forecast'
                },
                {
                  src: require('../assets/slideShow/pic4.jpg'),
                  title:'图片四',
                  href: 'detail/digitcount'
                }
              ]
          }
      },
      components:{
          slideShow
      }
  }
</script>

<style scope>
  .index-wrap{
    width:100%;
    margin:0 auto;
    overflow:hidden;
  }
  .index-left{
    float:left;
    width:25%;
    text-align:left;
  }
  .index-right{
    float:left;
    width:75%;
  }
  .index-left-block{
    margin:15px;
    background:#FFF;
    box-shadow:0 0 1px #FFF;
  }
  .index-left-block .hr{
    margin: 10px 0;
    border:1px solid #e3e4e8;
  }
  .index-left-block h2{
    background: yellowgreen;
    color:#FFF;
    padding: 10px 15px;
    margin-bottom: 20px;
    text-align:center;
  }
  .index-left-block h3{
    padding:0 15px 5px 15px;
    font-weight:bold;
    color:#222;
  }
  .index-left-block ul{
    padding: 10px 20px;
  }
  .index-left-block ul li{
    padding:5px;
  }
  .index-left-block a:hover{
    color:red;
    text-decoration:underline;
  }
  .hot-tag {
    background:red;
    border-radius: 5px;
    color:#FFF;
    font-weight:bold;
    padding:0 2px;
    margin-left:5px;
  }
/* boardList */
  .index-board-list{
    overflow:hidden;
    width:100%;
    margin-top: 40px;
  }
  .index-board-item{
    float:left;
    width:43%;
    background:#FFF;
    box-shadow:0 0 1px #DDD;
    padding:20px;
    margin-bottom:40px;
    margin-right:20px;
  }
  .index-board-item-inner{
    min-height:125px;
    padding-left: 50%;
  }
  .index-board-img{
    float:left;
    width:125px;
    height: 125px;
    background-color:red;
  }
  .index-board-item-inner h2{
    font-size:18px;
    font-weight: bold;
    color:#000;
    margin-bottom: 15px;
  }
  .index-board-button{
    margin-top:20px;
    width:100px;
    height:30px;
    border-radius: 3px;
    background:yellowgreen;
    text-align:center;
  }
  .index-board-button a{
    color:#FFF;
    line-height:30px;
  }
  .lastest-news{
    min-height: 512px;
  }
  .line-last{
    margin-right:0;
    float:right;
  }
  .new-item, .new-itemSon{
    display: inline-block;
    width: 200px;
    overflow:hidden;
    text-overflow:ellipsis; /* 超出省略的属性 */
    white-space: nowrap; /* 文字不允许换行 */
  }
  .new-item{
    font-weight:bold;
    font-size:15px;
    line-height:20px;
  }
  .new-itemSon{
    width:160px;
  }
  .circle{
    float:left;
    width:5px;
    height:5px;
    background:yellowgreen;
    margin: 3px 3px 3px 0;
    border-radius:50%;
  }
</style>
