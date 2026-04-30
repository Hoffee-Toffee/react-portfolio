import type { Article } from '../../types.ts'

const article: Article = {
  slug: 'hello-world',
  title: 'Hello World',
  date: '2024-03-01',
  summary: 'My first Dev Academy blog post.',
  content: [
    {
      template: 'Heading',
      props: { level: 1, text: 'Hello World', date: '2024-03-01' },
    },
    {
      template: 'Text',
      props: { text: 'Welcome to my blog! This is a placeholder post.' },
    },
    {
      template: 'Section',
      children: [
        {
          template: 'Heading',
          props: { text: 'A Nested Section Heading' },
        },
        {
          template: 'Text',
          props: { text: 'Templates can be nested inside other templates.' },
        },
        {
          template: 'List',
          props: {
            header: 'Things I am learning',
            items: ['React', 'TypeScript', 'Fullstack development'],
          },
        },
      ],
    },
  ],
}

export default article
