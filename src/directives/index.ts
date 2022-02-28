import { App } from 'vue';

export default (app: App<Element>) => {
  app.directive('focus', (el: HTMLElement, binding) => {
    el.addEventListener('click', () => {
      console.log('自定义组件666');
    });
  });
};
