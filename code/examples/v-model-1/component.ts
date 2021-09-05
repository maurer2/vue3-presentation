import { defineComponent, PropType } from 'vue';

export default defineComponent({
  props: {
    firstName: {
      type: String as PropType<string>,
      default: '',
    },
    lastName: {
      type: String as PropType<string>,
      default: '',
    },
  },
  emits: [
    'update:firstName',
    'update:lastName',
  ],
  computed: {
    firstNameValue: {
      set(newValue: string): void {
        this.$emit('update:firstName', newValue);
      },
      get(): string {
        return this.firstName;
      },
    },
    lastNameValue: {
      set(newValue: string): void {
        this.$emit('update:lastName', newValue);
      },
      get(): string {
        return this.lastName;
      },
    },
  },
  template: `
    <fieldset>
      <legend>Form</legend>
      <div>
        <label for="first-name">First name: </label>
        <input v-model="firstNameValue" id="first-name" />
      </div>
      <div>
        <label for="last-name">Last name: </label>
        <input v-model="lastNameValue" id="last-name" />
      </div>
    </fieldset>
  `,
});
