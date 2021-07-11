import { createApp, defineAsyncComponent } from 'vue'

const TestComponent = defineAsyncComponent(() => import('./scripts/test.js'))

export const app = createApp({
  components: {
    TestComponent,
  },
  template: `
    <h1>
      Test
    </h1>
    <TestComponent />
  `,
})
app.mount('#root')
