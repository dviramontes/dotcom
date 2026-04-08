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
      <div className="flex items-center justify-center space-x-3 text-sm text-stone-500 dark:text-stone-400">
        <a
          href={webringData.home.url}
          className="font-bold text-stone-700 transition-colors hover:text-black hover:underline dark:text-stone-300 dark:hover:text-white"
          title="Learn more about this webring"
        >
          {webringData.home.name}
        </a>
        <span className="text-stone-400 dark:text-stone-500">•</span>
        <span className="font-semibold">{webringData.name}</span>
        <span className="text-stone-400 dark:text-stone-500">•</span>

        <a
          href={webringData.random.url}
          className="font-bold text-stone-700 transition-colors hover:text-black hover:underline dark:text-stone-300 dark:hover:text-white"
          title="Visit a random site in the ring"
        >
          {webringData.random.name}
        </a>
      </div>
    </div>
  )
}

export default Webring
