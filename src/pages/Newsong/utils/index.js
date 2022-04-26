export function formatType(type) {
  switch (type) {
    case "全部":
      return 0;
    case "华语":
      return 7;
    case "欧美":
      return 96;
    case "日本":
      return 8;
    case "韩国":
      return 16;
  }
}
export function formatAlbumArea(area) {
  switch (area) {
    case "全部":
      return "ALL";
    case "华语":
      return "ZH";
    case "欧美":
      return "EA";
    case "韩国":
      return "KR";
    case "日本":
      return "JP";
  }
}
