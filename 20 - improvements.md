# Improvements

## Emits-property
- new field on the vue prototype
- similar to props declaration but for events
- makes it easier to see at a glance which events are emitted
- eslint warns about event that are used in the component but are missing in the emits array

```html
  <!-- Parent -->
  <form>
    <child :text="text" @update-text="updateText" />
  </form>

  <!-- Child -->
  <input v-model="textValue" id="input" name="input" />
```

```ts
export default {
  data () {
    props: {
      text: String,
    },
    emits: [
      'update-text',
    ]
  },
  computed: {
    textValue: {
      set(newValue) {
        this.$emit('update-text', newValue)
      },

      get() {
        return this.text
      },
    },
  }
}
```
