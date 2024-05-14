/**
 * popupform
 *
 * 创建界面中的弹出表单
 * 用于编辑前端业务的参数和信息提交
 */
var TheEventID = 0;

class PopupForm {

  CreateForm(id, title, subtitle, width, top = 200, c) {
    var form = document.createElement("div");
    form.id = id;
    form.className = "alert alert-primary alert-dismissible row g-2 text-start";
    form.style.cssText = "width: " + width + "px; left: 50%; top: " + top + "px; margin-left: -" + width / 2 + "px; z-index:888; display:none;";

    var closeBtn = document.createElement('button');
    closeBtn.type = "button";
    closeBtn.className = "btn-close";
    if (c != null) {
      closeBtn.onclick = function () {
        $("#" + id).hide();
        c();
      };
    } else {
      closeBtn.onclick = function () { $("#" + id).hide(); };
    }
    form.appendChild(closeBtn);


    form.appendChild(this.CreateTitle(title, subtitle, ""));

    return form;
  }

  //创建子窗体，用于分割不同的表单内容
  CreateSubForm(id) {
    var form = document.createElement("div");
    form.id = id;
    form.className = "row g-2 text-start";
    form.style.cssText = "margin: 0px; margin-left: -4px; display: contents;";
    return form;
  }

  CreateBox(title, colNum, width, element1, element2, element3) {
    var col = document.createElement("div");
    col.classList = "form-floating col-md-" + colNum;

    var c2 = document.createElement("div");
    c2.classList = "input-group form-floating";

    var idBox = document.createElement("span");
    idBox.classList = "input-group-text col-md-3";
    if (width > 0) {
      idBox.style.cssText = "width:" + width + "px;";
    }
    c2.appendChild(idBox);

    var c3 = document.createElement("div");
    c3.classList = "row";
    c3.style.cssText = "background-color: white; width: 466px; border: 1px solid silver;"

    c3.appendChild(element1);
    c3.appendChild(element2);
    c3.appendChild(element3);

    c2.appendChild(c3);

    var labBox = document.createElement("label");
    labBox.style.cssText = "margin-left:" + (width - 4) + "px!important;z-index:999;margin-top:-15px";
    labBox.innerText = title;
    c2.appendChild(labBox);

    col.appendChild(c2);

    return col;
  }

  CreateList(title, e0, e1, e2, e3, e4, e5, e6, e7, e8, e9) {
    var col = document.createElement("div");
    col.classList = "form-floating col-md-12";

    var c2 = document.createElement("div");
    c2.classList = "input-group form-floating";

    var c3 = document.createElement("div");
    c3.classList = "row";
    c3.style.cssText = "background-color: white; width: 466px; border: 1px solid silver;"

    c3.appendChild(e0);
    c3.appendChild(e1);
    c3.appendChild(e2);
    c3.appendChild(e3);
    c3.appendChild(e4);
    c3.appendChild(e5);
    c3.appendChild(e6);
    c3.appendChild(e7);
    c3.appendChild(e8);
    c3.appendChild(e9);

    c2.appendChild(c3);

    var labBox = document.createElement("label");
    labBox.innerText = title;
    c2.appendChild(labBox);

    col.appendChild(c2);

    return col;
  }

  CreateTabs(panels, index = 0) {
    var col = document.createElement("div");
    col.classList = "tabs-container";

    var nav = document.createElement("ul");
    nav.id = "myTab";
    nav.classList = "nav nav-tabs";
    for (var i = 0; i < panels.length; i++) {
      var lab = document.createElement("li");
      lab.id = "tabLab-" + (i + 1);
      if (i == index) {
        lab.classList = "active";
      }
      var link = document.createElement("a");
      link.dataset.toggle = "tab";
      link.href = "#tab-" + (i + 1);
      link.setAttribute("aria-expanded", i == index);
      link.index = i;
      link.onclick = function () {
        $("#tab-" + (TheEventID + 1)).removeClass("active");
        $("#tabLab-" + (TheEventID + 1)).removeClass("active");
        TheEventID = this.index;
        $(this).tab('show');
        $("#tab-" + (TheEventID + 1)).addClass("active");
        $("#tabLab-" + (TheEventID + 1)).addClass("active");
      };
      link.innerText = panels[i].title;
      lab.appendChild(link);
      nav.appendChild(lab);
    }
    col.appendChild(nav);

    var tabBox = document.createElement("div");
    tabBox.className = "tab-content";

    for (var i = 0; i < panels.length; i++) {
      var tab = document.createElement("div");
      tab.id = "tab-" + (i + 1);
      if (i == index) {
        tab.classList = "tab-pane active";
      }
      else {
        tab.classList = "tab-pane";
      }
      var body = document.createElement("div");
      body.className = "panel-body";

      body.appendChild(panels[i]);

      tab.appendChild(body);
      tabBox.appendChild(tab);
    }

    col.appendChild(tabBox);

    return col;
  }

