<template>
  <div class="container mx-auto px-4 py-12">
    <h1 class="text-4xl font-bold mb-12 text-center">Pour nous contacter</h1>

    <div class="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto contact-container">
      <!-- Informations de contact -->
      <div class="bg-white p-8 rounded-lg ">
        <h2 class="text-2xl font-bold mb-6">Nos coordonnées</h2>
        
        <div class="space-y-6">
          <div class="flex items-start space-x-4">
            <svg class="w-6 h-6 text-primary mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
            </svg>
            <div>
              <h3 class="font-semibold mb-1">Adresse</h3>
              <p class="text-gray-600">
                42 Avenue de la Tech<br>
                75008 Paris, France
              </p>
            </div>
          </div>

          <div class="flex items-start space-x-4">
            <svg class="w-6 h-6 text-primary mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
            </svg>
            <div>
              <h3 class="font-semibold mb-1">Email</h3>
              <a href="mailto:contact@metavengers.com" class="text-primary hover:text-primary-dark">
                contact@metavengers.com
              </a>
            </div>
          </div>

          <div class="flex items-start space-x-4">
            <svg class="w-6 h-6 text-primary mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
            </svg>
            <div>
              <h3 class="font-semibold mb-1">Téléphone</h3>
              <a href="tel:+33123456789" class="text-primary hover:text-primary-dark">
                +33 1 23 45 67 89
              </a>
            </div>
          </div>

          <div class="flex items-start space-x-4">
            <svg class="w-6 h-6 text-primary mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <div>
              <h3 class="font-semibold mb-1">Horaires</h3>
              <p class="text-gray-600">
                Lundi - Vendredi : 9h00 - 18h00<br>
                Week-end : Fermé
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Formulaire de contact -->
      <div class="bg-white p-8 rounded-lg shadow-md">
        <h2 class="text-2xl font-bold mb-6">Envoyez-nous un message</h2>
        
        <form @submit.prevent="submitForm" class="space-y-6">
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700 mb-1">Nom complet</label>
            <input 
              v-model="formData.name"
              type="text" 
              id="name" 
              required
              class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
            >
          </div>

          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input 
              v-model="formData.email"
              type="email" 
              id="email" 
              required
              class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
            >
          </div>

          <div>
            <label for="subject" class="block text-sm font-medium text-gray-700 mb-1">Sujet</label>
            <input 
              v-model="formData.subject"
              type="text" 
              id="subject" 
              required
              class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
            >
          </div>

          <div>
            <label for="message" class="block text-sm font-medium text-gray-700 mb-1">Message</label>
            <textarea 
              v-model="formData.message"
              id="message" 
              rows="5" 
              required
              class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
            ></textarea>
          </div>

          <button 
            type="submit" 
            class="w-full bg-primary text-white py-3 px-6 rounded-lg hover:bg-primary-dark transition-colors"
            :disabled="loading"
          >
            <span v-if="loading">Envoi en cours...</span>
            <span v-else>Envoyer le message</span>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const loading = ref(false)
const formData = ref({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const submitForm = async () => {
  loading.value = true
  try {
    // Ici, vous implémenterez l'envoi d'email
    // Par exemple avec EmailJS, SendGrid ou votre propre backend
    console.log('Formulaire soumis:', formData.value)
    alert('Message envoyé avec succès!')
    // Réinitialiser le formulaire
    formData.value = {
      name: '',
      email: '',
      subject: '',
      message: ''
    }
  } catch (error) {
    console.error('Erreur lors de l\'envoi:', error)
    alert('Une erreur est survenue lors de l\'envoi du message.')
  } finally {
    loading.value = false
  }
}
</script> 