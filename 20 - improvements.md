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
  props: {
    text: String,
  },
  emits: [
    'update-text',
  ],
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



## Teleport element
- new tag to break out of the current component hierarchy
- appends "teleported" content to the body tag
- avoids stacking context issues (z-index) and containing block issues (fixed positioning)
- "teleported" element still acts like a regular child element e.g. receives props, emits events etc.
- mainly useful for overlays, toast messages et.c

```html
  <div>
    <button @click="openOverlay">
      Show overlay
    </button>
    <teleport to="body" v-if="modalIsVisible">
      Teleport content
        <button @click="closeOverlay">
          Close overlay
        </button>
    </teleport>
  </div>
```

```ts
export default {
  data() {
    return {
      modalIsVisible: false
    }
  }
  methods: {
    closeOverlay(): void {
      this.modalIsVisible = false
    },
    openOverlay(): void {
      this.modalIsVisible = true
    }
  }
}
```
