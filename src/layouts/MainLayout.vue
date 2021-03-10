<template>
  <!-- https://quasar.dev/layout/layout#QLayout-API -->
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <router-view />

      <!-- Adds a button to let the user scroll back to the top -->
      <q-page-scroller position="bottom-right" :scroll-offset="150" :offset="[18, 18]">
        <q-btn fab icon="keyboard_arrow_up" color="primary" />
      </q-page-scroller>

    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'MainLayout'
})
</script>
