<template>
  <div class="ordering">
    <!-- <div class="heading"> 概览 </div> -->
    <!-- 走马灯 -->
    <el-carousel :interval="3000" type="card" height="300px" indicator-position="outside">
      <el-carousel-item v-for="item in imgList" :key="item">
        <img :src="item" />
      </el-carousel-item>
    </el-carousel>

    <!-- 卡片 -->
    <el-row :gutter="20">
      <el-col :span="6" v-for="o in cardList" :key="o">
        <el-card :body-style="{ padding: '0px' }">
          <img src="o.img" class="image" />
          <div style="padding: 14px">
            <span>{{ o.title }}</span>
            <div class="bottom">
              <el-button type="text" class="button">详细信息</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        imgList: [
          require("@/assets/img/11.jpg"),
          require("@/assets/img/22.jpg"),
          require("@/assets/img/33.jpg"),
          require("@/assets/img/44.jpg"),
          require("@/assets/img/55.jpg")
        ],
        cardList: [{
            title: '草薙京',
            img: require("@/assets/img/333.jpg")
          },
          {
            title: '雅典娜',
            img: require("@/assets/img/111.jpg")
          },
          {
            title: '拉尔夫',
            img: require("@/assets/img/222.jpg")
          },
          {
            title: '金家潘',
            img: require("@/assets/img/444.jpg")
          }
        ]
      }
    },
    created() {
      this.getOptionList()
    },
    methods: {
      async getOptionList() {
                const {
                    data: res
                } = await this.$http.get('/research/label/cascade/list')
                if (res.code != 200) {
                    return this.$message.error('获取label失败');
                }
                this.options = res.result

                // 添加默认值
                // if (this.options.length > 0) {
                //     this.cascaderSelectValue.push(this.options[0].label)
                //     this.pageInfo.cascader_label = this.options[0].label
                // }
            },
    }
  }
</script>

<style scoped>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
    text-align: center;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
  }

  .el-card__body img {
    height: 150px;
  }

  .button {
    padding: 0;
    min-height: auto;
  }

  /* .bottom {
  margin-top: 13px;
  line-height: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
 */

  /* .image {
  width: 100%;
  display: block;
} */
</style>