  CreateTitle(title, subtitle, id) {
    var t = document.createElement('div');
    t.classList = "col-md-12 row";

    var t1 = document.createElement("strong");
    t1.innerText = title;
    t.appendChild(t1);

    t.appendChild(document.createElement("br"));
    var t2 = document.createElement("label");
    if (id != "") {
      t2.id = id;
    }
    t2.innerText = subtitle;
    t.appendChild(t2);
    t.title = title;
    return t;
  }

  CreateLab(subtitle) {
    var t = document.createElement('div');
    t.classList = "col-md-12";

    t.appendChild(document.createElement("br"));
    var t2 = document.createElement("label");
    t2.innerText = subtitle;
    t.appendChild(t2);

    return t;
  }

  CreateTxt(id, title, colNum, disabled = false, value = "") {
    var col = document.createElement("div");
    col.classList = "form-floating col-md-" + colNum;

    var txtBox = document.createElement("input");
    txtBox.id = id;
    txtBox.name = id;
    txtBox.placeholder = value;
    txtBox.value = value;
    txtBox.classList = "form-control";
    if (disabled) {
      txtBox.disabled = "disabled";
    }
    col.appendChild(txtBox);

    var labBox = document.createElement("label");
    labBox.htmlFor = id;
    labBox.innerText = title;
    col.appendChild(labBox);

    return col;
  }

  CreateTxtAndID(idLab, txt, title, colNum, width, readonly = false, value = "") {
    var col = document.createElement("div");
    col.classList = "form-floating col-md-" + colNum;

    var c2 = document.createElement("div");
    c2.classList = "input-group form-floating";

    var idBox = document.createElement("span");
    idBox.id = idLab;
    idBox.classList = "input-group-text col-md-3";
    if (width > 0) {
      idBox.style.cssText = "width:" + width + "px;";
    }
    c2.appendChild(idBox);

    var txtBox = document.createElement("input");
    txtBox.id = txt;
    txtBox.name = txt;
    txtBox.placeholder = "";
    txtBox.value = value;
    txtBox.classList = "form-control";
    if (readonly) {
      txtBox.readOnly = true;
    }
    c2.appendChild(txtBox);

    var labBox = document.createElement("label");
    labBox.htmlFor = txt;
    labBox.style.cssText = "margin-left:" + (width - 4) + "px!important;z-index:999;";
    labBox.innerText = title;
    c2.appendChild(labBox);

    col.appendChild(c2);

    return col;
  }

  CreateCheck(id, title, colNum, checked = false) {
    var col = document.createElement("div");
    col.classList = "form-check form-switch form-floating col-md-2"; // + colNum;
    if (colNum == 2) {
      col.style.cssText = "background-color:#ffffff;border: #cccccc 1px solid;border-radius: 4px;width: 81px;height:58px;margin-left:4px;margin-right:4px;";
    }
    if (colNum == 3) {
      col.style.cssText = "background-color:#ffffff;border: #cccccc 1px solid;border-radius: 4px;width: 115px;height:58px; margin-left:4px; margin-right:4px;";
    }
    var chkBox = document.createElement("input");
    chkBox.id = id;
    chkBox.name = id;
    chkBox.type = "checkbox"
    chkBox.style.cssText = "width: 3em; margin-left:-1.5em; margin-top:2em;";
    chkBox.placeholder = "";
    chkBox.classList = "form-check-input";
    if (checked) {
      chkBox.checked = "checked";
    }
    col.appendChild(chkBox);

    var labBox = document.createElement("label");
    labBox.htmlFor = id;
    labBox.innerText = title;
    labBox.style.cssText = "padding-top: 5px;";
    col.appendChild(labBox);

    return col;
  }

