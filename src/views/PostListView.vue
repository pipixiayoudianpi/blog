<script setup lang="ts">
import { posts } from "@/utils/posts";
</script>

<template>
    <section>
        <h1 class="text-2xl font-bold mb-8">文章</h1>

        <p v-if="posts.length === 0" class="text-gray-400">还没有文章</p>

        <ul class="space-y-8">
            <li v-for="post in posts" :key="post.slug">
                <RouterLink :to="{ name: 'post-detail', params: { slug: post.slug } }"
                    class="text-xl font-semibold hover:text-blue-600">
                    {{ post.title }}
                </RouterLink>
                <div class="mt-1 flex items-center gap-3 text-sm text-gray-400">
                    <time :datetime="post.date">{{ post.date }}</time>
                    <span v-for="tag in post.tags" :key="tag" class="px-2 py-0.5 rounded bg-gray-100 text-gray-500">
                        {{ tag }}
                    </span>
                </div>
                <p v-if="post.description" class="mt-2 text-gray-600 leading-relaxed">
                    {{ post.description }}
                </p>
            </li>
        </ul>
    </section>
</template>