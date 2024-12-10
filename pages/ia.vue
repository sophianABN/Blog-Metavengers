<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-8 text-center">Intelligence Artificielle</h1>
    
    <!-- Version desktop : cards horizontales -->
    <div class="hidden md:flex flex-col gap-6 max-w-4xl mx-auto">
      <ArticleCardHorizontal 
        v-for="article in articles" 
        :key="article.id" 
        :article="article"
        @click="navigateToArticle(article.id)"
      />
    </div>

    <!-- Version mobile : cards verticales -->
    <div class="md:hidden grid grid-cols-1 gap-6">
      <ArticleCard 
        v-for="article in articles" 
        :key="article.id" 
        :article="article"
        @click="navigateToArticle(article.id)"
      />
    </div>
  </div>
</template>

<script setup>
const router = useRouter()
const { getArticlesByTag } = useArticles()
const articles = ref([])

const navigateToArticle = (id) => {
  router.push(`/blog/${id}`)
}

onMounted(async () => {
  articles.value = await getArticlesByTag('ia')
})
</script> 