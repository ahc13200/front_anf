export default function getRoutes(requireModule: any) {
  let routes: any[] = []
  Object.keys(requireModule).forEach((fileName: string) => {
    const elem = requireModule[fileName]
    routes = routes.concat(elem.default as any)
  })
  return routes
}
