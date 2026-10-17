/** Add reviewed Google Flow exports here. Empty sources intentionally use the poster + optional browser narration. */
export const founderScenes = {
  intro: { title: 'Meet the founder', poster: '/images/founder/guide.webp', video: '', captions: '',
    script: "Hello, I'm Pulluru Bhanu Prakash Reddy, founder of Mahaan Solutions Private Limited. We bring digital marketing, CRM development and maintenance, and software development together around your vision. If you’d like to explore our services, scroll down and take a look." },
  'software-development': { title: 'Software development', poster: '/images/founder/guide.webp', video: '', captions: '',
    script: 'Have an idea for a digital product? Let’s build software around your business.' },
  'digital-marketing': { title: 'Digital marketing', poster: '/images/founder/guide.webp', video: '', captions: '',
    script: 'Let’s make your business easier to discover, with digital marketing shaped around your audience.' },
  'crm-development-and-maintenance': { title: 'CRM development & maintenance', poster: '/images/founder/guide.webp', video: '', captions: '',
    script: 'Let’s connect your customer information with CRM development and maintenance that supports your team.' },
  closing: { title: 'Your next chapter', poster: '/images/founder/closing.webp', video: '', captions: '',
    script: 'Your next chapter starts with a conversation. Tell me what you want to build. Your vision. Our solutions. Let’s explore the possibilities together.' },
};
export type FounderScene = keyof typeof founderScenes;
export const portraitStyles = [
  {id:'hero',name:'Cinematic',description:'Navy tailoring · champagne light',src:'/images/founder/hero.webp'},
  {id:'closing',name:'Editorial',description:'Ivory shirt · warm portrait',src:'/images/founder/closing.webp'},
  {id:'guide',name:'Presenter',description:'Full-length · open gesture',src:'/images/founder/guide.webp'},
] as const;
