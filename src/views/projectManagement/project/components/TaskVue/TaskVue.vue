<template>
  <div class="h-full flex">
    <div class="flex">
      <div
        class="ml-[4px] px-[3px] w-[284px]"
        v-for="(i, index) in xiangmu?.data.rows"
        :key="i.id"
      >
        <div class="flex justify-between pr-[15px] pb-[20px] cursor-move">
          <div class="flex items-center text-sm font-semibold">
            <span>{{ i.name }}</span>
            ·
            <span>0</span>
          </div>
          <Icon icon="ri:more-fill" />
        </div>
        <div
          class="pr-[15px] w-full overflow-y-auto"
          style="height: calc(100vh - 185px - 49px)"
        >
          <div></div>
          <div>
            <!-- 添加按钮 -->
            <button
              class="h-[30px] w-full bg-[#fff] rounded-[4px] mb-[20px] flex items-center justify-center"
              style="box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.1)"
              v-if="isSwitch[index] === true"
              @click="isIncrease(index, false)"
            >
              <Icon
                icon="bi:plus"
                class="text-2xl"
                style="color: rgba(0, 0, 0, 0.45)"
              />
            </button>
            <!-- 添加任务框 -->
            <div
              class="w-[270px] bg-[#fff] rounded-[4px] p-[10px]"
              style="box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.1)"
              v-if="isSwitch[index] === false"
            >
              <!-- 任务 -->
              <div>
                <a-dropdown :trigger="['click']">
                  <a
                    class="ant-dropdown-link flex items-center text-[14px]"
                    @click.prevent
                  >
                    <Icon
                      icon="mdi:file"
                      color="#1b9aee"
                      class="text-xl mr-[6px]"
                    />
                    任务
                    <DownOutlined class="ml-[6px]" />
                  </a>
                  <template #overlay>
                    <a-menu
                      class="w-[200px]"
                      style="
                        padding: 10px 0 !important;
                        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1) !important;
                        border-radius: 4px !important;
                        margin-left: -10px !important;
                      "
                    >
                      <a-menu-item
                        key="0"
                        class="flex items-center w-full"
                        style="padding: 0 20px !important"
                      >
                        <a
                          class="ant-dropdown-link flex items-center text-[14px]"
                          style="line-height: 36px"
                          @click.prevent
                        >
                          <Icon
                            icon="mdi:file"
                            color="#1b9aee"
                            class="text-xl mr-[6px]"
                          />
                          任务
                        </a>
                      </a-menu-item>
                      <a-menu-item
                        key="1"
                        class="flex items-center w-full"
                        style="padding: 0 20px !important"
                      >
                        <a
                          class="ant-dropdown-link flex items-center text-[14px]"
                          style="line-height: 36px"
                          @click.prevent
                        >
                          <Icon
                            icon="icon-park-solid:label"
                            color="#6a71b8"
                            class="text-xl mr-[6px]"
                          />
                          需求
                        </a>
                      </a-menu-item>
                      <a-menu-item
                        key="2"
                        class="flex items-center w-full"
                        style="padding: 0 20px !important"
                      >
                        <a
                          class="ant-dropdown-link flex items-center text-[14px]"
                          style="line-height: 36px"
                          @click.prevent
                        >
                          <Icon
                            icon="material-symbols:charger-outline"
                            color="#e62412"
                            class="text-xl mr-[6px]"
                          />
                          缺陷
                        </a>
                      </a-menu-item>
                    </a-menu>
                  </template>
                </a-dropdown>
              </div>
              <!-- 输入框 -->
              <div class="py-[5px]">
                <a-textarea
                  v-model:value="formState.desc"
                  class="box-border rounded-[4px]"
                  style="
                    min-height: 74.6134px;
                    height: 32px;
                    padding: 5px 15px !important;
                    line-height: 1.5;
                  "
                  placeholder="输入标题"
                />
              </div>
              <!-- 待认领 -->

              <a-dropdown :trigger="['click']" class="h-[52px] Smallhand">
                <a
                  class="ant-dropdown-link text-[14px] flex items-center"
                  @click.prevent
                >
                  <Icon
                    icon="heroicons:photo"
                    color="#606266"
                    class="opacity-[0.5]"
                  />
                  <span class="ml-[16px] text-[#ccc]">待认领</span>
                  <Icon
                    icon="mdi:question-mark-circle"
                    color="#606266"
                    class="ml-[4px] opacity-[0.5]"
                  />
                </a>
                <template #overlay>
                  <a-menu
                    class="w-[240px]"
                    style="
                      padding: 12px !important;
                      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1) !important;
                      border-radius: 4px !important;
                      margin-left: -48px !important;
                    "
                  >
                    <!-- 搜索框 -->
                    <div class="w-full relative">
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
                    <!-- 成员 -->
                    <div
                      style="
                        min-height: 240px;
                        max-height: 500px;
                        overflow-x: hidden;
                        overflow-y: auto;
                      "
                    >
                      <!-- 执行者 -->
                      <div>
                        <p
                          style="line-height: 40px; color: rgba(0, 0, 0, 0.45)"
                        >
                          执行者
                        </p>
                        <a-menu-item
                          key="0"
                          class="flex items-center w-full"
                          style="padding: 0 20px !important"
                        >
                          <a
                            class="ant-dropdown-link flex items-center text-[14px]"
                            style="line-height: 36px"
                            @click.prevent
                          >
                            <Icon icon="heroicons:photo" color="#606266" />
                            <span class="ml-[16px] text-[#606266]">待认领</span>
                          </a>
                        </a-menu-item>
                      </div>
                      <!-- 其他成员 -->
                      <div>
                        <p
                          style="line-height: 40px; color: rgba(0, 0, 0, 0.45)"
                        >
                          其他成员
                        </p>
                        <a-menu-item
                          key="1"
                          class="flex items-center w-full"
                          style="padding: 0 10px !important"
                        >
                          <a
                            class="ant-dropdown-link flex items-center text-[14px]"
                            style="line-height: 36px"
                            @click.prevent
                          >
                            <img
                              src="https://fastly.picsum.photos/id/796/100/100.jpg?hmac=4jf7kRR_7zoBOy6P2wJKqKvk8S2WMBs6BzZMKyNHA74"
                              alt=""
                              class="w-[32px] h-[32px] rounded-[50%]"
                            />
                            <span class="ml-[6px] text-[#606266]"
                              >活的数据</span
                            >
                          </a>
                        </a-menu-item>
                      </div>
                    </div>
                    <div
                      class="pt-[10px] mt-[5px]"
                      style="border-top: 1px solid #e5e5e5"
                    >
                      <a-button
                        type="primary"
                        class="w-full rounded-[4px] h-[40px] text-[#fff] bg-[#409eff] border-[##409eff]"
                        >邀请新成员</a-button
                      >
                    </div>
                  </a-menu>
                </template>
              </a-dropdown>

              <!-- 确认取消 -->
              <div class="w-full">
                <a-form-item class="w-full mb-0 shuxing">
                  <a-button
                    type="primary"
                    class="w-[49%] h-[40px] rounded-[4px] text-[#606266] bg-[#fff] border-[#DCDFE6] transition"
                    @click="isIncrease(index, true)"
                    >取消</a-button
                  >
                  <a-button
                    type="primary"
                    class="w-[49%] h-[40px] rounded-[4px] ml-[10px] text-[#fff] bg-[#409EFF] border-[#409EFF]"
                    >确定</a-button
                  >
                </a-form-item>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class=""></div>
  </div>
</template>
<script lang="ts" setup>
import { ref, reactive } from "vue";
import { Phase } from "@/service/index";
import { useRequest } from "vue-request";
const isSwitch = ref<boolean[]>([]); //添加切换按钮

const formState = reactive({
  desc: "",
  searchFor: "",
});

const isIncrease = (key: number, bol: boolean) => {
  isSwitch.value[key] = bol;
};

// 项目进度请求
const { data: xiangmu } = useRequest(
  () =>
    Phase({
      project_id: 1000419,
      prop_order: "sort",
      order: "asc",
    }),
  {
    // 请求成功时
    onSuccess: (data) => {
      data.data.rows.map((item) => {
        isSwitch.value.push(true);
      });
      console.log(isSwitch.value);
    },

    // 请求失败时
    onError: () => {
      console.log("请求错误");
    },
  },
);
</script>
<style>
.transition:hover {
  color: #409eff !important;
  border-color: #c6e2ff !important;
  background-color: #ecf5ff !important;
}

.shuxing .ant-form-item-control-input-content {
  display: flex;
}
</style>
