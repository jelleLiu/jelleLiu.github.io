/** 基础数据 */

var Menus = [
  { group: "绿植", count: 40, inGround: false, inPath: false, inGreenArea: true, inWave: false, inBulid: false, restrict: "只能在草坪和地坪上添加绿植树木" },
  { group: "建筑", count: 40, inGround: true, inPath: false, inGreenArea: false, inWave: false, inBulid: false, restrict: "只能在地坪上添加建筑" },
  { group: "设施", count: 40, inGround: true, inPath: true, inGreenArea: true, inWave: false, inBulid: false, restrict: "可以在道路、草坪和地坪上添加设施" },
  { group: "监控", count: 40, inGround: true, inPath: true, inGreenArea: true, inWave: false, inBulid: true, restrict: "建筑、道路、草坪和地坪上添加监控" },
  { group: "车辆", count: 40, inGround: true, inPath: true, inGreenArea: false, inWave: false, inBulid: false, restrict: "可以在道路、草坪和地坪上添加车辆" },
  { group: "人员", count: 40, inGround: false, inPath: false, inGreenArea: true, inWave: false, inBulid: false, restrict: "可以在道路、草坪和地坪上添加人员" }
];

var ModelList = [
  { name: "Tree001", title: "松树", group: "绿植", num: 10, restrict: "", Mesh: null },
  { name: "Tree002", title: "杨树", group: "绿植", num: 10, restrict: "", Mesh: null },
  { name: "Tree003", title: "柳树", group: "绿植", num: 10, restrict: "", Mesh: null },
  { name: "Tree004", title: "灌木", group: "绿植", num: 10, restrict: "", Mesh: null },
  { name: "House001", title: "平房", group: "建筑", num: 10, restrict: "", Mesh: null },
  { name: "House002", title: "工房", group: "建筑", num: 10, restrict: "", Mesh: null },
  { name: "House003", title: "楼房", group: "建筑", num: 10, restrict: "", Mesh: null },
  { name: "House004", title: "临建", group: "建筑", num: 10, restrict: "", Mesh: null },
  { name: "Equipment001", title: "垃圾箱", group: "设施", num: 10, restrict: "", Mesh: null },
  { name: "Equipment002", title: "消防箱", group: "设施", num: 10, restrict: "", Mesh: null },
  { name: "Equipment003", title: "广告牌", group: "设施", num: 10, restrict: "", Mesh: null },
  { name: "Equipment004", title: "路灯", group: "设施", num: 10, restrict: "", Mesh: null },
  { name: "Equipment005", title: "雕塑", group: "设施", num: 10, restrict: "", Mesh: null },
  { name: "Equipment006", title: "石头", group: "设施", num: 10, restrict: "", Mesh: null },
  { name: "Eye001", title: "枪机", group: "监控", num: 10, restrict: "", Mesh: null },
  { name: "Eye002", title: "半球", group: "监控", num: 10, restrict: "", Mesh: null },
  { name: "Eye003", title: "全球", group: "监控", num: 10, restrict: "", Mesh: null },
  { name: "Eye004", title: "考勤", group: "监控", num: 10, restrict: "", Mesh: null },
  { name: "Car001", title: "卡车", group: "车辆", num: 10, restrict: "", Mesh: null },
  { name: "Car002", title: "客车", group: "车辆", num: 10, restrict: "", Mesh: null },
  { name: "Car003", title: "厢车", group: "车辆", num: 10, restrict: "", Mesh: null },
  { name: "Car004", title: "轿车", group: "车辆", num: 10, restrict: "", Mesh: null }
];

/**
 * Toolbar
 *
 * 创建界面工具栏
 * 实现前端业务功能逻辑功能
 */

class Toolbar {

  setMesh(name, mesh) {
    for (var j = 0; j < ModelList.length; j++) {
      if (ModelList[j].name == name) {
        ModelList[j].Mesh = mesh;
        mesh.visible = false;
        return true;
      }
    }
    return false;
  }

  getMesh(name) {
    for (var j = 0; j < ModelList.length; j++) {
      if (ModelList[j].name == name) {
        return ModelList[j];
      }
    }
  }

  getReady(bulidCallback) {
    var editBox = document.createElement('div');
    editBox.id = "EditBox";
    editBox.className = "h6";
    editBox.style.cssText = "position: absolute; bottom:0px;height:130px;width:100%; display:none; overflow:hidden;";

    var tabs = CreateMenu(Menus);
    var panes = CreatePane(Menus, ModelList);

    editBox.appendChild(tabs);
    editBox.appendChild(panes);

    //console.log(editBox);
    document.body.appendChild(editBox);

    function CreateMenu(menus) {
      var tabs = document.createElement('ul');
      tabs.className = "nav nav-tabs";
      for (var i = 0; i < menus.length; i++) {
        var menu = document.createElement('li');
        menu.className = "nav-item";
        var link = document.createElement('a');
        if (i == 0) {
          link.className = "nav-link active";
        }
        else {
          link.className = "nav-link";
        }
        link.setAttribute("data-bs-toggle", "tab");
        link.href = "#menu" + i;
        link.innerText = menus[i].group;

        menu.appendChild(link);
        tabs.appendChild(menu);
      }
      return tabs;
    }

    function CreatePane(menus, models) {
      var panes = document.createElement('div');
      panes.className = "tab-content";
      panes.style.cssText = "margin-top:3px;";

      for (var i = 0; i < menus.length; i++) {
        var pane = document.createElement('div');
        if (i == 0) {
          pane.className = "tab-pane active";
        }
        else {
          pane.className = "tab-pane";
        }
        pane.id = "menu" + i;

        var ul = document.createElement('ul');
        ul.className = "list-group list-group-horizontal list-group-flush";
        var numCount = 0;
        for (var j = 0; j < models.length; j++) {
          if (models[j].group == menus[i].group) {
            models[j].restrict = menus[i].restrict;

            var li = document.createElement('li');
            li.className = "list-group-item picBtn";

            var img = document.createElement('input');
            img.id = models[j].name;
            img.type = "image";
            img.style.cssText = "width: 64px; height: 64px;";
            img.src = "img/" + models[j].name + ".png"

            img.onclick = bulidCallback;
            //img.setAttribute("onclick", "BulidCallback('" + models[j].name + "', '" + models[j].title + "', '" + menus[i].restrict + "');");

            li.appendChild(img);

            var br = document.createElement('br');
            li.appendChild(br);

            var h6 = document.createElement('h6');
            h6.style.cssText = "font-size: 0.3rem;";
            h6.innerText = models[j].title;
            li.appendChild(h6);

            ul.appendChild(li);

            numCount += models[j].num;
          }
        }

        var group = document.createElement('li');
        group.className = "list-group-item groupBox";

        var small = document.createElement('small');
        small.innerText = "共有" + menus[i].group;
        group.appendChild(small);

        var pc = document.createElement('p');
        pc.style.cssText = "margin-bottom: 0rem; font-size:1.5rem;";
        pc.innerText = menus[i].count;
        group.appendChild(pc);

        var pt = document.createElement('p');
        pt.style.cssText = "font-size:0.3rem; text-align:left;margin-top:5px;";
        pt.innerText = menus[i].restrict;
        group.appendChild(pt);

        ul.insertBefore(group, ul.childNodes[0]);

        pane.appendChild(ul);

        panes.appendChild(pane);
      }

      return panes;
    }
  }


