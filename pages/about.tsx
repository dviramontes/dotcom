import Layout from '../components/layout'
import Container from '../components/container'
import Header from '../components/header'
import PostTitle from '../components/post-title'
import Head from 'next/head'

function About(): JSX.Element {
  return (
    <Layout preview={false}>
      <Container>
        <Header />
        <PostTitle>About</PostTitle>
        <article className="mb-32">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-5xl">👋🏽 ¡Hola!</h1>
            <br />
            <p>
              My name is <b>David Viramontes</b>
              <br />
              <br />
              I&apos;m originally from México Mágico ✨ and I now live in
              beautiful Queens, NY 💐
              <br />
              <br />
              I&apos;m a software developer with experience across various web
              technologies, most notably TypeScript, React, Node.js, Golang,
              Elixir, Clojure, Rust and Kotlin. Feel free to reach out about
              work opportunities and projects via the email below.
            </p>
            <br />
            <p>
              <a
                target="_blank"
                rel="noreferrer"
                href="mailto:dviramontes@gmail.com"
                className="font-mono"
              >
                dviramontes[at]gmail[dot]com
              </a>
            </p>
            <br />
            <p>Thanks for checking out my blog!</p>
            <br />
            <p>Other places on the web you can find me:</p>
            <ul>
              <li>
                <a
                  className="underline hover:text-darkblue-300 duration-200 transition-colors"
                  target="_blank"
                  rel="noreferrer"
                  href="https://mmmanyfold.com/be6b3833c9ca4d0684fbc7ae596d1203"
                >
                  mmmanyfold
                </a>
              </li>
              <li>
                <a
                  className="underline hover:text-darkblue-300 duration-200 transition-colors"
                  target="_blank"
                  rel="noreferrer"
                  href="https://github.com/dviramontes/"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  className="underline hover:text-darkblue-300 duration-200 transition-colors"
                  target="_blank"
                  rel="noreferrer"
                  href="https://www.linkedin.com/in/davidviramontes"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  className="underline hover:text-darkblue-300 duration-200 transition-colors"
                  target="_blank"
                  rel="noreferrer"
                  href="https://stackoverflow.com/users/1251467/dviramontes"
                >
                  Stack Overflow
                </a>
              </li>
              <li>
                <a
                  className="underline hover:text-darkblue-300 duration-200 transition-colors"
                  target="_blank"
                  rel="noreferrer"
                  href="https://www.behance.net/dreamPilot"
                >
                  Behance
                </a>
              </li>
              <li>
                <a
                  className="underline hover:text-darkblue-300 duration-200 transition-colors"
                  target="_blank"
                  rel="noreferrer"
                  href="https://soundcloud.com/dreampilot/tracks"
                >
                  SoundCloud
                </a>
              </li>
            </ul>
          </div>
        </article>
      </Container>
    </Layout>
  )
}

export default About
