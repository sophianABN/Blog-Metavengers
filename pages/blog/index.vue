<template>
  <div class="container mx-auto px-4 py-8 max-w-6xl mx-auto">
    <h1 class="text-4xl font-bold mb-8">Blog</h1>

    <!-- Liste des articles -->
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      <ArticleCard 
        v-for="article in displayedArticles" 
        :key="article.id" 
        :article="article"
        @click="navigateToArticle(article.id)"
      />
    </div>

    <!-- Loader -->
    <div 
      v-if="loading && hasMoreArticles" 
      class="text-center py-12"
      ref="loadingRef"
    >
      <div class="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent mx-auto"></div>
    </div>

    <!-- Message quand il n'y a plus d'articles -->
    <div 
      v-if="!hasMoreArticles && displayedArticles.length > 0" 
      class="text-center py-12 text-gray-500"
    >
      Vous avez vu tous les articles
    </div>
  </div>
</template>

<script setup lang="ts">
const { articles, loading, getAllArticles } = useArticles()
const router = useRouter()

const ARTICLES_PER_PAGE = 9
const currentPage = ref(1)
const loadingRef = ref(null)

// Articles à afficher
const displayedArticles = computed(() => {
  return articles.value
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, currentPage.value * ARTICLES_PER_PAGE)
})

// Observer pour le scroll infini
onMounted(() => {
  getAllArticles()
  
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting && !loading.value && hasMoreArticles.value) {
        loadMore()
      }
    },
    { rootMargin: '100px' }
  )

  if (loadingRef.value) {
    observer.observe(loadingRef.value)
  }

  // Cleanup
  onUnmounted(() => {
    observer.disconnect()
  })
})

// Vérifier s'il y a plus d'articles à charger
const hasMoreArticles = computed(() => {
  return displayedArticles.value.length < articles.value.length
})

// Charger plus d'articles
const loadMore = () => {
  currentPage.value++
}

// Navigation vers l'article
const navigateToArticle = (id: string) => {
  router.push(`/blog/${id}`)
}
</script> 