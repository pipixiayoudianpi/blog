<script setup lang="ts">
// 临时数据，Day 16 会换成从 Markdown 文件自动读取
const posts = [
    { slug: "week-01-cli-and-git", title: "Week 1 走完，我的命令行 + Git 指南", date: "2026-06-15" },
    { slug: "hello-world", title: "Hello World", date: "2026-11-25" },
];
</script>

<template>
    <section>
        <h1 class="text-2xl font-bold mb-6">文章</h1>
        <ul class="space-y-4">
            <li v-for="post in posts" :key="post.slug">
                <RouterLink :to="{ name: 'post-detail', params: { slug: post.slug } }"
                    class="text-lg hover:text-blue-600">
                    {{ post.title }}
                </RouterLink>
                <p class="text-sm text-gray-400">{{ post.date }}</p>
            </li>
        </ul>
    </section>
</template>