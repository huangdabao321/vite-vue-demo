import settings from '@/config'
export const isDev = import.meta.env.DEV

export function uuid(len) {
  
}

export function setDocumentTitle(title = '') {
  document.title = `${settings.webSiteName}-${title}`
}