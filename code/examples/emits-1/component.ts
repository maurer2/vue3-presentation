import { defineComponent, PropType } from 'vue';

export default defineComponent({
  props: {
    text: {
      type: String as PropType<string>,
      default: '',
    },
  },
  emits: {
    'update-text': (newValue: string) => {
      const nonLatinCharactersRegex = /[^\x00-\x7F]+/;

      if (nonLatinCharactersRegex.test(newValue)) {
        return false;
      }

      return true;
    },
    'toggle-button': null, // disable validation
  },
  computed: {
    textValue: {
      set(newValue: string): void {
        this.$emit('update-text', newValue);
      },
      get(): string {
        return this.text;
      },
    },
  },
  methods: {
    handleButtonClick(): void {
      this.$emit('toggle-button');
    },
  },
  template: `
    <fieldset>
      <legend>Form</legend>
      <label for="field">Field: </label>
      <input v-model="textValue" id="field" />
      <button type="button" @click="handleButtonClick">
        Click
      </button>
    </fieldset>
  `,
});
