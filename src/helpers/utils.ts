// noinspection IncorrectFormatting

import type { Router } from 'vue-router'

export const pluralize = (str: string) => {
  return str.endsWith('s') ? str : str + 's'
}

export function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

export const trim = (str: string) => {
  return str?.trim()
}

export type Class<T> = new (...args: any[]) => T

export const trimOne = (object: Record<string, any>, path: string) => {
  if (object[path]) {
    object[path] = object[path].trim()
  }
  return object
}

export const trimM = (object: Record<string, any>, paths: string[]) => {
  paths.forEach((path) => {
    if (object[path]) {
      object[path] = object[path].trim()
    }
  })
  return object
}

export const trimAll = (object: Record<string, any>) => {
  const keys = Object.keys(object)
  keys.forEach((key) => (object[key] = object[key].trim()))
  return object
}

export const removeAccents = (str: string) => {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}

export const clone = (objectToClone: Record<string, any>) => Object.assign({}, objectToClone)

export function pickClass<T extends { new (...args: any[]): any; prototype: any }>(
  ctor: T
): <TKeys extends keyof InstanceType<T>>(
  ...keys: TKeys[]
) => ReplaceInstanceType<T, Pick<InstanceType<T>, TKeys>> & {
  [P in keyof Omit<T, 'prototype'>]: T[P]
} {
  return function () {
    return ctor as any
  }
}

type ArgumentTypes<T> = T extends new (...args: infer U) => any ? U : never
type ReplaceInstanceType<T, TNewInstance> = T extends new (...args: any[]) => any
  ? new (...a: ArgumentTypes<T>) => TNewInstance
  : never

export function validateLetters(e: any) {
  const key = window.event ? e.which : e.keyCode
  if (
    (key > 64 && key < 91) || //letras mayusculas
    (key > 96 && key < 123) || //letras minusculas
    key == 45 || //retroceso
    key == 32 || //espacio
    key == 241 || //ñ
    key == 209 || //Ñ
    key == 225 || //á
    key == 233 || //é
    key == 237 || //í
    key == 243 || //ó
    key == 250 || //ú
    key == 193 || //Á
    key == 201 || //É
    key == 205 || //Í
    key == 211 || //Ó
    key == 218 //Ú
  ) {
    return true
  }

  e.preventDefault()
  return false
}

export function validateAlphanumeric(e: any) {
  const key = window.event ? e.which : e.keyCode
  if (
    (key > 64 && key < 91) || //letras mayusculas
    (key > 96 && key < 123) || //letras minusculas
    key == 45 || //retroceso
    key == 32 || //espacio
    key == 241 || //ñ
    key == 209 || //Ñ
    key == 225 || //á
    key == 233 || //é
    key == 237 || //í
    key == 243 || //ó
    key == 250 || //ú
    key == 193 || //Á
    key == 201 || //É
    key == 205 || //Í
    key == 211 || //Ó
    key == 188 || // ,
    key == 190 || // .
    key == 222 || // "
    (key >= 48 && key <= 57)
  ) {
    return true
  }
  e.preventDefault()
  return false
}

export function isValidPhoneNumber(phone: string) {
  return (
    phone && Number.isInteger(Number.parseInt(phone)) && phone.length == 8 && phone.startsWith('5')
  )
}

export function validateNumbers(e: any) {
  const key = window.event ? e.which : e.keyCode
  if (key < 48 || key > 57) {
    e.preventDefault()
    return false
  }
  return true
}

export function hasUpper(str: string) {
  if (!str || !str.length) {
    return false
  }
  let valid = false

  for (let i = 0; i < str.length && !valid; i++) {
    if (/^[A-ZÑÁÉÍÓÚ]*$/.test(str[i])) {
      valid = true
    }
  }
  return valid
}

export function hasLower(str: string) {
  if (!str || !str.length) {
    return false
  }
  let valid = false

  for (let i = 0; i < str.length && !valid; i++) {
    if (/^[a-zñáéíóú]*$/.test(str[i])) {
      valid = true
    }
  }
  return valid
}

