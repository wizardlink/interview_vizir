<template>
  <div class="row justify-around">
    <div class="col-3">
      <!-- Origin -->
      <conversor-selector
        icon="flight_takeoff"
        label="Origem"
        :options="callOptions"
        :model="originSelect"
      >
      </conversor-selector>
    </div>

    <!-- Destination -->
    <div class="col-3">
      <conversor-selector
        icon="flight_land"
        label="Destino"
        :options="callOptions"
        :model="destinationSelect"
      >
      </conversor-selector>
    </div>

    <!-- Time -->
    <div class="col-3">
      <conversor-selector
        icon="schedule"
        label="Tempo (m)"
        :options="options.time"
        :model="timeSelect"
      >
      </conversor-selector>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@vue/composition-api'

import ConversorSelector from './ConversorSelector.vue'
import { IConversorOptions } from './models'

export default defineComponent({
  name: 'TimeToPayment',
  components: { ConversorSelector },
  data () {
    return {
      originSelect: '',
      destinationSelect: '',
      timeSelect: ''
    }
  },
  computed: {
    callOptions (): string[] {
      return Array.from(this.options.call.keys())
    }
  },
  props: {
    options: {
      type: (Object as unknown) as PropType<IConversorOptions>,
      required: true
    }
  }
})
</script>
