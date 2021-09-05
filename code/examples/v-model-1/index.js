import { createApp, defineAsyncComponent } from 'vue';

const TestComponent = defineAsyncComponent(() => import('./component.js'));

export const app = createApp({
  components: {
    TestComponent,
  },
  data() {
    return {
      firstName: '',
      lastName: '',
    };
  },
  methods: {
    updateFirstName(newValue) {
      this.firstName = newValue;
    },
    updateLastName(newValue) {
      this.lastName = newValue;
    },
  },
  template: `
    <form>
      <TestComponent
        v-model:firstName="firstName"
        v-model:lastName="lastName"
      />
      <p>
        Parent data:
      </p>
      <div>
        <code>
          First Name: {{ !!firstName ? firstName : '-' }}
        </code>
      </div>
      <div>
        <code>
          Last Name: {{ !!lastName ? lastName : '-' }}
        </code>
      </div>
    </form>
  `,
});
app.mount('#root');
