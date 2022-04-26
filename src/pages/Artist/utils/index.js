let reg = /^[A-Z]$/;
export function formatType(type) {
  switch (type) {
    case "全部":
    case "热门":
      return -1;
    case "男歌手":
      return 1;
    case "女歌手":
      return 2;
    case "乐队组合":
      return 3;
    case "华语":
      return 7;
    case "欧美":
      return 96;
    case "日本":
      return 8;
    case "韩国":
      return 16;
    case "其他":
      return 0;
    case "#":
      return 0;
  }
  if (reg.test(type)) {
    return type.toLowerCase();
  }
}

export function formatLabel(vm, label, type) {
  console.log(label);
  switch (label) {
    case "语种":
      vm.area = type;
      break;
    case "分类":
      vm.type = type;
      break;
    case "筛选":
      vm.initial = type;
      break;
    default:
      break;
  }
}
