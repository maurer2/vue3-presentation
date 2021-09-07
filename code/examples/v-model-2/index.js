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
    <form>
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
