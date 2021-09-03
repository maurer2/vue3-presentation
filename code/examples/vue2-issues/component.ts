import Vue, { PropType } from 'vue2';

const names = ['Player1', 'Player2'] as const;

type Key = Lowercase<typeof names[number]>
type Name = Uppercase<typeof names[number]>
type Player = {
  name: Name,
  score: number,
}

export default Vue.extend({
  props: {
    player2StartValue: {
      type: Number as PropType<number>,
      default: 10,
    },
  },
  data() {
    return {
      player1: {
        name: 'PLAYER1',
        score: 0,
      },
      player2: {
        name: 'PLAYER2',
        score: 0,
      },
    } as Record<Key, Player>;
  },
  computed: {
    getTotalNumberOfClicks() {
      const score1 = this.player1.score as number;
      const score2 = this.player2.score as number;

      const sumOfClicks = [score1, score2].reduce((total, current) => {
        const newTotal = total + current;

        return newTotal;
      }, 0);

      return sumOfClicks;
    },
  },
  methods: {
    handleClick(isPlayer1: boolean): void {
      if (isPlayer1) {
        this.player1.score += 1;

        return;
      }

      this.player2.score += 1;
    },
  },
  template: `
    <div class="root">
      <h1>Total Score {{ getTotalNumberOfClicks }}</h1>
      <div>
        <dl>
          <dt>{{ player1.name }}</dt><dd> {{ player1.score }}</dd>
        </dl>
        <button
          type="button"
          @click="() => handleClick(true)"
        >
          {{ player1.name }} click
        </button>
      </div>
      <dl>
        <dt>{{ player2.name }}</dt><dd> {{ player2.score }}</dd>
      </dl>
      <button
          type="button"
          @click="() => handleClick(false)"
        >
          {{ player2.name }} click
        </button>
    </div>
  `,
});
