import Vue, { PropType } from 'vue2';

const names = ['Player1', 'Player2'] as const;
type Name = Uppercase<typeof names[number]>
type Player = {
  name: Name,
  score: number,
}

export default Vue.extend({
  props: {
    player: {
      type: Object as PropType<Player>,
      default: () => ({
        name: 'Ted',
        score: 0,
      }),
    },
  },
  methods: {
    handleClick(): void {
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
