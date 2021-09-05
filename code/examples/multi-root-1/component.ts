import { defineComponent } from 'vue';

export default defineComponent({
  data() {
    return {
      hasLoaded: false,
    };
  },
  mounted() {
    setTimeout(() => {
      this.hasLoaded = true;
    }, 5000);
  },
  template: `
    <div v-if="!hasLoaded">
      <marquee>
        Table is loading. Please wait!
      </marquee>
    </div>
    <table v-else>
      <tr>
        <th>Head 1</th>
        <th>Head 2</th>
      </tr>
      <tr>
        <td>Column 1</td>
        <td>Column 2</td>
      </tr>
    </table>
  `,
});
