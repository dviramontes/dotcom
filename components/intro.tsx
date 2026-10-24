import { titleStyles } from './title-styles'
import SubIntro from './subintro'

const Intro = () => {
  return (
    <section className="flex-col md:flex-row flex items-center md:justify-between mt-16 mb-16 md:mb-12">
      <h1 className={`${titleStyles} md:pr-8`}>Blog</h1>
      <SubIntro />
    </section>
  )
}

export default Intro
