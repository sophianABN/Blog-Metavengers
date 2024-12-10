import { library, config } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { 
  faFacebookF,
  faTwitter,
  faInstagram,
  faYoutube 
} from '@fortawesome/free-brands-svg-icons'

// This is important, we are going to let Nuxt worry about the CSS
config.autoAddCss = false

// You can add your icons directly in this plugin
library.add(faFacebookF, faTwitter, faInstagram, faYoutube)

export default defineNuxtPlugin((nuxt) => {
  nuxt.vueApp.component('FontAwesomeIcon', FontAwesomeIcon)
}) 