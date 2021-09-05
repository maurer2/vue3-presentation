import { defineComponent } from 'vue';
export default defineComponent({
    props: {
        firstName: {
            type: String,
            default: '',
        },
        lastName: {
            type: String,
            default: '',
        },
    },
    emits: [
        'update:firstName',
        'update:lastName',
    ],
    computed: {
        firstNameValue: {
            set(newValue) {
                this.$emit('update:firstName', newValue);
            },
            get() {
                return this.firstName;
            },
        },
        lastNameValue: {
            set(newValue) {
                this.$emit('update:lastName', newValue);
            },
            get() {
                return this.lastName;
            },
        },
    },
    template: `
    <div>
      <label for="first-name">First name: </label>
      <input v-model="firstNameValue" id="first-name" />
    </div>
    <div>
      <label for="last-name">Last name: </label>
      <input v-model="lastNameValue" id="last-name" />
    </div>
  `,
});