export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export function disableRightClick() {
  window.oncontextmenu = function () {
    return false
  }
}

export function disableF12Key() {
  const handler = function (event: any) {
    if (event.keyCode == 123) {
      event.preventDefault()
      return false
    } else if (
      (event.ctrlKey && event.shiftKey && event.keyCode == 73) ||
      (event.ctrlKey && event.shiftKey && event.keyCode == 74)
    ) {
      event.preventDefault()
      return false
    }
  }

  document.addEventListener('keydown', handler)
}

export function upperFirst(s: string) {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
}

export function lowerFirst(s: string) {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toLowerCase() + s.slice(1)
}

export function capitalize(s: string) {
  if (typeof s !== 'string') return ''

  return upperFirst(camelCase(s))
}

export function getletiationsOfString(s: string) {
  return {
    camelCase: camelCase(s),
    capitalized: capitalize(s),
    capitalizePlural: pluralize(capitalize(s))
  }
}

export function camelCase(str: string) {
  return lowerFirst(
    str
      .split('_')
      .join(' ')
      .split('-')
      .join(' ')
      .split(' ')
      .map((str) => upperFirst(str))
      .join('')
  )
}

export const toPascalCase = (str: string) => {
  return upperFirst(camelCase(str))
}

export function showMessageWarning() {
  function showMessage(message: string, css: string | Record<string, any>) {
    setTimeout(console.log.bind(console, message, css))
  }

  const warningTitleCSS =
    'color:red; font-size:60px; font-weight: bold; -webkit-text-stroke: 1px black;'
  const warningDescCSS = 'font-size: 18px;'

  showMessage('%c¡Detente!', warningTitleCSS)
  showMessage(
    '%cEsta es una función pensada para desarrolladores. Si alguien te dijo que copies y pegues algo aquí para habilitar una función o "hackear" la cuenta de alguien, es una estafa y le dará acceso a tu cuenta.',
    warningDescCSS
  )
  showMessage('%cVea https://es.wikipedia.org/wiki/Self-XSS para más información.', warningDescCSS)
}

/**
 * Simple object check.
 * @param item
 * @returns {boolean}
 */
export function isObject(item: any) {
  return item && typeof item === 'object' && !Array.isArray(item)
}

/**
 * Deep merge two objects.
 * @param target
 * @param ...sources
 */
export function mergeDeep(target: any, ...sources: any[]): any {
  if (!sources.length) return target
  const source = sources.shift()

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} })
        mergeDeep(target[key], source[key])
      } else {
        Object.assign(target, { [key]: source[key] })
      }
    }
  }

  return mergeDeep(target, ...sources)
}

export function compareDeep(obj1: any, obj2: any) {
  for (const p in obj1) {
    // eslint-disable-next-line no-prototype-builtins
    if (obj1.hasOwnProperty(p) !== obj2.hasOwnProperty(p)) return false

    switch (typeof obj1[p]) {
      case 'object':
        if (!compareDeep(obj1[p], obj2[p])) return false
        break
      case 'function':
        if (
          typeof obj2[p] == 'undefined' ||
          (p != 'compare' && obj1[p].toString() != obj2[p].toString())
        ) {
          return false
        }
        break
      default:
        if (obj1[p] != obj2[p]) return false
    }
  }

  for (const p in obj2) {
    if (typeof obj1[p] == 'undefined') return false
  }
  return true
}

export function getVariationsOfString(str: string) {
  return {
    camelCase: camelCase(str),
    capitalized: capitalize(str),
    capitalizePlural: pluralize(capitalize(str))
  }
}

export function removeAttrObject(original: any, attrremove: any) {
  return Object.keys({ ...original })
    .filter((key: string) => attrremove.indexOf(key) == -1)
    .reduce((obj: object | [], key: string) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      obj[key] = { ...original }[key]
      return obj
    }, {})
}

export function absolutePathFromAlias(alias: string, src: string) {
  return src.indexOf(alias) != -1 ? src.replace(alias, './src') : src
}

