<template>
  <div class="w-screen h-screen bg-[#F7F7F7] p-[20px]">
    <isHead
      class="flex w-[100vw] h-[68px] bg-[white] fixed left-0 top-0 z-[999]"
      style="box-shadow: 0 0 10px #ccc"
    ></isHead>
    <div
      class="w-full h-[46px] px-[20px] text-[15px] bg-[#fff] border-[1px] border-[#d9d9d9] flex items-center justify-between mt-[64px]"
    >
      <div class="w-[223px]">
        <a-dropdown :trigger="['click']">
          <a class="flex items-center" @click.prevent>
            <span class="text-sm">我的项目</span>
            <Icon
              icon="ooui:expand"
              class="text-[16px] ml-[5px] text-black"
            ></Icon>
          </a>
          <template #overlay>
            <a-menu
              class="w-[274px]"
              style="margin-left: -30px !important; padding: 12px 0 !important"
            >
              <div class="w-full px-[6px] relative">
                <a-input
                  v-model:value="formState.searchFor"
                  class="h-[36px] pl-[30px] rounded-[4px]"
                  placeholder="搜索"
                />
                <Icon
                  icon="simple-line-icons:magnifier"
                  class="absolute top-[12px] left-[14px]"
                />
              </div>
              <div class="h-[500px] overflow-y-auto scroller">
                <a-menu-item
                  v-for="item in dataxiang?.data.rows"
                  :key="item.id"
                  class="h-[60px] overflow-hidden"
                >
                  <div class="flex items-center h-full">
                    <div
                      class="w-[32px] h-[32px] rounded-[50%] mr-[10px] overflow-hidden"
                    >
                      <img
                        :src="`http://api.cc0820.top:1024${item.cover}`"
                        alt=""
                        class="w-full h-full"
                      />
                    </div>
                    <p>{{ item.name }}</p>
                  </div>
                </a-menu-item>
              </div>
            </a-menu>
          </template>
        </a-dropdown>
      </div>
      <div class="w-[300px] h-full">
        <a-tabs v-model:activeKey="activeKey">
          <a-tab-pane key="1" tab="任务"></a-tab-pane>
          <a-tab-pane key="2" tab="文件"></a-tab-pane>
          <a-tab-pane key="3" tab="概览"></a-tab-pane>
          <a-tab-pane key="4" tab="版本"></a-tab-pane>
          <a-tab-pane key="5" tab="日程"></a-tab-pane>
        </a-tabs>
      </div>
      <div
        class="w-[264px] text-[#C0C4CC] text-sm h-full flex items-center justify-end relative"
      >
        <!-- 看板视图 -->
        <button
          class="flex items-center element h-full mr-[5px]"
          v-if="activeKey === '1'"
        >
          <Icon icon="prime:book"></Icon>
          <span class="ml-[5px]">看板视图</span>
        </button>
        <!-- 筛选 -->
        <a-dropdown
          :trigger="['click']"
          class="text-[#409EFF] flex items-center Smallhand mr-[5px] h-full"
          v-if="activeKey === '1'"
        >
          <a class="ant-dropdown-link" @click.prevent>
            <Icon icon="simple-line-icons:magnifier" />
            <span class="ml-[5px]">筛选</span>
          </a>
          <template #overlay>
            <a-menu class="w-[305px]" style="right: -128px; top: 10px">
              <isFilter></isFilter>
            </a-menu>
          </template>
        </a-dropdown>
        <!-- 成员 -->
        <div
          class="w-[36px] flex items-center text-[#409EFF] Smallhand mr-[5px] h-full"
          @click="showModal"
        >
          <Icon icon="humbleicons:user" class="text-lg"></Icon>
          <span>1</span>
        </div>
        <!-- 成员弹窗 -->
        <div>
          <a-modal v-model:open="open" title="项目成员" @ok="handleOk">
            <a-form-item name="username" class="relative mb-0">
              <a-input
                v-model:value="formState.username"
                placeholder="请输入用户名或邮箱查找"
                class="el-input__inner pl-[26px] w-full h-[40px] text-[#606266]"
              />
              <Icon
                icon="simple-line-icons:magnifier"
                class="absolute top-[50%] left-[8px] translate-y-[-50%]"
              />
            </a-form-item>
            <div class="pt-[10px] min-h-[300px]">
              <div
                class="py-[12px] flex justify-between items-center"
                style="border-top: 1px solid #e8e8e8"
              >
                <div class="w-[32px] h-[32px] rounded-[50%] overflow-hidden">
                  <img
                    :src="Personal?.data.avatar"
                    alt=""
                    class="w-full h-full"
                  />
                </div>
                <div class="w-[380px] text-[14px]">
                  <p style="line-height: 22px">{{ Personal?.data.username }}</p>
                  <p style="line-height: 22px">{{ Personal?.data.email }}</p>
                </div>
                <div>
                  <Icon icon=""></Icon>
                  <span>拥有者</span>
                </div>
              </div>
            </div>
          </a-modal>
        </div>
        <!-- 菜单 -->
        <a-dropdown
          :trigger="['click']"
          class="flex items-center text-[#409EFF] Smallhand h-full relative z-[3]"
        >
          <a class="ant-dropdown-link" @click.prevent>
            <Icon icon="line-md:menu-fold-left" :rotate="2" />
            <span class="ml-[5px]">菜单</span>
          </a>
          <template #overlay>
            <a-menu
              class="w-[256px] relative z-[3]"
              style="right: -30px; top: 10px; padding: 12px"
            >
              <!-- 菜单弹窗 -->
              <div class="triangle absolute top-[-6px] right-[40px]"></div>
              <div class="w-[230px] z-[3]">
                <ul>
                  <li class="liFlex Smallhand" @click="setFocus">
                    <Icon icon="ph:gear" />
                    <span class="ml-[10px]">项目设置</span>
                  </li>
                  <li class="liFlex Smallhand">
                    <Icon icon="ps:label" />
                    <span class="ml-[10px]">标签</span>
                  </li>
                  <li class="liFlex Smallhand">
                    <Icon icon="carbon:trash-can" />
                    <span class="ml-[10px]">查看回收站</span>
                  </li>
                  <li class="liFlex Smallhand">
                    <Icon icon="ph:file" />
                    <span class="ml-[10px]">复制项目链接</span>
                  </li>
                  <li class="liFlex Smallhand">
                    <Icon icon="ant-design:copy-outlined" />
                    <span class="ml-[10px]">复制项目</span>
                  </li>
                  <li class="liFlex Smallhand">
                    <Icon icon="ant-design:folder-add-outlined" />
                    <span class="ml-[10px]">保存为项目模板</span>
                  </li>
                </ul>
              </div>
            </a-menu>
          </template>
        </a-dropdown>
      </div>
    </div>
    <div class="w-full p-[20px] bg-[#F7F7F7]">
      <Task v-if="activeKey === '1'" style="height: calc(100vh - 192px)"></Task>
      <File v-if="activeKey === '2'" style="height: calc(100vh - 192px)"></File>
      <Overview v-if="activeKey === '3'"></Overview>
      <Version
        v-if="activeKey === '4'"
        style="height: calc(100vh - 192px)"
      ></Version>
      <Schedule
        v-if="activeKey === '5'"
        style="height: calc(100vh - 192px)"
      ></Schedule>
    </div>
  </div>
  <!-- 项目设置 -->
  <isProject
    v-if="setUp"
    @chilFun="csFun"
    style="transition: all 0.8s"
  ></isProject>
