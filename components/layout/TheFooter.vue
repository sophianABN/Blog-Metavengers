<template>
  <footer class="bg-gray-900 text-white py-12">
    <div class="container mx-auto px-4">
      <div class="flex flex-col md:flex-row justify-between items-center">
        <!-- Logo et description -->
        <div class="mb-8 md:mb-0">
          <img 
            src="/assets/Logo_metavengers.png" 
            alt="Metavengers Logo" 
            class="h-12 mb-4"
          />
          <p class="text-gray-400 max-w-md">
            Explorez l'univers de la tech avec Metavengers
          </p>
        </div>

        <!-- Réseaux sociaux -->
        <div class="flex space-x-2">
          <a 
            href="#" 
            target="_blank"
            class="text-white hover:text-[#F5B212] transition-colors"
            aria-label="Facebook"
          >
            <font-awesome-icon :icon="['fab', 'facebook-f']" class="w-8 h-8" />
          </a>
          <a 
            href="#" 
            target="_blank"
            class="text-white hover:text-[#F5B212] transition-colors"
            aria-label="Twitter"
          >
            <font-awesome-icon :icon="['fab', 'twitter']" class="w-8 h-8" />
          </a>
          <a 
            href="#" 
            target="_blank"
            class="text-white hover:text-[#F5B212] transition-colors"
            aria-label="Instagram"
          >
            <font-awesome-icon :icon="['fab', 'instagram']" class="w-8 h-8" />
          </a>
          <a 
            href="#" 
            target="_blank"
            class="text-white hover:text-[#F5B212] transition-colors"
            aria-label="YouTube"
          >
            <font-awesome-icon :icon="['fab', 'youtube']" class="w-8 h-8" />
          </a>
        </div>
      </div>

      <!-- Copyright -->
      <div class="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
        <p>&copy; {{ new Date().getFullYear() }} Metavengers. Tous droits réservés.</p>
      </div>
    </div>
  </footer>
</template>