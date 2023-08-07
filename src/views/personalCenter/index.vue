<template>
  <div class="bg-[#f5f5f5] h-[100vh] pt-[88px]">
    <indexmenu class="flex w-[100vw] h-[68px] bg-[white] fixed left-0 top-0" />
    <div class="w-[1100px] bg-[white] mx-[auto] pt-[20px] pb-[20px] pl-[20px]">
      <a-tabs tabPosition="left" animated class="">
        <!-- 第一个页面 -->
        <a-tab-pane key="1" tab="基本设置" class="flex items-center"
          ><a-form name="basic" autocomplete="off">
            <!-- 用户名 -->
            <a-form-item label="用户名" name="username" disabled>
              <a-input
                class="w-[500px] h-[40px]"
                :value="Personal?.data.username"
                disabled
              />
            </a-form-item>
            <!-- 昵称 -->
            <a-form-item
              label="昵称"
              name="username"
              :rules="[{ message: 'Please input your password!' }]"
            >
              <a-input class="w-[500px] h-[40px] ml-[12px]" />
            </a-form-item>
            <!-- 邮箱 -->
            <a-form-item label="邮箱" name="Email">
              <a-input
                class="w-[500px] h-[40px] ml-[12px]"
                :value="Personal?.data.email"
                disabled
              />
            </a-form-item>
            <!-- 手机号 -->
            <a-form-item label="手机号" name="username">
              <a-input class="w-[500px] h-[40px]" />
            </a-form-item>
            <!-- 公司 -->
            <a-form-item label="公司" name="username">
              <a-input class="w-[500px] h-[40px] ml-[12px]" />
            </a-form-item>
            <!-- 城市 -->
            <a-form-item label="城市" name="username">
              <a-input class="w-[500px] h-[40px] ml-[12px]" />
            </a-form-item>
          </a-form>
          <div class="wrap-photo" @click="mengban = true">
            <img
              :src="tihuantu || Personal?.data.avatar"
              alt=""
              :style="mystyle ? mystyle : { width: '180px', height: '180px' }"
              class="xxx"
            />
            <Icon icon="teenyicons:add-outline" class="wrap-photo-plus" />
          </div>
        </a-tab-pane>
        <!-- 第二个页面 -->
        <a-tab-pane key="2" tab="安全设置">安全设置</a-tab-pane>
        <!-- 第三个页面 -->
        <a-tab-pane key="3" tab="账户绑定">账户绑定</a-tab-pane>
      </a-tabs>
    </div>
  </div>
  <!-- 黑色蒙板 -->
  <div
    class="fixed left-[0] top-0 bottom-0 right-0"
    style="background-color: rgba(0, 0, 0, 0.4)"
    v-show="mengban"
  >
    <!-- 大图裁剪 -->
    <div class="w-[680px] h-[555px] mt-[15vh] mx-auto bg-[white] z-[1000]">
      <!-- 头部 -->
      <div
        class="w-[100%] h-[54px] flex items-center justify-between px-[20px]"
      >
        <p>修改头像</p>
        <Icon
          icon="tabler:x"
          class="text-[#909399] yes"
          @click.stop="mengban = false"
        />
      </div>
      <!-- 身体 -->
      <div
        class="w-[100%] h-[501px] p-[40px] flex"
        style="border-top: 1px solid #dcdfe6"
      >
        <!-- 插件图 -->
        <div class="w-[350px] h-[350px]">
          <!-- 插件图 -->
          <div class="w-[350px] h-[350px]">
            <vue-cropper
              autoCrop
              :img="imageUrl"
              ref="cropperRef"
              centerBox
              fixed
              autoCropWidth="200px"
              autoCropHeight="200px"
              @realTime="realTime"
            />
          </div>
          <input
            type="file"
            @change="handleFileInput"
            id="fileInput"
            style="display: none"
          />
          <!-- 按键 -->
          <div class="flex mt-[10px]">
            <button class="el-button el-button--primary flex">
              <Icon icon="clarity:upload-line" /><span
                ><label for="fileInput">选择文件</label>
              </span>
            </button>
            <!-- 加 -->
            <button
              class="el-button el-button--primary flex ml-[10px]"
              @click="changeScale(1)"
            >
              <Icon icon="ic:baseline-add" />
            </button>
            <!-- 减 -->
            <button
              class="el-button el-button--primary flex ml-[10px]"
              @click="changeScale(-1)"
            >
              <Icon icon="iconamoon:sign-minus" />
            </button>
            <!-- 顺 -->
            <button
              class="el-button el-button--primary flex ml-[10px]"
              @click="rotateClick('left')"
            >
              <Icon icon="ph:arrow-counter-clockwise-bold" />
            </button>
            <!-- 逆 -->
            <button
              class="el-button el-button--primary flex ml-[10px]"
              @click="rotateClick('right')"
            >
              <Icon icon="ph:arrow-clockwise-bold" />
            </button>
            <!-- 保存 -->
            <button
              class="el-button el-button--primary flex ml-[73px]"
              style="background-color: #67c23a; border-color: #67c23a"
              @click="Isimghove"
            >
              保存
            </button>
          </div>
          <!-- <input type="file" @change="change" /> -->
        </div>
        <!-- 预览图 -->
        <div class="h-[200px] ml-[25px] mt-[77px]">
          <div class="review relative">
            <img
              :src="previews.url"
              alt="实时预览"
              :style="previews.img"
              class="xxx"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { notification, type FormInstance } from "ant-design-vue";
