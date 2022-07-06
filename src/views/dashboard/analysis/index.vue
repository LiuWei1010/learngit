<template>
  <div class="p-4">
    <div class="flex-3">
      <div class="blue">
        <div class="blue-title">机器信息</div>
        <div class="blue-total">{{ total }}台(月活)</div>
        <div class="blue-content">
          <div class="content-one">26091台在线</div>
          <div class="content-two">37台离线</div>
        </div>
        <div class="blue-content">
          <div class="content-one">0台需补货</div>
          <div class="content-two">15台故障</div>
        </div>
      </div>
      <div class="orange">
        <div class="orange-title">待办事项</div>
        <div class="orange-content">
          <div>异常订单</div>
          <div>审核</div>
        </div>
      </div>
      <div class="red">
        <div class="red-title">系统通知</div>

        <div class="content-item">
          <div class="item-content">小程序升级公告</div>
          <div class="item-date">2022-01-06</div>
        </div>
        <div class="content-item">
          <div class="item-content">小程序及公众号升级公告</div>
          <div class="item-date">2021-09-19</div>
        </div>
        <div class="content-item">
          <div class="item-content">小程序及公众号升级公告</div>
          <div class="item-date">2021-09-19</div>
        </div>
        <div class="content-item">
          <div class="item-content">网页客户端更新公告</div>
          <div class="item-date">2022-06-03</div>
        </div>
      </div>
    </div>
    <div class="home-content">
      <div class="home-item">
        <div class="item-title">经营状况</div>
        <div class="today">
          <div class="today-transaction">
            <div>今日交易额</div>
            <div>￥2500.09</div>
            <div>订单笔数: 331笔</div>
          </div>
          <div class="today-refund">
            <div>今日退款金额</div>
            <div>￥0</div>
            <div>退款笔数: 0笔</div>
          </div>
          <div class="today-deal">
            <div>今日成交额</div>
            <div>￥2644.7</div>
            <div>订单笔数: 350笔</div>
          </div>
        </div>
        <div class="split"></div>
        <div class="yesterday">
          <div class="yesterday-transaction">
            <div>昨日交易额 | 交易笔数</div>
            <div>￥4074.65 | 440笔</div>
          </div>
          <div class="yesterday-refund">
            <div>昨日退款额 | 退款笔数</div>
            <div>￥0 | 0笔</div>
          </div>
          <div class="yesterday-deal">
            <div>昨日成交额 | 成交笔数</div>
            <div>￥4074.65 | 440笔</div>
          </div>
        </div>
        <div class="split"></div>
        <div class="yesterday">
          <div class="yesterday-transaction">
            <div>昨日交易额 | 交易笔数</div>
            <div>￥4074.65 | 440笔</div>
          </div>
          <div class="yesterday-refund">
            <div>昨日退款额 | 退款笔数</div>
            <div>￥0 | 0笔</div>
          </div>
          <div class="yesterday-deal">
            <div>昨日成交额 | 成交笔数</div>
            <div>￥4074.65 | 440笔</div>
          </div>
        </div>
        <div class="split"></div>
        <div class="yesterday">
          <div class="yesterday-transaction">
            <div>昨日交易额 | 交易笔数</div>
            <div>￥4074.65 | 440笔</div>
          </div>
          <div class="yesterday-refund">
            <div>昨日退款额 | 退款笔数</div>
            <div>￥0 | 0笔</div>
          </div>
          <div class="yesterday-deal">
            <div>昨日成交额 | 成交笔数</div>
            <div>￥4074.65 | 440笔</div>
          </div>
        </div>
      </div>
      <div class="home-item">
        <div class="salesCurve">
          <!-- <div class="item-title">八日销售曲线</div> -->
          <div
            ref="chartRef"
            style="
               {
                width: 100%;
                height: 300px;
              }
            "
          ></div>
        </div>
        <div class="payMethod">
          <div
            ref="chartRef1"
            style="
               {
                width: 100%;
                height: 300px;
              }
            "
          ></div>
        </div>
      </div>
    </div>
    <div class="ranking">
      <div class="ranking-item">
        <div class="item-title">商品排行榜</div>
        <div class="ranking-key">
          <div class="key-left">
            <div
              v-for="(month, index) in monthList"
              :class="[productionIndex == index ? 'selected' : '']"
              :key="month"
              @click="changeIndex(index)"
              >{{ month }}</div
            >
          </div>
          <div class="key-right">
            自定义月份:&nbsp;&nbsp;<MonthPicker @change="dateChange" placeholder="选择月份" />
          </div>
        </div>
        <div
          ref="chartRef2"
          style="
             {
              width: 100%;
              height: 300px;
            }
          "
        ></div>
      </div>
      <div class="ranking-item">
        <div class="item-title">机器排行榜</div>
        <div class="ranking-key">
          <div class="key-left">
            <div
              v-for="(month, index) in monthList"
              :class="[machineIndex == index ? 'selected' : '']"
              :key="month"
              @click="changeMachineIndex(index)"
              >{{ month }}</div
            >
          </div>
          <div class="key-right">
            自定义月份:&nbsp;&nbsp;<MonthPicker
              @change="dateChangeMachine"
              placeholder="选择月份"
            />
          </div>
        </div>
        <div
          ref="chartRef3"
          style="
             {
              width: 100%;
              height: 300px;
            }
          "
        ></div>
      </div>
    </div>
  </div>
