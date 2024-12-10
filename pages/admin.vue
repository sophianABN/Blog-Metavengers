<template>
  <div class="container mx-auto px-4 py-8">
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-3xl font-bold">Administration</h1>
      <button 
        @click="handleLogout" 
        class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Déconnexion
      </button>
    </div>
    
    <!-- Formulaire de création/édition d'article -->
    <div class="bg-white rounded-lg shadow-lg p-6 mb-8">
      <h2 class="text-2xl font-bold mb-6">
        {{ isEditing ? 'Modifier l\'article' : 'Créer un nouvel article' }}
      </h2>
      <AdminArticleForm 
        :initial-data="currentArticle"
        @submit="handleSubmit" 
        @cancel="cancelEdit"
      />
    </div>

    <!-- Liste des articles existants -->
    <div v-if="articles.length" class="bg-white rounded-lg shadow-lg p-6">
      <h2 class="text-2xl font-bold mb-6">Articles existants</h2>
      <div class="space-y-4">
        <div v-for="article in articles" :key="article.id" class="flex items-center justify-between p-4 border rounded">
          <div>
            <h3 class="font-bold">{{ article.title }}</h3>
            <p class="text-sm text-gray-600">{{ formatDate(article.date) }}</p>
          </div>
          <div class="space-x-2">
            <button @click="editArticle(article)" class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              Éditer
            </button>
            <button @click="deleteArticle(article.id)" class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
              Supprimer
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useArticles } from '~/composables/useArticles'
import type { Article } from '~/types/article'
import { useAuth } from '~/composables/useAuth'

definePageMeta({
  middleware: ['admin']
})

const { articles, getAllArticles, deleteArticle, addArticle, updateArticle } = useArticles()
const { logout } = useAuth()
const router = useRouter()

const isEditing = ref(false)
const currentArticle = ref<Partial<Article> | null>(null)

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const handleSubmit = async (articleData: any) => {
  try {
    if (isEditing.value && currentArticle.value?.id) {
      await updateArticle(currentArticle.value.id, articleData)
    } else {
      await addArticle(articleData)
    }
    await getAllArticles()
    cancelEdit()
  } catch (error) {
    console.error('Erreur lors de la sauvegarde de l\'article:', error)
  }
}

const editArticle = (article: Article) => {
  currentArticle.value = article
  isEditing.value = true
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const cancelEdit = () => {
  currentArticle.value = null
  isEditing.value = false
}

const handleLogout = async () => {
  await logout()
  router.push('/login')
}

onMounted(() => {
  getAllArticles()
})
</script> 
