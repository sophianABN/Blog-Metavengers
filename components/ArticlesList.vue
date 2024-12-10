<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <article v-for="article in articles" :key="article._id" class="bg-white rounded-lg shadow-md overflow-hidden">
      <img :src="article.image" :alt="article.title" class="w-full h-48 object-cover">
      <div class="p-4">
        <div class="flex gap-2 mb-2">
          <span v-for="tag in article.tags" :key="tag" class="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
            {{ tag }}
          </span>
        </div>
        <h2 class="text-xl font-bold mb-2">{{ article.title }}</h2>
        <p class="text-gray-600 mb-4">{{ article.excerpt }}</p>
        <NuxtLink :to="`/articles/${article.slug}`" class="text-primary hover:text-primary-dark">
          Lire la suite →
        </NuxtLink>
      </div>
    </article>
  </div>
</template>

<script setup>
defineProps({
  articles: {
    type: Array,
    required: true
  }
})
</script> 