</template>
<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { reactive, ref } from "vue";
import { ongoingProject, Information } from "@/service/index";
import { useRequest } from "vue-request";
import isHead from "../../HeadNavigation.vue";
import isProject from "./components/ProjectSettings/ProjectSettings.vue"; //项目设置
import isFilter from "./components/FilterDropdown/FilterDropdown.vue"; //筛选
import Task from "./components/TaskVue/TaskVue.vue"; //任务
import File from "./components/FileVue/FileVue.vue"; //文件
import Overview from "./components/OverviewVue/OverviewVue.vue"; //概览
import Version from "./components/VersionVue/VersionVue.vue"; //版本
import Schedule from "./components/ScheduleVue/ScheduleVue.vue"; //日程

const formState = reactive({
  username: "",
  searchFor: "",
});

const activeKey = ref("1"); //选项卡切换
const open = ref<boolean>(false); //成员
const setUp = ref<boolean>(false); //项目设置

// 成员事件
const showModal = () => {
  open.value = true;
};

// 成员隐藏事件
const handleOk = (e: MouseEvent) => {
  console.log(e);
  open.value = false;
};

// 设置事件
const setFocus = () => {
  setUp.value = true;
};

// 项目设置
const csFun = (val: boolean) => {
  setUp.value = val;
};

