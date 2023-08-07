<template>
  <div class="w-[305px] z-[3] mt-[12px] pr-[12px] text-[14px]">
    <a-form
      ref="formRef"
      :model="formState"
      name="basic"
      autocomplete="off"
      @finish="onFinish"
      @finishFailed="onFinishFailed"
    >
      <a-form-item label="标题" name="title" class="flex justify-end">
        <a-input
          v-model:value="formState.title"
          placeholder="搜索任务标题"
          class="w-[200px] h-[40px]"
        />
      </a-form-item>
      <a-form-item label="执行者" name="performer" class="flex justify-end">
        <a-select
          v-model:value="formState.performer"
          placeholder="请选择"
          class="h-[40px]"
          style="width: 200px"
        >
          <a-select-option value="1">活的数据</a-select-option>
          <a-select-option value="2">活的数据</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="创建者" name="creator" class="flex justify-end">
        <a-select
          v-model:value="formState.creator"
          placeholder="请选择"
          class="h-[40px]"
          style="width: 200px"
        >
          <a-select-option value="1">活的数据</a-select-option>
          <a-select-option value="2">活的数据</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item
        label="是否完成"
        name="CompletedOrNot"
        class="flex justify-end"
      >
        <a-select
          v-model:value="formState.CompletedOrNot"
          class="h-[40px]"
          style="width: 200px"
        >
          <a-select-option value="1">全部</a-select-option>
          <a-select-option value="2">是</a-select-option>
          <a-select-option value="3">否</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="优先级" name="priority" class="flex justify-end">
        <a-select
          v-model:value="formState.priority"
          placeholder="请选择"
          class="h-[40px]"
          style="width: 200px"
        >
          <a-select-option value="1">普通</a-select-option>
          <a-select-option value="2">紧急</a-select-option>
          <a-select-option value="3">非常紧急</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item
        label="执行状态"
        name="ExecutionStatus"
        class="flex justify-end"
      >
        <a-select
          v-model:value="formState.ExecutionStatus"
          placeholder="请选择"
          class="h-[40px]"
          style="width: 200px"
        >
          <a-select-option value="1">待办的</a-select-option>
          <a-select-option value="2">已确认</a-select-option>
          <a-select-option value="3">修复中</a-select-option>
          <a-select-option value="4">已完成</a-select-option>
          <a-select-option value="5">已验收</a-select-option>
          <a-select-option value="6">已取消</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item class="text-sm yangshi">
        <a-button
          type="primary"
          class="text-[#fff] bg-[#409EFF] border-[409EFF] w-[70px] h-[40px]"
          @click="onSubmit"
          >搜索</a-button
        >
        <a-button
          style="margin-left: 10px"
          class="w-[70px] h-[40px]"
          @click="resetForm"
          >重置</a-button
        >
      </a-form-item>
    </a-form>
    <!-- 小三角 -->
    <div
      class="triangle absolute top-[-7px] left-[50%] translate-x-[-50%]"
    ></div>
  </div>
</template>
<script lang="ts" setup>
import { reactive, ref, toRaw } from "vue";

const formState = reactive({
  title: "", //用户名邮箱
  performer: undefined, //执行者
  creator: undefined, //创建者
  CompletedOrNot: "1", //是否完成
  priority: undefined, //优先级
  ExecutionStatus: undefined, //请选择
});

const formRef = ref();

const onFinish = (values: any) => {
  console.log("Success:", values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};

// 重置
const resetForm = () => {
  formRef.value.resetFields();
};

// // 搜索
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
</script>
<style>
.yangshi .ant-form-item-control-input-content {
  display: flex;
}
</style>
