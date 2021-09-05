import { defineComponent } from 'vue';
export default defineComponent({
    data() {
        return {
            overlayIsVisible: false,
            overlayNumberOfClicks: 0,
        };
    },
    methods: {
        closeOverlay() {
            this.overlayIsVisible = false;
            this.overlayNumberOfClicks = 0;
        },
        openOverlay() {
            this.overlayIsVisible = true;
        },
        clickInsideOverlay() {
            this.overlayNumberOfClicks += 1;
        },
    },
    template: `
    <div>
      <h1>
        Clicks inside modal: {{ overlayNumberOfClicks }}
      </h1>
      <button @click="overlayIsVisible ? closeOverlay() : openOverlay()">
        {{ overlayIsVisible ? 'Hide' : 'Show' }} modal
      </button>
      <teleport to="body" v-if="overlayIsVisible">
        <div class="overlay">
          <button @click="clickInsideOverlay">
            Click
          </button>
          <button @click="closeOverlay">
            Close modal
          </button>
        </div>
      </teleport>
    </div>
  `,
});
