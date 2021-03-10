<template>
  <q-select
    filled
    clearable
    v-model="model"
    :options="options"
    :label="label"
    :prefix="prefix"
  >
    <template v-slot:prepend>
      <q-icon :name="icon" />
    </template>
  </q-select>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'ConversorSelector',
  data (): { model: string | number | null } {
    return {
      model: null
    }
  },
  props: {
    icon: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    prefix: {
      type: String,
      required: false
    },
    options: {
      type: Array,
      required: true
    }
  },
  watch: {
    model (newModel?: string | number): void {
      this.$emit('update-model', newModel)
    }
  }
})
</script>
