<script setup lang="ts">
import { posts } from "@/utils/posts";
import PostItem from "@/components/PostItem.vue";

const latestPosts = posts.slice(0, 3);
</script>

<template>
    <section class="space-y-4">
        <h1 class="text-3xl font-bold">你好 👋</h1>
        <p class="text-gray-600 leading-relaxed">
            前端工程师，正在从 toB SaaS 前端转型 AI 应用前端。这里记录我的学习过程和踩过的坑。
        </p>
    </section>
    <section v-if="latestPosts.length > 0" class="mt-12">
        <h2 class="text-lg font-semibold mb-6">最新文章</h2>
        <ul class="space-y-8">
            <li v-for="post in latestPosts" :key="post.slug">
                <PostItem :post="post"></PostItem>
            </li>
        </ul>
        <RouterLink to="/posts" class="inline-block text-blue-600 hover:underline">
            全部文章 →
        </RouterLink>
    </section>
</template>