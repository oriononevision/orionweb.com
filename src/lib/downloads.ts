/** Installateur Windows ORION Core Desktop (servi depuis /public/downloads). */
export const CORE_DESKTOP_VERSION = '0.1.0'
export const CORE_DESKTOP_DOWNLOAD =
  (import.meta.env.VITE_CORE_DESKTOP_URL as string | undefined)?.trim() ||
  `/downloads/ORION-Core-Setup-${CORE_DESKTOP_VERSION}.exe`
export const CORE_DESKTOP_LABEL = 'Télécharger ORION Core'

/** Installateur Windows ORION Transfer Desktop. */
export const TRANSFER_DESKTOP_VERSION = '0.1.0'
export const TRANSFER_DESKTOP_DOWNLOAD =
  (import.meta.env.VITE_TRANSFER_DESKTOP_URL as string | undefined)?.trim() ||
  `/downloads/ORION-Transfer-Setup-${TRANSFER_DESKTOP_VERSION}.exe`
export const TRANSFER_DESKTOP_LABEL = 'Télécharger ORION Transfer'
