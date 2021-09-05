import { defineComponent } from 'vue';

export default defineComponent({
  data() {
    return {
      modalIsVisible: false,
      overlayNumberOfClicks: 0,
    };
  },
  methods: {
    closeOverlay(): void {
      this.modalIsVisible = false;
      this.overlayNumberOfClicks = 0;
    },
    openOverlay(): void {
      this.modalIsVisible = true;
    },
    clickInsideOverlay(): void {
      this.overlayNumberOfClicks += 1;
    },
  },
  template: `
    <div>
      <h1>
        Clicks inside overlay: {{ overlayNumberOfClicks }}
      </h1>
      <button @click="modalIsVisible ? closeOverlay() : openOverlay()">
        {{ modalIsVisible ? 'Hide' : 'Show' }} overlay
      </button>
      <teleport to="body" v-if="modalIsVisible">
        <div class="overlay">
          <button @click="clickInsideOverlay">
            Click
          </button>
          <button @click="closeOverlay">
            Close overlay
          </button>
        </div>
      </teleport>
    </div>
  `,
});
