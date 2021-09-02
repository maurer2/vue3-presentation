import Vue from 'vue';

Vue.component(
  'TestComponent',
  // A dynamic import returns a Promise.
  () => import('./component.js'),
);

export const app = new Vue({
  template: `
    <TestComponent />
  `,
});

app.$mount('#root');
