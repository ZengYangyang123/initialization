<template>
  <div class="w-[1076px] h-full mx-[auto] bg-[#fff]">
    <div class="h-[60px] px-[20px] flex items-center justify-between">
      <span class="text-lg">我的文件</span>

      <a-button
        class="flex items-center justify-center text-sm w-[88px] h-[40px]"
      >
        <Icon icon="ep:upload-filled" />
        <span>上传</span>
      </a-button>
    </div>
    <div>
      <div
        class="w-full py-[10px] px-[20px] flex text-sm text-[#ccc]"
        style="border-bottom: 1px solid #e5e5e5"
      >
        <span class="w-[62.5%]">名称</span>
        <span class="w-[8.3%]">大小</span>
        <span class="w-[12.5%]">创建日期</span>
        <span class="w-[8.3%]">创建人</span>
      </div>
      <div></div>
    </div>
  </div>
</template>
<script lang="ts" setup></script>
