import { ref } from 'vue';

export const message = ref('');
// 输入表情
export const inputEmoji = (item: any) => {
  let str = item.char;
  let textArea = document.querySelector('textarea');
  textArea!.setRangeText(str);
  textArea!.selectionStart += str.length;
  textArea!.focus(); // 未聚焦则聚焦输入框
  message.value = textArea!.value;
};

export const showUploadFlg = ref(false);
export const showUpload = () => {
  showUploadFlg.value = true;
};
