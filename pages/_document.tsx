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

const plausibleScript = `
  window.plausible=window.plausible||function(){(plausible.q=plausible.q||[]).push(arguments)},plausible.init=plausible.init||function(i){plausible.o=i||{}};
  plausible.init()
`

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <script dangerouslySetInnerHTML={{ __html: themeScript }} />
          <script
            async
            src="https://dotcom-analytics.exe.xyz/js/pa-gfgiDC091HW63G4-E4RvG.js"
          />
          <script dangerouslySetInnerHTML={{ __html: plausibleScript }} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
