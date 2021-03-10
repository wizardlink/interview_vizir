<template>
  <div class="column items-center">
    <section class="col" style="width: 80%;">
      <time-to-payment :options="options" @update-models="listenUpdate"></time-to-payment>
    </section>

    <section class="col text-center q-pt-md">
      <div class="row">

        <div class="col-12 col-sm-6">
          <q-card class="q-ma-lg">
            <q-card-section class="bg-primary">
              <div class="text-h5 text-grey-1 text-no-wrap">
                Com FaleMais
              </div>
            </q-card-section>

            <q-card-section>
              <div data-cy="price">
                {{ planPrice }}
              </div>
            </q-card-section>
          </q-card>
        </div>

        <div class="col-12 col-sm-6">
          <q-card class="q-ma-lg">
            <q-card-section class="bg-secondary">
              <div class="text-h5 text-grey-1 text-no-wrap">
                Sem FaleMais
              </div>
            </q-card-section>

            <q-card-section>
              <div data-cy="price">
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

import TimeToPayment from './TimeToPayment.vue'
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
  components: { TimeToPayment },
  data (): IDataOptions {
    return {
      origin: '',
      destination: '',
      time: 0,
      plan: 0,
      fixedFloat: 2
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
        ? 0
        : fare

      return fare
    },
    fullPrice (): string {
      const price = this.fare * this.time

      return price <= 0 ? '-' : `R$ ${price.toFixed(this.fixedFloat)}`
    },
    planPrice (): string {
      const freeTime = this.fare * this.plan
      const finalPrice = this.fare * this.time - freeTime

      return finalPrice <= 0 ? '-' : `R$ ${finalPrice.toFixed(this.fixedFloat)}`
    }
  },
  methods: {
    listenUpdate (values: { origin: string, destination: string, time: number, plan: number }): void {
      this.origin = values.origin
      this.destination = values.destination
      this.time = values.time
      this.plan = values.plan
    }
  }
})
</script>