export function openWindow(
  url: string,
  opt?: { target?: any | string; noopener?: boolean; noreferrer?: boolean }
) {
  const { target = '__blank', noopener = true, noreferrer = true } = opt || {}
  const feature: string[] = []

  noopener && feature.push('noopener=yes')
  noreferrer && feature.push('noreferrer=yes')

  window.open(url, target, feature.join(','))
}

export function obtainRoutePath(name: string | undefined, router: Router) {
  const routes = router.getRoutes()
  let find = false
  let path
  for (let i = 0; i < routes.length, find; i++) {
    const route = routes[i]
    if (route.name == name) {
      find = true
      path = route.path
    }
  }
  return path
}

export async function removeAppLoader() {
  const preloader = document.getElementById('app-preloader')
  if (preloader) {
    preloader.style.opacity = '0'
    await delay(20)
    preloader.style.display = 'none'
  }
}

export function smoothScrollToHash(hash: string) {
  const element = document.getElementById(hash)
  if (element) {
    document.getElementById(hash)?.scrollIntoView({
      behavior: 'smooth'
    })
  }
}

export function filter_object(object: any, value: any) {
  if (!value) {
    return true
  }
  const keys = Object.keys(object)
  let i
  for (i of keys) {
    if (object[i] == null) {
      continue
    }
    if (object[i].toString().toLowerCase().indexOf(value.toLowerCase()) != -1) {
      return true
    }
  }
}

export function compare_object(object1: any, object2: any) {
  return Object.keys(object1).every(function (element) {
    return Object.keys(object2).find(function (element2) {
      return element == element2
    })
  })
}

export function process_data(v: any) {
  const head = v.columns
    .filter((element: any) => element.key !== 'action_elements' && !element.hide_on_export)
    .map((element: any) => {
      return element.title
    })
  const data = v.data.map((element: any) => {
    return v.columns
      .filter((column: any) => column.key !== 'action_elements' && !column.hide_on_export)
      .map((column: any) => {
        let nested: any = null
        if (column.key.indexOf('.') != -1) {
          column.key.split('.').forEach((index: any) => {
            nested = !nested ? element[index] : nested[index]
          })
        }
        const value = column.key.indexOf('.') == -1 ? element[column.key] : nested
        return value
      })
  })
  return { head, data }
}

export function exportToExcelVinstance(v: any) {
  const { head, data } = process_data(v)
  exportToExcel(head, data, v.$options.name)
}

export function exportToCSV(v: any) {
  const { head, data } = process_data(v)
  const csvContent = [head]
    .concat(data)
    .map((e) => e.join(','))
    .join('\n')
  const hiddenElement = document.createElement('a')
  hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csvContent)
  hiddenElement.target = '_blank'
  hiddenElement.download = 'output.csv'
  hiddenElement.click()
}

export function extract_user_data(name: string, token: string) {
  const user_data = jwtDecode(token).payload
  return { [name]: user_data.sub, ...user_data }
}

export function exportToExcel(head: any, data: any, title = 'export.xls') {
  const uri = 'data:application/vnd.ms-excel;base64,'
  const template =
    '' +
    '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><meta http-equiv="content-type" content="application/vnd.ms-excel; charset=UTF-8">' +
    '<head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head>' +
    '<body>' +
    '<table>' +
    '{table}' +
    '</table>' +
    '</body>' +
    '</html>'
  let table = '<thead><tr>'
  head.forEach((element: any) => {
    table += '<th style="width: 250px">' + element + '</th>'
  })
  table += '</tr></thead><tbody>'
  data.forEach((element: any) => {
    table += '<tr>'
    element.forEach((data: any) => {
      table += '<td>' + data + '</td>'
    })
    table += '</tr>'
  })
  table += '</tbody>'

  const base64 = function (s: any) {
    return window.btoa(unescape(encodeURIComponent(s)))
  }
  const format = function (s: any, c: any) {
    return s.replace(/{(\w+)}/g, function (_: any, p: any) {
      return c[p]
    })
  }

  const ctx = {
    worksheet: 'Worksheet',
    table: table
  }
  const link = document.createElement('a')
  link.download = title
  link.href = uri + base64(format(template, ctx))
  link.click()
}

