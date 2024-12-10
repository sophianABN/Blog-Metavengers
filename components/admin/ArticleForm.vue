<template>
  <div>
    <form @submit.prevent="showPreview" class="space-y-6">
      <div>
        <label for="title" class="block text-sm font-medium text-gray-700">Titre</label>
        <input
          id="title"
          v-model="form.title"
          type="text"
          required
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
        />
      </div>

      <div>
        <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          id="description"
          v-model="form.description"
          required
          rows="3"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
        />
      </div>

      <div>
        <label for="content" class="block text-sm font-medium text-gray-700">
          Contenu (Markdown supporté)
        </label>
        <div class="text-xs text-gray-500 mb-2">
          Utilisez Markdown pour le formatage :
          **gras**, *italique*, # Titre, ## Sous-titre, - liste, etc.
        </div>
        <textarea
          id="content"
          v-model="form.content"
          required
          rows="15"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary font-mono"
          placeholder="# Mon titre
## Sous-titre
Un **texte en gras** et en *italique*

- Liste à puces
- Autre élément

1. Liste numérotée
2. Deuxième élément"
        />
      </div>

      <div>
        <label for="author" class="block text-sm font-medium text-gray-700">Auteur</label>
        <input
          id="author"
          v-model="form.author"
          type="text"
          required
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
        />
      </div>

      <div class="mb-6">
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Image de couverture
        </label>
        <AdminImageUpload 
          ref="imageUploadRef"
          v-model="form.image" 
        />
      </div>

      <div>
        <label for="tags" class="block text-sm font-medium text-gray-700">Tags (séparés par des virgules)</label>
        <input
          id="tags"
          v-model="tagsInput"
          type="text"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
          placeholder="Développement Web, Technologie, Futur"
        />
      </div>

      <div class="flex justify-end space-x-4">
        <button
          type="button"
          @click="emit('cancel')"
          v-if="initialData"
          class="px-6 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
        >
          Annuler
        </button>
        <button
          type="submit"
          class="px-6 py-2 bg-primary text-white rounded-md hover:bg-secondary transition-colors"
        >
          Prévisualiser
        </button>
      </div>
    </form>

    <!-- Modal de prévisualisation -->
    <div v-if="isPreviewVisible" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto m-4">
        <div class="p-6">
          <AdminArticlePreview :article="previewData" />
          
          <div class="flex justify-end space-x-4 mt-6">
            <button
              @click="isPreviewVisible = false"
              class="px-6 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
            >
              Modifier
            </button>
            <button
              @click="handleSubmit"
              class="px-6 py-2 bg-primary text-white rounded-md hover:bg-secondary"
            >
              {{ initialData ? 'Mettre à jour' : 'Publier' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import type { Article } from '~/types/article'

const props = defineProps<{
  initialData?: Partial<Article> | null
}>()

const form = ref({
  title: '',
  description: '',
  content: '',
  author: '',
  image: '',
  tags: [] as string[]
})

const tagsInput = ref('')

const isPreviewVisible = ref(false)
const previewData = ref<Partial<Article>>({})

const imageUploadRef = ref()

const resetForm = () => {
  form.value = {
    title: '',
    description: '',
    content: '',
    author: '',
    image: '',
    tags: []
  }
  tagsInput.value = ''
  
  if (imageUploadRef.value) {
    imageUploadRef.value.preview = ''
  }
}

const emit = defineEmits<{
  (e: 'submit', article: Omit<Article, 'id' | 'date' | 'views'>): void
  (e: 'cancel'): void
}>()

const showPreview = () => {
  previewData.value = {
    ...form.value,
    tags: tagsInput.value.split(',').map(tag => tag.trim()).filter(tag => tag),
    readingTime: `${Math.ceil(form.value.content.split(' ').length / 200)} min`,
    date: new Date().toISOString()
  }
  isPreviewVisible.value = true
}

const handleSubmit = () => {
  emit('submit', previewData.value as Omit<Article, 'date' | 'id' | 'views'>)
  isPreviewVisible.value = false
  resetForm()
}

// Initialiser le formulaire avec les données existantes
watch(() => props.initialData, (newData) => {
  if (newData) {
    form.value = {
      title: newData.title || '',
      description: newData.description || '',
      content: newData.content || '',
      author: newData.author || '',
      image: newData.image || '',
      tags: newData.tags || []
    }
    tagsInput.value = newData.tags?.join(', ') || ''
  } else {
    resetForm()
  }
}, { immediate: true })
</script>