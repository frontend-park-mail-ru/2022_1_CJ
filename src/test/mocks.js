import { imagesArr } from '../test/allDatas.js';

const textArr = [
  "It must be easy to commit crimes as a snake because you don't have to worry about leaving fingerprints.",
  'The father died during childbirth.',
  'Another option you have is choosing the number of syllables in the words you speak. You probably have never considered this option before, but you have it every time you open your mouth and speak. You make so many choices like this that you never even think about, but you have the choice with each one. What are you going to do with this knowledge?',
  'Joe made the sugar cookies; Susan decorated them.',
  'I don’t like cats and they don’t like me. I used to be allergic to them and I would get stuffed up and have hives. That doesn’t seem to happen anymore. But I still don’t like them. I lived with 3 cats that were not good at peeing in the litter box. They seemed to find something important to me and pee on it. Most of the time they peed on photographs or papers that would be ruined. Cats also bring fleas into the house. There is nothing worse than having to flea dip cats and also flea bomb a home. That is why I don’t like cats.',
  "It was a question of which of the two she preferred. On the one hand, the choice seemed simple. The more expensive one with a brand name would be the choice of most. It was the easy choice. The safe choice. But she wasn't sure she actually preferred it.",
  "It took me too long to realize that the ceiling hadn't been painted to look like the sky.",
  'Patricia found the meaning of life in a bowl of Cheerios.',
  'Behind the window was a reflection that only instilled fear.'
];

function randomInteger(min = 0, max = 1) {
  let rand = min + Math.random() * (max - min);
  return Math.floor(rand);
}

export const getMockImages = () => {
  const imagesArrLen = imagesArr.length;
  let randArrLen = randomInteger(undefined, 3); // you can set by default
  let randImgArr = [];
  for (let i = 0; i < randArrLen; i++) {
    randImgArr.push(imagesArr[randomInteger(undefined, imagesArrLen)]);
  }
  return randImgArr;
};

export const getMockPostMessage = () => {
  return textArr[randomInteger(undefined, textArr.length)];
};

export const getMockPost = () => {
  return [
    {
      postID: 128929
    }
  ];
};