// 项目成员请求
const { data: dataxiang } = useRequest(
  () =>
    ongoingProject({
      is_recycle: 0,
      is_archived: 0,
    }),
  {
    // 请求成功时
    onSuccess: () => {
      console.log(dataxiang.value?.data.rows);
    },

    // 请求失败时
    onError: () => {
      console.log("请求错误");
    },
  },
);

const { data: Personal } = useRequest(() => Information(), {
  // 请求成功时
  onSuccess: () => {
    console.log(Personal);
  },
  // 请求失败时
  onError: () => {
    console.log("请求错误");
  },
});
</script>
<style>
.el-input__inner {
  background-color: #fff;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  box-sizing: border-box;
  line-height: 40px;
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
}

.ant-row {
  align-items: center;
}

:where(.css-dev-only-do-not-override-eq3tly).ant-tabs
  .ant-tabs-tab.ant-tabs-tab-active
  .ant-tabs-tab-btn {
  color: #000 !important;
  text-shadow: none;
}

:where(.css-dev-only-do-not-override-eq3tly).ant-tabs .ant-tabs-tab:hover {
  color: #000;
}

:where(.css-dev-only-do-not-override-eq3tly).ant-form-horizontal
  .ant-form-item-label {
  margin-right: 16px;
}

/* 悬停禁止 */
.element {
  cursor: not-allowed;
}

/* 悬停小手 */
.Smallhand {
  cursor: pointer;
}

.el-popover {
  border-radius: 4px;
  border: 1px solid #ebeef5;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

/* 三角形 */
.triangle {
  width: 0;
  height: 0;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-bottom: 8px solid #fff;
}

:where(.css-dev-only-do-not-override-eq3tly).ant-form-item
  .ant-form-item-label
  > label::after {
  content: none;
}

#basic_username {
  width: 200px;
  height: 40px;
  padding: 0 15px;
}

#basic_performer {
  width: 200px;
  height: 40px;
  padding: 0 15px;
}

/* 搜索悬停 */
:where(.css-dev-only-do-not-override-eq3tly).ant-btn-primary:not(
    :disabled
  ):hover {
  background: #66b1ff;
  border-color: #66b1ff;
  color: #fff;
}

/* 重置悬停 */
:where(.css-dev-only-do-not-override-eq3tly).ant-btn-default:not(
    :disabled
  ):hover {
  color: #409eff;
  border-color: #c6e2ff;
  background-color: #ecf5ff;
}

.ant-form-item-control-input-content {
  justify-content: center;
}

.ant-select-selector {
  height: 42px !important;
  display: flex !important;
  align-items: center;
}

.ant-form-item {
  margin-bottom: 22px;
}

.ant-modal-footer {
  display: none;
}

.ant-modal-header {
  padding: 20px 20px 10px;
  margin: 0 !important;
}

.ant-modal-body {
  padding: 10px 20px;
  border-top: 1px solid #dcdfe6;
}

.ant-modal-content {
  width: 530px;
  border-radius: 2px !important;
  padding: 0 !important;
}

.ant-modal-title {
  line-height: 24px !important;
  font-size: 18px !important;
  color: #303133 !important;
  font-weight: 400 !important;
}

.liFlex {
  display: flex;
  align-items: center;
  height: 40px;
  font-weight: 600;
  color: #606266;
  padding: 0 10px;
}

.liFlex:hover {
  background-color: #eeeeee;
}
</style>
