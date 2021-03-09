<template>
  <div class="column items-center">
    <section class="col" style="width: 90%;">
      <time-to-payment :options="options"></time-to-payment>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@vue/composition-api'

import TimeToPayment from './TimeToPayment.vue'
import { IConversorOptions } from './models'

export default defineComponent({
  name: 'Conversor',
  components: { TimeToPayment },
  props: {
    options: {
      type: (Object as unknown) as PropType<IConversorOptions>,
      required: true
    }
  }
})
</script>
