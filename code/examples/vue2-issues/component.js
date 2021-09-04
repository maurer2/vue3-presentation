import Vue from 'vue2';
const names = ['Player1', 'Player2'];
const flagNames = ['hasStarted'];
export default Vue.extend({
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
            // this.flags.hasStarted = true; // doesn't work
            // Alternative 1
            // Vue.set(this.flags, 'hasStarted', true);
            // Alternative 2
            this.flags = {
                ...this.flags,
                hasStarted: true,
            };
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
        <dl>
          <dt>{{ players[0].name }}</dt>
          <dd> {{ players[0].score }}</dd>
        </dl>
        <button
          type="button"
          @click="handleClick(true)"
        >
          Click
        </button>
      </div>
      <hr />
      <div>
        <dl>
          <dt>{{ players[1].name }}</dt>
          <dd> {{ players[1].score }}</dd>
        </dl>
        <button
          type="button"
          @click="() => handleClick(false)"
        >
          Click
        </button>
      </div>
    </div>
  `,
});