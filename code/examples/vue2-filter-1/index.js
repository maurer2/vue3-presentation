import Vue from 'vue2';

Vue.component(
  'TestComponent',
  () => import('./component.js'),
);

export const app = new Vue({
  template: `
    <TestComponent />
  `,
});

app.$mount('#root');
