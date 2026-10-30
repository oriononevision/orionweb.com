/** Versions desktop publiées (GitHub Releases). */
export const CORE_DESKTOP_VERSION = '0.1.0'
export const TRANSFER_DESKTOP_VERSION = '0.1.0'

const CORE_RELEASE_DEFAULT = `https://github.com/oriononevision/orion-core-desktop/releases/download/v${CORE_DESKTOP_VERSION}/ORION-Core-Setup-${CORE_DESKTOP_VERSION}.exe`
const TRANSFER_RELEASE_DEFAULT = `https://github.com/oriononevision/orion-transfer-desktop/releases/download/v${TRANSFER_DESKTOP_VERSION}/ORION-Transfer-Setup-${TRANSFER_DESKTOP_VERSION}.exe`

/** Installateur Windows ORION Core Desktop. */
export const CORE_DESKTOP_DOWNLOAD =
  (import.meta.env.VITE_CORE_DESKTOP_URL as string | undefined)?.trim() || CORE_RELEASE_DEFAULT
export const CORE_DESKTOP_LABEL = 'Télécharger ORION Core (Windows)'

/** Installateur Windows ORION Transfer Desktop. */
export const TRANSFER_DESKTOP_DOWNLOAD =
  (import.meta.env.VITE_TRANSFER_DESKTOP_URL as string | undefined)?.trim() || TRANSFER_RELEASE_DEFAULT
export const TRANSFER_DESKTOP_LABEL = 'Télécharger ORION Transfer (Windows)'

/** Placeholders Mac (builds à faire sur macOS / CI). */
export const CORE_DESKTOP_MAC_DOWNLOAD =
  (import.meta.env.VITE_CORE_DESKTOP_MAC_URL as string | undefined)?.trim() || ''
export const TRANSFER_DESKTOP_MAC_DOWNLOAD =
  (import.meta.env.VITE_TRANSFER_DESKTOP_MAC_URL as string | undefined)?.trim() || ''