  BulidParts(PartTree, bulidCallback) {
    var editBox = document.createElement('div');
    editBox.id = "PartsBox";
    editBox.className = "h6";
    editBox.style.cssText = "position: absolute; left: 300px; bottom: 0px; height: 130px; width: calc(100% - 700px); overflow:hidden; z-index: 1000;; display:none;";



    var groups = document.createElement('div');
    groups.style.cssText = "width:125px;height:130px;float:left;font-size:12px;"
    for (var i = 0; i < PartTree.PartGroups.length; i++) {
      var h = document.createElement("div");
      h.style.cssText = "margin: 5px;";
      var b = document.createElement("button");
      if (i == 0) {
        b.classList = "GroupBtn btn btn-block btn-outline btn-success btn-info btn-sm";
      }
      else {
        b.classList = "GroupBtn btn btn-block btn-outline btn-success btn-sm";
      }
      b.id = i;
      b.style.cssText = "width:115px;";
      b.type = "button";
      b.innerText = decodeURI(PartTree.PartGroups[i].Title) + " ";
      b.onclick = function () {
        $(".GroupBtn").removeClass("btn-info");
        this.classList = "GroupBtn btn btn-block btn-outline btn-success btn-info btn-sm";
        $(".fa-chevron-right").removeClass("fa-chevron-right");
        this.childNodes[1].classList = "fa fa-fw fa-chevron-right";

        $(".GroupTab").hide();
        $("#groupTab" + this.id).show();

        $(".GroupBox").hide();
        $("#groupBox" + this.id).show();
      };
      var icon = document.createElement("i");
      icon.classList = "fa fa-fw";
      if (i == 0) {
        icon.classList = "fa fa-fw fa-chevron-right";
      }
      b.appendChild(icon);
      h.appendChild(b);
      groups.appendChild(h);
    }
    editBox.appendChild(groups);



    var tabs = document.createElement("div");
    for (var i = 0; i < PartTree.PartGroups.length; i++) {
      var tab = document.createElement('ul');
      tab.id = "groupTab" + i;
      tab.className = "nav nav-tabs GroupTab";
      if (i != 0) {
        tab.style.display = "none";
      }
      for (var j = 0; j < PartTree.PartGroups[i].SubGroup.length; j++) {
        var menu = document.createElement('li');
        menu.className = "nav-item";
        menu.style.cssText = "background-color:rgba(255, 255, 255, 0.3);";
        var link = document.createElement('a');
        if (j == 0) {
          link.className = "nav-link active";
        }
        else {
          link.className = "nav-link";
        }
        link.setAttribute("data-bs-toggle", "tab");
        link.href = "#group" + i + "menu" + j;
        link.innerText = decodeURI(PartTree.PartGroups[i].SubGroup[j].Title);
        menu.appendChild(link);
        tab.appendChild(menu);
      }
      tabs.appendChild(tab);
    }
    editBox.appendChild(tabs);



    var paneGroup = document.createElement('div');
    for (var h = 0; h < PartTree.PartGroups.length; h++) {
      var panes = document.createElement('div');
      panes.id = "groupBox" + h;
      panes.className = "tab-content GroupBox";
      panes.style.cssText = "margin-top:3px;";
      if (h != 0) {
        panes.style.display = "none";
      }
      for (var i = 0; i < PartTree.PartGroups[h].SubGroup.length; i++) {
        var pane = document.createElement('div');
        if (i == 0) {
          pane.className = "tab-pane active";
        }
        else {
          pane.className = "tab-pane";
        }
        pane.id = "group" + h + "menu" + i;
        var ul = document.createElement('ul');
        ul.className = "list-group list-group-horizontal list-group-flush";
        ul.style.cssText = "background-color: rgb(240 240 240 / 75%);";
        var numCount = 0;
        if (PartTree.PartGroups[h].SubGroup[i].Parts != undefined) {
          for (var j = 0; j < PartTree.PartGroups[h].SubGroup[i].Parts.length; j++) {
            var li = document.createElement('li');
            li.className = "list-group-item picBtn";
            li.style.cssText = "background-color:#CCCCCC;";
            var img = document.createElement('input');
            img.id = PartTree.PartGroups[h].SubGroup[i].Parts[j].PartID;
            img.type = "image";
            img.style.cssText = "width: 64px; height: 64px;";
            img.src = "" + PartTree.PartGroups[h].SubGroup[i].Parts[j].PicFile;
            img.obj = PartTree.PartGroups[h].SubGroup[i].Parts[j];
            img.onclick = bulidCallback;
            //img.setAttribute("onclick", "BulidCallback('" + models[j].name + "', '" + models[j].title + "', '" + menus[i].restrict + "');");
            li.appendChild(img);
            var br = document.createElement('br');
            li.appendChild(br);
            var h6 = document.createElement('h6');
            h6.style.cssText = "font-size: 0.3rem;";
            h6.innerText = decodeURI(PartTree.PartGroups[h].SubGroup[i].Parts[j].PartName);
            li.appendChild(h6);
            ul.appendChild(li);
            numCount += 1;
          }
        }
        var group = document.createElement('li');
        group.className = "list-group-item groupBox";
        group.style.cssText = "width: 70px;";
        var small = document.createElement('small');
        small.innerText = "共有";
        small.style.cssText = "margin-top:0.5rem;";
        group.appendChild(small);
        var pc = document.createElement('p');
        pc.style.cssText = "margin-bottom: 0rem; font-size:1.5rem; margin-top:0.5rem;";
        pc.innerText = numCount;
        group.appendChild(pc);
        var pt = document.createElement('p');
        pt.style.cssText = "font-size:0.5rem; text-align:center;margin-top:5px;";
        pt.innerText = "项";
        group.appendChild(pt);
        ul.insertBefore(group, ul.childNodes[0]);
        pane.appendChild(ul);
        panes.appendChild(pane);
      }
      paneGroup.appendChild(panes);
    }
    editBox.appendChild(paneGroup);

    document.body.appendChild(editBox);
  }

