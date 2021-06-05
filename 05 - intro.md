# Intro

## Goals
- Better Typescript integration
- Remove Vue2 reactivity issues (no more Vue.set etc.)
- Unify and extend data binding (v-model vs .sync, multiple v-models)
- Remove Vue2 template limitations (fragments, multi-root etc.)
- Simplify component splitting to avoid overly complex components (monster components)
- More FP, less OOP
- Faster, smaller etc.

## Better Typescript support
- Vue2 was written using Flow with types for Typescript being generated separately
- Vue3 is a complete rewrite in Typescript
- Class API was originally considered but ultimately dropped during development
- Type interference for props and mostly works out of the box already for options-api and composition-api
- Type checking still doesn't work in templates out the box

### Example Vue2 vs Vue3 options-api and Vue3 composition-api
#todo

## Reactivity improvements
- Vue2 uses getter and setter via object.defineProperty to enable reactivity and can't detect modifications in nested data (objects, arrays)
- Workarounds like Vue.set or reassigning a modified copy of the object/array using the spread operator or Object.assign are necessary in this case
- Vue3 uses proxys, which don't have these limitations

## Unify and extend data binding
- Vue2.0 removed the .sync modifier and brought it back in Vue2.3
- Vue3.0 removes .sync again in favour of a more powerful and extended v-model functionality
- Component can now have multiple v-models attributes and define custom modifiers