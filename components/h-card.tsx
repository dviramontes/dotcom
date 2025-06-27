import Link from 'next/link'

const HCard = () => {
  return (
    <div className="h-card my-8 p-6 border border-black rounded-lg bg-rgb(228, 205, 243)">
      <h2 className="text-xl font-bold mb-4">Contact</h2>
      <div className="space-y-2">
        <div>
          <a
            href="https://dviramontes.com/"
            className="u-url u-uid font-bold text-lg hover:underline"
            rel="me"
          >
            <span className="p-name">David Viramontes</span>
          </a>
        </div>
        <div className="text-sm text-neutral-600">
          <span className="p-locality">Queens</span>,{' '}
          <span className="p-region">NY</span>
        </div>
        <div className="text-sm">
          <span className="p-job-title">Software Developer</span>
        </div>
        <div className="text-sm">
          <a
            href="mailto:dviramontes@gmail.com"
            className="u-email font-mono hover:underline"
            rel="me"
          >
            dviramontes@gmail.com
          </a>
        </div>
        <div className="grid grid-cols-2 gap-2 mt-4 text-sm">
          <a
            href="https://github.com/dviramontes"
            className="u-url hover:underline"
            target="_blank"
            rel="me"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/davidviramontes"
            className="u-url hover:underline"
            target="_blank"
            rel="me"
          >
            LinkedIn
          </a>
          <a
            href="https://mmmanyfold.com/be6b3833c9ca4d0684fbc7ae596d1203"
            className="u-url hover:underline"
            target="_blank"
            rel="noreferrer"
          >
            mmmanyfold
          </a>
          <a
            href="https://dviramontes.bsky.social/"
            className="u-url hover:underline"
            target="_blank"
            rel="me"
          >
            Bluesky
          </a>
          <a
            href="https://stackoverflow.com/users/1251467/dviramontes"
            className="u-url hover:underline"
            target="_blank"
            rel="noreferrer"
          >
            Stack Overflow
          </a>
          <a
            href="https://www.behance.net/dreamPilot"
            className="u-url hover:underline"
            target="_blank"
            rel="noreferrer"
          >
            Behance
          </a>
          <a
            href="https://soundcloud.com/dreampilot/tracks"
            className="u-url hover:underline"
            target="_blank"
            rel="noreferrer"
          >
            SoundCloud
          </a>
        </div>
      </div>
    </div>
  )
}

export default HCard
