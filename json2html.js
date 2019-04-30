hj={}
hj.htmlKit = {
  _tags: [], html: [], 
  _createAttrs: function (attrs) {
    var attrStr = [];
    for (var key in attrs) {
      if (!attrs.hasOwnProperty(key)) continue;
      attrStr.push(key + "=" + attrs[key] + "")
    }
    return attrStr.join(" ")
  }, 
  _createTag: function (tag, attrs, isStart) {
    if (isStart) {
      return "<" + tag + " " + this._createAttrs(attrs) + ">"
    } else {
      return "</" + tag + ">"
    }
  }, 
  start: function (tag, attrs) {
    this._tags.push(tag);
    this.html.push(this._createTag(tag, attrs, true))
  }, 
  end: function () {
    this.html.push(this._createTag(this._tags.pop(), null, false))
  }, 
  tag: function (tag, attr, text) {
    this.html.push(this._createTag(tag, attr, true) + text + this._createTag(tag, null, false))
  }, 
  create: function () {
    return this.html.join("")
  }
};

 hj.clear=function()
{
    hj.htmlKit.tags=[]
    hj.htmlKit.html=[]
}
 hj.json2Html=function (data) {
  var hk = hj.htmlKit;
  hk.start("table", {"cellpadding": "10", "border": "0"});
  hk.start("thead");
  hk.start("tr");
  data["heads"].forEach(function (head) {
    hk.tag("th", {"bgcolor": "AntiqueWhite"}, head)
  });
  hk.end();
  hk.end();
  hk.start("tbody");
  data["data"].forEach(function (dataList, i) {
    dataList.forEach(function (_data) {
      hk.start("tr");
      data["dataKeys"][i].forEach(function (key) {
        var rowsAndCol = key.split(":");
        if (rowsAndCol.length === 1) {
          hk.tag("td", {"class":"hj-"+rowsAndCol[0]}, _data[rowsAndCol[0]]?_data[rowsAndCol[0]]:'')
        } else if (rowsAndCol.length === 3) {
          hk.tag("td", {"class":"hj-"+rowsAndCol[2],"rowspan": rowsAndCol[0], "colspan": rowsAndCol[1]}, _data[rowsAndCol[2]])
        }
      });
      hk.end()
    })
  });
  hk.end();
  hk.end();
  return hk.create()
}

 hj.heads = function (arr,hs)
{
    var heads=[]
    var s="|";
    
    if(hs)
    {
        for(i in hs)
        {
            if(s.indexOf(hs[i])<0)
            {
                s+=hs[i]+"|"
                heads.push(hs[i])
            }

        }
    }
    
    for(i in arr)
    {
        for(j in arr[i])
        {
            if(s.indexOf(j)<0)
            {
                s+=j+"|"
                heads.push(j)
            }

        }
    }
    return heads;
}