export function allow_character(elEvento: any, permitidos: string) {
  // Variables que definen los caracteres permitidos
  const numeros = '0123456789'
  const decimal = '0123456789,-'
  const date = '0123456789/'
  const time = '0123456789:'
  const issn = '0123456789-'
  const none = ''
  const caracteres = ' abcdefghijklmn?opqñrstuvwxyzABCDEFGHIJKLMÑN?OPQRSTUVWXYZéáíóú@_.,$%^&*()_+!~'
  const numeros_caracteres = numeros + caracteres
  const teclas_especiales: any[] = []
  // 8 = BackSpace, 46 = Supr, 37 = flecha izquierda, 39 = flecha derecha
  // Seleccionar los caracteres a partir del par?metro de la funci?n
  switch (permitidos) {
    case 'num':
      permitidos = numeros
      break
    case 'car':
      permitidos = caracteres
      break
    case 'num_car':
      permitidos = numeros_caracteres
      break
    case 'dec':
      permitidos = decimal
      break
    case 'date':
      permitidos = date
      break
    case 'time':
      permitidos = time
      break
    case 'issn':
      permitidos = issn
      break
    case 'none':
      permitidos = none
      break
  }

  // Obtener la tecla pulsada
  const evento = elEvento || window.event
  const codigoCaracter = evento.charCode || evento.keyCode
  const caracter = String.fromCharCode(codigoCaracter)

  // Comprobar si la tecla pulsada es alguna de las teclas especiales
  // (teclas de borrado y flechas horizontales)
  let tecla_especial = false
  for (const i in teclas_especiales) {
    if (codigoCaracter == teclas_especiales[i]) {
      tecla_especial = true
      break
    }
  }
  // Comprobar si la tecla pulsada se encuentra en los caracteres permitidos
  // o si es una tecla especial
  return permitidos.indexOf(caracter) != -1 || tecla_especial
}

export function filter_object_column(object: any, value: any, columns: any[]) {
  if (!value) {
    return true
  }
  let i
  const iter = 0
  // @ts-ignore
  const keys = Object.values(columns)
  for (i of keys) {
    if (!i.dataIndex && !i.use_filter) {
      if (iter >= keys.length) {
        return false
      }
      continue
    }

    const array = i.key.split('.')
    if (object[array.length > 0 ? array[0] : i.key] instanceof Object) {
      let data = object
      array.forEach((iter: any) => {
        if (data) {
          data = data[iter]
        }
      })
      if (data != null && data.toString().toLowerCase().indexOf(value.toLowerCase()) != -1) {
        return true
      }
    } else {
      if (
        object[array[0]] != null &&
        object[array[0]].toString().toLowerCase().indexOf(value.toLowerCase()) != -1
      ) {
        return true
      }
    }
  }
}

export function dynamic_import(regexp: any, requireModule: any, withModule: boolean = false) {
  const classes: any = {}
  requireModule.keys().forEach((fileName: any) => {
    const route = fileName.split('/')
    const module =
      withModule && route[route.indexOf('modules') + 1] !== '.'
        ? route[route.indexOf('modules') + 1] + '.'
        : ''
    const moduleName =
      module +
      capitalize(
        fileName
          .replace(regexp, '')
          .substr(fileName.replace(regexp, '').lastIndexOf('/') + 1, fileName.length)
      )
    classes[moduleName] = {
      ...requireModule(fileName)
    }
  })
  return classes
}

export const jwtDecode = (t: any) => {
  const token: any = {}
  token.raw = t
  token.header = JSON.parse(window.atob(t.split('.')[0]))
  token.payload = JSON.parse(window.atob(t.split('.')[1]))
  return token
}

export const convert_to_phone = function (t: any) {
  if (t) {
    const x = t.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/)
    return !x[2] ? x[1] : '(' + x[1] + ')' + x[2] + (x[3] ? '-' + x[3] : '')
  }
  return ''
}

