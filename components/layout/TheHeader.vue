<template>
  <header class="bg-gray-900 text-white">
    <!-- Overlay pour fermer le menu -->
    <div 
      v-if="isMenuOpen"
      class="fixed inset-0 bg-black bg-opacity-50 z-40"
      @click="isMenuOpen = false"
    ></div>

    <nav class="container mx-auto px-4 py-4 relative z-50">
      <!-- Première ligne : Réseaux sociaux, Logo, Recherche -->
      <div class="flex items-center justify-between">
        <!-- Réseaux sociaux à gauche (cachés sur mobile) -->
        <div class="hidden md:flex items-center space-x-2">
          <a href="#" class="hover:text-[#F5B212] transition-colors">
            <font-awesome-icon :icon="['fab', 'facebook-f']" class="w-10 h-10" />
          </a>
          <a href="#" class="hover:text-[#F5B212] transition-colors">
            <font-awesome-icon :icon="['fab', 'twitter']" class="w-10 h-10" />
          </a>
          <a href="#" class="hover:text-[#F5B212] transition-colors">
            <font-awesome-icon :icon="['fab', 'instagram']" class="w-10 h-10" />
          </a>
          <a href="#" class="hover:text-[#F5B212] transition-colors">
            <font-awesome-icon :icon="['fab', 'youtube']" class="w-10 h-10" />
          </a>
        </div>

        <!-- Logo (aligné à gauche sur mobile, centré sur desktop) -->
        <NuxtLink to="/" class="h-10 md:h-12 md:mx-auto">
          <img 
            src="/assets/Logo_metavengers.png" 
            alt="Metavengers Logo" 
            class="h-full w-auto object-contain"
          />
        </NuxtLink>

        <!-- Recherche à droite (cachée sur mobile) -->
        <div class="hidden md:flex items-center space-x-4">
          <div class="relative">
            <input 
              type="text" 
              placeholder="Rechercher..." 
              class="bg-gray-800 text-white pl-10 pr-4 py-2 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#F5B212]"
            >
            <svg 
              class="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        <!-- Bouton Menu Burger (visible uniquement sur mobile) -->
        <button 
          @click="isMenuOpen = !isMenuOpen"
          class="md:hidden p-2 hover:bg-gray-700 rounded-lg"
          aria-label="Menu"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            class="h-6 w-6" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              v-if="!isMenuOpen"
              stroke-linecap="round" 
              stroke-linejoin="round" 
              stroke-width="2" 
              d="M4 6h16M4 12h16M4 18h16"
            />
            <path 
              v-else
              stroke-linecap="round" 
              stroke-linejoin="round" 
              stroke-width="2" 
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <!-- Menu principal en dessous -->
      <div class="mt-6 flex justify-center">
        <div class="hidden md:flex items-center space-x-8">
          <NuxtLink 
            v-for="item in menuItemsWithoutMetavengers" 
            :key="item.path"
            :to="item.path" 
            class="hover:text-[#F5B212] transition-colors"
            :class="{ 'text-[#F5B212]': isActiveRoute(item.path) }"
          >
            {{ item.name }}
          </NuxtLink>

          <!-- Sous-menu Metavengers -->
          <div class="relative group">
            <button 
              class="flex items-center space-x-1 hover:text-[#F5B212] transition-colors"
              :class="{ 'text-[#F5B212]': isActiveRoute('/contact') }"
            >
              <span>METAVENGERS</span>
              <svg 
                class="w-4 h-4 transition-transform group-hover:rotate-180" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <!-- Dropdown -->
            <div class="absolute left-0 mt-2 w-48 bg-gray-900 rounded-lg shadow-lg py-2 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-300">
              <NuxtLink 
                to="/about"
                class="block px-4 py-2 text-white hover:text-[#F5B212] transition-colors"
              >
                Qui sommes-nous ?
              </NuxtLink>
              <NuxtLink 
                to="/contact"
                class="block px-4 py-2 text-white hover:text-[#F5B212] transition-colors"
              >
                Contact
              </NuxtLink>
              <a 
                href="https://academie.metavengers.fr" 
                target="_blank"
                class="block px-4 py-2 text-white hover:text-[#F5B212] transition-colors"
              >
                Académie
              </a>
              <a 
                href="https://metavengers.fr" 
                target="_blank"
                class="block px-4 py-2 text-white hover:text-[#F5B212] transition-colors"
              >
                Services
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- Menu Mobile -->
      <div 
        v-show="isMenuOpen"
        class="md:hidden mt-4 pb-4 relative"
      >
        <!-- Barre de recherche mobile -->
        <div class="px-2 mb-4">
          <div class="relative">
            <input 
              type="text" 
              placeholder="Rechercher..." 
              class="w-full bg-gray-800 text-white pl-10 pr-4 py-2 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#F5B212]"
            >
            <svg 
              class="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        <!-- Navigation mobile -->
        <div class="flex flex-col space-y-4 px-2">
          <NuxtLink 
            v-for="item in menuItemsWithoutMetavengers" 
            :key="item.path"
            :to="item.path" 
            class="hover:text-[#F5B212] transition-colors py-2"
            :class="{ 'text-[#F5B212]': isActiveRoute(item.path) }"
            @click="isMenuOpen = false"
          >
            {{ item.name }}
          </NuxtLink>

          <!-- Section Metavengers dans le menu mobile -->
          <div class="py-2">
            <div class="font-medium mb-2">METAVENGERS</div>
            <div class="pl-4 space-y-2">
              <NuxtLink 
                to="/about"
                class="block py-2 hover:text-[#F5B212] transition-colors"
                @click="isMenuOpen = false"
              >
                Qui sommes-nous ?
              </NuxtLink>
              <NuxtLink 
                to="/contact"
                class="block py-2 hover:text-[#F5B212] transition-colors"
                @click="isMenuOpen = false"
              >
                Contact
              </NuxtLink>
              <a 
                href="https://academie.metavengers.fr" 
                target="_blank"
                class="block py-2 hover:text-[#F5B212] transition-colors"
              >
                Académie
              </a>
              <a 
                href="https://metavengers.fr" 
                target="_blank"
                class="block py-2 hover:text-[#F5B212] transition-colors"
              >
                Services
              </a>
            </div>
          </div>
        </div>

        <!-- Icônes sociales mobile -->
        <div class="mt-6 px-2 pt-4 border-t border-gray-700">
          <div class="flex justify-center space-x-6">
            <a href="#" class="text-gray-400 hover:text-[#F5B212] transition-colors">
              <font-awesome-icon :icon="['fab', 'facebook-f']" class="w-6 h-6" />
            </a>
            <a href="#" class="text-gray-400 hover:text-[#F5B212] transition-colors">
              <font-awesome-icon :icon="['fab', 'x-twitter']" class="w-6 h-6" />
            </a>
            <a href="#" class="text-gray-400 hover:text-[#F5B212] transition-colors">
              <font-awesome-icon :icon="['fab', 'instagram']" class="w-6 h-6" />
            </a>
            <a href="#" class="text-gray-400 hover:text-[#F5B212] transition-colors">
              <font-awesome-icon :icon="['fab', 'youtube']" class="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
const route = useRoute()
const isMenuOpen = ref(false)

// Menu items sans Metavengers
const menuItemsWithoutMetavengers = [
  { name: 'ACCUEIL', path: '/' },
  { name: 'ACTUALITÉS', path: '/actualites' },
  { name: 'IA', path: '/ia' },
  { name: 'CRYPTO', path: '/crypto' },
  { name: 'BLOG', path: '/blog' },
]

const isActiveRoute = (path) => {
  if (path === '/') {
    return route.path === '/'
  }
  return route.path === path
}

// Fermer le menu mobile lors du changement de route
watch(
  () => route.path,
  () => {
    isMenuOpen.value = false
  }
)
</script>

<style scoped>
/* Assure que le dropdown reste visible pendant le hover */
.group:hover .group-hover\:visible {
  visibility: visible;
}
</style>