import { createApp, defineAsyncComponent } from 'vue';

const TestComponent = defineAsyncComponent(() => import('./component.js'));

export const app = createApp({
  components: {
    TestComponent,
  },
  data() {
    return {
      text: '',
    };
  },
  methods: {
    updateText(newValue) {
      this.text = newValue;
    },
    toggleButton() {
      console.log('button has been clicked');
    },
  },
  template: `
    <form>
      <TestComponent
        :text="text"
        @update-text="updateText"
        @toggle-button="toggleButton"
      />
      Parent data:
      <hr />
      <code>
        Field: {{ !!text ? text : '-' }}
      </code>
    </form>
  `,
});
app.mount('#root');
