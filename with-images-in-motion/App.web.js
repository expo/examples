import { createElement } from 'react'
import { createImagesInMotionWebViewHtml } from 'images-in-motion'

const images = [
  'https://picsum.photos/800/1200?random=1',
  'https://picsum.photos/1200/800?random=2',
  'https://picsum.photos/800/800?random=3',
  'https://picsum.photos/1000/700?random=4',
  'https://picsum.photos/800/1000?random=5',
  'https://picsum.photos/700/1100?random=6',
  'https://picsum.photos/800/1200?random=7',
  'https://picsum.photos/1200/800?random=8',
]

const html = createImagesInMotionWebViewHtml(
  { images, speedRange: [8, 18], angle: 12 },
  undefined,
  { width: '20rem', height: '20rem' },
)

export default function App() {
  return createElement(
    'div',
    {
      style: {
        width: '100%',
        height: '100%',
        minHeight: '100dvh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
    },
    createElement('iframe', {
      srcDoc: html,
      title: 'images in motion',
      style: {
        width: '20rem',
        height: '20rem',
        border: 0,
        display: 'block',
      },
    }),
  )
}
