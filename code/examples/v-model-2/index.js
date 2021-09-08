import { createApp, defineAsyncComponent } from 'vue';

const TestComponent = defineAsyncComponent(() => import('./component.js'));

export const app = createApp({
  components: {
    TestComponent,
  },
  data() {
    return {
      radioState: 'on',
    };
  },
  template: `
    <h1>Radio</h1>
    <form>
      <TestComponent v-model:modelValue="radioState" />
      <hr />
      <TestComponent v-model="radioState" />
      <p>
        Parent data:
      </p>
      <div>
        <code>
          Radio state: {{ radioState }}
        </code>
      </div>
    </form>
  `,
});
app.mount('#root');
