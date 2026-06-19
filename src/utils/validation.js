const VALID_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
const MAX_SIZE = 10 * 1024 * 1024

export function validateFile(file) {
  if (!file) return { valid: false, error: 'No file selected' }
  if (!VALID_TYPES.includes(file.type)) return { valid: false, error: 'Please upload a JPG, PNG, or WebP image' }
  if (file.size > MAX_SIZE) return { valid: false, error: 'File size must be less than 10MB' }
  return { valid: true, error: null }
}

export function revokeObjectUrl(url) {
  if (url && url.startsWith('blob:')) URL.revokeObjectURL(url)
}

export function createPreviewUrl(file) {
  if (!file) return null
  return URL.createObjectURL(file)
}

export const ACCEPTED_MIME_TYPES = VALID_TYPES.join(',')
