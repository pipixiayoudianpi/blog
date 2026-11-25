<script setup lang="ts">
import type { PostSummary } from "@/types/post";
defineProps<{
    post: PostSummary;
}>();
</script>
<template>
    <article>
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
    </article>

</template>