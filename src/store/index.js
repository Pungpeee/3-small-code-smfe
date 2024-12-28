import { createStore } from 'vuex'
import router from '../router'
import { auth } from '../firebase'
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile
} from 'firebase/auth'

export default createStore({
  state: {
    user: null
  },
  mutations: {

    SET_USER (state, user) {
      state.user = user
    },

    CLEAR_USER (state) {
      state.user = null
    },

  },
  actions: {
    async login ({ commit }, details) {
      const { email, password, stay } = details

      // console.log(email, password, stay)

      try {
        await signInWithEmailAndPassword(auth, email, password)
      } catch (error) {
        switch(error.code) {
          case 'auth/user-not-found':
            alert("User not found")
            break
          case 'auth/wrong-password':
            alert("Wrong password")
            break
          default:
            alert("Something went wrong")
        }
        return error
      }

      commit('SET_USER', auth.currentUser)

      if (!stay) {
        router.push('/')
      }

      return {code: "success"}
    },

    async register ({commit}, details) {
      const { email, password, firstname, lastname } = details

      try {
        await createUserWithEmailAndPassword(auth, email, password , firstname, lastname)

        updateProfile(auth.currentUser, {
          displayName: `${firstname} ${lastname}`,
        }).then(() => {
          // Profile updated!
          // ...
        }).catch((error) => {
          // An error occurred
          // ...
        });

      } catch (error) {
        switch(error.code) {
          case 'auth/email-already-in-use':
            alert("Email already in use")
            break
          case 'auth/invalid-email':
            alert("Invalid email")
            break
            case 'auth/invalid-firstname':
            alert("Invalid firstname")
            break
            case 'auth/invalid-lastname':
            alert("Invalid lastname")
            break
          case 'auth/operation-not-allowed':
            alert("Operation not allowed")
            break
          case 'auth/weak-password':
            alert("Weak password")
            break
          default:
            alert("Something went wrong")
        }

        return error
      }

      commit('SET_USER', auth.currentUser)

      router.push('/')
    },

    async logout ({ commit }) {
      await signOut(auth)

      commit('CLEAR_USER')

      router.push('/login')
    },

    fetchUser ({ commit }) {
      auth.onAuthStateChanged(async user => {
        if (user === null) {
          commit('CLEAR_USER')
        } else {
          commit('SET_USER', user)

          if (router.isReady() && router.currentRoute.value.path === '/login') {
            router.push('/')
          }
        }
      })
    },

    async updateProfile ({commit}, details) {
      updateProfile(auth.currentUser, details).then(() => {
        // Profile updated!
        // ...
      }).catch((error) => {
        // An error occurred
        // ...
      });
      commit('SET_USER', auth.currentUser)
    }
  }
})