const shareWeb = async (title: string, text: string): Promise<void> => {
  const shareData = {
    title,
    text,
    url: window.location.href,
  }
  try {
    await navigator.share(shareData)
  } catch (error) {
    console.error('Error sharing', error)
  }
}

export { shareWeb }
