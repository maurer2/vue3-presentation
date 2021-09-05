import Vue from 'vue2';
export default Vue.extend({
    data() {
        return {
            people: [
                {
                    name: 'Cersei Centenarian',
                    age: 100,
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
            return this.people.filter((person) => person.age > 5);
        },
    },
    template: `
    <div class="root">
      <dl v-for="person in people" v-if="person.age > 5">
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
