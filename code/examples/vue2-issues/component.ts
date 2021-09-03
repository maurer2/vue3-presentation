import Vue, { PropType } from 'vue2';

const playerNames = ['Player1', 'Player2'] as const;

type PlayerName = Uppercase<typeof playerNames[number]>
type Data = {
  player1Name: PlayerName
  player1Score: number,
  player2Name: PlayerName,
  player2Score: number,
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
      player1Name: 'PLAYER1',
      player1Score: 0,
      player2Name: 'PLAYER2',
      player2Score: 0,
    } as Data;
  },
  computed: {
    getTotalNumberOfClicks() {
      const score1 = this.player1Score as number;
      const score2 = this.player2Score as number;

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
        this.player1Score += 1;

        return;
      }
      this.player2Score += 1;
    },
  },
  template: `
    <div class="root">
      <h1>Total Score {{ getTotalNumberOfClicks }}</h1>
      <div>
        <dl>
          <dt>{{ player1Name }}</dt><dd> {{ player1Score }}</dd>
        </dl>
        <button
          type="button"
          @click="() => handleClick(true)"
        >
          {{ player1Name }} click
        </button>
      </div>
      <dl>
        <dt>{{ player2Name }}</dt><dd> {{ player2Score }}</dd>
      </dl>
      <button
          type="button"
          @click="() => handleClick(false)"
        >
          {{ player2Name }} click
        </button>
    </div>
  `,
});
