<template>
  <article 
    class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
    @click="$emit('click')"
  >
    <!-- Image de l'article -->
    <div class="relative aspect-video">
      <img 
        :src="article.image" 
        :alt="article.title"
        class="w-full h-full object-cover"
      >
      <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
        <div class="flex gap-2 flex-wrap">
          <span 
            v-for="tag in article.tags.slice(0, 3)" 
            :key="tag"
            class="bg-white/20 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs"
          >
            #{{ tag }}
          </span>
        </div>
      </div>
    </div>

    <!-- Contenu de l'article -->
    <div class="p-6">
      <h2 class="text-xl font-bold mb-3 hover:text-primary transition-colors">
        {{ article.title }}
      </h2>
      <p class="text-gray-600 mb-4 line-clamp-2">
        {{ article.description }}
      </p>
      
      <!-- Métadonnées -->
      <div class="flex flex-col gap-2 text-sm text-gray-500 border-t pt-4">
        <div class="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <span>Par {{ article.author }}</span>
        </div>
        
        <div class="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Temps de lecture : {{ article.readingTime }}</span>
        </div>

        <div class="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span>
            {{ article.updatedAt ? 'Mis à jour le ' + formatDate(article.updatedAt) : 'Publié le ' + formatDate(article.date) }}
          </span>
        </div>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import type { Article } from '~/types/article'

const props = defineProps<{
  article: Article
}>()

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

defineEmits<{
  (e: 'click'): void
}>()
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style> 