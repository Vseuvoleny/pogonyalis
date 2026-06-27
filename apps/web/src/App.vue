<template>
  <div class="app">
    <h1>Pogonyalis Vue 3</h1>
    <p>{{ sharedText }}</p>
  </div>
</template>

<script setup lang="ts">
import { sharedText } from '@pogonyalis/ui';
</script>

<style>
body {
  margin: 0;
  font-family: system-ui, sans-serif;
}

.app {
  padding: 32px;
}
</style>
