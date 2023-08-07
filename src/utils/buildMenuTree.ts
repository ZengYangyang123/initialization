// 定义一个泛型类型 U，它继承自 Record<string, any>。
// U 表示树节点对象的类型。
type U<T extends Record<string, any>> = T & { children: U<T>[] };

// 定义一个函数 list2tree，将平铺的对象列表转换为树形结构。
// 函数接受对象列表、父级 id（默认值为 0）和结果数组（默认值为空数组）作为参数。
export function list2tree<T extends { id: number; parent_id: number }>(
  list: T[],
  parent_id = 0,
  res: U<T>[] = [],
) {
  // 遍历列表中的每个对象。
  for (const item of list) {
    // 如果当前对象的 parent_id 与传入的父级 id 匹配，则创建一个浅拷贝的对象，
    // 并初始化一个空的 children 数组作为拷贝对象的属性。
    if (item.parent_id === parent_id) {
      const copy = { ...item, children: [] };

      // 递归调用 list2tree 函数，查找当前对象的子级。
      // 将拷贝对象的 children 数组作为新的结果数组进行传递。
      list2tree(list, item.id, copy.children);

      // 将带有子级的拷贝对象推入结果数组。
      res.push(copy);
    }
  }

  // 返回转换后的树形结构。
  return res;
}
