<template>
  <div class="bg-white rounded-lg shadow-lg p-6">
    <h2 class="text-2xl font-bold mb-4">Preview</h2>
    
    <div class="prose max-w-none">
      <h1>{{ article.title }}</h1>
      <div class="text-sm text-gray-500">
        Par {{ article.author }} • {{ formatDate(article.date) }}
      </div>
      
      <div class="my-4">
        <img :src="article.image" :alt="article.title" class="rounded-lg w-full">
      </div>
      
      <p class="text-lg font-medium text-gray-700">{{ article.description }}</p>
      
      <div class="flex gap-2 my-4">
        <span 
          v-for="tag in article.tags" 
          :key="tag"
          class="bg-gray-100 px-2 py-1 rounded-full text-sm text-gray-600"
        >
          {{ tag }}
        </span>
      </div>
      
      <ContentMarkdownRenderer :content="article.content" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Article } from '~/types/article'

defineProps<{
  article: Partial<Article>
}>()

const formatDate = (dateString?: string) => {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
</script>