  GotoGroup() {
    var btnGroup1 = document.createElement('div');
    btnGroup1.className = "btn-group btn-group-sm";
    var btnDropdown1 = CreateDropdown("turnBtn", "跳转")
    btnGroup1.appendChild(btnDropdown1);

    var links = [
      { "num": 0, "title": "长治场站", "url": "/CZCZ.html" },
      { "num": 1, "title": "工厂营区", "url": "/index.html" },
      { "num": 2, "title": "浏览模式", "url": "/game.html" },
      { "num": 3, "title": "产品中心", "url": "/product.html" },
      { "num": 4, "title": "智能工具柜", "url": "/Box.html" },
      { "num": 5, "title": "二型电源车", "url": "/HCDF02.html" },
      { "num": 6, "title": "精致贴图", "url": "/Tracer.html" }
    ];

    var btnMenu1 = document.createElement('ul');
    btnMenu1.className = "dropdown-menu";
    btnMenu1.style.cssText = "min-width: 6rem;";

    var page = window.location.pathname;
    //console.log(page);
    for (var i = 0; i < links.length; i++) {
      if (links[i].url != page) {
        btnMenu1.appendChild(CreateLink(links[i]));
      }
    }

    btnGroup1.appendChild(btnMenu1);

    return btnGroup1;

    function CreateLink(link) {
      var li = document.createElement('li');
      var l = document.createElement('a');
      l.className = "dropdown-item";
      //link.id = id;
      l.innerText = link.title;
      l.href = link.url;
      li.appendChild(l);
      //li.onclick = function () {
      //    $(location).attr("href", link.url);
      //};
      return li;
    }

    function CreateDropdown(id, name) {
      var btn = document.createElement('button');
      //btn.id = id;
      btn.type = "button";
      btn.className = "btn btn-outline-dark dropdown-toggle";
      btn.setAttribute("data-bs-toggle", "dropdown");
      btn.innerText = name;
      return btn;
    }
  }

  IndexToolbar(c1, c2, c3, c4, c5, c6, c7) {
    var toolbar = document.createElement('div');
    toolbar.id = "toolbar";
    toolbar.className = "btn-group btn-group-sm";
    toolbar.style.cssText = "position: absolute; right: 10px; top: 10px;";

    toolbar.appendChild(this.GotoGroup());

    var btnGroup2 = document.createElement('div');
    btnGroup2.className = "btn-group btn-group-sm";
    var btnDropdown2 = CreateDropdown("DropdownBtn", "效果")
    btnGroup2.appendChild(btnDropdown2);

    var btnMenu2 = document.createElement('ul');
    btnMenu2.className = "dropdown-menu";
    btnMenu2.style.cssText = "min-width: 5rem;";

    var btn2 = CreateLink("blueLightBtn", "○ 光圈");
    btn2.onclick = c2;
    btnMenu2.appendChild(btn2);

    var btn3 = CreateLink("rotateBtn", "○ 旋转");
    btn3.onclick = c3;
    btnMenu2.appendChild(btn3);

    var btn4 = CreateLink("outlineBtn", "○ 轮廓");
    btn4.onclick = c4;
    btnMenu2.appendChild(btn4);

    btnGroup2.appendChild(btnMenu2);
    toolbar.appendChild(btnGroup2);

    var btn5 = CreateBtn("rangeBtn", "测距");
    btn5.onclick = c5;
    toolbar.appendChild(btn5);

    var btn1 = CreateBtn("editMapBtn", "建模");
    btn1.onclick = c1;
    toolbar.appendChild(btn1);

    var btn6 = CreateBtn("hideBtn", "隐藏建筑");
    btn6.onclick = c6;
    toolbar.appendChild(btn6);

    var btn10 = CreateBtn("SplitBtn", "炸开");
    btn10.onclick = c7;
    toolbar.appendChild(btn10);

    //console.log(toolbar);
    document.body.appendChild(toolbar);

    //console.log(toolbar);

    function CreateBtn(id, name) {
      var btn = document.createElement('button');
      btn.id = id;
      btn.type = "button";
      btn.className = "btn btn-outline-dark";
      btn.innerText = name;
      return btn;
    }

    function CreateDropdown(id, name) {
      var btn = document.createElement('button');
      //btn.id = id;
      btn.type = "button";
      btn.className = "btn btn-outline-dark dropdown-toggle";
      btn.setAttribute("data-bs-toggle", "dropdown");
      btn.innerText = name;
      return btn;
    }

    function CreateLink(id, name) {
      var li = document.createElement('li');
      var link = document.createElement('a');
      link.className = "dropdown-item";
      link.id = id;
      link.innerText = name;
      link.href = "#";
      li.appendChild(link);
      return li;
    }
  }

