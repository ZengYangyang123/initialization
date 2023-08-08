<template>
  <div class="w-[100%] pl-[26px] pr-[36px] bg-[#f5f5f5] pt-[65px]">
    <!-- 顶部导航栏 -->
    <indexmenu class="flex w-[100vw] h-[68px] bg-[white] fixed left-0 top-0" />
    <!-- 顶部头像 -->
    <div
      class="w-[100%] bg-[white] h-[120px] pt-[23px] flex box-border mt-[25px]"
    >
      <div class="w-[110px] h-[100%]">
        <img
          :src="Personal?.data.avatar"
          alt=""
          class="rounded-[50%] w-[64px] h-[64px] mx-auto"
        />
      </div>
      <div class="h-[100%] w-[1590px] pl-[10px]">
        <p v-if="hour >= 6 && hour < 12" class="text-[18px]">
          上午好,{{ Personal?.data.username }},祝您开心一整天
        </p>
        <p v-else-if="hour >= 12 && hour < 14" class="text-[18px]">
          中午好,{{ Personal?.data.username }},祝您开心一整天
        </p>
        <p v-else-if="hour >= 14 && hour < 18" class="text-[18px]">
          下午好,{{ Personal?.data.username }},祝您开心一整天
        </p>
        <p v-else-if="hour >= 18 && hour < 24" class="text-[18px]">
          晚上好,{{ Personal?.data.username }},祝您开心一整天
        </p>
        <p v-else class="text-[18px]">
          凌晨好,{{ Personal?.data.username }},祝您开心一整天
        </p>
        <p class="text-[14px] text-[#8c8c8c] mt-[15px]">普通用户</p>
      </div>
      <div class="w-[112px] h-[100%]">
        <p class="text-[14px] text-[#8c8c8c]">项目总数</p>
        <p class="text-[25px] mt-[10px] pl-[10px]">
          {{ dataxiang?.data.count }}
          <!-- renwushu?.value || -->
        </p>
      </div>
    </div>
    <div class="mt-[20px] xl:flex">
      <!-- 左边 -->
      <div class="h-[872px] bg-[white] xl:w-[1202px] lg:w-[100%]">
        <!-- 进行中的项目 -->
        <div
          class="h-[58px] box-border pl-[20px] flex w-[100%] justify-between pr-[21px] border-b-[1px]"
        >
          <p class="text-[15px] h-[100%] leading-[58px]">进行中的项目</p>
          <p class="text-[15px] h-[100%] leading-[58px] text-[#7d9eff]">
            全部项目
          </p>
        </div>
        <!-- 页面中的项目 -->

        <div class="w-[100%] h-[755px] flex" style="flex-wrap: wrap">
          <div
            class="w-[25%] h-[33.4%] pl-[10px] pr-[10px] pt-[10px] yiny relative overflow-hidden"
            style="border: 1px solid #f9f9f9"
            v-for="item in paginatedData"
            :key="item.id"
              @click="
              () => {
                router.push(`/projectManagement/project/${item.id}`);
              }
            "
          >
            <!-- 右上角公开 -->
            <div data-v-61d48c6e="" class="public-tip">公开</div>

            <!-- 图片 -->
            <div class="w-[100%] h-[150px]">
              <img
                :src="`http://api.cc0820.top:1024${item.cover}`"
                alt=" "
                class="bg-cover w-[100%] h-[100%]"
              />
            </div>
            <!-- 文字 -->
            <div>
              <p
                class="text-[14px] whitespace-nowrap overflow-hidden overflow-ellipsis"
              >
                {{ item.name }}
              </p>
              <p
                class="text-[12px] text-[#ccc] whitespace-nowrap overflow-hidden overflow-ellipsis"
              >
                {{ item.intro || "暂无介绍" }}
              </p>
            </div>
            <!-- 进度条 -->
            <div class="h-[20px]">
              <a-progress
                :percent="item.progress"
                size="small"
                :showInfo="false"
              />
            </div>
            <!-- 日期 -->
            <div
              class="flex justify-between text-[12px]"
              style="color: rgba(0, 0, 0, 0.45)"
            >
              <p class="">{{ item.creator?.username }}</p>
              <p class="">{{ item.created_at }}</p>
            </div>
          </div>
        </div>

        <!-- 分页数字 -->
        <a-pagination
          :current="currentPage"
          :total="totalItems"
          :page-size="pageSize"
          @change="handlePageChange"
          class="ml-[28vw] mt-[0.6vw]"
        />
      </div>
      <!-- 右边 -->
      <div
        class="h-[872px] bg-[white] leading-[16px] xl:w-[580px] xl:ml-[20px] lg:w-[100%] lg:mt-[50px] md:mt-[50px] sm:mt-[50px] xl:mt-[0]"
      >
        <!-- 头部 -->
        <div
          class="h-[61px] border-b-[#e8e8e8] border-b-2 flex"
          style="justify-content: space-between; align-items: center"
        >
          <p class="text-[15px] leading-[58px] pl-[20px]">
            我的任务-{{ renwushu || MYrenwu3?.data.count }}
          </p>
          <div style="height: 42px" class="mr-[20px]">
            <a-select
              size="large"
              ref="select"
              v-model:value="value1"
              style="width: 120px"
              :dropdownMenuStyle="{ height: '42px' }"
            >
              <a-select-option value="jack">未完成</a-select-option>
              <a-select-option value="lucy">已完成</a-select-option>
            </a-select>
          </div>
        </div>
        <!-- 选项卡 -->
        <div class="pl-[20px] pr-[20px]">
          <a-tabs v-model:activeKey="activeKey">
            <!-- 我执行的 -->
            <a-tab-pane key="1">
              <template #tab>
                <span
                  @click="renwushu = MYrenwu3?.data.count"
                  class="w-[90px] flex"
                  style="justify-content: space-around; align-items: center"
                >
                  <Icon icon="ic:twotone-menu" class="text-[18px]" />
                  <span> 我执行的</span>
                </span>
              </template>
              <div
                data-v-a6e9017e=""
                data-v-69669726=""
                class="empty-image"
                style="height: 510px"
                v-if="MYrenwu3?.data.count === 0"
              >
                <img
                  data-v-a6e9017e=""
                  src="http://api.cc0820.top:1024/static/img/empty.0bf7a80e.png"
                  alt=""
                  class="empty h-[160px] w-[160px]"
                />
                <div
                  data-v-a6e9017e=""
                  class=""
                  style="color: rgba(0, 0, 0, 0.45)"
                >
                  空空如也~~
                </div>
              </div>
              <div v-else>
                <div>
                  <div
                    data-v-69669726=""
                    class="task-item"
                    v-for="item in MYrenwu3?.data.rows"
                    :key="item.name"
                  >
                    <div class="flex items-center">
                      <span
                        data-v-69669726=""
                        class="rounded-[3px] text-[12px] pl-[4px] pr-[4px]"
                        style="
                          color: rgb(250, 140, 21);
                          border: 1px solid rgb(250, 140, 21);
                        "
                        v-if="item.task_priority_id == 4"
                      >
                        紧急
                      </span>
                      <span
                        data-v-69669726=""
                        class="rounded-[3px] text-[12px] pl-[4px] pr-[4px]"
                        style="
                          color: rgb(230, 36, 18);
                          border: 1px solid rgb(230, 36, 18);
                        "
                        v-if="item.task_priority_id == 5"
                      >
                        非常紧急
                      </span>
                      <span
                        data-v-69669726=""
                        class="rounded-[3px] text-[12px] pl-[4px] pr-[4px]"
                        style="
                          color: rgb(27, 154, 238);
                          border: 1px solid rgb(27, 154, 238);
                        "
                        v-if="item.task_priority_id == 2"
                      >
                        普通
                      </span>
                      <div data-v-69669726="" class="ml-[30px] text-[#1677ff]">
                        {{ item.name }}
                      </div>
                    </div>
                    <div
                      data-v-69669726=""
                      class="project-name ellipsis"
                      style="color: rgba(0, 0, 0, 0.45)"
                    >
                      试一试
                    </div>
                  </div>
                </div>
              </div>
            </a-tab-pane>
            <!-- 我参与的 -->
            <a-tab-pane key="2" force-render
              ><template #tab>
                <span
                  @click="renwushu = MYrenwu?.data.count"
                  class="w-[90px] flex"
                  style="justify-content: space-around; align-items: center"
                >
                  <Icon
                    icon="mdi:user-multiple-add-outline"
                    class="text-[18px]"
                  />
                  我参与的
                </span>
              </template>
              <div
                data-v-a6e9017e=""
                data-v-69669726=""
                class="empty-image"
                style="height: 510px"
                v-if="MYrenwu?.data.count === 0"
              >
                <img
                  data-v-a6e9017e=""
                  src="http://api.cc0820.top:1024/static/img/empty.0bf7a80e.png"
                  alt=""
                  class="empty h-[160px] w-[160px]"
                />
                <div
                  data-v-a6e9017e=""
                  class=""
                  style="color: rgba(0, 0, 0, 0.45)"
                >
                  空空如也~~
                </div>
              </div>
              <div v-else>
                <div>
                  <div
                    data-v-69669726=""
                    class="task-item"
                    v-for="item in MYrenwu?.data.rows"
                    :key="item.name"
                  >
                    <div class="flex items-center">
                      <span
                        data-v-69669726=""
                        class="rounded-[3px] text-[12px] pl-[4px] pr-[4px]"
                        style="
                          color: rgb(250, 140, 21);
                          border: 1px solid rgb(250, 140, 21);
                        "
                        v-if="item.task_priority_id == 4"
                      >
                        紧急
                      </span>
                      <span
                        data-v-69669726=""
                        class="rounded-[3px] text-[12px] pl-[4px] pr-[4px]"
                        style="
                          color: rgb(230, 36, 18);
                          border: 1px solid rgb(230, 36, 18);
                        "
                        v-if="item.task_priority_id == 5"
                      >
                        非常紧急
                      </span>
                      <span
                        data-v-69669726=""
                        class="rounded-[3px] text-[12px] pl-[4px] pr-[4px]"
                        style="
                          color: rgb(27, 154, 238);
                          border: 1px solid rgb(27, 154, 238);
                        "
                        v-if="item.task_priority_id == 2"
                      >
                        普通
                      </span>
                      <div data-v-69669726="" class="ml-[30px] text-[#1677ff]">
                        {{ item.name }}
                      </div>
                    </div>
                    <div
                      data-v-69669726=""
                      class="project-name ellipsis"
                      style="color: rgba(0, 0, 0, 0.45)"
                    >
                      试一试
                    </div>
                  </div>
                </div>
              </div>
            </a-tab-pane>
            <!-- 我创建的 -->
            <a-tab-pane key="3">
              <template #tab>
                <span
                  @click="renwushu = MYrenwu2?.data.count"
                  class="w-[90px] flex"
                  style="justify-content: space-around; align-items: center"
                >
                  <Icon icon="ei:plus" class="text-[18px]" /> 我创建的
                </span>
              </template>
              <div
                data-v-a6e9017e=""
                data-v-69669726=""
                class="empty-image"
                style="height: 510px"
                v-if="MYrenwu2?.data.count === 0"
              >
                <img
                  data-v-a6e9017e=""
                  src="http://api.cc0820.top:1024/static/img/empty.0bf7a80e.png"
                  alt=""
                  class="empty h-[160px] w-[160px]"
                />
                <div
                  data-v-a6e9017e=""
                  class=""
                  style="color: rgba(0, 0, 0, 0.45)"
                >
                  空空如也~~
                </div>
              </div>
              <div v-else>
                <div>
                  <div
                    data-v-69669726=""
                    class="task-item"
                    v-for="item in MYrenwu2?.data.rows"
                    :key="item.name"
                  >
                    <div class="flex items-center">
                      <span
                        data-v-69669726=""
                        class="rounded-[3px] text-[12px] pl-[4px] pr-[4px]"
                        style="
                          color: rgb(250, 140, 21);
                          border: 1px solid rgb(250, 140, 21);
                        "
                        v-if="item.task_priority_id == 4"
                      >
                        紧急
                      </span>
                      <span
                        data-v-69669726=""
                        class="rounded-[3px] text-[12px] pl-[4px] pr-[4px]"
                        style="
                          color: rgb(230, 36, 18);
                          border: 1px solid rgb(230, 36, 18);
                        "
                        v-if="item.task_priority_id == 5"
                      >
                        非常紧急
                      </span>
                      <span
                        data-v-69669726=""
                        class="rounded-[3px] text-[12px] pl-[4px] pr-[4px]"
                        style="
                          color: rgb(27, 154, 238);
                          border: 1px solid rgb(27, 154, 238);
                        "
                        v-if="item.task_priority_id == 2"
                      >
                        普通
                      </span>
                      <div data-v-69669726="" class="ml-[30px] text-[#1677ff]">
                        {{ item.name }}
                      </div>
                    </div>
                    <div
                      data-v-69669726=""
                      class="project-name ellipsis"
                      style="color: rgba(0, 0, 0, 0.45)"
                    >
                      试一试
                    </div>
                  </div>
                </div>
              </div>
            </a-tab-pane>
          </a-tabs>
        </div>
        <!-- 内容 -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import usePagination from "../../hooks/usePagination";
