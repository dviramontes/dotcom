import Layout from '../components/layout'
import Container from '../components/container'
import Header from '../components/header'
import PostTitle from '../components/post-title'
import Head from 'next/head'

function About() {
  return (
    <Layout preview={false}>
      <Container>
        <Header />
        <PostTitle>About</PostTitle>
        <>
          <article className="mb-32">
            <Head>
              <title>About</title>
            </Head>
            <div className="max-w-2xl mx-auto">
              <h1 className="text-5xl">👋🏽 ¡Hola!</h1>
              <br />
              <p>
                {' '}
                My name is <b>David A. Viramontes Martinez</b>
                <br />
                <br /> I'm originally from México Mágico ✨{'  '} and I now live
                in beautiful {'  '}
                Queens, NY 💐
                <br />
                <br />
                I'm a software developer with experience across many web
                technologies, most notably TypeScript, React, Node.js, Golang,
                Clojure, Elixir, Python and Ruby. Feel free to reach out about
                work opportunities and projects via the email below.
              </p>
              <br />
              <p className="">
                <a target="_blank" href="mailto:dviramontes@gmail.com">
                  <pre>dviramontes[at]gmail[dot]com</pre>
                </a>
              </p>
              <br />
              <p>Thanks for checking out my blog!</p>
              <br />
              <p>Other places on the web you can find me:</p>
              <ul>
                <li>
                  -{' '}
                  <a
                    className="underline hover:text-darkblue-300 duration-200 transition-colors"
                    target="_blank"
                    href="https://mmmanyfold.com/be6b3833c9ca4d0684fbc7ae596d1203"
                  >
                    mmmanyfold
                  </a>
                </li>
                <li>
                  -{' '}
                  <a
                    className="underline hover:text-darkblue-300 duration-200 transition-colors"
                    target="_blank"
                    href="http://github.com/dviramontes/"
                  >
                    Github
                  </a>
                </li>
                <li>
                  -{' '}
                  <a
                    className="underline hover:text-darkblue-300 duration-200 transition-colors"
                    target="_blank"
                    href="https://www.linkedin.com/in/davidviramontes"
                  >
                    Linkedin
                  </a>
                </li>
                <li>
                  -{' '}
                  <a
                    className="underline hover:text-darkblue-300 duration-200 transition-colors"
                    target="_blank"
                    href="https://stackoverflow.com/users/1251467/dviramontes"
                  >
                    Stackoverflow
                  </a>
                </li>
                <li>
                  -{' '}
                  <a
                    className="underline hover:text-darkblue-300 duration-200 transition-colors"
                    target="_blank"
                    href="https://www.behance.net/dreamPilot"
                  >
                    Behance
                  </a>
                </li>
                <li>
                  -{' '}
                  <a
                    className="underline hover:text-darkblue-300 duration-200 transition-colors"
                    target="_blank"
                    href="https://soundcloud.com/dreampilot/tracks"
                  >
                    Soundcloud
                  </a>
                </li>
              </ul>
            </div>
          </article>
        </>
      </Container>
    </Layout>
  )
}

export default About