  ProductMeshNav(allMeshs, c1, c2, c3, c4, c5, c6, c7) {
    //console.log(allMeshs);
    try {
      var nb = document.getElementById('NavigationBox');
      nb.outerHTML = "";
    } catch { }

    var navBox = document.createElement('div');
    navBox.id = "NavigationBox";
    navBox.className = "alert alert-primary text-start";
    navBox.style.cssText = "position: absolute; display: none; background-color: #f0f3f4; z-index: 100; overflow: scroll;";

    var closeBtn = document.createElement('button');
    closeBtn.id = "NavigationClose";
    closeBtn.type = "button";
    closeBtn.className = "btn-close";
    closeBtn.style.cssText = "float:right; background-color:rgb(255 255 255);";
    closeBtn.onclick = c1;
    navBox.appendChild(closeBtn);

    var title = document.createElement('strong');
    title.innerText = "模型导航";
    navBox.appendChild(title);
    navBox.appendChild(document.createElement('br'));
    var info = document.createElement('label');
    info.innerText = "将镜头转向模型，或隐藏模型";
    navBox.appendChild(info);
    navBox.appendChild(document.createElement('br'));
    navBox.appendChild(document.createElement('br'));
    //navBox.appendChild(document.createElement('label'));

    navBox.appendChild(CreateBtn("tagBtn", "隐藏标识", "btn btn-outline-primary", c6));
    navBox.appendChild(CreateBtn("hideBtn", "全部隐藏", "btn btn-outline-primary", c7));

    var ams = allMeshs.sort(function (x, y) {
      if (x.group + x.name > y.group + y.name) {
        return 1;
      } else if (x.group + x.name < y.group + y.name) {
        return -1;
      } else {
        return 0;
      }
    });


    var navGroups = groupBy(ams, 'group');

    //console.log(navGroups);

    var otherGroup;
    var hasOther = false;

    for (var g in navGroups) {
      var navGroup = CreateGroup(g);
      var nav1 = document.createElement('ul');
      //console.log(g);
      //console.log(navGroups[g].length);
      for (var i = 0; i < navGroups[g].length; i++) {
        var m = navGroups[g][i];
        if (m.isMesh) {
          //console.log(m.name);
          var name = m.name;
          if (name.length > 0) {
            nav1.appendChild(CreateLink(m));
          }
        }
      }
      navGroup.appendChild(nav1);

      if (g == "") {
        otherGroup = navGroup;
        hasOther = true;
      }
      else {
        navBox.appendChild(navGroup);
      }
    }

    if (hasOther) {
      navBox.appendChild(otherGroup);
    }

    document.body.appendChild(navBox);

    function groupBy(list, key) {
      const groups = {};
      list.forEach(c => {
        var value = c[key];
        if (value == null || value == undefined) {
          value = "";
        }
        groups[value] = groups[value] || [];
        groups[value].push(c);
      });
      return groups;
    }

    function CreateGroup(gn) {
      var g = document.createElement('div');
      var icon = document.createElement('i');
      icon.className = "fa fa-eye";
      icon.setAttribute("group", gn);
      icon.onclick = c5;
      g.appendChild(icon);
      var exp = document.createElement('i');
      exp.classList = "fa fa-chevron-down";
      exp.setAttribute("group", gn);
      g.appendChild(exp);

      var t = document.createElement('strong');
      if (gn == "") {
        t.innerText = "* 未分组 *";
      } else {
        t.innerText = gn;
      }
      g.appendChild(t);
      return g;
    }

    function CreateLink(meshItem) {
      var li = document.createElement('li');
      var icon = document.createElement('i');
      icon.className = "fa fa-eye";
      icon.setAttribute("mesh", meshItem.name);
      icon.onclick = c2;
      li.appendChild(icon);

      var edit = document.createElement('i');
      edit.className = "fa fa-edit";
      edit.setAttribute("mesh", meshItem.name);
      edit.onclick = c4;
      li.appendChild(edit);

      var link = document.createElement('a');
      //console.warn(meshItem);
      if (meshItem.title != null) {
        link.innerText = meshItem.title + " (" + meshItem.name + ")";

      }
      else {
        link.innerText = meshItem.name;
      }
      link.setAttribute("mesh", meshItem.name);
      link.onclick = c3;
      link.href = "#";
      li.appendChild(link);
      return li;
    }

    function CreateBtn(id, name, linkCss, c) {
      var link = document.createElement('a');
      link.id = id;
      link.className = linkCss;
      link.style.cssText = "margin: 3px;";
      //link.innerText = name;
      link.href = "#";
      link.onclick = c;
      //var icon = document.createElement('i');
      //icon.className = iconCss;
      //link.appendChild(icon);
      link.appendChild(document.createTextNode(" " + name));
      return link;
    }

    return navBox;
  }

  ProductToolbar(c1, c2, c3, c4, c5, c6) {
    var toolbar = document.createElement('div');
    toolbar.id = "toolbar";
    toolbar.className = "btn-group btn-group-sm";
    toolbar.style.cssText = "position: absolute; right: 10px; top: 10px; background-color:rgb(255 255 255 / 0.40);";

    toolbar.appendChild(this.GotoGroup());

    var btn2 = CreateBtn("ModelBtn", "产品设置");
    btn2.onclick = c2;
    toolbar.appendChild(btn2);

    var btn5 = CreateBtn("tagBtn", "隐藏标识");
    btn5.onclick = c5;
    toolbar.appendChild(btn5);

    var btn6 = CreateBtn("hideBtn", "隐藏命名对象");
    btn6.onclick = c6;
    toolbar.appendChild(btn6);

    var btn1 = CreateBtn("editMapBtn", "建模");
    btn1.onclick = c1;
    toolbar.appendChild(btn1);

    //console.log(toolbar);
    document.body.appendChild(toolbar);

    //console.log(toolbar);

    function CreateBtn(id, name) {
      var btn = document.createElement('button');
      btn.id = id;
      btn.type = "button";
      btn.className = "btn btn-outline-dark";
      btn.innerText = name;
      return btn;
    }

    function CreateDropdown(id, name) {
      var btn = document.createElement('button');
      //btn.id = id;
      btn.type = "button";
      btn.className = "btn btn-outline-dark dropdown-toggle";
      btn.setAttribute("data-bs-toggle", "dropdown");
      btn.innerText = name;
      return btn;
    }

    function CreateLink(id, name) {
      var li = document.createElement('li');
      var link = document.createElement('a');
      link.className = "dropdown-item";
      link.id = id;
      link.innerText = name;
      link.href = "#";
      li.appendChild(link);
      return li;
    }
  }

  UserToolbar(c1, c2, c3, c4, c5, c6, c7, c8) {
    var toolbar = document.createElement('div');
    toolbar.id = "toolbar";
    toolbar.className = "btn-group btn-group-sm";
    toolbar.style.cssText = "position: absolute; right: 10px; top: 10px; background-color:rgb(255 255 255 / 0.40);";

    toolbar.appendChild(this.GotoGroup());

    //var btn2 = CreateBtn("ModelBtn", "产品设置");
    //btn2.onclick = c2;
    //toolbar.appendChild(btn2);

    //var btn5 = CreateBtn("tagBtn", "隐藏标识");
    //btn5.onclick = c5;
    //toolbar.appendChild(btn5);

    //var btn6 = CreateBtn("hideBtn", "隐藏命名对象");
    //btn6.onclick = c6;
    //toolbar.appendChild(btn6);

    //var btn1 = CreateBtn("editMapBtn", "建模");
    //btn1.onclick = c1;
    //toolbar.appendChild(btn1);

    //console.log(toolbar);
    document.body.appendChild(toolbar);

    //console.log(toolbar);

    function CreateBtn(id, name) {
      var btn = document.createElement('button');
      btn.id = id;
      btn.type = "button";
      btn.className = "btn btn-outline-dark";
      btn.innerText = name;
      return btn;
    }

    function CreateDropdown(id, name) {
      var btn = document.createElement('button');
      //btn.id = id;
      btn.type = "button";
      btn.className = "btn btn-outline-dark dropdown-toggle";
      btn.setAttribute("data-bs-toggle", "dropdown");
      btn.innerText = name;
      return btn;
    }

    function CreateLink(id, name) {
      var li = document.createElement('li');
      var link = document.createElement('a');
      link.className = "dropdown-item";
      link.id = id;
      link.innerText = name;
      link.href = "#";
      li.appendChild(link);
      return li;
    }
  }

