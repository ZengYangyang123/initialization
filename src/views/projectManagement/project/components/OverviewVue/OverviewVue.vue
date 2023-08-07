<template>
  <div
    class="flex flex-wrap justify-between w-[1076px] mx-[auto] overflow-y-auto"
  >
    <!-- 模块一 -->
    <div
      class="w-full h-[300px] bg-white mb-[20px] rounded-[8px] p-[10px] flex"
    >
      <div class="w-[528px] h-[300px]" id="mainOne"></div>
      <div class="w-[528px] h-[300px]" id="mainTwo"></div>
    </div>
    <!-- 模块二 -->
    <div class="w-[730px] py-[10px] px-[20px] bg-white rounded-[8px]">
      <p style="line-height: 30px">项目动态</p>
      <!-- <div>
        <div class="w-full" v-for="i in 1" :key="i">
          <div
            class="flex py-[12px]"
            style="min-height: 48px; border-bottom: 1px solid #e8e8e8"
          >
            <div class="mr-[15px]">
              <img src="" alt="" class="w-[32px] h-[32px] rounded-[50%]" />
            </div>
            <div
              class="text-sm"
              style="width: calc(100% - 32px - 15px - 160px); line-height: 24px"
            >
              <p>
                <span>活的数据</span>
                创建了任务
              </p>
              <p>活的数据</p>
            </div>
            <div class="w-[160px] text-sm" style="line-height: 24px">
              <p>活的数据</p>
            </div>
          </div>
        </div>
        <a-pagination
          v-model:current="current"
          :total="50"
          show-less-items
          class="flex items-center justify-center"
        />
      </div> -->
    </div>
    <!-- 模块三 -->
    <div
      class="w-[325px] pt-[6px] px-[18px] pb-[18px] ml-[20px] bg-white rounded-[8px]"
    >
      <div class="py-[12px] mb-[10px] flex">
        <div class="mr-[16px]">
          <img src="" alt="" class="w-[50px] h-[50px] rounded-[4px]" />
        </div>
        <div class="w-[219px]" style="line-height: 22px">
          <p class="mb-[4px] overflow-hidden">活的数据</p>
          <p>活的数据</p>
        </div>
      </div>
      <div class="mb-[20px]">
        <a-tooltip class="text-sm w-full">
          <template #title> 点击即可编辑 </template>
          <p class="w-full">活的数据</p>
        </a-tooltip>
      </div>
      <div>
        <p class="py-[20px] mb-[10px]" style="line-height: 20px">项目统计</p>
        <div class="flex flex-wrap">
          <div
            class="w-[84px] h-[74px] mb-[60px] pr-[30px]"
            v-for="i in 6"
            :key="i"
          >
            <div class="text-xs">已完成</div>
            <div class="text-[32px]" style="line-height: 60px">0</div>
            <div
              class="w-full h-[4px] rounded-2xl"
              style="background-color: rgb(235, 238, 245)"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted } from "vue";
import * as echarts from "echarts";
import { ProjectStatus } from "@/service/index";
import { useRequest } from "vue-request";
const current = ref(1);
const isData1 = ref<Array<any>>([]); //圆环数据
const isData2 = ref<Array<any>>([]); //圆饼数据

// 初始化 echarts 实例
const initEcharts = () => {
  const myChart = echarts.init(document.getElementById("mainOne")!);
  const option = {
    title: {
      text: "任务执行状态",
      left: "center",
    },
    tooltip: {
      trigger: "item",
    },
    legend: {
      orient: "vertical",
      left: "left",
    },
    series: [
      {
        name: "任务执行状态",
        type: "pie",
        radius: "60%",
        itemStyle: {
          borderColor: "#fff",
          borderWidth: 2,
        },
        data: isData2.value,
      },
    ],
  };

  myChart.setOption(option);
};

const initEchartsTwo = () => {
  const myChart = echarts.init(document.getElementById("mainTwo")!);
  const option = {
    title: {
      text: "任务优先级",
      left: "center",
    },
    tooltip: {
      trigger: "item",
    },
    legend: {
      orient: "vertical",
      left: "left",
    },
    series: [
      {
        name: "任务优先级",
        type: "pie",
        radius: ["30%", "60%"],
        avoidLabelOverlap: false,
        itemStyle: {
          borderColor: "#fff",
          borderWidth: 2,
        },
        data: isData1.value,
        color: ["#1b9aee", "#e62412"],
      },
    ],
  };
  myChart.setOption(option);
};

// 在组件挂载时执行初始化逻辑
onMounted(initEcharts);
onMounted(initEchartsTwo);

// 项目进度请求
const { data: xiangmuzhuangtai } = useRequest(
  () =>
    ProjectStatus({
      id: 1000419,
    }),
  {
    // 请求成功时
    onSuccess: () => {
      const one = xiangmuzhuangtai.value?.data.taskPriority; //圆环数据
      const two = xiangmuzhuangtai.value?.data.taskState; //圆饼数据
      for (const i in one) {
        const newObj = {
          value: one[i],
          name: i,
        };
        isData1.value.push(newObj);
      }
      for (const n in two) {
        const newObj = {
          value: two[n],
          name: n,
        };
        isData2.value.push(newObj);
      }
      console.log(isData1.value);
    },

    // 请求失败时
    onError: () => {
      console.log("请求错误");
    },
  },
);
</script>
<style></style>
