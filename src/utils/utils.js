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
  }
}
export default UTILS
