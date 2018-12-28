import { Message } from 'element-ui';
export default {
  checkmobile (mobile) {
    const reg = /^1[3|4|5|7|8|9][0-9]\d{8}$/
    if (mobile == '') return Message.error({message: '请输入手机号'});
    if (reg.test(mobile)) return true;
    return Message.error({message: '请输入正确手机号'});
  }
}