export const isEmpty = function (obj: any) {
  if (typeof obj === 'string' || obj === '') {
    return false
  }
  if (typeof obj === 'number' || obj === 0) {
    return false
  }
  if (typeof obj === 'boolean') {
    return false
  }

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj.hasOwnProperty, key)) {
      return false
    }
  }

  return true
}

export const convertToFormData = function (
  model: any,
  form?: FormData,
  namespace?: string
): FormData {
  const formData = form || new FormData()
  for (const propertyName in model) {
    if (
      !Object.prototype.hasOwnProperty.call(model, propertyName) ||
      model[propertyName] == undefined
    )
      continue
    const formKey = namespace ? `${namespace}[${propertyName}]` : propertyName
    if (model[propertyName] instanceof Date) {
      formData.append(formKey, model.dateTimeToString(model[propertyName]))
    } else if (model[propertyName] instanceof Array) {
      model[propertyName].forEach((element: any, index: any) => {
        if (typeof element != 'object') formData.append(`${formKey}[]`, element)
        else {
          const tempFormKey = `${formKey}[${index}]`
          model.convertModelToFormData(element, formData, tempFormKey)
        }
      })
    } else if (typeof model[propertyName] === 'object' && !(model[propertyName] instanceof File)) {
      model.convertModelToFormData(model[propertyName], formData, formKey)
    } else {
      formData.append(formKey, model[propertyName].toString())
    }
  }
  return formData
}

export const objectToFormData = function (obj: any, form: any, namespace: string) {
  const fd = form || new FormData()
  let formKey

  for (const property in obj) {
    if (obj[property] === undefined) {
      continue
    }
    // eslint-disable-next-line no-prototype-builtins
    if (obj.hasOwnProperty(property)) {
      if (namespace) {
        formKey = namespace + '[' + property + ']'
      } else {
        formKey = property
      }

      // if the property is an object, but not a File,
      // use recursivity.
      if (typeof obj[property] === 'object' && !(obj[property] instanceof File)) {
        objectToFormData(obj[property], fd, property)
      } else {
        // if it's a string or a File object
        const value =
          obj[property] == true || obj[property] == false ? +obj[property] : obj[property]
        fd.append(formKey, value)
      }
    }
  }

  return fd
}

export function isEmptyObject(obj: any) {
  return Object.keys(obj).length === 0
}

export const birthDateFromCI = (ci: string) => {
  const year = ci.substr(0, 2)
  const month = ci.substr(2, 2)
  const day = ci.substr(4, 2)
  return new Date(`${year}/${month}/${day}`)
}

export const validateNumber = (e: any) => {
  const key = e.keyCode
  if (key < 48 || key > 57) {
    e.preventDefault()
  }
}

export const getBirthDate = (ci: string) => {
  const year = parseInt(ci.substr(0, 2))
  const month = ci.substr(2, 2)
  const day = ci.substr(4, 2)
  const dateString = `${year > 20 ? '19' : '20'}${year}/${month}/${day}`
  const date = new Date(dateString)

  return date
}
export const getSex = (ci: any) => {
  const sexNumber: number = ci[ci.length - 2] as number
  return sexNumber % 2 === 0 ? 'Masculino' : 'Femenino'
}

export const getAge = (date: Date) => {
  const ageDifMs = Date.now() - new Date(date).getTime()
  const ageDate = new Date(ageDifMs)
  return Math.abs(ageDate.getUTCFullYear() - 1970)
}

export function set_proxy(obj: object) {
  'use strict'
  if (typeof Proxy == 'undefined') {
    throw new Error("This browser doesn't support Proxy")
  }
  obj = new Proxy(obj, {
    set(target: any, name: string, value, receiver) {
      if (!Reflect.has(target, name)) {
        console.warn(`Setting non-existent property '${name}', initial value: ${value}`)
      } else {
        target._changed_attributes = Object.assign(target._changed_attributes || {}, {
          [name]: value
        })
      }
      return Reflect.set(target, name, value, receiver)
    }
  })
  return obj
}
