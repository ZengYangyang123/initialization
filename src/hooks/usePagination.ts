import { data } from "autoprefixer";
import { ref } from "vue";
const usePagination = <T extends Record<string, unknown>>(
  dataSource: T[],
  limit = 5,
) => {
  //当前页面
  const current = ref(1);
  //每条数据页面
  const pageSize = ref(limit);
  //数据总条数
  const total = ref(dataSource.length);

  // 返回当前页面对应的数据片段
  //   watchEffect(() => {
  //     total.value = dataSource.value?.length ?? 0;
  //   });
  const chunk = ref<T[]>();
  watchEffect(() => {
    chunk.value = dataSource.slice(
      (current.value - 1) * pageSize.value,
      current.value * pageSize.value,
    );
  });
  return { current, pageSize, total, data };
};
export default usePagination;