import indexmenu from "../HeadNavigation.vue";
import router from "@/router";
interface OngoingProjectRow {
  id: number;
  name: string;
  intro: Script;
  cover: Script;
  progress: number;
  creator: any;
  username: Script;
  created_at: Script;
}
import { ref, computed, watch } from "vue";
import {
  ongoingProject,
  Information,
  MyTasks,
  MyTasks2,
  MyTasks3,
} from "@/service/index";
import { Script } from "vm";
// 获取项目信息
const { data: dataxiang } = useRequest(
  () =>
    ongoingProject({
      is_recycle: 0,
      is_archived: 0,
    }),
  {
    // 请求成功时

    // 请求失败时
    onError: () => {
      console.log("请求错误");
    },
  },
);
// 获取个人信息
const { data: Personal } = useRequest(() => Information(), {
  // 请求成功时
  // 请求失败时
  onError: () => {
    console.log("请求错误");
  },
});
//获取我的任务-我参与的
const { data: MYrenwu } = useRequest(
  () =>
    MyTasks({
      limit: 10,
      offset: 0,
      is_done: 0,
      is_recycle: 0,
      participator_id: 80,
    }),
  {
    // 请求成功时
    // onSuccess: () => {
    //   console.log(MYrenwu);
    // },
    // 请求失败时
    onError: () => {
      console.log("请求错误");
    },
  },
);
//获取我的任务-我创建的
const { data: MYrenwu2 } = useRequest(
  () =>
    MyTasks2({
      limit: 10,
      offset: 0,
      is_done: 0,
      is_recycle: 0,
      creator_id: 80,
    }),
  {
    // 请求成功时
    onSuccess: () => {
      console.log(MYrenwu2);
    },

    // 请求失败时
    onError: () => {
      console.log("请求错误");
    },
  },
);
//获取我的任务-我执行的
const { data: MYrenwu3 } = useRequest(
  () =>
    MyTasks3({
      limit: 10,
      offset: 0,
      is_done: 0,
      is_recycle: 0,
      executor_ids: 80,
    }),
  {
    // 请求成功时
    // onSuccess: () => {
    //   console.log(MYrenwu3);
    // },
    // 请求失败时
    onError: () => {
      console.log("请求错误");
    },
  },
);
const currentPage = ref(1);
const pageSize = 12;

