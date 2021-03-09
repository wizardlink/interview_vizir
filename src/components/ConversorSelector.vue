<template>
  <q-select filled v-model="model" :options="options" :label="label">
    <template v-slot:prepend>
      <q-icon :name="icon" @click.stop />
    </template>

    <template v-slot:append>
      <q-icon v-if="model" name="close" @click.stop="model = ''" />
    </template>
  </q-select>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'ConversorSelector',
  props: {
    icon: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    options: {
      type: Array,
      required: true
    },
    model: {
      type: String,
      required: true
    }
  }
})
</script>