  BoxToolbar(c1, c2, c3, c4, c5) {
    var toolbar = document.createElement('div');
    toolbar.id = "toolbar";
    toolbar.className = "btn-group btn-group-sm";
    toolbar.style.cssText = "position: absolute; right: 10px; top: 10px; background-color:rgb(255 255 255 / 0.40);";

    toolbar.appendChild(this.GotoGroup());

    var btn2 = CreateBtn("ModelBtn", "设置");
    btn2.onclick = c2;
    toolbar.appendChild(btn2);

    var btn3 = CreateBtn("BoxRangeBtn", "测距");
    btn3.onclick = c3;
    toolbar.appendChild(btn3);

    var btn4 = CreateBtn("PlayBtn", "演示");
    btn4.onclick = c4;
    toolbar.appendChild(btn4);

    var btn5 = CreateBtn("ChartBtn", "布局");
    btn5.onclick = c5;
    toolbar.appendChild(btn5);

    var btn1 = CreateBtn("editMapBtn", "建模");
    btn1.onclick = c1;
    toolbar.appendChild(btn1);

    //console.log(toolbar);
    document.body.appendChild(toolbar);

    //console.log(toolbar);

    function CreateBtn(id, name) {
      var btn = document.createElement('button');
      btn.id = id;
      btn.type = "button";
      btn.className = "btn btn-outline-dark";
      btn.innerText = name;
      return btn;
    }

    function CreateDropdown(id, name) {
      var btn = document.createElement('button');
      //btn.id = id;
      btn.type = "button";
      btn.className = "btn btn-outline-dark dropdown-toggle";
      btn.setAttribute("data-bs-toggle", "dropdown");
      btn.innerText = name;
      return btn;
    }

    function CreateLink(id, name) {
      var li = document.createElement('li');
      var link = document.createElement('a');
      link.className = "dropdown-item";
      link.id = id;
      link.innerText = name;
      link.href = "#";
      li.appendChild(link);
      return li;
    }
  }

  EditToolbar(c1, c2, c3, c4, c5, c6, ShowRole, ShowBulid) {
    var toolbar = document.createElement('div');
    toolbar.id = "toolbar";
    toolbar.className = "btn-group btn-group-sm";
    toolbar.style.cssText = "position: absolute; right: 10px; top: 10px; background-color:rgb(255 255 255 / 0.40);";

    //toolbar.appendChild(this.GotoGroup());

    //var btn2 = CreateBtn("ModelBtn", "设置");
    //btn2.onclick = c2;
    //toolbar.appendChild(btn2);

    if (ShowRole) {
      var btn3 = CreateBtn("BoxRangeBtn", "测距");
      btn3.onclick = c3;
      toolbar.appendChild(btn3);
    }

    var btn4 = CreateBtn("PlayBtn", "演示");
    btn4.onclick = c4;
    toolbar.appendChild(btn4);

    if (ShowBulid) {
      var btn5 = CreateBtn("bulidTreeBtn", "种植");
      btn5.onclick = c5;
      toolbar.appendChild(btn5);
    }

    //var btn6 = CreateBtn("VisualBind", "大屏数据");
    //btn6.onclick = c6;
    //toolbar.appendChild(btn6);

    //var btn1 = CreateBtn("editMapBtn", "建模");
    //btn1.onclick = c1;
    //toolbar.appendChild(btn1);

    //console.log(toolbar);
    document.body.appendChild(toolbar);

    //console.log(toolbar);

    function CreateBtn(id, name) {
      var btn = document.createElement('button');
      btn.id = id;
      btn.type = "button";
      btn.className = "btn btn-outline-dark";
      btn.innerText = name;
      return btn;
    }

    function CreateDropdown(id, name) {
      var btn = document.createElement('button');
      //btn.id = id;
      btn.type = "button";
      btn.className = "btn btn-outline-dark dropdown-toggle";
      btn.setAttribute("data-bs-toggle", "dropdown");
      btn.innerText = name;
      return btn;
    }

    function CreateLink(id, name) {
      var li = document.createElement('li');
      var link = document.createElement('a');
      link.className = "dropdown-item";
      link.id = id;
      link.innerText = name;
      link.href = "#";
      li.appendChild(link);
      return li;
    }
  }

