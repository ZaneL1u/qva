import { compressSync, decompressSync, strFromU8, strToU8 } from 'fflate'

/**
 * 将字符串压缩并转换为 base64 编码的 URL 安全字符串
 */
export function compressToBase64(str: string): string {
  try {
    const uint8Array = strToU8(str)
    const compressed = compressSync(uint8Array, { level: 9 })
    const base64 = btoa(String.fromCharCode(...compressed))

    return base64
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '')
  }
  catch (error) {
    console.error('压缩失败:', error)
    throw error
  }
}

/**
 * 将 base64 编码的压缩字符串解压缩为原始字符串
 */
export function decompressFromBase64(base64: string): string {
  try {
    let standardBase64 = base64
      .replace(/-/g, '+')
      .replace(/_/g, '/')

    while (standardBase64.length % 4) {
      standardBase64 += '='
    }

    const binaryString = atob(standardBase64)
    const bytes = new Uint8Array(binaryString.length)
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i)
    }

    const decompressed = decompressSync(bytes)

    return strFromU8(decompressed)
  }
  catch (error) {
    console.error('解压缩失败:', error)
    throw error
  }
}
