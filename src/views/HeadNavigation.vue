<!-- eslint-disable no-undef -->
<template>
  <div class="flex justify-between">
    <div class="w-[50%] flex items-center">
      <div data-v-74f95c37="" class="wrap-logo flex items-center ml-[30px]">
        <svg data-v-74f95c37="" width="36" height="36" fill="none">
          <path
            data-v-74f95c37=""
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M12 31.5c11.375 0 19.5-9.035 19.5-19.787H24c0 6.892-5.045 12.284-12 12.284V31.5z"
            fill="#16D2AC"
          ></path>
          <path
            data-v-74f95c37=""
            d="M4.5 4.5H12v19.508H4.5V4.5z"
            fill="#165DFF"
          ></path>
          <path
            data-v-74f95c37=""
            d="M24 4.5v7.503H4.5V4.5H24zM31.5 4.5v7.503H24V4.5h7.5z"
            fill="#165DFF"
          ></path>
        </svg>
        <div class="text-[26px]">Arco</div>
      </div>
      <!-- 菜单插件 -->
      <div class="h-[100%] ml-[60px]">
        <a-menu
          v-model:selectedKeys="current"
          mode="horizontal"
          :items="items"
          class="h-[100%] leading-[68px]"
        />
      </div>
    </div>
    <div class="w-[50%] flex items-center justify-end pr-[56px]">
      <!-- 头像 -->
      <div class="ml-[55%] flex items-center">
        <span style="margin-right: 24px">
          <a-badge :count="23" :number-style="{ backgroundColor: '#409EFF' }">
            <a-avatar
              shape="square"
              style="background-color: white; color: black"
            >
              <template #icon>
                <TeamOutlined class="text-[20px]" />
              </template>
            </a-avatar>
          </a-badge>
        </span>
      </div>
      <!-- 下拉菜单 -->
      <div class="flex items-center">
        <a-space style="display: flex; flex-wrap: wrap">
          <a-dropdown placement="bottom" :arrow="{ pointAtCenter: true }">
            <a-button class="border-none">
              <Icon icon="bi:bell" class="text-[20px]" />
            </a-button>
            <template #overlay>
              <a-menu>
                <a-tabs
                  v-model:activeKey="activeKey"
                  class="w-[300px] h-[300px]"
                  centered
                >
                  <a-tab-pane key="1" tab="@我">
                    <div class="tip">
                      <Icon
                        icon="uiw:message"
                        class="text-[50px]"
                      />你已查看所有@我
                    </div>
                  </a-tab-pane>
                  <a-tab-pane key="2" tab="通知" force-render>
                    <div class="tip">
                      <Icon icon="circum:bullhorn" class="text-[50px]" />
                      你已查看所有通知
                    </div>
                  </a-tab-pane>
                  <a-tab-pane key="3" tab="私信">
                    <div class="tip">
                      <Icon icon="mdi:email-open-outline" class="text-[50px]" />
                      你已查看所有私信
                    </div>
                  </a-tab-pane>
                </a-tabs>
              </a-menu>
            </template>
          </a-dropdown>
        </a-space>
      </div>
      <!-- 头像和昵称 -->
      <a-dropdown arrow placement="bottom" :trigger="['click']">
        <a class="ant-dropdown-link" @click.prevent>
          <div
            data-v-74f95c37=""
            class="user el-popover__reference flex items-center"
          >
            <div data-v-0e1628b3="" data-v-74f95c37="" class="usernames">
              <div style="width: 32px; height: 32px; border-radius: 50%">
                <img
                  :src="Personal?.data.avatar"
                  class="rounded-[50%]"
                /><!---->
              </div>
            </div>
            <div data-v-74f95c37="" class="text-[12px]">
              {{ Personal?.data.username }}
            </div>
          </div>
        </a>
        <template #overlay>
          <a-menu>
            <a-menu-item class="h-[30px]">
              <a href="javascript:;" @click="Isimghovemax">
                <div class="itemxx">
                  <Icon
                    icon="ph:user-light"
                    class="text-[16px] mr-[15px]"
                  />个人设置
                </div>
              </a>
            </a-menu-item>
            <a-menu-item class="h-[30px]">
              <a href="javascript:;">
                <div class="itemxx">
                  <Icon
                    icon="mdi:shutdown"
                    class="text-[red] text-[16px] mr-[15px]"
                  />退出登录
                </div>
              </a>
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>
  </div>
</template>
<script setup lang="ts">
import { h, ref } from "vue";
import {
  FundProjectionScreenOutlined,
  BarChartOutlined,
  TeamOutlined,
} from "@ant-design/icons-vue";
import { Information } from "@/service/index";
import { MenuProps } from "ant-design-vue";
import router from "@/router";
import { useRequest } from "vue-request";
const current = ref<string[]>(["mail"]);
const Isimghovemax = () => {
  router.push("/personalCenter/personalCenter");
};
const items = ref<MenuProps["items"]>([
  {
    key: "mail",
    icon: () => h(FundProjectionScreenOutlined),
    label: "工作台",
    title: "工作台",
    onClick: () => {
      router.push("/index");
    },
  },
  {
    key: "app",
    icon: () => h(BarChartOutlined),
    label: "项目",
    title: "项目",
  },
  {
    key: "sub1",
    icon: () => h(TeamOutlined),
    label: "部门",
    title: "部门",
  },
]);
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
//下拉菜单
const activeKey = ref("1");
</script>
<style lang="scss" scoped>
.tip {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: rgba(0, 0, 0, 0.45);
  height: 300px;
  line-height: 50px;
}

.usernames {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 65px;
  cursor: pointer;
}

.itemxx {
  display: flex;
  align-items: center;
  padding: 0 10px;
  height: 36px;
  cursor: pointer;
}
</style>
