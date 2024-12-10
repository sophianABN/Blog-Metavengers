<template>
  <div class="prose prose-lg max-w-none" v-html="renderedContent"></div>
</template>

<script setup lang="ts">
import MarkdownIt from 'markdown-it'

const props = defineProps<{
  content: string
}>()

const md = new MarkdownIt({
  html: true,
  breaks: true,
  linkify: true,
  typographer: true
})

const renderedContent = computed(() => md.render(props.content || ''))
</script>

<style>
.prose {
  @apply text-gray-800;
}

.prose h1 {
  @apply text-3xl font-bold mt-8 mb-4;
}

.prose h2 {
  @apply text-2xl font-bold mt-6 mb-3;
}

.prose h3 {
  @apply text-xl font-bold mt-4 mb-2;
}

.prose p {
  @apply mb-4;
}

.prose strong {
  @apply font-bold text-gray-900;
}

.prose em {
  @apply italic;
}

.prose ul {
  @apply list-disc pl-6 mb-4;
}

.prose ol {
  @apply list-decimal pl-6 mb-4;
}

.prose blockquote {
  @apply border-l-4 border-primary pl-4 italic my-4;
}

.prose code {
  @apply bg-gray-100 px-1 rounded;
}

.prose pre {
  @apply bg-gray-100 p-4 rounded-lg my-4;
}
</style> 