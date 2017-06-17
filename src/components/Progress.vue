<template>
  <div class="progress" :class="{ active: active }">
    <div class="bar" :style="{ width: percent + '%' }"></div>
  </div>
</template>

<script>
import bus, { PROGRESS_START, PROGRESS_FINISH } from '../utils/bus'

export default {
  name: 'Progress',

  model: {
    prop: 'show',
  },

  props: {
    speed: { type: Number, default: 66 },
    offset: { type: Number, default: 250 },
    show: { type: Boolean, default: false },
  },

  data() {
    return {
      triggers: 0,
      active: this.show,
      percent: 0,
      timer: null,
      timeout: null,
    }
  },

  watch: {
    show(value) {
      if (value) return this.start()
      return this.finish()
    },
  },

  mounted() {
    bus.$on(PROGRESS_START, this.start)
    bus.$on(PROGRESS_FINISH, this.finish)
  },

  beforeDestroy() {
    bus.$off(PROGRESS_START, this.start)
    bus.$off(PROGRESS_FINISH, this.finish)
  },

  methods: {
    start() {
      console.log('start')
      this.percent = this.active && this.percent ? this.percent - 3 : 0
      this.triggers += 1
      if (this.active) return

      clearTimeout(this.timeout)
      this.timer = setInterval(() => {
        this.percent += (95 - this.percent) / 100
      }, this.speed)
      this.active = true
      this.$emit('input', true)
    },

    finish() {
      // By pass the browser queueing as much as we can
      // This will help delay the promise as much as possible to assume route being rendered
      // https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/
      new Promise(resolve => setTimeout(resolve)).then(() => {
        this.triggers -= this.triggers ? 1 : 0
        if (this.triggers) return
        clearInterval(this.timer)
        clearTimeout(this.timeout)
        this.percent = 100
        this.timeout = setTimeout(() => {
          this.active = false
          this.$emit('input', false)
          this.percent = 0
        }, this.offset)
      })
    },
  },
}
</script>


<style scoped>
.progress {
  position: fixed;
  z-index: 99999;
  top: 0;
  left: 0;
  width: 100%;
  opacity: 0;
}

.progress >>> .bar {
  width: 0%;
  height: 5px;
  background-color: #f06c00;
}

.progress.active {
  opacity: 1;
  transition: opacity 0.2s ease;
}

.progress.active >>> .bar {
  transition: width 0.2s ease, background-color 0.4s ease;
}
</style>