import { ref } from "vue";
import indexmenu from "../HeadNavigation.vue";
import "vue-cropper/dist/index.css";
import { VueCropper } from "vue-cropper";
import { Information } from "@/service/index";
//用来替换的style
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mystyle = ref<any>(null);
// 用来替换的图
const tihuantu = ref<any>(null);
//蒙版
const mengban = ref<boolean>(false);
const handleFileInput = (event: Event) => {
  const inputElement = event.target as HTMLInputElement;
  const file = inputElement.files && inputElement.files[0];

  if (file) {
    imageUrl.value = URL.createObjectURL(file);
  }
};

const cropperRef: any = ref({}); // 获取图片裁剪实例
const imageUrl = ref(""); // 使用ref创建响应式数据
//预加载
const previews: any = ref({});
const realTime = (data: any) => {
  previews.value = data;
};
//放大缩小

let changeScale = (num: number) => {
  const scale = num || 1;
  cropperRef.value.changeScale(scale);
};

// 旋转图片
let rotateClick = (type: string) => {
  if (type == "left") {
    cropperRef.value.rotateLeft();
  }
  if (type == "right") {
    cropperRef.value.rotateRight();
  }
};
//请求数据
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
//判断是否有图
const Isimghove = () => {
  if (imageUrl.value === "") {
    notification.open({
      type: "error",
      message: `请提交图片后保存`,
    });
  } else {
    mengban.value = false;
    tihuantu.value = imageUrl.value;
    mystyle.value = previews.value.img;
  }
};
//上传图片1
// function change(e: Event) {
//   const fd = new FormData();
//   const files = (e.target as HTMLInputElement).files;
//   if (files?.["0"]) {
//     fd.append("file", files[0]);
//   }
//   uploadFile(fd).then((res) => {
//     console.log(res.data.path);
//   });
// }
// 上传图片
// function change(e: Event) {
//   const fd = new FormData();
//   const files = (e.target as HTMLInputElement).files;
//   if (files?.[0]) {
//     fd.append("file", files[0]);
//   }

//   const params = {
//     creator_id: 80,
//     extension: ".jpg",
//     file_type: "image/jpeg",
//     filename: "07.jpg",
//     path: "/public/uploads/20230804033703_669823670.jpg",
//     project_id: 1000392,
//     size: "338970",
//     title: "07",
//   };

//   uploadFile(fd, params).then((res) => {
//     console.log(res.data);
//   });
// }
</script>
<style>
.el-button--primary {
  color: #fff;
  background-color: #409eff;
  border-color: #409eff;
}
.el-button {
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  border: 1px solid #dcdfe6;
  color: white;
  -webkit-appearance: none;
  text-align: center;
  box-sizing: border-box;
  outline: 0;
  transition: 0.1s;
  font-weight: 500;
  padding: 12px 20px;
  font-size: 14px;
  border-radius: 4px;
}
.review {
  width: 200px;
  height: 200px;
  overflow: hidden;
  border-radius: 50%;
  box-shadow: 0 0 4px #ccc;
}
.xxx {
  max-width: 2000px !important;
  min-width: 180px !important;
}
.wrap-photo {
  position: absolute;
  top: 30px;
  right: 30px;
  width: 180px;
  height: 180px;
  overflow: hidden;
  cursor: pointer;
  border-radius: 50%;
  box-shadow: 0 0 10px #ccc;
}
.wrap-photo-plus {
  position: absolute;
  top: 50%;
  left: 50%;
  font-size: 46px;
  color: #fff;
  opacity: 0;
  transition: 500ms;
  transform: translate(-50%, -50%);
}
.wrap-photo-plus:hover {
  opacity: 1;
}
.yes:hover {
  color: #409eff;
}
</style>
