<template>
  <div class="w-full">
    <div 
      class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary transition-colors"
      :class="{ 'border-primary': isDragging }"
      @dragenter.prevent="isDragging = true"
      @dragleave.prevent="isDragging = false"
      @dragover.prevent
      @drop.prevent="handleDrop"
    >
      <input
        type="file"
        ref="fileInput"
        class="hidden"
        accept="image/*"
        @change="handleFileSelect"
      >
      
      <div v-if="preview" class="mb-4">
        <img 
          :src="preview" 
          alt="Preview" 
          class="max-h-48 mx-auto rounded-lg"
        >
      </div>
      
      <div v-else>
        <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>

      <button 
        type="button"
        class="mt-4 px-4 py-2 bg-primary text-white rounded-lg hover:bg-secondary transition-colors"
        @click="$refs.fileInput.click()"
        :disabled="loading"
      >
        {{ loading ? 'Upload en cours...' : 'Sélectionner une image' }}
      </button>
    </div>

    <p v-if="error" class="mt-2 text-red-500 text-sm">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const fileInput = ref<HTMLInputElement | null>(null)
const preview = ref<string>('')
const isDragging = ref(false)
const loading = ref(false)
const error = ref('')

// Exposer la référence preview pour permettre sa manipulation externe
defineExpose({
  preview
})

// Prévisualisation de l'image
const createPreview = (file: File) => {
  const reader = new FileReader()
  reader.onload = (e) => {
    preview.value = e.target?.result as string
  }
  reader.readAsDataURL(file)
}

// Upload de l'image
const handleUpload = async (file: File) => {
  if (!file.type.startsWith('image/')) {
    error.value = 'Veuillez sélectionner une image'
    return
  }

  loading.value = true
  error.value = ''
  createPreview(file)

  try {
    const formData = new FormData()
    formData.append('images', file) // Utiliser 'images' comme nom de champ

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData
    })

    if (!response.ok) {
      throw new Error('Erreur lors de l\'upload')
    }

    const data = await response.json()
    if (data.success && data.url) {
      emit('update:modelValue', data.url)
    } else {
      throw new Error('URL non reçue')
    }
  } catch (e) {
    error.value = 'Erreur lors de l\'upload de l\'image'
    console.error(e)
  } finally {
    loading.value = false
  }
}

// Gestion du drag & drop
const handleDrop = (e: DragEvent) => {
  isDragging.value = false
  const files = e.dataTransfer?.files
  if (files?.length) {
    handleUpload(files[0])
  }
}

// Gestion de la sélection de fichier
const handleFileSelect = (e: Event) => {
  const files = (e.target as HTMLInputElement).files
  if (files?.length) {
    handleUpload(files[0])
  }
}

// Watch pour la valeur initiale
watch(() => props.modelValue, (newValue) => {
  if (newValue) {
    preview.value = newValue
  }
}, { immediate: true })
</script> 