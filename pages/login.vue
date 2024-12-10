<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
    <div class="max-w-md w-full space-y-8">
      <h2 class="text-center text-3xl font-bold">Connexion Administration</h2>
      
      <form @submit.prevent="handleLogin" class="mt-8 space-y-6">
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <input
              v-model="email"
              type="email"
              required
              class="appearance-none rounded-t-md relative block w-full px-3 py-2 border"
              placeholder="Email"
            />
          </div>
          <div>
            <input
              v-model="password"
              type="password"
              required
              class="appearance-none rounded-b-md relative block w-full px-3 py-2 border"
              placeholder="Mot de passe"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-secondary"
            :disabled="loading"
          >
            {{ loading ? 'Connexion...' : 'Se connecter' }}
          </button>
        </div>

        <p v-if="error" class="text-red-500 text-center">{{ error }}</p>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
const { login, loading } = useAuth()
const router = useRouter()

const email = ref('')
const password = ref('')
const error = ref('')

const handleLogin = async () => {
  error.value = ''
  try {
    const isAdmin = await login(email.value, password.value)
    if (isAdmin) {
      router.push('/admin')
    } else {
      error.value = 'Accès non autorisé'
    }
  } catch (e) {
    error.value = 'Email ou mot de passe incorrect'
  }
}
</script> 