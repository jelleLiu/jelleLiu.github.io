/**
 * JQueryHelper
 * 
 * 使用JQuery库，与后台服务进行JSON数据通讯
 * 实现前端业务持久化功能
 */

class JQueryHelper {

  //异步加载实体列表
  LoadEntityList(url, callback, data = "{}") {
    $.ajax({
      type: "GET",
      url: url,
      data: data,
      dataType: 'json',
      complete: function (result, status) {
        callback($.parseJSON(result.responseText));
      }
    });
  }

  //同步加载Json数据
  LoadJsonAsync(url, data) {
    var json = "";
    $.ajax({
      type: "POST",
      url: url,
      async: false,
      data: data,
      dataType: 'json',
      success: function (result) {
        json = result;
      }
    });
    return json;
  };

  //保存实体
  SaveEntity(url, data) {
    $.ajax({
      type: "POST",
      url: url,
      data: data,
      dataType: 'json',
      success: function (result) {
        console.log(url + ": " + result);
      }
    });
  };

  //保存实体，同步返回ID
  SaveEntityAsync(url, data) {
    var id = 0;
    $.ajax({
      type: "POST",
      url: url,
      async: false,
      data: data,
      dataType: 'json',
      success: function (result) {
        id = parseInt(result);
      }
    });
    //console.log(id);
    return id;
  };

  //保存实体
  SaveEntityReturn(url, data, callback) {
    $.ajax({
      type: "POST",
      url: url,
      data: data,
      dataType: 'json',
      complete: function (result, status) {
        callback(result);
      }
    });
  };

  //删除实体
  DelEntity(url, data) {
    $.ajax({
      type: "POST",
      url: url,
      data: data,
      dataType: 'json',
      success: function (result) {
        console.log(result);
      }
    });
  };

  /**
   * IsoTables.asmx/LoadTables
   * IsoTables.asmx/SaveTable
   * 
   */

}