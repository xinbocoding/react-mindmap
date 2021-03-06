export function node(title, lvl) {
  var children = [],
    parent = null;
  return {
    name: title,
    children: children,
    lvl: () => (lvl == undefined ? -1 : lvl),
    parent: () => parent, //as a function to prevent circular reference when parse to JSON
    setParent: (p) => {
      parent = p;
    },
    appendChildren: function (c) {
      children.push(c);
      c.setParent(this);
      return this;
    },
  };
}

export function append_rec(prev, curr) {
  if (typeof curr == "string") {
    //in the recursive call it's a object
    curr = curr.split("\t"); //or tab (\t)
    curr = node(curr.pop(), curr.length);
  }
  if (curr.lvl() > prev.lvl()) {
    //curr is prev's child
    prev.appendChildren(curr);
  } else if (curr.lvl() < prev.lvl()) {
    append_rec(prev.parent(), curr); //recursive call to find the right parent level
  } else {
    //curr is prev's sibling
    prev.parent().appendChildren(curr);
  }
  return curr;
}

export function parseData(data) {
  let reverseData = JSON.stringify(data, null, 3);
  let arrData = JSON.parse(reverseData);
  let res = {};
  arrData.forEach((a) => {
    res.name = a.name;
    res.children = a.children;
  });

  return res;
}
