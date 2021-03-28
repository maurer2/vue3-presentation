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
- avoids coming stacking context issues (z-index) and containing block issues (fixed positioning within elements that have a transform applied)
- "teleported" element still acts like a regular child element e.g. can receive props, emits events etc.
- mainly useful for overlays, toast messages etc.
- multiple teleports to the same target will be appended in the order they are called

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

## Template Fragments / Multiple template roots
- Vue2 permits templates to only have one root element
- can cause issues when a wrapper element around child elements causes invalid html (table-structure, dl-elements) or a flat html structure is needed for css (flexbox, grid)
- in Vue2 one had to use a render function to work around this
- Vue3 allows multiple root elements
- has implications for attribute inheritance, key placement and class attributes

### Parent template
```html
  <table>
    <tr>
      <child/>
    </tr>
  </table>
```

### Child template
```html
  <td>Column</td>
  <td>Column</td>
```
