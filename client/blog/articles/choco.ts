import type { Article } from '../../types.ts'

const article: Article = {
  slug: 'choco',
  title: 'Choco: A Gallery',
  date: '06-05-2026',
  summary: 'A collection of images and videos of Choco, my former cat.',
  content: [
    {
      template: 'Heading',
      props: { level: 1, text: 'Choco: A Gallery', date: '06-05-2026' },
    },
    {
      template: 'Gallery',
      props: {
        items: [
          { src: '/client/images/choco/choco-cutout-01.png' },
          { src: '/client/images/choco/choco-cutout-02.png' },
          { src: '/client/images/choco/choco-cutout-03.png' },
          { src: '/client/images/choco/choco-cutout-04.png' },
          { src: '/client/images/choco/choco-cutout-05.png' },
        ],
      },
    },
  ],
}

export default article
