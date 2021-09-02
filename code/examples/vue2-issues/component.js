import { defineComponent } from 'vue';
export default defineComponent({
    data() {
        return {
            player1Name: 'Player 1',
            player1Score: 0,
            player2Name: 'Player 2',
            player2Score: 0,
            score: {
                total: 0,
            },
        };
    },
    methods: {
        handleClick(isPlayer1) {
            if (isPlayer1) {
                this.player1Score += 1;
            }
            this.player2Score += 1;
        },
    },
    template: `
    <div>
    {{ player1Score }}
      <button
        type="button"
        @click="() => handleClick(true)"
      >
        Clicked {{ counter }} time(s)
      </button>
    </div>
  `,
});
