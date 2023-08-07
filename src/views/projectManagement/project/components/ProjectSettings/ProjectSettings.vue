<template>
  <div class="w-screen h-screen z-[9999] fixed top-0 left-0" style="background-color: rgba(0, 0, 0, 0.5)">
    <div class="w-[660px] bg-white absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
      <div class="pt-[20px] px-[20px] pb-[10px] flex items-center justify-between">
        <span class="text-[18px] text-[#303133]" style="line-height: 24px">项目设置</span>
        <div @click="reqclick" class="text-lg">
          <Icon icon="carbon:close" color="#909399" />
        </div>
      </div>
      <div class="px-[20px] py-[30px] text-sm text-[#606266]" style="border-top: 1px solid #dcdfe6">
        <div class="overflow-hidden">
          <div class="float-left mr-[10px] relative" style="border-right: 2px solid #ccc">
            <div class="w-[2px] h-[40px] bg-[#409eff] absolute top-0 right-[-2px] z-[3]" style="transition: all 0.3s"
              :class="isMove"></div>
            <ul class="" style="display: flex; flex-direction: column">
              <li class="el-tabs__item text-right mr-[-2px] Smallhand" @click="onSwitch(1)">
                <span>概览</span>
              </li>
              <li class="el-tabs__item text-right mr-[-2px] Smallhand" @click="onSwitch(2)">
                <span>项目偏好</span>
              </li>
              <li class="el-tabs__item text-right mr-[-2px] Smallhand" @click="onSwitch(3)">
                <span>更多</span>
              </li>
            </ul>
          </div>
          <div class="h-[600px] float-left px-[10px] w-[477px]" v-if="isSwitch === 1">
            <div class="w-[477px]">
              <a-form ref="formRef" :model="formState" class="w-full">
                <!-- 项目封面 -->
                <div class="mb-[18px] w-full">
                  <div>
                    <span style="line-height: 28px">项目封面</span>
                  </div>
                  <div class="w-[290px] h-[160px] relative">
                    <img
                      src="https://fastly.picsum.photos/id/892/290/160.jpg?hmac=k65xJb0_A44aTRPfGrGDtuw5w-OWeUmjbiTacWlmbLc"
                      class="w-full h-full" />
                    <div class="bg-black absolute top-0 left-0 z-[2] w-full h-full opacity-0 blackCloth"></div>
                  </div>
                </div>
                <div class="flex w-full justify-between h-[75px]">
                  <a-form-item ref="name" label="项目名称" name="name" class="mark" :rules="[
                    {
                      required: true,
                      message: '请输入项目名称',
                    },
                  ]">
                    <a-input v-model:value="formState.name" class="h-[28px] w-[220px] px-[15px]" />
                  </a-form-item>
                  <a-form-item ref="schedule" label="项目进度(%)" name="schedule" class="mark" :rules="[
                    {
                      required: true,
                      message: '请输入项目进度',
                    },
                  ]">
                    <a-input v-model:value="formState.schedule" class="h-[28px] w-[220px] px-[15px]" />
                  </a-form-item>
                </div>
                <div class="flex flex-col w-full mb-[18px]">
                  <span class="text-sm text-[#606266]" style="line-height: 28px">项目简介</span>
                  <a-textarea v-model:value="formState.desc" placeholder="介绍一下这个项目" />
                </div>
                <div class="flex flex-col w-full">
                  <span class="h-[28px]">项目公开性</span>
                  <a-form-item label="" name="ProjectDisclosure">
                    <a-select v-model:value="formState.ProjectDisclosure">
                      <a-select-option value="shanghai">私有项目(仅项目成员可查看和编辑)</a-select-option>
                      <a-select-option value="beijing">公开项目(所有人都可通过链接访问，仅项目成员可编辑)</a-select-option>
                    </a-select>
                  </a-form-item>
                </div>
                <div class="flex flex-col w-full">
                  <span class="text-sm" style="line-height: 28px">项目拥有者</span>
                  <div class="flex items-center">
                    <img
                      src="https://fastly.picsum.photos/id/796/100/100.jpg?hmac=4jf7kRR_7zoBOy6P2wJKqKvk8S2WMBs6BzZMKyNHA74"
                      alt="" class="w-[40px] h-[40px] rounded-[50%]" />
                    <span class="ml-[5px]">活的数据</span>
                  </div>
                </div>
                <a-form-item class="w-full determine">
                  <a-button type="primary" @click="onSubmit"
                    class="bg-[#409EFF] border-[#409EFF] text-[#fff]">确定</a-button>
                </a-form-item>
              </a-form>
            </div>
            <div></div>
            <div></div>
          </div>
          <div v-if="isSwitch === 2" class="h-[600px] float-left px-[10px] w-[477px]">
            <div class="w-full">
              <div class="flex items-center justify-between mb-[20px] w-full">
                <span class="text-sm">自动更新项目进度</span>
                <div style="background: rgba(0, 0, 0, 0.45)" class="rounded-xl">
                  <a-switch v-model:checked="formState.delivery" />
                </div>
              </div>
              <div>
                <p class="text-sm">根据当前任务的完成情况自动计算项目进度</p>
              </div>
            </div>
          </div>
          <div v-if="isSwitch === 3" class="h-[600px] float-left px-[10px] w-[477px]">
            <div class="w-full">
              <div>
                <p class="text-base font-semibold text-[#606266]" style="line-height: 30px">
                  项目操作
                </p>
              </div>
              <div>
                <p style="line-height: 30px; color: rgba(0, 0, 0, 0.45)">
                  您可以执行以下操作
                </p>
              </div>
              <div class="mt-[20px]">
                <a-button
                  class="text-[#F56C6C] bg-[#fef0f0] border-[#fbc4c4] h-[40px] w-[98px] mr-[10px] file">归档项目</a-button>
                <a-button
                  class="text-[#f9a7a7] bg-[#fef0f0] border-[#fde2e2] h-[40px] w-[70px] mr-[10px] exit element">退出</a-button>
                <a-button class="text-[#FFF] bg-[#F56C6C] border-[#F56C6C] h-[40px] w-[112px] move">移至回收站</a-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { reactive, ref, toRaw } from "vue";

