import { toast } from 'react-hot-toast'

const shareWeb = async (shareData: {
  title: string
  url: string
}): Promise<void> => {
  try {
    // Check if Web Share API is supported
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition  -- navigator.share is not always available
    if (navigator.share) {
      await navigator.share(shareData)
    } else {
      // Fallback to old method by creating input element to copy link
      copyToClipboardFallback(shareData.url)
      toast('Link copied to clipboard', { icon: '📋' })
    }
  } catch (error) {
    console.error('Error sharing', error)
  }
}

// Fallback to old method by creating input element to copy link
const copyToClipboardFallback = (text: string): void => {
  const input = document.createElement('input')
  input.setAttribute('value', text)
  document.body.appendChild(input)
  input.select()
  document.execCommand('copy')
  document.body.removeChild(input)
}

export { shareWeb }
