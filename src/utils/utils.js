const UTILS = {
  storage: {
    set (key,data) {
      if (['string','number','boolean'].includes((typeof data))) {
        localStorage.setItem(key,data);
      } else {
        let stringfiyData = JSON.stringify(data)
        localStorage.setItem(key,stringfiyData);
      }
    },
    get (key) {
      let storage = localStorage.getItem(key);
      let result = /^[{[].*[}\]]$/g.test(storage);
      if (result) {
        return JSON.parse(storage)
      }
      return storage
    },
    remove (key) {
      localStorage.removeItem(key);
    }
  },
  createTable (arr) {
      var r = [];
      (function combine(t, a, l) {
          if (l == 0) return r.push(t);
          for (var i = 0; i < a[l-1].length; i++) {
              combine(t.concat(a[l-1][i]), a, l - 1);
          }
      })([], arr, arr.length);
      return r;
  }
}
export default UTILS
