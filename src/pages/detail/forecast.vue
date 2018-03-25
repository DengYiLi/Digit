<template>
  <div class="sales-board">
    <div class="sales-board-intro">
      <h2>数据预测</h2>
      <p>未来，大数据会变得越来越重要，其核心应用预测也会成为互联网行业以及产业变革的重要力量，我们很有必要对数据预测及其分析方法进行全面且深入的了解。</p>
    </div>
    <div class="sales-board-form">
      <div class="sales-board-item">
        <div class="sales-board-item-left">
          购买数量:
        </div>
        <div class="sales-board-item-right">
          <v-counter :max="100" :min="20"></v-counter>
        </div>
      </div>
      <div class="sales-board-item">
        <div class="sales-board-item-left">
          媒介:
        </div>
        <div class="sales-board-item-right">
          <v-mul-chooser :selections="versionList"></v-mul-chooser>
        </div>
      </div>
      <div class="sales-board-item">
        <div class="sales-board-item-left">
          有效时间:
        </div>
        <div class="sales-board-item-right">
          一年
        </div>
      </div>
      <div class="sales-board-item">
        <div class="sales-board-item-left">
          总价:
        </div>
        <div class="sales-board-item-right">
          500元
        </div>
      </div>
      <div class="sales-board-item">
        <div class="sales-board-item-left">
          &nbsp;
        </div>
        <div class="sales-board-item-right">
          <div class="button" @click="buySth">
            立即购买
          </div>
        </div>
      </div>
    </div>
    <div class="sales-board-des">
      <h2>产品说明</h2>
      <p>2020年的一天，在你驱车前往公司的路上，导航系统通过预测交通流量，会自动帮你选择一条最合适的交通路线；车内推荐系统会根据你的饮食习惯预测你可能会喜欢吃什么，并推荐沿途的早餐店；你的电子社交助理已经为你自动选择了你可能感兴趣的社交网信息；当车内系统预测到你驾车有些分心时，座椅会自动震动进行提醒……
        以上这些情景不是科幻大片独有的，它们有的已经或会在未来的某一天成为现实。而这一切所倚靠的就是预测分析技术。
        大数据时代下，作为其核心，预测分析已在商业和社会中得到广泛应用。</p>
    </div>
  </div>
</template>

<script>
  import VCounter from '../../components/base/counter'
  import VMulChooser from '../../components/base/multiplyChooser'

  export default{
    components: {
      VCounter,
      VMulChooser
    },
    data() {
        return {
            versionList: [{
                label: '纸质报告',
                value: 0
              },
              {
                label: 'pdf',
                value: 1
              },
              {
                  label: '页面报告',
                  value: 2
              },
              {
                  label: '邮件',
                  value: 3
              }
            ]
        }
    },
    methods: {
      buySth() {
          // 测试
          alert('失败!')
      }
    }
  }
</script>

<style scoped>
</style>
