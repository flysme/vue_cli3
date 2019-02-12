export default {
  checkmobile (mobile) {
    const reg = /^1[3|4|5|7|8|9][0-9]\d{8}$/
    if (mobile == '') return '请输入手机号';
    if (reg.test(mobile)) return true;
    return '请输入正确手机号';
  },
  checkpwd (pwd) {
    const patrn=/^(\w){6,20}$/;
    if (pwd == '') return '请输入密码';
    if (patrn.exec(pwd)) return true;
    return '请输入6-20个字母、数字、下划线';
  }
}
