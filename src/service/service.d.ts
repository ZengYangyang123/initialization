interface IBaseResponse<T = null> {
  code: 0 | 404 | 40000;
  data: T;
  msg: string;
}

type TLoginResponse = IBaseResponse<{
  accessToken: string;
  refreshToken: string;
  csrf: string;
}>;
//项目
type IOngingProject = IBaseResponse<ongoingProjectData>;

interface ongoingProjectData {
  count: number;
  rows: ongoingProjectRow[];
}

interface ongoingProjectRow {
  id: number;
  name: string;
  parent_id: number;
  manager_id: number;
  project_template_id: number;
  progress: number;
  cover: string;
  is_recycle: number;
  is_archived: number;
  is_private: number;
  is_auto_progress: number;
  state: number;
  intro: string;
  created_at: string;
  updated_at: string;
  creator: ongoingProjectCreator;
  collector: any[];
  member: ongoingProjectMember[];
}

interface ongoingProjectMember {
  id: number;
  user_id_github: number;
  username: string;
  department_id?: number;
  nickname: string;
  email: string;
  state: number;
  phone: string;
  avatar: string;
  company: string;
  city: string;
  last_login: string;
  created_at: string;
  updated_at: string;
  deleted_at?: any;
  user_projects: ongoingProjectUserprojects;
}

interface ongoingProjectUserprojects {
  id: number;
  user_id: number;
  project_id: number;
  created_at: string;
  updated_at: string;
}

interface ongoingProjectCreator {
  username: string;
  id: number;
  avatar: string;
}

//个人信息
type Informations = IBaseResponse<InformationsData>;

interface InformationsData {
  id: number;
  user_id_github: number;
  username: string;
  department_id?: any;
  nickname: string;
  email: string;
  state: number;
  phone: string;
  avatar: string;
  company: string;
  city: string;
  last_login: string;
  created_at: string;
  updated_at: string;
  roles: Role[];
  permissions: string[];
}
//我的任务
type IMyTasks = IBaseResponse<IMyTasksData>;
interface IMyTasksData {
  count: number;
  rows: IMyTasksRow[];
}

interface IMyTasksRow {
  id: number;
  name: string;
  creator_id: number;
  project_id: number;
  parent_id: number;
  task_list_id: number;
  task_state_id: number;
  task_type_id: number;
  task_priority_id: number;
  executor_id: number;
  start_date: string;
  end_date: string;
  remark?: any;
  is_done: number;
  is_privacy: number;
  is_recycle: number;
  likes: number;
  plan_work_hours: number;
  sort: number;
  created_at: string;
  updated_at: string;
  task_tags: IMyTasksany[];
  executor?: Executor;
  participators: IMyTasksExecutor[];
  project: Project;
  likers: IMyTasksany[];
}

interface IMyTasksProject {
  id: number;
  name: string;
  member: MemberIMyTasks[];
}

interface IMyTasksMember {
  id: number;
  username: string;
}

interface IMyTasksExecutor {
  username: string;
  id: number;
  avatar: string;
}
//动态路由
// 路由
type TLayout = IBaseResponse<
  {
    id: number;
    name: string;
    path: string;
    parent_id: number;
    icon: string;
    title: string;
    hidden: number;
    always_show: number;
    keep_alive: number;
    target: string;
    component: string | (() => Promise<any>);
    redirect: string;
    sort: number;
    role_menus: {
      id: number;
      role_id: number;
      menu_id: number;
      created_at: string;
      updated_at: string;
    };
  }[]
>;
//上传图片的类型
interface IUploadRes {
  filename: string;
  path: string;
  file_type: string;
  size: string;
  extension: string;
}

// 项目进度
type PhaseProject = IBaseResponse<PhaseProjectData>;

interface PhaseProjectData {
  count: number;
  rows: PhaseProjectRow[];
}

interface PhaseProjectRow {
  id: number;
  name: string;
  project_id: number;
  sort: number;
  created_at: string;
  updated_at: string;
}

// 项目状态
type ProjectStatus = IBaseResponse<ProjectStatusData>;

interface ProjectStatusData {
  taskCount: number;
  done: number;
  undone: number;
  overdue: number;
  unreceived: number;
  dueToday: number;
  completedOverdue: number;
  taskPriority: ProjectStatusTaskPriority;
  taskState: ProjectStatusTaskState;
  taskType: ProjectStatusTaskType;
}

interface ProjectStatusTaskType {
  "2": number;
  "3": number;
  "4": number;
}

interface ProjectStatusTaskState {
  [key: string]: string;
  "2": number;
  "3": number;
  "4": number;
  "5": number;
  "6": number;
  "7": number;
}

interface ProjectStatusTaskPriority {
  [key: string]: string;
  "2": number;
  "4": number;
  "5": number;
}
