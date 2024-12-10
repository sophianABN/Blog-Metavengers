<template>
  <div>
    <!-- Hero Section 
    <section class="bg-gradient-to-r from-primary to-secondary text-white py-20">
      <div class="container mx-auto px-4">
        <h1 class="text-5xl font-bold mb-6 animate-fade-in">Metavengers Blog</h1>
        <p class="text-xl mb-8 max-w-2xl animate-fade-in-delay">
          Explorez l'univers de la tech à travers nos articles et découvertes
        </p>
      </div>
    </section>-->

    <!-- Articles récents -->
    <section class="container mx-auto px-4 py-12 max-w-6xl mx-auto">
      <h2 class="text-3xl font-bold mb-8">Articles récents</h2>
      <div class="grid md:grid-cols-3 gap-8">
        <ArticleCard 
          v-for="article in recentArticles" 
          :key="article.id" 
          :article="article"
          @click="navigateToArticle(article.id)"
        />
      </div>
      <div class="text-center mt-8">
        <NuxtLink 
          to="/blog" 
          class="inline-block bg-[#F5B212] text-white px-6 py-3 rounded-lg hover:bg-orange-400 transition-colors"
        >
          Voir tous les articles
        </NuxtLink>
      </div>
    </section>

    <!-- Articles populaires -->
    <section class="container mx-auto px-4 py-12 max-w-6xl mx-auto">
      <h2 class="text-3xl font-bold mb-8">Articles populaires</h2>
      <div class="grid md:grid-cols-3 gap-8">
        <ArticleCard 
          v-for="article in popularArticles" 
          :key="article.id" 
          :article="article"
          @click="navigateToArticle(article.id)"
        />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const router = useRouter()
const { articles, loading, getAllArticles } = useArticles()

// Articles récents (3 derniers)
const recentArticles = computed(() => {
  if (!articles.value) return []
  return [...articles.value]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3)
})

// Articles populaires (même avec 0 vues)
const popularArticles = computed(() => {
  if (!articles.value) return []
  return [...articles.value]
    .sort((a, b) => (b.views || 0) - (a.views || 0))
    .slice(0, 3)
})

// Fonction de navigation
const navigateToArticle = (id: string) => {
  router.push(`/blog/${id}`)
}

// Charger les articles au montage du composant
onMounted(async () => {
  await getAllArticles()
})
</script> 