// 创建一个可变的变量来存储颠倒后的数据，并进行类型断言
const reversedListData = ref<OngoingProjectRow[]>([]);

const listData = computed(() => reversedListData.value);
const totalItems = computed(() => listData.value.length);
const paginatedData = computed(() => {
  const startIndex = (currentPage.value - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  return listData.value.slice(startIndex, endIndex);
});

function handlePageChange(newPage: number) {
  currentPage.value = newPage;
}
// 时间
const hour = ref(new Date().getHours());
//监听函数
watch(dataxiang, () => {
  currentPage.value = 1;
  if (dataxiang.value && dataxiang.value.data && dataxiang.value.data.rows) {
    reversedListData.value = [
      ...dataxiang.value.data.rows,
    ].reverse() as unknown as OngoingProjectRow[];
  } else {
    reversedListData.value = [];
  }
  hour.value = new Date().getHours();
});
//选择器
const value1 = ref("lucy");
// 选项卡
const activeKey = ref("1");
//当前任务数
const renwushu = ref<number | undefined>(0);
</script>

<style lang="scss" scoped>
.my-project .list-project .item-project[data-v-61d48c6e] {
  position: relative;
  width: calc(25% - 1px - 20px);
  height: 100%;
  line-height: 24px;
  padding: 10px;
  border-right: 1px solid #e8e8e8;
  border-bottom: 1px solid #e8e8e8;
  color: rgba(0, 0, 0, 0.45);
  overflow: hidden;
}
.yiny:hover {
  box-shadow: 0 0 1px 2px rgba(165, 161, 161, 0.5);
  z-index: 30;
}
.public-tip {
  position: absolute;
  top: 0;
  right: 0;
  width: 70px;
  background-color: rgba(87, 78, 254, 0.8);
  color: #fff;
  padding-top: 10px;
  transform: translateX(50%) rotateZ(45deg);
  transform-origin: top center;
  text-align: center;
  font-size: 12px;
  line-height: 24px;
}
img[src=""],
img:not([src]) {
  opacity: 0;
}
.empty-image[data-v-a6e9017e] {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
}
.task-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 48px;
  border-bottom: 1px solid #e8e8e8;
}
</style>
