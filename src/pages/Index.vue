<template>
  <q-page class="column">
    <!-- Heading -->
    <section class="col-4 bg-primary">
      <div class="text-center q-px-md">
        <h2 class="text-grey-1">
          <q-icon name="call" style="font-size: 0.8em; padding-right: 0;" />
          Telzir
        </h2>

        <p class="text-grey-4">
          Com a Telzir você tem planos de ligações interestaduais sem pagar nada!
          Oferecemos planos de 30, 60 e 120 minutos de ligação, os quais você apenas paga pelos minutos excedentes.
        </p>
      </div>
    </section>

    <!-- Converter -->
    <section class="col-8 q-mt-xl">
      <h3 class="text-center">
        Conversor
      </h3>

      <conversor :options="conversorOptions"></conversor>
    </section>

  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api'

import Conversor from 'components/Conversor.vue'
import { IConversorOptions } from 'components/models'

const callOptions = new Map<string, Map<string, number>>([
  [
    '011',
    new Map([
      [
        '016',
        1.90
      ],
      [
        '017',
        1.70
      ],
      [
        '018',
        0.90
      ]
    ])
  ],
  [
    '016',
    new Map([
      [
        '011',
        2.90
      ]
    ])
  ],
  [
    '017',
    new Map([
      [
        '011',
        2.70
      ]
    ])
  ],
  [
    '018',
    new Map([
      [
        '011',
        1.90
      ]
    ])
  ]
])

export default defineComponent({
  name: 'PageIndex',
  components: { Conversor },
  setup () {
    return {
      conversorOptions: ref<IConversorOptions>({
        call: callOptions,
        time: [30, 60, 120]
      })
    }
  }
})
</script>
