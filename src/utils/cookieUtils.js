/**
 * Utilitários para manipulação de cookies
 */

/**
 * Salva um valor em cookie
 * @param {string} name - Nome do cookie
 * @param {string} value - Valor a ser salvo
 * @param {number} days - Dias até expirar (padrão: 365)
 */
export function setCookie(name, value, days = 365) {
  const date = new Date()
  date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000))
  const expires = `expires=${date.toUTCString()}`
  document.cookie = `${name}=${value};${expires};path=/`
}

/**
 * Obtém um valor de cookie
 * @param {string} name - Nome do cookie
 * @returns {string|null} - Valor do cookie ou null se não existir
 */
export function getCookie(name) {
  const nameEQ = `${name}=`
  const ca = document.cookie.split(';')
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i]
    while (c.charAt(0) === ' ') c = c.substring(1, c.length)
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length)
  }
  return null
}

/**
 * Salva objeto JSON em cookie
 * @param {string} name - Nome do cookie
 * @param {object} obj - Objeto a ser salvo
 * @param {number} days - Dias até expirar
 */
export function setCookieObject(name, obj, days = 365) {
  try {
    const jsonString = JSON.stringify(obj)
    setCookie(name, jsonString, days)
  } catch (error) {
    console.error('Erro ao salvar cookie:', error)
  }
}

/**
 * Obtém objeto JSON de cookie
 * @param {string} name - Nome do cookie
 * @returns {object|null} - Objeto ou null se não existir
 */
export function getCookieObject(name) {
  try {
    const cookieValue = getCookie(name)
    if (cookieValue) {
      return JSON.parse(cookieValue)
    }
  } catch (error) {
    console.error('Erro ao ler cookie:', error)
  }
  return null
}

/**
 * Remove um cookie
 * @param {string} name - Nome do cookie
 */
export function deleteCookie(name) {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`
}