const formState = reactive({
  username: "",
  name: "活的数据",
  schedule: "活的数据",
  desc: "",
  ProjectDisclosure: "shanghai",
  delivery: false,
});
const formRef = ref();
const isSwitch = ref(1);
const isMove = ref({});
const emit = defineEmits<{ (event: "chilFun", val: boolean): void }>();

// 确定点击事件
const onSubmit = () => {
  formRef.value
    .validate()
    .then(() => {
      console.log("values", formState, toRaw(formState));
    })
    .catch((error: any) => {
      console.log("error", error);
    });
};

// 选项卡切换事件
const onSwitch = (variable: number) => {
  if (variable === 1) {
    isSwitch.value = 1;
    isMove.value = { BlueEdge1: true };
  } else if (variable === 2) {
    isSwitch.value = 2;
    isMove.value = { BlueEdge2: true };
  } else if (variable === 3) {
    isSwitch.value = 3;
    isMove.value = { BlueEdge3: true };
  }
};

const reqclick = () => {
  emit("chilFun", false);
  console.log("1");
};
</script>
<style>
.el-tabs__item {
  padding: 0 20px;
  height: 40px;
  box-sizing: border-box;
  line-height: 40px;
  display: inline-block;
  list-style: none;
  font-size: 14px;
  font-weight: 500;
  color: #303133;
  position: relative;
}

.blackCloth:hover {
  opacity: 0.3;
  transition: all 0.2s;
}

.ant-form-item-label {
  text-align: left !important;
}

.mark .ant-row {
  flex-direction: column;
}

.mark .ant-col {
  width: 100%;
}

.determine .ant-form-item-control-input-content {
  justify-content: flex-end;
}

.BlueEdge1 {
  top: 0 !important;
}

.BlueEdge2 {
  top: 42px !important;
}

.BlueEdge3 {
  top: 80px !important;
}

:where(.css-dev-only-do-not-override-eq3tly).ant-switch:hover:not(.ant-switch-disabled) {
  background: none;
}

.file:hover {
  background: #f56c6c !important;
  border-color: #f56c6c !important;
  color: #fff !important;
}

.exit:hover {
  color: #f9a7a7 !important;
  background-color: #fef0f0 !important;
  border-color: #fde2e2 !important;
}

.move:hover {
  background: #f78989 !important;
  border-color: #f78989 !important;
  color: #fff !important;
}
</style>
