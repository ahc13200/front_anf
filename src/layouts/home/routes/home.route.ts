import getRoutes from '@/helpers/router.load'

const requireModule: any = import.meta.globEager('/src/modules/**/*.route.ts')
const routes_home = getRoutes(requireModule).filter(
  (element: any) => element.layout.indexOf('Home') != -1
)
export default [

]
