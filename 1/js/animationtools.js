/**
 * AnimationTools
 * 
 * 模型自定义动作、动画工具
 */


class AnimationTools {

  //页面加载阶段响应
  Stage(value, c) {
    var log;
    switch (value) {
      case 1:
        log = "页面加载 OK";
        break;
      case 2:
        log = "模型加载 OK";
        break;
      case 3:
        log = "数据加载 OK";
        break;
      case 4:
        log = "界面加载 OK";
        break;
    }

    console.log("阶段" + value + ": " + log);
    c(value);
  }

  OpenDoor(mesh, target, sec) {

  }
}