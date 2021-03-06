# Breaking Changes

## Filter removal
- Filter syntax was original taken from AngularJS
- Often used for output formatting like currencies, dates, text manipulation etc.
- Pure functions with no access to component state
- Can be chained
- Not valid JS
- Can be replaced with regular functions or computed properties

### Example filter in component in Vue2

```html
<h1>
  {{ text | capitalizeLastLetters | otherFilter }}
</h1>
```


```ts
export default defineComponent({
  data () {
    return {
      text: 'lorem ipsum dolor sit amet',
    }
  },
  filters: {
    capitalizeLastLetters(value: string | null): string {
      if (!value) {
        return ''
      }

      const valueClean = value.trim()
      const words = valueClean.split(/\s+/);

      const wordsReversed = words.map((word) => word.split('').reverse().join(''))
      const wordsReversedCapitalized = wordsReversed.map((word) => {
        const firstLetter = word.charAt(0).toUpperCase()
        const remainingLetters = word.slice(1)
        const newWord = `${firstLetter}${remainingLetters}`

        return newWord
      })
      const wordsCapitalized = wordsReversedCapitalized.map((word) => word.split('').reverse().join(''))

      const transformedValue = wordsCapitalized.join(' ')

      return transformedValue
    },
    ....
  }
})
```

### Example filter in component in Vue3

```html
<h1>
  {{ textLastLettersCapitalized }}
</h1>
<h1>
  {{ capitalizeLastLetters(text) }}
</h1>
```

```ts
export default defineComponent({
  data () {
    return {
      text: 'lorem ipsum dolor sit amet',
    }
  },
  computed: {
    textLastLettersCapitalized(): string {
      if (!this.text) {
        return ''
      }

      const textClean = value.trim()
      const words = textClean.split(/\s+/);

      const wordsReversed = words.map((word) => word.split('').reverse().join(''))
      const wordsReversedCapitalized = wordsReversed.map((word) => {
        const firstLetter = word.charAt(0).toUpperCase()
        const remainingLetters = word.slice(1)
        const newWord = `${firstLetter}${remainingLetters}`

        return newWord
      })
      const wordsCapitalized = wordsReversedCapitalized.map((word) => word.split('').reverse().join(''))

      const transformedValue = wordsCapitalized.join(' ')

      return transformedValue
    },
  },
  methods: {
    capitalizeLastLetters(value: string | null): string {
      if (!value) {
        return ''
      }

      const valueClean = value.trim()
      const words = valueClean.split(/\s+/);

      const wordsReversed = words.map((word) => word.split('').reverse().join(''))
      const wordsReversedCapitalized = wordsReversed.map((word) => {
        const firstLetter = word.charAt(0).toUpperCase()
        const remainingLetters = word.slice(1)
        const newWord = `${firstLetter}${remainingLetters}`

        return newWord
      })
      const wordsCapitalized = wordsReversedCapitalized.map((word) => word.split('').reverse().join(''))

      const transformedValue = wordsCapitalized.join(' ')

      return transformedValue
    },
  }
})
```

## Template tag changes
- mostly used to group sections in templates in logic units
- not rendered in the frontend
- often used with v-if and v-else for conditional rendering
- Vue3 renders template tags without directives as regular html template tags

### Example

```html
<div>
  <ul v-if="list.length">
    ...
  </ul>
  <span v-else>No entries found</span>
</div>
```

## v-if & v-for precedence
- using both directives at the same time on the same element should be avoided and will result in a linter warning
- Vue2 executes v-for first and creates a temporary object which is then used by v-if to check if the condition is fulfilled. Loop has to be run and condition executed whenever the component rerenders
- Vue3 executes v-if first and doesn't render anything as there is no age variable in scope, which causes a warning
- can be refactored into a computed property that pre-filters and caches the elements
- for conditional rendering (if empty) an additional computed property like hasEntries or wrapping the container with an entries.length check can be used. Alternatively v-if and v-else can be moved into the loop using two template-tags

```html
<dl v-for="person in people" v-if="age > 5" :key="person.name">
  <dd>Name: </dd>
  <dt>{{ person.name }}</dt>
  <dd>Age: </dd>
  <dt>{{ person.age }}</dt>
</dl>
```

```ts
export default defineComponent({
  data () {
    return {
      people: [
        {
          name: 'Winston Purrchill'
          age:  10
        },
        {
          name: 'Cat Stevens'
          age:  5
        },
      ],
    }
  },
})
```

## Browser support
- Vue3 drops support for IE11 and older browsers
- backwards compatible build for IE11 was planned but was eventually dropped

## .sync modifier removal
- Vue2.3 added sync-attribute to allow two way binding for attributes between child and parent
- has been dropped in Vue3
- can be replaced with computed setters (see emits-property example) or new extended v-model (see toDo)

## placement of key property
- Vue2 prohibits the placement of keys on a template element
- if v-for is used on a template element then keys should be added individually to the direct children inside the loop
- if v-for is used on a non-template element then a key should be added on the element that has the the v-for attribute
- Vue3 permits the placement of keys on a template elements and needs to have the key on the element that has the the v-for attribute regardless of type


### Example for proper usage of v-for in Vue2 and Vue3 for non-template tags
```html
<dl v-for="person in people" :key="person.name">
  <dd>Name: </dd>
  <dt>{{ person.name }}</dt>
</dl>
```

### Example for proper usage of v-for in Vue2 for template tags

```html
<template v-for="(person, index) in people">
  <div :key="index">Name: </div>
  <div :key="person.name">{{ person.name }}</div>
</template>
```

### Example for proper usage of v-for in Vue2 for template tags

```html
<template v-for="(person, index) in people" :key="person.name">
  <div>Name: </div>
  <div>{{ person.name }}</div>
</template>
```

## Removal of .native modifier
- in Vue2 .native is used on a parent element to listen to native/non-custom events
- custom events are emitted via `emit` while native events are triggered via the normal browser events
- without a .native modifier being present a parent element can't listen to native events that are propagated from the child
- in Vue3 all events that are not listed in the `emits`-field are treated as native events and can be listened to without the need for a .native modifier
- by adding native events to the `emits`-field they can be augmented with custom parameters etc.

### Example Vue2

```html
<div>
  <child-component
    @custom-event="handleCustomEvent"
    @click.prevent="handleClickEvent" // listens for click event
    @click="handleClickEvent" // listens for emitted events e.g. this.$emit('click', newValue)
  />
</div>
```

## New event-naming conventions
- Vue2 recommends kebab-case for event naming
- Vue3 allows kebab-cas and camelCase and favours camelCase

### Example

```html
<div>
  <child-component
    @update-text="handleTextUpdate"
    @updateText="handleTextUpdate"
  />
</div>
```

```ts
export default defineComponent({
  emits: [
    'updateTextValue',
  ],
  methods: {
    emitEvent(): void {
        this.$emit('update-text') // recommended for Vue2
        this.$emit('updateText') // recommended for Vue3
    },
  }
})
```