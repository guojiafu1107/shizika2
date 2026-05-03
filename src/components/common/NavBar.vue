<template>
  <nav class="sticky top-0 z-50 bg-primary shadow-md">
    <div class="container mx-auto max-w-3xl px-4 h-14 flex items-center justify-between">
      <router-link to="/" class="text-white font-bold text-xl flex items-center gap-2">
        <span class="text-2xl">📚</span>
        <span class="hidden sm:inline">识字卡</span>
      </router-link>
      
      <div class="flex items-center gap-2">
        <router-link
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          class="flex flex-col items-center justify-center w-14 h-12 rounded-xl text-white/90 hover:bg-white/20 transition-colors"
          :class="{ 'bg-white/30 font-bold': $route.path === item.to || (item.to !== '/' && $route.path.startsWith(item.to)) }"
        >
          <span class="text-xl">{{ item.icon }}</span>
          <span class="text-xs scale-90">{{ item.label }}</span>
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script setup>
const navItems = [
  { to: '/', icon: '🏠', label: '首页' },
  { to: '/learn', icon: '✏️', label: '学习' },
  { to: '/practice', icon: '🎮', label: '练习' },
  { to: '/profile', icon: '🏆', label: '进度' }
]
</script>
