<template>
  <div class="min-h-screen flex flex-col">
    <NavBar />
    <main class="flex-1 container mx-auto max-w-3xl px-4 py-4 pb-24">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import NavBar from '@/components/common/NavBar.vue'
</script>
