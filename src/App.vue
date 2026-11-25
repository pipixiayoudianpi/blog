<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";

const navItems = [
  { to: "/", label: "首页" },
  { to: "/posts", label: "文章" },
  { to: "/about", label: "关于" },
];
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <header class="border-b">
      <nav class="max-w-3xl mx-auto px-6 h-14 flex items-center justify-between">
        <RouterLink to="/" class="font-bold text-lg">我的博客</RouterLink>
        <div class="flex gap-6 text-sm">
          <RouterLink v-for="item in navItems" :key="item.to" :to="item.to" class="text-gray-500 hover:text-gray-900"
            active-class="!text-blue-600 font-medium">
            {{ item.label }}
          </RouterLink>
        </div>
      </nav>
    </header>

    <main class="flex-1 w-full max-w-3xl mx-auto px-6 py-10">
      <RouterView />
    </main>

    <footer class="border-t py-6 text-center text-sm text-gray-400">
      © 2026 ·
      <a href="https://github.com/pipixiayoudianpi" target="_blank" rel="noopener" class="hover:text-gray-600">
        GitHub
      </a>
    </footer>
  </div>
</template>