// 防抖函数
export function debounce (fn, delay) {
  let timer;
  return function () {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn.apply(this, arguments);
    }, delay);
  };
}

//搜索为关键字的变颜色
export function brightenKeyword (val, keyword) {
  val = val.replace(/</g,'&lt;')
  keyword = keyword.replace(/</g,'&lt;')

  return val.replace(new RegExp("(" + keyword + ")","g"), "<font color='#F59C25'>" + keyword + "</font>");
}