  CreateCheckBox(id, colNum) {
    var col = document.createElement("div");
    col.classList = "form-check form-switch form-floating col-md-" + colNum;
    if (colNum == 2) {
      col.style.cssText = "background-color:#ffffff;border: #cccccc 1px solid;border-radius: 4px;width: 102px;height:58px;";
    }
    if (colNum == 3) {
      col.style.cssText = "background-color:#ffffff;border: #cccccc 1px solid;border-radius: 4px;width: 110px;height:58px; margin-left:4px; margin-right:4px;";
    }

    var chkBox = document.createElement("input");
    chkBox.id = id;
    chkBox.name = id;
    chkBox.type = "checkbox"
    chkBox.style.cssText = "width: 4em; margin-left:-1.5em; margin-top:2em;";
    chkBox.placeholder = "";
    chkBox.classList = "form-check-input";
    col.appendChild(chkBox);

    return col;
  }

  CreateRadioBox(id, title, value = false) {
    var col = document.createElement("div");
    col.classList = "radio radio-inline";
    col.style.cssText = "float: left;"

    var rbox = document.createElement("input");
    rbox.id = id;
    rbox.type = "radio";
    rbox.value = "s";
    rbox.name = "radioBox";
    if (value) {
      rbox.checked = "checked";
    }
    col.appendChild(rbox);

    var rLab = document.createElement("label");
    rLab.htmlFor = id;
    rLab.innerText = title;
    col.appendChild(rLab);

    return col;
  }

  CreateSelect(id, title, colNum, str, value = 0, showNum = true) {
    var col = document.createElement("div");
    col.classList = "form-floating col-md-" + colNum;

    var sltBox = document.createElement("select");
    sltBox.id = id;
    sltBox.name = id;
    sltBox.placeholder = "";
    sltBox.classList = "form-select";

    var arr = str.split(",");
    for (var i = 0; i < arr.length; i++) {
      var o = document.createElement("option");
      o.value = i;
      if (showNum) {
        o.innerText = i + " " + arr[i];
      }
      else {
        o.innerText = arr[i];
      }
      if (i == value) {
        o.selected = "selected";
      }
      sltBox.appendChild(o);
    }

    col.appendChild(sltBox);

    var labBox = document.createElement("label");
    labBox.htmlFor = id;
    labBox.innerText = title;
    col.appendChild(labBox);

    return col;
  }

  CreateSelectLab(idLab, id, title, colNum, width, str, value = 0) {
    var col = document.createElement("div");
    col.classList = "form-floating col-md-" + colNum;

    var c2 = document.createElement("div");
    c2.classList = "input-group form-floating";

    var idBox = document.createElement("span");
    idBox.id = idLab;
    idBox.classList = "input-group-text col-md-3";
    if (width > 0) {
      idBox.style.cssText = "width:" + width + "px;";
    }
    c2.appendChild(idBox);

    var sltBox = document.createElement("select");
    sltBox.id = id;
    sltBox.name = id;
    sltBox.placeholder = "";
    sltBox.classList = "form-select";

    var arr = str.split(",");
    for (var i = 0; i < arr.length; i++) {
      var o = document.createElement("option");
      o.value = i;
      o.innerText = i + " " + arr[i];
      if (i == value) {
        o.selected = "selected";
      }
      sltBox.appendChild(o);
    }

    c2.appendChild(sltBox);

    var labBox = document.createElement("label");
    labBox.htmlFor = id;
    labBox.style.cssText = "margin-left:" + (width - 4) + "px!important;z-index:999;";
    labBox.innerText = title;
    c2.appendChild(labBox);

    col.appendChild(c2);

    return col;
  }

  CreateColor(id, title, colNum, value = "") {
    var col = document.createElement("div");
    col.classList = "form-floating input-group-sm col-md-" + colNum;

    var txtBox = document.createElement("input");
    txtBox.id = id;
    txtBox.name = id;
    txtBox.placeholder = "";
    txtBox.type = "color";
    txtBox.value = value;
    txtBox.classList = "form-control";
    col.appendChild(txtBox);

    var labBox = document.createElement("label");
    labBox.htmlFor = id;
    labBox.innerText = title;
    col.appendChild(labBox);

    return col;
  }

