import { createApp, defineAsyncComponent } from 'vue'

const TestComponent = defineAsyncComponent(() => import('./component.js'))

export const app = createApp({
  components: {
    TestComponent,
  },
  template: `
    <TestComponent />
  `,
})
app.mount('#root')
