import React from 'react'

interface WebringProps {
  className?: string
}

const Webring: React.FC<WebringProps> = ({ className = '' }) => {
  const webringData = {
    name: 'IndieWeb Ring',
    current: 'https://dviramontes.com',
    random: {
      name: '🎲',
      url: 'https://xn--sr8hvo.ws/random',
    },
    home: {
      name: '@',
      url: 'https://xn--sr8hvo.ws',
    },
  }

  return (
    <div className={`pt-4 mb-4 mt-4 ${className}`}>
      <div className="flex justify-center items-center space-x-3 text-sm text-neutral-600">
        <a
          href={webringData.home.url}
          className="font-bold hover:underline text-neutral-700 hover:text-black transition-colors"
          title="Learn more about this webring"
        >
          {webringData.home.name}
        </a>
        <span className="text-neutral-400">•</span>
        <span className="font-semibold">{webringData.name}</span>
        <span className="text-neutral-400">•</span>

        <a
          href={webringData.random.url}
          className="font-bold hover:underline text-neutral-700 hover:text-black transition-colors"
          title="Visit a random site in the ring"
        >
          {webringData.random.name}
        </a>
      </div>
    </div>
  )
}

export default Webring
