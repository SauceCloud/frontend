export const IMAGE_MIME_TYPES = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
} as const

export type ImageMimeType = keyof typeof IMAGE_MIME_TYPES

export function isImageMimeType(
  type: string,
): type is keyof typeof IMAGE_MIME_TYPES {
  return type in IMAGE_MIME_TYPES
}
