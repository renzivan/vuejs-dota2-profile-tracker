import Home from './views/Home.vue'
import ViewProfile from './views/ViewProfile.vue'
import ViewMatches from './views/ViewMatches.vue'
import ViewHeroes from './views/ViewHeroes.vue'
import ViewFriends from './views/ViewFriends.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/profile/:dotaId',
    name: 'profile',
    component: ViewProfile
  },
  {
    path: '/matches/:dotaId',
    name: 'matches',
    component: ViewMatches
  },
  {
    path: '/heroes/:dotaId',
    name: 'heroes',
    component: ViewHeroes
  },
  {
    path: '/friends/:dotaId',
    name: 'friends',
    component: ViewFriends
  }
]

export default routes
