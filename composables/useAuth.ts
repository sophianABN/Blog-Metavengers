import { ref } from 'vue'
import { collection, query, where, getDocs } from 'firebase/firestore'
import type { User } from 'firebase/auth'

export const useAuth = () => {
  const { db } = useFirebase()
  const user = useState<User | null>('user', () => null)
  const isAdmin = useState<boolean>('isAdmin', () => false)
  const loading = useState<boolean>('authLoading', () => false)

  // Vérifier les credentials
  const login = async (email: string, password: string) => {
    loading.value = true
    try {
      const usersRef = collection(db, 'users')
      const q = query(
        usersRef,
        where('email', '==', email),
        where('password', '==', password)
      )
      
      const querySnapshot = await getDocs(q)
      
      if (!querySnapshot.empty) {
        const userData = querySnapshot.docs[0].data()
        if (userData.role === 'admin') {
          user.value = { email: userData.email } as User
          isAdmin.value = true
          return true
        }
      }
      return false
    } catch (error) {
      console.error('Erreur de connexion:', error)
      throw error
    } finally {
      loading.value = false
    }
  }

  // Déconnexion
  const logout = () => {
    user.value = null
    isAdmin.value = false
  }

  return {
    user,
    isAdmin,
    loading,
    login,
    logout
  }
} 
 