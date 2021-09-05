import Vue from 'vue2';
const names = ['Player1', 'Player2'];
export default Vue.extend({
    props: {
        player: {
            type: Object,
            default: () => ({
                name: 'Ted',
                score: 0,
            }),
        },
    },
    methods: {
        handleClick() {
            this.$emit('update-player');
        },
    },
    template: `
    <div>
      <dl>
        <dt>{{ player.name }}</dt>
        <dd>{{ player.score }}</dd>
      </dl>
      <button
        type="button"
        @click="handleClick()"
      >
        Click
      </button>
    </div>
  `,
});
