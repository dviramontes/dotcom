import Layout from '../components/layout'
import Container from '../components/container'
import PostTitle from '../components/post-title'
import Webring from '../components/webring'
import HCard from '../components/h-card'

function About(): JSX.Element {
  return (
    <Layout preview={false}>
      <Container>
        <PostTitle>About</PostTitle>
        <article className="mb-32">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-5xl">👋🏽 ¡Hola!</h2>
            <br />
            <p>
              My name is David Viramontes, I&apos;m originally from México
              Mágico ✨ and I now live in beautiful Queens, NY 💐. I&apos;m a
              software developer with experience across various web
              technologies, most notably TypeScript, React, Node.js, Golang,
              Elixir, Clojure, Rust and Kotlin. Feel free to reach out about
              work opportunities and open source projects via the email below.
            </p>
            <br />
            <HCard />
            <br />
            <p>Thanks for checking out my blog!</p>
          </div>
          <Webring />
        </article>
      </Container>
    </Layout>
  )
}

export default About
