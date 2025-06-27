import React from 'react'

interface WebringProps {
  className?: string
}

const Webring: React.FC<WebringProps> = ({ className = '' }) => {
  const webringData = {
    name: 'IndieWeb Ring',
    current: 'https://dviramontes.com',
    previous: {
      name: '←',
      url: 'https://xn--sr8hvo.ws/previous',
    },
    next: {
      name: '→',
      url: 'https://xn--sr8hvo.ws/next',
    },
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
    <div className={`border-t border-neutral-200 pt-6 mt-8 ${className}`}>
      <div className="text-center">
        <h3 className="text-sm font-semibold text-neutral-600 mb-3">
          {webringData.name}
        </h3>

        <div className="flex justify-center items-center space-x-4 text-sm">
          <a
            href={webringData.previous.url}
            className="font-bold hover:underline text-neutral-700 hover:text-black transition-colors"
            title="Visit the previous site in the ring"
          >
            {webringData.previous.name}
          </a>
          <span className="text-neutral-400">•</span>
          <a
            href={webringData.home.url}
            className="font-bold hover:underline text-neutral-700 hover:text-black transition-colors"
            title="Learn more about this webring"
          >
            {webringData.home.name}
          </a>
          <span className="text-neutral-400">•</span>
          <a
            href={webringData.random.url}
            className="font-bold hover:underline text-neutral-700 hover:text-black transition-colors"
            title="Visit a random site in the ring"
          >
            {webringData.random.name}
          </a>
          <span className="text-neutral-400">•</span>
          <a
            href={webringData.next.url}
            className="font-bold hover:underline text-neutral-700 hover:text-black transition-colors"
            title="Visit the next site in the ring"
          >
            {webringData.next.name}
          </a>
        </div>
        <p className="text-xs text-neutral-500 mt-2">
          Connecting independent websites across the web
        </p>
      </div>
    </div>
  )
}

export default Webring
