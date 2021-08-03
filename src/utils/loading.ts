export const loading = {
  start: (): void => {
    const loadingContaineir = document.createElement('div')
    loadingContaineir.id = 'loadingContainer'

    const gifLoading = document.createElement('img')
    gifLoading.src =
      'https://c.tenor.com/I6kN-6X7nhAAAAAj/loading-buffering.gif'
    loadingContaineir.appendChild(gifLoading) // adiciona o nó de texto à nova div criada

    // adiciona o novo elemento criado e seu conteúdo ao DOM
    const root = document.getElementById('root')
    document.body.insertBefore(loadingContaineir, root)
  },
  stop: (): void => {
    const loadingContaineir = document.getElementById('loadingContainer')
    if (loadingContaineir) {
      loadingContaineir?.parentNode?.removeChild(loadingContaineir)
    }
  },
}
