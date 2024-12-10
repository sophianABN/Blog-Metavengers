import { 
  collection, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  getDoc,
  query,
  orderBy,
  where
} from 'firebase/firestore'
import type { Article } from '~/types/article'

export const useArticles = () => {
  const { db } = useFirebase()
  const articles = ref<Article[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Récupérer tous les articles
  const getAllArticles = async () => {
    loading.value = true
    try {
      const articlesRef = collection(db, 'articles')
      const q = query(articlesRef, orderBy('date', 'desc'))
      const querySnapshot = await getDocs(q)
      
      articles.value = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Article[]
    } catch (e) {
      console.error('Erreur lors de la récupération des articles:', e)
      error.value = 'Erreur lors de la récupération des articles'
    } finally {
      loading.value = false
    }
  }

  // Récupérer un article par ID
  const getArticle = async (id: string) => {
    loading.value = true
    try {
      const docRef = doc(db, 'articles', id)
      const docSnap = await getDoc(docRef)
      
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() } as Article
      }
      return null
    } catch (e) {
      console.error('Erreur lors de la récupération de l\'article:', e)
      error.value = 'Erreur lors de la récupération de l\'article'
      return null
    } finally {
      loading.value = false
    }
  }

  // Ajouter un article
  const addArticle = async (articleData: Omit<Article, 'id'>) => {
    loading.value = true
    try {
      const docRef = await addDoc(collection(db, 'articles'), {
        ...articleData,
        date: new Date().toISOString(),
        views: 0
      })
      return docRef.id
    } catch (e) {
      console.error('Erreur lors de l\'ajout de l\'article:', e)
      error.value = 'Erreur lors de l\'ajout de l\'article'
      throw e
    } finally {
      loading.value = false
    }
  }

  // Mettre à jour un article
  const updateArticle = async (id: string, articleData: Partial<Article>) => {
    loading.value = true
    try {
      const docRef = doc(db, 'articles', id)
      
      // On exclut la date de publication initiale de la mise à jour
      const { date, ...updateData } = articleData
      
      await updateDoc(docRef, {
        ...updateData,
        updatedAt: new Date().toISOString()
      })
    } catch (e) {
      console.error('Erreur lors de la mise à jour de l\'article:', e)
      error.value = 'Erreur lors de la mise à jour de l\'article'
    } finally {
      loading.value = false
    }
  }

  // Supprimer un article
  const deleteArticle = async (id: string) => {
    loading.value = true
    try {
      await deleteDoc(doc(db, 'articles', id))
    } catch (e) {
      console.error('Erreur lors de la suppression de l\'article:', e)
      error.value = 'Erreur lors de la suppression de l\'article'
    } finally {
      loading.value = false
    }
  }

  // Récupérer les articles par tag
  const getArticlesByTag = async (tag: string) => {
    loading.value = true
    try {
      const articlesRef = collection(db, 'articles')
      // Gérer les variations des tags
      const tagVariations = {
        'actualités': ['actualités', 'actualites', 'actu'],
        'crypto': ['crypto', 'cryptocurrency', 'cryptomonnaie'],
        'ia': ['ia', 'intelligence artificielle', 'ai']
      }
      
      const tagsToSearch = tagVariations[tag] || [tag]
      
      const q = query(
        articlesRef,
        where('tags', 'array-contains-any', tagsToSearch),
        orderBy('date', 'desc')
      )
      
      const querySnapshot = await getDocs(q)
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Article[]
    } catch (e) {
      console.error('Erreur lors de la récupération des articles par tag:', e)
      error.value = 'Erreur lors de la récupération des articles par tag'
      return []
    } finally {
      loading.value = false
    }
  }

  return {
    articles,
    loading,
    error,
    getAllArticles,
    getArticle,
    addArticle,
    updateArticle,
    deleteArticle,
    getArticlesByTag
  }
}