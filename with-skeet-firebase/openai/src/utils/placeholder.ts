import crypto from 'crypto'

export function gravatarIconUrl(email: string): string {
  const md5Hash = crypto.createHash('md5')
  const trimmedEmail = email.trim().toLowerCase()
  const hash = md5Hash.update(trimmedEmail).digest('hex')
  return `https://www.gravatar.com/avatar/${hash}?d=retro&s=256`
}
