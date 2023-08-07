import http from "@/utils/http";

// 用户名 | 邮箱
export const isUserExists = async (
  params: { username: string } | { email: string },
) =>
  (
    await http.get<IBaseResponse>("/api/v1/users/exists_user_unique_fields", {
      params,
    })
  ).data.code;

// 发送验证码
export const sendVerificationCodes = async (data: {
  target: string;
  type: 1;
}) =>
  (await http.post<IBaseResponse>("/api/v1/verification_codes", data)).data
    .code;

// 重置密码
export const resetPassword = async (data: {
  email: string;
  code: string;
  password: string;
  passwordConfirm: string;
}) => (await http.put<IBaseResponse>("/api/v1/users/password", data)).data.code;

// 注册账号
export const registeredAccount = async (data: {
  email: string;
  code: string;
  username: string;
  password: string;
  passwordConfirm: string;
  avatar: string;
  verification_type: number;
}) => (await http.post<IBaseResponse>("/api/v1/users", data)).data.code;

// 登录账号
export const isUsersLogin = async (data: {
  password: string;
  username: string;
}) => (await http.post<TLoginResponse>("/api/v1/users/login", data)).data.code;

// 进行中的项目

export const ongoingProject = async (params: {
  is_recycle: number;
  is_archived: number;
}) =>
  (
    await http.get<IOngingProject>("/api/v1/projects/list", {
      params,
    })
  ).data;

// 项目进度
export const Phase = async (params: {
  project_id: number;
  prop_order: string;
  order: string;
}) =>
  (
    await http.get<PhaseProject>("/api/v1/task_lists/list", {
      params,
    })
  ).data;

// 项目进度
export const ProjectStatus = async (params: { id: number }) =>
  (
    await http.get<ProjectStatus>("/api/v1/projects/statistics", {
      params,
    })
  ).data;

// 用户名和密码
// api / v1 / users / user_info;
export const Information = async () =>
  (await http.get<Informations>("/api/v1/users/user_info", {})).data;

// 我的任务-我参与的
export const MyTasks = async (params: {
  limit: number;
  offset: number;
  is_done: number;
  is_recycle: number;
  participator_id: number;
}) =>
  (
    await http.get<IMyTasks>("/api/v1/tasks/list", {
      params,
    })
  ).data;
// 我的任务-我创建的
export const MyTasks2 = async (params: {
  limit: number;
  offset: number;
  is_done: number;
  is_recycle: number;
  creator_id: number;
}) =>
  (
    await http.get<IMyTasks>("/api/v1/tasks/list", {
      params,
    })
  ).data;
// 我的任务-我执行的
export const MyTasks3 = async (params: {
  limit: number;
  offset: number;
  is_done: number;
  is_recycle: number;
  executor_ids: number;
}) =>
  (
    await http.get<IMyTasks>("/api/v1/tasks/list", {
      params,
    })
  ).data;
// 菜单路由
export const GetUserMenus = async () =>
  (await http.get<TLayout>("/api/v1/menus/user_menus")).data.data;

// 上传图片1
export const uploadFile = async (fd: FormData) =>
  (
    await http.post("/api/v1/uploads", fd, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
  ).data;

//上传图片到项目
// export const uploadFile2 = async (
//   fd: FormData,
//   params: {
//     creator_id: number;
//     extension: string;
//     file_type: string;
//     filename: string;
//     path: string;
//     project_id: number;
//     size: string;
//     title: string;
//   },
// ) =>
//   (
//     await http.post("/api/v1/project_files", fd, {
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//     })
//   ).data;
