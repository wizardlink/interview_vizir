<template>
  <div class="column items-center">
    <section class="col" style="width: 80%;">
      <conversor-selectors :options="options" @update-models="listenUpdate"></conversor-selectors>
    </section>

    <section class="col text-center q-pt-md">
      <div class="row">

        <!-- With the plan -->
        <div class="col-12 col-sm-6">
          <q-card class="q-ma-lg">
            <q-card-section class="bg-primary">
              <div class="text-h5 text-grey-1 text-no-wrap">
                Com FaleMais
              </div>
            </q-card-section>

            <q-card-section>
              <div data-cy="price-plan">
                {{ planPrice }}
              </div>
            </q-card-section>
          </q-card>
        </div>

        <!-- Without the plan -->
        <div class="col-12 col-sm-6">
          <q-card class="q-ma-lg">
            <q-card-section class="bg-secondary">
              <div class="text-h5 text-grey-1 text-no-wrap">
                Sem FaleMais
              </div>
            </q-card-section>

            <q-card-section>
              <div data-cy="price-full">
                {{ fullPrice }}
              </div>
            </q-card-section>
          </q-card>
        </div>

      </div>
    </section>

  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@vue/composition-api'

import ConversorSelectors from './ConversorSelectors.vue'
import { IConversorOptions } from './models'

interface IDataOptions {
  origin: string
  destination: string
  time: number
  plan: number
  fixedFloat: number
}

export default defineComponent({
  name: 'Conversor',
  components: { ConversorSelectors },
  data (): IDataOptions {
    return {
      origin: '',
      destination: '',
      time: 0,
      plan: 0,
      fixedFloat: 2 // Makes sure that the numbers will only have two decimal points
    }
  },
  props: {
    options: {
      type: (Object as unknown) as PropType<IConversorOptions>,
      required: true
    }
  },
  computed: {
    fare (): number {
      if (!this.options) return 0

      let fare = this.options.call.get(this.origin)?.get(this.destination) as number

      fare = !fare
        ? -1
        : fare

      return fare
    },
    fullPrice (): string {
      if (this.fare === -1) return '-'

      const price = this.fare * this.time

      return price < 0 ? '-' : `R$ ${price.toFixed(this.fixedFloat)}`
    },
    planPrice (): string {
      if (this.fare === -1) return '-'

      const freeTime = this.fare * this.plan
      const fullPrice = this.fare * this.time

      const finalPrice = fullPrice <= freeTime
        ? 0
        : fullPrice - freeTime

      return `R$ ${finalPrice.toFixed(this.fixedFloat)}`
    }
  },
  methods: {
    // Updates the values needed for calculation
    listenUpdate (values: { origin: string, destination: string, time: number, plan: number }): void {
      this.origin = values.origin
      this.destination = values.destination
      this.time = values.time
      this.plan = values.plan
    }
  }
})
</script>