  ProductStage(c0, c1, c2, c3, c4, c5, c6) {
    var stageBox = document.createElement('div');
    stageBox.id = "StageBox";
    stageBox.className = "alert alert-primary text-start";
    stageBox.style.cssText = "position: absolute; z-index: 100; right: 0px; top: 0px; height: 100%; width: 400px; display:none;";

    var closeBtn = document.createElement('button');
    closeBtn.id = "StageClose";
    closeBtn.type = "button";
    closeBtn.className = "btn-close";
    closeBtn.style.cssText = "float:right; background-color:rgb(255 255 255);";
    closeBtn.onclick = c0;
    stageBox.appendChild(closeBtn);

    var title = document.createElement('strong');
    title.innerText = "场景编辑";
    stageBox.appendChild(title);
    stageBox.appendChild(document.createElement('br'));
    stageBox.appendChild(document.createElement('br'));

    var bg = document.createElement("div");
    bg.className = "dropdown";
    //bg.appendChild(CreateDropdown("NewBtn", "新增"));
    bg.appendChild(CreateIconLink("NewBtn", "新增", "btn btn-primary", "fa fa-plus-square"));
    //var menu = document.createElement("ul");
    //menu.className = "dropdown-menu";
    //menu.appendChild(CreateLink("ShowMode", "模型显示"));
    //menu.appendChild(CreateLink("ShowMode", "镜头轨迹"));
    //menu.appendChild(CreateLink("ShowMode", "字幕描述"));
    //menu.appendChild(CreateLink("ShowMode", "资源保障"));
    //menu.appendChild(CreateLink("ShowMode", "产线计划"));
    //menu.appendChild(CreateLink("ShowMode", "节点确认"));
    //bg.appendChild(menu);
    bg.appendChild(CreateIconLink("delBtn", "删除", "btn btn-danger", "fa fa-trash-o"));
    bg.appendChild(CreateIconLink("setupBtn", "设置", "btn btn-info", "fa fa-cog"));
    bg.appendChild(CreateIconLink("testBtn", "测试", "btn btn-warning", "fa fa-caret-square-o-right"));
    stageBox.appendChild(bg);

    var tab = CreateTable();
    tab.appendChild(CreateThead());
    var tbody = CreateTbody();
    var row1 = CreateStageItem(1, "StageToggleSaveBtn", "模型显示", "未设置", "与上同时", "fa fa-cube", c1);
    var row2 = CreateStageItem(2, "CameraLocusBtn", "镜头轨迹", "未设置", "上项之后", "fa fa-video-camera", c2);
    var row3 = CreateStageItem(3, "HeaderBtn", "字幕描述", "未设置", "N秒后", "fa fa-header", c3);
    var row4 = CreateStageItem(4, "SquareBtn", "资源保障", "未设置", "N秒后", "fa fa-check-square-o", c4);
    var row5 = CreateStageItem(5, "CogsBtn", "产线计划", "未设置", "N秒后", "fa fa-cogs", c5);
    var row6 = CreateStageItem(6, "TaskBtn", "节点确认", "未设置", "N秒后", "fa fa-tasks", c6);
    tbody.appendChild(row1);
    tbody.appendChild(row2);
    tbody.appendChild(row3);
    tbody.appendChild(row4);
    tbody.appendChild(row5);
    tbody.appendChild(row6);

    tab.appendChild(tbody);

    stageBox.appendChild(tab);

    document.body.appendChild(stageBox);

    function CreateDropdown(id, name) {
      var btn = document.createElement('button');
      //btn.id = id;
      btn.type = "button";
      btn.className = "btn btn-primary dropdown-toggle";
      btn.style.cssText = "margin: 3px;";
      btn.setAttribute("data-bs-toggle", "dropdown");
      btn.innerText = name;
      return btn;
    }

    function CreateLink(id, name) {
      var li = document.createElement('li');
      var link = document.createElement('a');
      link.className = "dropdown-item";
      link.id = id;
      link.innerText = name;
      link.href = "#";
      li.appendChild(link);
      return li;
    }

    function CreateIconLink(id, name, linkCss, iconCss) {
      var link = document.createElement('a');
      link.id = id;
      link.className = linkCss;
      link.style.cssText = "margin: 3px;";
      //link.innerText = name;
      link.href = "#";
      link.onclick = function () { alert("功能正在设计!"); };
      var icon = document.createElement('i');
      icon.className = iconCss;
      link.appendChild(icon);
      link.appendChild(document.createTextNode(" " + name));
      return link;
    }

    function CreateTable() {
      var tab = document.createElement("table");
      tab.className = "table table-hover table-borderless table-sm";
      var cg = document.createElement("colgroup");
      var col = document.createElement("col");
      col.style.cssText = "text-align:center;";
      cg.appendChild(col);
      tab.appendChild(cg);
      return tab;
    }

    function CreateThead() {
      var head = document.createElement("thead");
      var tr = document.createElement("tr");
      var th1 = document.createElement("th");
      var th2 = document.createElement("th");
      th2.innerText = "项目";
      var th3 = document.createElement("th");
      th3.innerText = "状态";
      var th4 = document.createElement("th");
      th4.innerText = "触发";
      tr.appendChild(th1);
      tr.appendChild(th2);
      tr.appendChild(th3);
      tr.appendChild(th4);
      head.appendChild(tr);
      return head;
    }

    function CreateTbody() {
      var head = document.createElement("tbody");
      return head;
    }

    function CreateStageItem(num, id, linkName, state, otherInfo, iconCSS, c) {
      var tr = document.createElement("tr");
      var td1 = document.createElement("td");
      td1.innerText = num;
      var td2 = document.createElement("td");
      var link = CreateIconLink(id, linkName, "", iconCSS);
      link.onclick = c;
      td2.appendChild(link);
      var td3 = document.createElement("td");
      td3.innerText = state;
      var td4 = document.createElement("td");
      td4.innerText = otherInfo;
      tr.appendChild(td1);
      tr.appendChild(td2);
      tr.appendChild(td3);
      tr.appendChild(td4);

      return tr;

      //<tr>
      //    <td>1</td>
      //    <td><a id="StageToggleSaveBtn" href="#"><i class="fa fa-cube"></i> 模型显示</a></td>
      //    <td>未设置</td>
      //    <td>与上同时</td>
      //</tr>
    }
  }

  //慕课编辑
  BoxStage(cClose, cDel, cSetup, cPlay, c0, c1, c2, c3, c4, c5, c6) {
    var stageBox = document.createElement('div');
    stageBox.id = "StageBox";
    stageBox.className = "alert alert-primary text-start";
    stageBox.style.cssText = "position: absolute; z-index: 100; right: 0px; top: 0px; height: 100%; width: 400px; overflow: scroll; display:none; background-color:#f0f3f4;";

    var closeBtn = document.createElement('button');
    closeBtn.id = "StageClose";
    closeBtn.type = "button";
    closeBtn.className = "btn-close";
    closeBtn.style.cssText = "float:right; background-color:rgb(255 255 255);";
    closeBtn.onclick = cClose;
    stageBox.appendChild(closeBtn);

    var title = document.createElement('strong');
    title.innerText = "慕课编辑";
    stageBox.appendChild(title);
    stageBox.appendChild(document.createElement('br'));
    stageBox.appendChild(document.createElement('br'));

    var bg = document.createElement("div");
    bg.className = "btn-group";

    var btnGroup = CreateDropdown("NewBtn", "新增");
    //bg.appendChild(CreateIconLink("NewBtn", "新增", "btn btn-primary", "fa fa-plus-square"));
    var menu = document.createElement("div");
    menu.className = "dropdown-menu";
    menu.appendChild(CreateLink("WaitBtn", "暂停等待", c0));
    menu.appendChild(CreateLink("StageToggleSaveBtn", "模型显示", c1));
    menu.appendChild(CreateLink("CameraLocusBtn", "镜头轨迹", c2));
    menu.appendChild(CreateLink("HeaderBtn", "字幕描述", c3));
    menu.appendChild(CreateLink("AnimationBtn", "动画效果", c4));
    menu.appendChild(CreateLink("SectionBtn", "章节标题", c5));
    menu.appendChild(CreateLink("TaskBtn", "标签标识", c6));
    btnGroup.appendChild(menu);

    bg.appendChild(btnGroup);

    bg.appendChild(CreateIconBtn("delBtn", "删除", "btn btn-danger", "fa fa-trash-o", cDel));
    bg.appendChild(CreateIconBtn("setupBtn", "设置", "btn btn-info", "fa fa-cog", cSetup));
    bg.appendChild(CreateIconBtn("testBtn", "测试", "btn btn-warning", "fa fa-caret-square-o-right", cPlay));
    stageBox.appendChild(bg);

    //var d = document.createElement("div");
    //d.innerHTML = "<div class=\"btn-group\" role=\"group\" aria-label=\"Button group with nested dropdown\"><button type=\"button\" class=\"btn btn-primary\">1</button><button type=\"button\" class=\"btn btn-primary\">2</button><div class=\"btn-group\" role=\"group\"><button id=\"btnGroupDrop1\" type=\"button\" class=\"btn btn-primary dropdown-toggle\" data-bs-toggle=\"dropdown\" aria-expanded=\"false\">Dropdown</button><ul class=\"dropdown-menu\" aria-labelledby=\"btnGroupDrop1\"><li><a class=\"dropdown-item\" href=\"#\">Dropdown link</a></li><li><a class=\"dropdown-item\" href=\"#\">Dropdown link</a></li></ul></div></div>"
    //stageBox.appendChild(d.childNodes[0]);

    document.body.appendChild(stageBox);

    return stageBox;

    function CreateDropdown(id, name) {
      var b = document.createElement("div");
      b.className = "btn-group";
      var btn = document.createElement('button');
      //btn.id = id;
      btn.type = "button";
      btn.classList = "btn btn-primary dropdown-toggle";
      btn.style.cssText = "margin: 3px;";
      btn.setAttribute("data-bs-toggle", "dropdown");
      btn.innerText = name;

      b.appendChild(btn);

      return b;
    }

    function CreateLink(id, name, c) {
      var li = document.createElement('li');
      var link = document.createElement('a');
      link.className = "dropdown-item";
      link.id = id;
      link.innerText = name;
      link.href = "#";
      link.onclick = c;
      li.appendChild(link);
      return li;
    }

    function CreateIconBtn(id, name, linkCss, iconCss, c) {
      var link = document.createElement('a');
      link.id = id;
      link.className = linkCss;
      link.style.cssText = "margin: 3px;";
      //link.innerText = name;
      link.href = "#";
      link.onclick = c;
      var icon = document.createElement('i');
      icon.className = iconCss;
      link.appendChild(icon);
      link.appendChild(document.createTextNode(" " + name));
      return link;
    }

    function CreateStageItem(num, id, linkName, state, otherInfo, iconCSS) {
      var tr = document.createElement("tr");
      var td1 = document.createElement("td");
      td1.innerText = num;
      var td2 = document.createElement("td");
      var link = CreateIconLink(id, linkName, "", iconCSS);
      //link.onclick = c;
      td2.appendChild(link);
      var td3 = document.createElement("td");
      td3.innerText = state;
      var td4 = document.createElement("td");
      td4.innerText = otherInfo;
      tr.appendChild(td1);
      tr.appendChild(td2);
      tr.appendChild(td3);
      tr.appendChild(td4);

      return tr;

      //<tr>
      //    <td>1</td>
      //    <td><a id="StageToggleSaveBtn" href="#"><i class="fa fa-cube"></i> 模型显示</a></td>
      //    <td>未设置</td>
      //    <td>与上同时</td>
      //</tr>
    }

  }

