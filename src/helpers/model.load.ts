import * as utils from '@/helpers/utils'

const requireModule = import.meta.globEager('/src/**/*.model.ts')
const regexp = new RegExp(/(\.\/|\.model.ts)/g)
const classes = utils.dynamic_import(regexp, requireModule)

export function instance(class_name: any, attributes: any) {
  const class_instance = new classes[class_name].default(attributes)
  return utils.set_proxy(class_instance)
}

export function statics(class_name: any) {
  return classes[class_name].default
}

export default classes
