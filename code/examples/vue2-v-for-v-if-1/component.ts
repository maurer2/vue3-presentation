import Vue from 'vue2';

type Person = {
  name: string,
  age: number,
}

export default Vue.extend({
  data() {
    return {
      ageLimit: 5,
      people: [
        {
          name: 'Loona Loonie',
          age: 1,
        },
        {
          name: 'Ted Tenner',
          age: 10,
        },
        {
          name: 'Franklin Fiver',
          age: 5,
        },
      ],
    };
  },
  computed: {
    filteredPeople() {
      const people = this.people as Person[];
      const ageLimit = this.ageLimit as number;

      return people.filter((person) => person.age >= ageLimit);
    },
  },
  template: `
    <div class="root">
      <dl v-for="person in people" v-if="person.age >= 5">
        <dt>Name: </dt>
        <dd>{{ person.name }}</dd>
        <dt>Age: </dt>
        <dd>{{ person.age }}</dd>
      </dl>
      <hr />
      <dl v-for="person in filteredPeople">
        <dt>Name: </dt>
        <dd>{{ person.name }}</dd>
        <dt>Age: </dt>
        <dd>{{ person.age }}</dd>
      </dl>
    </div>
  `,
});
