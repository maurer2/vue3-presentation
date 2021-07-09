# Composition api

## Benefits
- Fixes some gotchas of the options api that make beginners trip up (arrow functions in data, methods etc.)
- Removes the need to be familiar with OOP and execution context in JS
- Simpler way to split code and share functionality (an alternative to mixins)
- More React-like

## Disadvantages
- Further fragmentation of the Vue ecosystem (Options api, Class components etc.)
- Single large setup function per component (debatable)
- Console.log debugging more annoying due to Proxy wrapper

## Component structure

```html
<button
  type="button"
  @click="handleClick"
>
  {{ props.name}} clicked {{ counter }} time(s)
</button>
```

```ts
export default defineComponent({
  name: 'Component name',
  props: {
    name: {
      type: String as PropType<string>,
      required: true,
      default: 'User'
    }
  },
  emits: {},
  setup(props, context) {
    const counter = ref<number>(0)

    function handleClick(): void {
      counter.value += 1
    }

    return {
      counter,
      props,
      handleClick,
    }
  }
})
```

Component logic is contained within the setup function rather than split up in methods, computed and watchers like in the option api.
Setup function is run once when the component is mounted (hence the name setup) and creates reactive proxy objects for data, computed properties, watchers etc. Unlike functional components in React, the setup function is not run again/rerendered when props change.

## API

### Props handling
Props are passed to the setup function as the first parameter. In order to specify the correct Type, Vue provides the PropType helper function. It is most useful, when using non primitive-types, to further specify the type, since the built in Object-type in Vue is too generic.

```ts
....
props: {
  myObject: {
    type: Object as PropType<MyCustomType>,
    required: false,
    default: null
  }
}
...
```

In this example the props parameter of the setup function would contain myObject with the correct type of MyCustomType.
Unfortunately destructuring props to have a cleaner function is not as straightforward as in React. Destructuring props directly breaks reactivity, so prop changes won't cause updates in the child component. Fortunately Vue provides a built in workaround via the toRefs-function, which keeps reactivity intact.

#### Bad & Good destructuring

```ts
export default defineComponent({
  props: {
    name: {
      type: String as PropType<string>,
      required: true,
      default: 'User'
    }
  },
  // Bad
  setup({name}, context) {

  // Good
  setup(props, context) {

    // Bad
    const {name} = props

    // Good
    const {name} = toRefs(props)
  }
})
```

When correctly set up with the Vue-eslint-plugin, eslint also shows a warning when trying use top level destructuring. Regular destructuring within functions is fine and doesn't break reactivity // todo: verify

### Exposing data to templates
Every piece of data, event handlers, computed properties etc. that are used in the template need to be returned from the setup function as part of the return object. The only exception to this are props, which are automatically made available to templates. Other component data that is not returned from the setup function is basically private and can not be used in the template.

### Event emitting
Events are still emitted via the emit method and the emit function still contains of the event name and optional payload. The emit-function is now part of the context object, which is the second parameter of the setup function. The context-parameter can be destructured to avoid having to use `context.emit` in the code.
Further validation for events can be added via the emits-property.

#### Example emit
```ts
export default defineComponent({
  setup(props, {emit}) {
    const counter = ref<number>(0)

    function handleClick(): void {
      emit('clicked', counter.value)
    }

    return {
      counter,
      props,
      handleClick,
    }
  }
})
```

### Storing reactive data
The composition api provides ***ref*** and ***reactive*** functions to store reactive values in the setup function. Reactive only accepts objects and creates a proxy object from the passed object. Ref can store primitives like booleans, numbers etc. but also objects. Ref creates a proxy object that has a single key named value, which stores the reactive value. When using ref with an object, reactive is used behind the scenes. Aside from reactive data, ref is also used to store references to dom nodes to have a reactive way to access the dom, without having to use querySelector*All or getElementById.

Since the composition api is fairly new, it might take some time to until certain patterns and best practices emerge similar to the transition to hooks in React.

When accessing a ref entry in the setup function, e.g. inside a computed, watcher etc. it is necessary to read or assign values from/to `refVariable.value`. Assigning a value to the root ref entry won't work and will cause an error in typescript, when properly typed.
When accessing a ref entry in the template, it is not required to access `refVariable.value`, as refs are unwrapped automatically, so `refVariable` is enough.

Accessing a reactive object is easier, as it is similar to regular object access in Javascript. It is important to know that unlike reactive data in Vue3 reactive is filly reactive, e.g. changing nested data will be detected by Vue. `Vue.set` is no longer necessary.

#### Example
```html
<code>
  <pre>
    {{ counterRef }}
    {{ counterReactiveRight }}
  </pre>
</code>
```

```ts
export default defineComponent({
  setup() {
    // Okay
    const counterRef = ref<number>(0)
    // Not okay
    const counterReactiveWrong = reactive<number>(0)
    // Okay
    const counterReactiveRight = reactive<CounterType>({
      counterValue: 0,
    })

    function updateValues(): void {
      // Okay
      counterRef.value = Math.round(Math.random() * 10)
      // Not okay
      counterRef = Math.round(Math.random() * 10)
      // Okay
      counterReactiveRight.value = Math.round(Math.random() * 10)
    }

    return {
      counterRef,
      counterReactiveRight,
      updateValues,
    }
  }
})
```

### Reactive dependent data (computed & watchers)
Just like in the options api, the composition api uses computed properties and watchers to get reactive data that depends on other data. Aside from a change in syntax the haven't changed much. Watchers have changed quite a bit.

#### Example computed

```ts
export default defineComponent({
  setup() {
    const counter = ref<number>(0)

    const hasBeenClicked = computed<boolean>(() => counter.value !== 0)

    return {
      counter,
      hasBeenClicked,
    }
  }
})


### Watch & WatchEffect

### Lifecycle Methods
Keeps explicit lifecycle methods unlike React

### Others

### Create and use custom hooks

#### Comparison with modern React