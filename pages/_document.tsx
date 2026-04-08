import Document, { Html, Head, Main, NextScript } from 'next/document'

const themeScript = `
  (function () {
    try {
      var storedTheme = localStorage.getItem('theme')
      var theme =
        storedTheme === 'light' || storedTheme === 'dark'
          ? storedTheme
          : window.matchMedia('(prefers-color-scheme: dark)').matches
            ? 'dark'
            : 'light'

      document.documentElement.classList.toggle('dark', theme === 'dark')
      document.documentElement.style.colorScheme = theme
    } catch (error) {}
  })()
`

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
