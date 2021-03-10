<template>
  <div class="row justify-around">
    <div class="col-12 col-sm-6 col-md-3">
      <!-- Origin -->
      <conversor-selector
        class="q-mx-lg q-my-md"
        icon="flight_takeoff"
        label="Origem"
        :options="callOptions"
        @update-model="updateOrigin"
      >
      </conversor-selector>
    </div>

    <!-- Destination -->
    <div class="col-12 col-sm-6 col-md-3">
      <conversor-selector
        class="q-mx-lg q-my-md"
        icon="flight_land"
        label="Destino"
        :options="callOptions"
        @update-model="updateDestination"
      >
      </conversor-selector>
    </div>

    <!-- Plans -->
    <div class="col-12 col-sm-6 col-md-3">
      <conversor-selector
        class="q-mx-lg q-my-md"
        icon="attach_money"
        label="Plano (m)"
        prefix="FaleMais "
        :options="options.plans"
        @update-model="updatePlan"
      >
      </conversor-selector>
    </div>

    <!-- Time -->
    <div class="col-12 col-sm-6 col-md-3">
      <q-input
        class="q-mx-lg q-my-md"
        filled
        clearable
        label="Tempo (m)"
        mask="###"
        v-model="time"
      >
        <template v-slot:prepend>
          <q-icon name="schedule" />
        </template>
      </q-input>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@vue/composition-api'

import ConversorSelector from './ConversorSelector.vue'
import { IConversorOptions } from './models'

interface IDataOptions {
  destination: string
  origin: string
  plan: number
  time: number
}

export default defineComponent({
  name: 'TimeToPayment',
  components: { ConversorSelector },
  data (): IDataOptions {
    return {
      destination: '',
      origin: '',
      plan: 0,
      time: 0
    }
  },
  props: {
    options: {
      type: (Object as unknown) as PropType<IConversorOptions>,
      required: true
    }
  },
  computed: {
    callOptions (): string[] {
      return Array.from(this.options.call.keys())
    }
  },
  watch: {
    time (): void {
      this.updateParent()
    }
  },
  methods: {
    updateDestination (model?: string): void {
      this.destination = model === null
        ? ''
        : model as string

      this.updateParent()
    },
    updateOrigin (model?: string): void {
      this.origin = model === null
        ? ''
        : model as string

      this.updateParent()
    },
    updatePlan (model?: number): void {
      this.plan = model === null
        ? 0
        : model as number

      this.updateParent()
    },
    updateParent (): void {
      this.$emit('update-models', {
        destination: this.destination,
        origin: this.origin,
        plan: this.plan,
        time: this.time
      })
    }
  }
})
</script>
