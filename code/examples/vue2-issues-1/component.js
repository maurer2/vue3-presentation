import Vue from 'vue2';
const names = ['Player1', 'Player2'];
const flagNames = ['hasStarted'];
export default Vue.extend({
    components: {
        Player: () => import('./player.js'),
    },
    props: {
        player2StartValue: {
            type: Number,
            default: 10,
        },
    },
    data() {
        return {
            flags: {
            // hasStarted: false,
            },
            players: [
                {
                    name: 'PLAYER1',
                    score: 0,
                },
                {
                    name: 'PLAYER2',
                    score: 0,
                },
            ],
        };
    },
    computed: {
        getTotalNumberOfClicks() {
            const players = this.players;
            const sumOfClicks = players.reduce((total, current) => {
                const newTotal = total + current.score;
                return newTotal;
            }, 0);
            return sumOfClicks;
        },
        hasStarted() {
            const { flags } = this;
            return flags.hasStarted;
        },
    },
    methods: {
        handleClick(isPlayer1) {
            this.flags.hasStarted = true; // doesn't work
            if (isPlayer1) {
                this.players[0].score += 1;
                return;
            }
            this.players[1].score += 1;
        },
    },
    template: `
    <div class="root">
      <h1>
        Total Score {{ getTotalNumberOfClicks }}
        ({{ !!hasStarted ? 'has started' : 'has not started'}})
      </h1>
      <div>
        <Player :player="players[0]" @update-player="handleClick(true)" />
        <hr />
        <Player :player="players[1]" @update-player="handleClick(false)" />
      </div>
    </div>
  `,
});
// Removed for sake of brevity
// Alternative 1
// Vue.set(this.flags, 'hasStarted', true);
// Alternative 2
// this.flags = {
//   ...this.flags,
//   hasStarted: true,
// };
