<script setup lang="ts">
const { slug } = defineProps<{ slug: string }>();
</script>

<template>
    <article>
        <p class="text-sm text-gray-400 mb-2">slug：{{ slug }}</p>
        <h1 class="text-2xl font-bold">文章详情（Day 17 实现）</h1>
        <RouterLink :to="{ name: 'post-list' }" class="inline-block mt-6 text-blue-600 hover:underline">
            ← 返回列表
        </RouterLink>
    </article>
</template>