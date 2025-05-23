const download = (image: string, result: string): void => {
  const link = document.createElement('a')
  link.setAttribute('href', image)
  link.setAttribute('download', `${result}.png`)
  link.click()
}

export { download }
