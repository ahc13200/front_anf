import { createRouter, createWebHistory } from 'vue-router'
import getRoutes from '@/helpers/router.load'

const requireModule: any = import.meta.globEager('/src/layouts/**/*.route.ts')
const routes = getRoutes(requireModule)

const scrollBehavior = (to: any, _from: any, _savedPosition: any) => {
  const position: any = { top: 0 }

  if (to.hash) {
    return {
      el: to.hash,
      behavior: 'smooth'
    }
  }

  setTimeout(() => {
    document.getElementById('app-scroll-container')?.scrollTo(0, 0)
  }, 300)
  return position
}
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  strict: true,
  scrollBehavior
})

//  Chanche title depending on actual page
router.beforeEach((to, from, next) => {
  const nearestWithTitle = to.matched
    .slice()
    .reverse()
    .find((r) => r.meta && r.meta.head)
  if (nearestWithTitle) {
    const { _title, _meta, _description } = nearestWithTitle.meta.head as any
  }
  from
  next()
})

router.afterEach((_to, _from) => {
  setTimeout(() => {}, 400)
})

export default router
