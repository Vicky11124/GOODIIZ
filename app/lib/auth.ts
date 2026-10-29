import crypto from 'crypto'

export const ADMIN_COOKIE_NAME = 'goodiiz_admin_session'

const DEFAULT_ADMIN_USER = process.env.ADMIN_USER || 'admin@goodiiz.in'
const DEFAULT_ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'goodiiz@Admin2026!'
const SESSION_SECRET = process.env.ADMIN_SESSION_SECRET || 'goodiiz-secure-admin-secret-key-salt-2026'

// Verify user credentials
export function checkAdminCredentials(usernameOrEmail: string, pass: string): boolean {
  if (!usernameOrEmail || !pass) return false
  const cleanInputUser = usernameOrEmail.trim().toLowerCase()
  const cleanConfigUser = (process.env.ADMIN_USER || DEFAULT_ADMIN_USER).trim().toLowerCase()
  const currentPassword = (process.env.ADMIN_PASSWORD || DEFAULT_ADMIN_PASSWORD).trim()

  // Allow full email, or username portion before @, or 'admin'
  const userMatches =
    cleanInputUser === cleanConfigUser ||
    cleanInputUser === 'admin' ||
    (cleanConfigUser.includes('@') && cleanInputUser === cleanConfigUser.split('@')[0])

  const passMatches = pass.trim() === currentPassword

  return userMatches && passMatches
}

// Generate signed token: timestamp.randomHex.hmac
export function generateSessionToken(): string {
  const payload = `${Date.now()}.${crypto.randomBytes(16).toString('hex')}`
  const signature = crypto.createHmac('sha256', SESSION_SECRET).update(payload).digest('hex')
  return `${payload}.${signature}`
}

// Validate signed token & verify expiration (7 days)
export function isValidSessionToken(token: string | undefined | null): boolean {
  if (!token || typeof token !== 'string') return false
  const parts = token.split('.')
  if (parts.length !== 3) return false

  const [timestampStr, randomPart, signature] = parts
  const timestamp = parseInt(timestampStr, 10)
  if (isNaN(timestamp)) return false

  // Max age: 7 days
  const MAX_AGE = 7 * 24 * 60 * 60 * 1000
  if (Date.now() - timestamp > MAX_AGE || timestamp > Date.now() + 60000) {
    return false
  }

  const payload = `${timestampStr}.${randomPart}`
  const expectedSig = crypto.createHmac('sha256', SESSION_SECRET).update(payload).digest('hex')

  try {
    return crypto.timingSafeEqual(Buffer.from(signature, 'hex'), Buffer.from(expectedSig, 'hex'))
  } catch {
    return false
  }
}

// Check session from Request cookie
export function isAuthenticatedAdmin(request: Request): boolean {
  const cookieHeader = request.headers.get('cookie') || ''
  const cookies = parseCookies(cookieHeader)
  const token = cookies[ADMIN_COOKIE_NAME]
  return isValidSessionToken(token)
}

export function parseCookies(cookieHeader: string): Record<string, string> {
  const list: Record<string, string> = {}
  if (!cookieHeader) return list

  cookieHeader.split(';').forEach((cookie) => {
    const parts = cookie.split('=')
    const key = parts[0]?.trim()
    const val = parts.slice(1).join('=').trim()
    if (key) {
      try {
        list[key] = decodeURIComponent(val)
      } catch {
        list[key] = val
      }
    }
  })

  return list
}
