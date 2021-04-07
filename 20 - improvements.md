# Improvements

## Emits-property
- new field on the vue prototype
- can be used to add validators to emitted events
- can be array (for basic functionality) or object (for validator functionality)
- similar to props declaration but for events
- makes it easier to see at a glance which events are emitted
- eslint warns about event that are used in the component but are missing in the emits array

### Parent template
```html
  <form>
    <child-component
      :text="text"
      @update-text="updateText"
      @toggle-button="toggleButton"
    />
  </form>
```

### Child template
```html
  <fieldset>
    <input v-model="textValue" id="input" name="input" />
    <input type="button" @click="handleButtonClick" />
  </fieldset>
```

```ts
export default {
  props: {
    text: String,
  },
  // Array syntax - no validation
  emits: [
    'update-text',
    'toggle-button':
  ],
  // Object syntax - with optional validation
  emits: {
    'update-text': ({ newValue }) => {
      const nonLatinCharacters: RegExp = /[^\x00-\x7F]+/

      if (nonLatinCharacters.test(newValue)) {
        console.log('text contains invalid characters')

        return false
      }

      return true
    }
    'toggle-button': null, // disable validation
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
  },
  methods: {
    handleButtonClick(): void {
      this.$emit('toggle-button')
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
      <child-component/>
    </tr>
  </table>
```

### Child template
```html
  <td>Column</td>
  <td>Column</td>
```

## Multiple v-models
- v-model is used for two way data-binding in Vue
- mostly used for form bindings and child to parent communication
- syntactic sugar for passing a value prop and emitting an input event by default, but prop name and event can be customized
- Vue2 only supports a single v-model prop per component
- Vue3 allows multiple v-models per component
- Vue3 also takes over functionality of .sync modifier, which has been removed in Vue3
- v-model changes significantly when used with custom components but stays the same when used with form fields
- v-model can be extracted in hook: https://dev.to/thomasfindlay/how-to-easily-sync-with-multiple-v-models-in-vue-3-using-composition-api-1pmg

### Example for v-model for form binding in Vue2 and Vue3

```html
<form>
  <label for="text">Text:</label>
  <input v-model="text" id="text" placeholder="Enter text" />
</form>
```

```ts
export default {
  data() {
    return {
      text: ''
    }
  }
}
```

### Example for single v-model for component data in Vue3

### Parent

```html
<div>
  <child-component v-model="text" />
</div>
```

```ts
export default {
  data() {
    return {
      text: ''
    }
  }
}
```

#### Child

```html
<div>
  <label for="text">Text:</label>
  <input v-model="text" id="text" placeholder="Enter text" />
</div>
```

```ts
export default {
  props: {
    modelValue: String, // prop-name used to be value
  },
  emits: ['update:modelValue'],
  text: {
    set(newValue) {
      this.$emit('update:modelValue', newValue) // event-name used to be input
    },
    get() {
      return this.modalValue
    },
  },
}
```

### Example for multiple v-model for component data in Vue3

### Parent

```html
<div>
  <child-component v-model:firstName="firstName" v-model:lastName="lastName"  />
</div>
```

```ts
export default {
  data() {
    return {
      firstName: '',
      lastName: '',
    }
  }
}
```

#### Child

```html
<fieldset>
  <label for="first-name">First name:</label>
  <input v-model="firstNameValue" id="first-name" placeholder="Enter first name" />

  <label for="last-name">Last name:</label>
  <input v-model="lastNameValue" id="last-name" placeholder="Enter last name" />
</fieldset>
```

```ts
export default {
  props: {
    firstName: String,
    lastName: String,
  },
  emits: ['update:firstName', 'update:lastName'],
  firstNameValue: {
    set(newValue) {
      this.$emit('update:firstName', newValue)
    },
    get() {
      return this.firstName
    },
  },
  lastNameValue: {
    set(newValue) {
      this.$emit('update:lastName', newValue)
    },
    get() {
      return this.lastName
    },
  },
}
```

### Custom v-model modifier
- there are already built in modifiers like `.number` or `trim`
- can be extended with custom modifiers
- example: replace non-latin-characters with latin equivalent (e.g. lodash deburr), replace easily confused characters (e.g. always 0 instead of O or o etc.)

### Parent

```html
<div>
  <child-component v-model.meowMode="text" />
</div>
```

#### Child

```ts
export default {
  props: {
    modelValue: String,
    modelModifiers: {
      default: () => {}
    }
  },
  emits: ['update:modelValue'],
  value: {
    set(newValue: string): void {
      let newValueTransformed = newValue

      if (meowMode in this.modelModifiers) {
        newValueTransformed = newValueTransformed.replaceAll(/dog/ig, 'CAT')
      }
      this.$emit('update:modelValue', newValueTransformed)
    },
    get(): string {
      return this.modelValue
    },
  },
}
```