</template>
<script lang="tsx">
  import { defineComponent, ref, onMounted, Ref, computed } from 'vue';
  import { useECharts } from '/@/hooks/web/useECharts';
  import { MonthPicker } from 'ant-design-vue';
  import dayjs from 'dayjs';
  export default defineComponent({
    name: 'HomePage',
    components: {
      MonthPicker,
    },
    setup() {
      let data = [120, 200, 150, 80, 70, 110, 130];
      let total = ref(26218);
      const monthList = computed(() => {
        const arr: any = [];
        for (let i = 0; i < 3; i++) {
          arr.push(dayjs().subtract(i, 'month').format('YYYY-MM'));
        }
        return arr;
      });
      let productionIndex = ref(0);
      let machineIndex = ref(0);
      const chartRef = ref<HTMLDivElement | null>(null);
      const chartRef1 = ref<HTMLDivElement | null>(null);
      const chartRef2 = ref<HTMLDivElement | null>(null);
      const chartRef3 = ref<HTMLDivElement | null>(null);
      const { setOptions } = useECharts(chartRef as Ref<HTMLDivElement>);
      const { setOptions: setOptions1 } = useECharts(chartRef1 as Ref<HTMLDivElement>);
      const { setOptions: setOptions2 } = useECharts(chartRef2 as Ref<HTMLDivElement>);
      const { setOptions: setOptions3 } = useECharts(chartRef3 as Ref<HTMLDivElement>);
      function changeIndex(i) {
        productionIndex.value = i;
        //这边是通过向后台发送日期monthList[i];
        if (i == 0) {
          data = [120, 200, 150, 80, 70, 110, 130];
          Options2(data);
        } else if (i == 1) {
          data = [1000, 2500, 1600, 800, 700, 1100, 1300];
          Options2(data);
        } else if (i == 2) {
          data = [1200, 2000, 1500, 800, 700, 1100, 1300];
          Options2(data);
        }
        console.log(data);
      }
      function changeMachineIndex(i) {
        machineIndex.value = i;
        //这边是通过向后台发送日期monthList[i];
        if (i == 0) {
          data = [120, 200, 150, 80, 70, 110, 130];
          Options3(data);
        } else if (i == 1) {
          data = [1000, 2500, 1600, 800, 700, 1100, 1300];
          Options3(data);
        } else if (i == 2) {
          data = [1200, 2000, 1500, 800, 700, 1100, 1300];
          Options3(data);
        }
      }
      function Options2(data) {
        setOptions2({
          xAxis: {
            type: 'category',
            axisTick: {
              show: true,
            },
            axisLabel: {
              rotate: 320,
            },
            data: [
              '一次性口罩',
              '杰士邦自由派',
              '飞机杯',
              '和成天下',
              '邦立刻',
              '杜蕾斯',
              '避孕套',
            ],
          },
          yAxis: {
            type: 'value',
            axisLine: {
              show: true,
              lineStyle: {
                color: 'black',
              },
            },
          },
          series: [
            {
              data,
              type: 'bar',
            },
          ],
        });
      }
      function Options3(data) {
        setOptions3({
          xAxis: {
            type: 'category',
            axisTick: {
              show: true,
            },
            axisLabel: {
              rotate: 320,
            },
            data: [
              '一次性口罩',
              '杰士邦自由派',
              '飞机杯',
              '和成天下',
              '邦立刻',
              '杜蕾斯',
              '避孕套',
            ],
          },
          yAxis: {
            type: 'value',
            axisLine: {
              show: true,
              lineStyle: {
                color: 'black',
              },
            },
          },
          series: [
            {
              data,
              type: 'bar',
            },
          ],
        });
      }
      function dateChange(moment, date) {
        //date为当前时间, 如2022-05, 如果date为空,则不向后台发送数据
        data = [820, 932, 901, 934, 1290, 1330, 1320];
        Options2(data);
      }
      function dateChangeMachine(moment, date) {
        data = [820, 932, 901, 934, 1290, 1330, 1320];
        Options3(data);
      }
      onMounted(() => {
        setOptions({
          title: {
            text: '八日销售曲线',
          },
          grid: {
            left: '6%',
            right: '4%',
            bottom: '7%',
            containLabel: false,
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['22日', '23日', '24日', '25日', '26日', '27日', '28日'],
            // data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          },
          yAxis: {
            type: 'value',
            axisLine: {
              show: true,
              lineStyle: {
                color: 'black',
              },
            },
          },
          series: [
            {
              data: [820, 932, 901, 934, 1290, 1330, 1320],
              type: 'line',
              areaStyle: {},
            },
          ],
        });
        setOptions1({
          title: {
            text: '支付方式饼图',
            left: 'center',
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '7%',
            containLabel: false,
          },
          tooltip: {
            trigger: 'item',
          },
          legend: {
            orient: 'vertical',
            left: 'left',
          },
          series: [
            {
              name: 'Access From',
              type: 'pie',
              radius: '50%',
              data: [
                { value: 1048, name: '微信' },
                { value: 735, name: '支付宝' },
                { value: 580, name: '现金' },
                { value: 484, name: '银行卡' },
                { value: 300, name: '信用卡' },
              ],
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)',
                },
              },
            },
          ],
        });
        Options2(data);
        Options3(data);
      });
      return {
        total,
        chartRef,
        chartRef1,
        chartRef2,
        chartRef3,
        monthList,
        productionIndex,
        machineIndex,
        changeIndex,
        changeMachineIndex,
        dateChange,
        dateChangeMachine,
      };
    },
  });
