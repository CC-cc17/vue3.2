<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const navigateToIndustry = () => {
  router.push('/industry');
};

</script>  
  <template>
    <div class="backtoall">
      <div class="button-title">想了解更多行业?</div>
      <el-button type="primary" round class="industry-button" @click="navigateToIndustry">
        全行业资讯
      </el-button>
    </div>
  </template>
  
  <style scoped>
  .backtoall {
    display: flex;
    flex-direction: column; /* 排列方向改为垂直 */
    justify-content: center;
    align-items: center;
    height: 300px; 
  }
  
  .button-title {
    margin-bottom: 15px; /* 标题和按钮之间的间距 */
    font-weight: bold;
    color: #808080; /* 灰色标题 */
    font-size: 24px; /* 较大的字体大小 */
  }
  
  .industry-button {
    font-size: 16px;
    font-weight: bold;
    color: #FFFFFF; /* 按钮文字颜色改为白色 */
    background-color: #2462a8;
    border: none;
    padding: 20px; /* 调整以形成圆形按钮 */
    border-radius: 50%; /* 完全圆形 */
    width: 100px; /* 指定宽度 */
    height: 100px; /* 指定高度，与宽度相同形成圆形 */
    text-align: center; /* 文字居中 */
    line-height: 1.5;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column; /* 文字垂直居中 */
  }
  </style>