  BulidStageTable(steps, f0a, f0b, f1a, f1b, f2a, f2b, f3a, f3b, f4a, f4b, f5a, f5b) {
    var tab = CreateTable();
    tab.appendChild(CreateThead());
    var tbody = CreateTbody();

    if (steps != null) {
      for (var i = 0; i < steps.length; i++) {
        //console.log(steps[i]);
        var row1 = CreateStepTD(steps[i], i + 1);
        tbody.appendChild(row1);
      }
    }

    tab.appendChild(tbody);

    return tab;

    function CreateTable() {
      var tab = document.createElement("table");
      tab.id = "StageTable";
      tab.className = "table table-hover table-borderless table-sm";
      var cg = document.createElement("colgroup");
      var col1 = document.createElement("col");
      col1.style.cssText = "text-align:center;";
      cg.appendChild(col1);
      var col2 = document.createElement("col");
      col2.style.cssText = "text-align:left;";
      cg.appendChild(col2);
      var col3 = document.createElement("col");
      col3.style.cssText = "text-align:left;";
      cg.appendChild(col3);
      var col4 = document.createElement("col");
      col4.style.cssText = "text-align:left;";
      cg.appendChild(col4);
      var col5 = document.createElement("col");
      col5.style.cssText = "text-align:center; width: 50px;";
      cg.appendChild(col5);
      tab.appendChild(cg);
      return tab;
    }

    function CreateThead() {
      var head = document.createElement("thead");
      var tr = document.createElement("tr");
      var th1 = document.createElement("th");
      var th2 = document.createElement("th");
      th2.innerText = "项目";
      var th3 = document.createElement("th");
      th3.style.cssText = "text-align:center;";
      th3.innerText = "开始";
      var th4 = document.createElement("th");
      th4.style.cssText = "text-align:center;";
      th4.innerText = "持续";
      var th5 = document.createElement("th");
      th5.style.cssText = "text-align:center;";
      th5.innerText = "修改";
      tr.appendChild(th1);
      tr.appendChild(th2);
      tr.appendChild(th3);
      tr.appendChild(th4);
      tr.appendChild(th5);
      head.appendChild(tr);
      return head;
    }

    function CreateTbody() {
      var head = document.createElement("tbody");
      return head;
    }

    function CreateStepTD(step, num) {
      var tr = document.createElement("tr");
      var td1 = document.createElement("td");
      //td1.innerText = step.OrderNum;
      td1.innerText = num;
      var td2 = document.createElement("td");
      var iconCSS = "fa fa-file-o";
      var linkName = "链接";
      var state = step.BeginTime
      var otherInfo = step.TimeLength;
      switch (step.EventType) {
        case 0: iconCSS = "fa fa-pause"; linkName = "等待确认"; break;
        case 1: iconCSS = "fa fa-cube"; linkName = "模型显示"; break;
        case 2: iconCSS = "fa fa-video-camera"; linkName = "镜头轨迹"; break;
        case 3: iconCSS = "fa fa-header"; linkName = "字幕描述"; break;
        case 4: iconCSS = "fa fa-tachometer"; linkName = "动画效果"; break;
        case 5: iconCSS = "fa fa-tags"; linkName = "章节标题"; break;
        case 6: iconCSS = "fa fa-tasks"; linkName = "节点确认"; break;
      }
      //var link = CreateIconLink(linkName, "", iconCSS, step.StepID);
      var link1 = document.createElement('a');
      //link.className = linkCss;
      link1.style.cssText = "margin: 3px;";
      //link.innerText = name;
      link1.href = "#";
      switch (step.EventType) {
        case 0:
          link1.onclick = function () { f0a(step.StepID); };
          break;
        case 1:
          link1.onclick = function () { f1a(step.StepID); };
          break;
        case 2:
          link1.onclick = function () { f2a(step.StepID); };
          break;
        case 3:
          link1.onclick = function () { f3a(step.StepID); };
          break;
        case 4:
          link1.onclick = function () { f4a(step.StepID); };
          break;
        case 5:
          link1.onclick = function () { f5a(step.StepID); };
          break;
      }
      var icon = document.createElement('i');
      icon.className = iconCSS;
      link1.appendChild(icon);
      link1.appendChild(document.createTextNode(" " + decodeURIComponent(step.Caption)));
      td2.appendChild(link1);
      var td3 = document.createElement("td");
      td3.style.cssText = "text-align:center;";
      td3.innerText = TimeStr(state);
      var td4 = document.createElement("td");
      td4.style.cssText = "text-align:center;";
      td4.innerText = TimeStr(otherInfo);
      var td5 = document.createElement("td");
      td5.style.cssText = "text-align:center;";

      var link2 = document.createElement('a');
      link2.href = "#";
      switch (step.EventType) {
        case 0:
          link2.onclick = function () { f0b(step.StepID); };
          break;
        case 1:
          link2.onclick = function () { f1b(step.StepID); };
          break;
        case 2:
          link2.onclick = function () { f2b(step.StepID); };
          break;
        case 3:
          link2.onclick = function () { f3b(step.StepID); };
          break;
        case 4:
          link2.onclick = function () { f4b(step.StepID); };
          break;
        case 5:
          link2.onclick = function () { f5b(step.StepID); };
          break;
      }
      var icon1 = document.createElement('i');
      icon1.className = "fa fa-edit";
      link2.appendChild(icon1);
      td5.appendChild(link2);
      td5.appendChild(document.createTextNode(" "));

      var link3 = document.createElement('a');
      link3.href = "#";
      switch (step.EventType) {
        case 0: break;
        case 1:
          link3.onclick = function () { f1b(step.StepID); };
          break;
        case 2:
          link3.onclick = function () { f2b(step.StepID); };
          break;
      }
      var icon2 = document.createElement('i');
      icon2.className = "fa fa-trash-o";
      link3.appendChild(icon2);
      td5.appendChild(link3);

      tr.appendChild(td1);
      tr.appendChild(td2);
      tr.appendChild(td3);
      tr.appendChild(td4);
      tr.appendChild(td5);

      return tr;
    }

    function TimeStr(s) {
      return PaddingNum(Math.floor(s / 60), 2) + ':' + PaddingNum(s % 60, 2);
    }

    function PaddingNum(num, length) {
      for (var len = (num + '').length; len < length; len++) {
        num = "0" + num;
      }
      return num;
    }
  }