</script>
<style>
  .selected {
    background: rgb(74, 148, 245);
  }
  .split {
    height: 1px;
    width: 100%;
    background: #cccccc;
  }
  .p-4 {
    background-color: #ffffff;
  }
  .flex-3 {
    display: -webkit-flex;
    display: flex;
    width: 100%;
    height: 180px;
    justify-content: space-between;
  }
  .red,
  .orange,
  .blue {
    width: 32%;
    box-sizing: border-box;
    border-radius: 10px;
    padding: 0px 5px;
    font-size: 18px;
    color: #ffffff;
  }
  .red {
    background: linear-gradient(to right, rgb(255, 101, 101), rgb(255, 146, 146));
    overflow: auto;
  }
  .orange {
    background: linear-gradient(to right, rgb(255, 175, 40), rgb(255, 209, 106));
  }
  .blue {
    background: linear-gradient(to right, rgb(74, 148, 245), rgb(148, 197, 255));
  }
  .blue-title,
  .orange-title,
  .red-title {
    width: 100%;
    height: 40px;
    line-height: 40px;
    padding-left: 10px;
    color: #ffffff;
    font-weight: bolder;
    font-size: 20px;
    text-align: left;
  }
  .blue-total {
    text-align: center;
    width: 100%;
    height: 40px;
    line-height: 40px;
  }
  .blue-content {
    display: flex;
    height: 40px;
    line-height: 40px;
    justify-content: space-around;
  }
  .orange-content {
    display: flex;
    justify-content: center;
    height: 130px;
  }
  .orange-content div {
    width: 50%;
    text-align: center;
    height: 100%;
    line-height: 130px;
  }
  .content-item {
    width: 100%;
    height: 30px;
    line-height: 30px;
    display: flex;
    justify-content: space-between;
    margin: 6px 0;
  }
  .home-content {
    width: 100%;
    height: 618px;
    display: flex;
    margin-top: 20px;
    justify-content: space-between;
  }
  .home-content .home-item {
    width: 49.8%;
    height: 100%;
    box-sizing: border-box;
    padding: 0 6px;
  }
  .home-content .home-item:nth-child(1) {
    border: 1px solid #cccccc;
  }
  .home-content .home-item:nth-child(2) {
    padding: 0px;
  }
  .salesCurve {
    width: 100%;
    height: 317px;
    margin-bottom: 4px;
    border: 1px solid #cccccc;
    padding: 0 6px;
  }
  .payMethod {
    width: 100%;
    height: 297px;
    border: 1px solid #cccccc;
    padding: 0 6px;
  }
  .item-title {
    width: 100%;
    height: 40px;
    line-height: 40px;
    font-weight: bold;
    font-size: 20px;
    color: rgb(51, 51, 51);
  }
  .today {
    height: 140px;
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
  .today-transaction,
  .today-refund,
  .today-deal {
    width: 33%;
    text-align: center;
    height: 140px;
    font-size: 16px;
    font-family: 'Microsoft YaHei';
  }
  .today-transaction div,
  .today-refund div,
  .today-deal div {
    height: 40px;
    line-height: 40px;
  }
  .today-transaction div:nth-child(1),
  .today-refund div:nth-child(1),
  .today-deal div:nth-child(1) {
    color: rgb(131, 136, 141);
  }
  .today-transaction div:nth-child(2),
  .today-refund div:nth-child(2),
  .today-deal div:nth-child(2) {
    color: rgb(63, 63, 68);
    font-weight: bold;
    font-size: 28px;
  }
  .today-transaction div:nth-child(3),
  .today-refund div:nth-child(3),
  .today-deal div:nth-child(3) {
    color: rgb(54, 91, 152);
    font-size: 18px;
  }
  .yesterday {
    height: 140px;
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
  .yesterday-transaction,
  .yesterday-refund,
  .yesterday-deal {
    width: 33%;
    text-align: center;
    height: 140px;
    font-size: 16px;
    font-family: 'Microsoft YaHei';
  }
  .yesterday-transaction div,
  .yesterday-refund div,
  .yesterday-deal div {
    height: 67px;
    line-height: 67px;
  }
  .yesterday-transaction div:nth-child(2),
  .yesterday-refund div:nth-child(2),
  .yesterday-deal div:nth-child(2) {
    font-weight: bold;
  }
  .ranking {
    width: 100%;
    height: 400px;
    display: flex;
    justify-content: space-between;
    margin-top: 6px;
  }
  .ranking-item {
    width: 49.8%;
    height: 100%;
    box-sizing: border-box;
    padding: 0 6px;
    border: 1px solid #cccccc;
  }
  .ranking-key {
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: space-between;
  }
  .key-left {
    width: 50%;
    display: flex;
    justify-content: flex-start;
  }
  .key-left div {
    width: 85px;
    height: 40px;
    line-height: 40px;
    border: 0.2px solid #cccccc;
    text-align: center;
    user-select: none;
  }
  .key-right {
    width: 50%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .key-left div {
    width: 85px;
    height: 40px;
    line-height: 40px;
    border: 0.5px solid #cccccc;
    text-align: center;
  }
</style>