  CreateRangeAndID(idLab, id, title, colNum, min, max, width, step, value, c, f1, f2) {
    var col = document.createElement("div");
    col.classList = "form-floating col-md-" + colNum;

    var c2 = document.createElement("div");
    c2.classList = "input-group form-floating";

    var idBox = document.createElement("span");
    idBox.classList = "input-group-text col-md-3";
    if (width > 0) {
      idBox.style.cssText = "width:" + width + "px;";
    }
    c2.appendChild(idBox);

    var txtBox = document.createElement("input");
    txtBox.id = id;
    txtBox.name = id;
    txtBox.placeholder = "";
    txtBox.type = "range";
    txtBox.min = min;
    txtBox.max = max;
    txtBox.step = step;
    txtBox.value = value;
    txtBox.classList = "form-control form-range";
    txtBox.style.cssText = "background-color: white;";
    txtBox.onchange = c;
    txtBox.oninput = c;
    txtBox.onmousedown = f1;
    txtBox.onmouseup = f2;

    c2.appendChild(txtBox);

    var labBox = document.createElement("label");
    labBox.id = idLab;
    labBox.htmlFor = id;
    labBox.style.cssText = "margin-left:" + (width - 4) + "px!important;z-index:999;";
    labBox.innerText = title;
    c2.appendChild(labBox);

    col.appendChild(c2);

    return col;
  }

  CreateRange(idLab, id, title, colNum, min, max, step, value, c, f1, f2) {
    var col = document.createElement("div");
    col.classList = "form-floating input-group-sm col-md-" + colNum;

    var txtBox = document.createElement("input");
    txtBox.id = id;
    txtBox.name = id;
    txtBox.placeholder = "";
    txtBox.type = "range";
    txtBox.min = min;
    txtBox.max = max;
    txtBox.step = step;
    txtBox.value = value;
    txtBox.classList = "form-control form-range";
    txtBox.style.cssText = "background-color: white;";
    txtBox.onchange = c;
    txtBox.oninput = c;
    txtBox.onmousedown = f1;
    txtBox.onmouseup = f2;

    col.appendChild(txtBox);

    var labBox = document.createElement("label");
    labBox.id = idLab;
    labBox.htmlFor = id;
    labBox.innerText = title;
    col.appendChild(labBox);

    return col;
  }

  CreateBtnEmpty(colNum) {
    var col = document.createElement("div");
    col.classList = "form-floating col-md-" + colNum;
    col.style.cssText = "margin-top:12px!important;";
    return col;
  }

  CreateBtn(id, title, colNum, style, f) {
    var col = document.createElement("div");
    col.classList = "form-floating col-md-" + colNum;
    col.style.cssText = "margin-top:12px!important;";

    if (id != "" && title != "") {
      var btn = document.createElement("button");
      btn.id = id;
      btn.innerText = title;
      btn.type = "submit";
      if (style == 0) {
        btn.classList = "w-100 btn btn-lg btn-outline-danger";
      }
      else {
        btn.classList = "w-100 btn btn-lg btn-primary";
      }
      btn.onclick = f;
      col.appendChild(btn);
    }
    //console.log(col.outerHTML);
    return col;
  }

  CreateHidden(id) {
    var hid = document.createElement("input");
    hid.type = "hidden";
    hid.name = id;
    hid.id = id;
    hid.value = 0;
    return hid;
  }

  CreateHiddenValue(id, value) {
    var hid = document.createElement("input");
    hid.type = "hidden";
    hid.name = id;
    hid.id = id;
    hid.value = value;
    return hid;
  }

  CreateTextarea(id, title, colNum, height = 120, disabled = false) {
    var col = document.createElement("div");
    col.classList = "form-floating col-md-" + colNum;

    var txtBox = document.createElement("textarea");
    txtBox.id = id;
    txtBox.name = id;
    txtBox.placeholder = "";
    //txtBox.type = "textarea";
    txtBox.rows = 5;
    txtBox.value = "";
    txtBox.classList = "form-control";
    txtBox.style.cssText = "height: " + height + "px;";
    if (disabled) {
      txtBox.disabled = "disabled";
    }
    col.appendChild(txtBox);

    var labBox = document.createElement("label");
    labBox.htmlFor = id;
    labBox.innerText = title;
    col.appendChild(labBox);

    return col;
  }

  CreateTree(id, title, lists, c) {
    var col = document.createElement("div");
    col.id = id;
    col.style.backgroundColor = "#FFFFFF";

    var ul = document.createElement("ul");
    var li = document.createElement("li");
    li.className = "jstree-open";
    li.innerText = title;

    var u2 = document.createElement("ul");
    for (var i = 0; i < lists.length; i++) {
      var l2 = document.createElement("li");
      var a2 = document.createElement("a");
      a2.onclick = c;
      a2.innerHTML = lists[i];
      a2.style.cursor = "pointer";
      l2.appendChild(a2);
      u2.appendChild(l2);
    }
    li.appendChild(u2);

    ul.appendChild(li);
    col.appendChild(ul);

    return col;
  }
}