  ProductTitle(tid, did, title, date, showFPS = false) {
    var infoBox = document.createElement("div");
    infoBox.id = "SceneInfo";
    var left = 10;
    if (showFPS) {
      left = 90;
    }
    infoBox.style.cssText = "position: absolute; left: " + left + "px; top: 10px; z-index: 666; background-color: rgb(255 255 255 / 0.50); border: 1px solid; border-radius: 5px;";
    var box = document.createElement("div");
    box.className = "col-md-12";
    box.style.cssText = "margin:5px 8px;";
    var t1 = document.createElement("strong");
    t1.innerText = "标题：";
    box.appendChild(t1);
    var tl1 = document.createElement("strong");
    tl1.id = tid;
    tl1.innerText = title;
    box.appendChild(tl1);

    if (date.length > 0) {
      box.appendChild(document.createElement("br"));
      var t2 = document.createElement("strong");
      t2.innerText = "日期：";
      box.appendChild(t2);
      var tl2 = document.createElement("strong");
      tl2.id = did;
      tl2.innerText = date;
      box.appendChild(tl2);
    }

    infoBox.appendChild(box);
    document.body.appendChild(infoBox);
  }

  ProductIFrame(id, cb) {
    var box = document.createElement("div");
    box.id = id;
    box.style.cssText = "position: absolute; top: 0px; left: 0px; width: 100%; height: 100%; background-color: rgb(255 255 255 / 0.50); z-index: 10001; display:none;";

    var form = document.createElement("div");
    form.className = "border border-secondary shadow";
    form.style.cssText = "position: absolute; left: 15%; top: 5%; width: 70%; height: 90%; background-color: rgb(200 200 230 / 0.80); border-radius: 5px;"

    var caption = document.createElement("div");
    caption.style.cssText = "height:6%;background-color:rgb(90 83 147);padding:10px;";

    var closeBtn = document.createElement("button");
    closeBtn.type = "button";
    closeBtn.className = "btn-close";
    closeBtn.style.cssText = "float:right; background-color:rgb(255 255 255);";
    closeBtn.onclick = cb;
    caption.appendChild(closeBtn);

    var title = document.createElement("h4");
    title.id = "FrameTitle";
    title.style.cssText = "color:rgb(255 242 0);";
    title.innerText = "网格名称";
    caption.appendChild(title);
    form.appendChild(caption);

    var frame = document.createElement("iframe");
    frame.id = "FrameDiv";
    frame.src = "about:blank";
    frame.style.cssText = "width:100%;height:94%;";
    form.appendChild(frame);

    box.appendChild(form);

    document.body.appendChild(box);
  }

  Prompt() {
    var tag = document.createElement("div");
    tag.id = "Prompt";

    var img = document.createElement("img");
    img.src = "img/Prompt.png";
    img.alt = "左键旋转，中键缩放，右键平移";

    tag.appendChild(img);
    document.body.appendChild(tag);
  }

  Alert(c) {
    var abox = document.createElement("div");
    abox.id = "alertBox";
    abox.className = "alert alert-primary alert-dismissible text-start";
    abox.style.cssText = "position: absolute; width: 600px; left: 50%; margin-left: -300px; top:80px; display: none;";

    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "btn-close";
    btn.onclick = c;
    abox.appendChild(btn);

    var t1 = document.createElement("strong");
    t1.id = "alertTitle";
    t1.innerText = "提示";
    abox.appendChild(t1);

    var t2 = document.createElement("strong");
    t2.innerText = "：";
    abox.appendChild(t2);

    var t3 = document.createElement("label");
    t3.id = "alertLab";
    t3.innerText = "点击地图，添加物资";
    abox.appendChild(t3);

    document.body.appendChild(abox);
  }

  UserTitle(tid, did, title, date) {
    var infoBox = document.createElement("div");
    infoBox.id = "SceneInfo";
    infoBox.style.cssText = "position: absolute; left: 10px; top: 10px; z-index: 666; background-color: rgb(255 255 255 / 0.50); border: 1px solid; border-radius: 5px;";
    var box = document.createElement("div");
    box.className = "col-md-12";
    box.style.cssText = "margin:5px 8px;";
    var t1 = document.createElement("strong");
    t1.innerText = "人物：";
    box.appendChild(t1);
    var tl1 = document.createElement("strong");
    tl1.id = tid;
    tl1.innerText = title;
    box.appendChild(tl1);
    box.appendChild(document.createElement("br"));
    var t2 = document.createElement("strong");
    t2.innerText = "日期：";
    box.appendChild(t2);
    var tl2 = document.createElement("strong");
    tl2.id = did;
    tl2.innerText = date;
    box.appendChild(tl2);
    infoBox.appendChild(box);
    document.body.appendChild(infoBox);
  }

}