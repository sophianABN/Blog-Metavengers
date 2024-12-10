<template>
  <div class="container mx-auto px-4 py-8">
    <!-- Loading state -->
    <div v-if="loading" class="flex justify-center items-center min-h-[50vh]">
      <div class="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
    </div>

    <!-- Article content -->
    <article v-else-if="article" class="max-w-4xl mx-auto">
      <!-- Header -->
      <header class="mb-8">
        <h1 class="text-4xl font-bold mb-4">{{ article.title }}</h1>
        
        <!-- Métadonnées -->
        <div class="flex flex-wrap gap-6 text-gray-600 mb-6">
          <!-- Auteur -->
          <span class="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            Par {{ article.author }}
          </span>

          <!-- Date de publication -->
          <span class="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Publié le {{ formatDate(article.date) }}
          </span>

          <!-- Date de mise à jour (si disponible) -->
          <span v-if="article.updatedAt" class="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Mis à jour le {{ formatDate(article.updatedAt) }}
          </span>

          <!-- Temps de lecture -->
          <span class="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Temps de lecture : {{ article.readingTime }}
          </span>
        </div>
        
        <!-- Tags -->
        <div class="flex flex-wrap gap-2 mb-8">
          <span 
            v-for="tag in article.tags" 
            :key="tag"
            class="bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-700"
          >
            #{{ tag }}
          </span>
        </div>

        <!-- Featured image -->
        <img 
          :src="article.image" 
          :alt="article.title"
          class="w-full h-[400px] object-cover rounded-xl mb-8"
        >
      </header>

      <!-- Article content -->
      <div class="prose prose-lg max-w-none">
        <ContentMarkdownRenderer :content="article.content" />
      </div>
    </article>

    <!-- Article not found -->
    <div v-else class="text-center py-12">
      <h1 class="text-2xl font-bold mb-4">Article non trouvé</h1>
      <NuxtLink 
        to="/blog" 
        class="text-primary hover:underline"
      >
        Retourner à la liste des articles
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const { getArticle } = useArticles()

const loading = ref(true)
const article = ref<Article | null>(null)

// Formater la date
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// Charger l'article
onMounted(async () => {
  try {
    const id = route.params.id as string
    const fetchedArticle = await getArticle(id)
    if (fetchedArticle) {
      article.value = fetchedArticle
      console.log('Article content:', fetchedArticle.content) // Pour déboguer
    }
  } catch (error) {
    console.error('Erreur lors du chargement:', error)
  } finally {
    loading.value = false
  }
})
</script>

<style>
/* Ajoutez des styles personnalisés pour le contenu de l'article si nécessaire */
.prose {
  @apply text-gray-800;
}

.prose h2 {
  @apply text-2xl font-bold mt-8 mb-4;
}

.prose p {
  @apply mb-4;
}
</style> 