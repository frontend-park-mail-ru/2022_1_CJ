import { imagesArr } from '../test/allDatas.js';

const idArr = new Uint32Array(100); // you can change this number for more random ids
window.crypto.getRandomValues(idArr);

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

const userFirstNameArr = [
  'Morgan',
  'Stan',
  'Ella',
  'Booch',
  'Melissa',
  'Antony',
  'Samsara',
  'Bob',
  'Tonya',
];

const userLastNameArr = [
  'Vescer',
  'Dylan',
  'Moris',
  'Dicaprio',
  'Pines',
  'Spacy',
  'Astley',
  'Torn',
];

const postPublishedDate = {
  date: [
    { dateType: 1, dateStr: 'yesterday' },
    { dateType: 2, dateStr: ' day' },
    { dateType: 3, dateStr:  ' week' },
    { dateType: 4, dateStr:  ' month' },
    { dateType: 5, dateStr:  ' year' },
    { dateType: 6, dateStr:  '' }, // xx.xx.xxxx
  ],
  // time: [
  //   { 1: 'x:xx'},
  //   { 2: 'xx:xx'},
  // ],
};

function randomInteger(min = 0, max = 1) {
  let rand = min + Math.random() * (max - min);
  return Math.floor(rand);
}

export const getMockPostImages = () => {
  const imagesArrLen = imagesArr.length;
  let randArrLen = randomInteger(undefined, 3); // you can set by default
  let randImgArr = [];
  for (let i = 0; i < randArrLen; i++) {
    randImgArr.push(imagesArr[randomInteger(undefined, imagesArrLen)]);
  }
  return randImgArr;
};

export const getMockPostID = () => {
  return idArr[randomInteger(undefined, idArr.length)];
};

export const getMockPostAuthorImage = () => {
  return imagesArr[randomInteger(undefined, imagesArr.length)];
};

export const getMockPostAuthorFirstName = () => {
  return userFirstNameArr[randomInteger(undefined, userFirstNameArr.length)];
};

export const getMockPostAuthorLastName = () => {
  return userLastNameArr[randomInteger(undefined, userLastNameArr.length)];
};

export const getMockPostDate = () => {
  let fullDate = '';
  let {dateType, dateStr} = postPublishedDate.date[randomInteger(undefined, postPublishedDate.date.length)];
  const options = {
    timezone: 'UTC'
  };
  let datePart = '';

  switch (dateType) {
    case 1:
      break;
    case 2:
      datePart = randomInteger(2, 6);
      break;
    case 3:
      datePart = randomInteger(1, 4);
      break;
    case 4:
      datePart = randomInteger(1, 11);
      break;
    case 5:
      datePart = randomInteger(1, 3);
      break;
    case 6:
      let randYear = randomInteger(45, 49);
      let randMonth = randomInteger(undefined, 11);
      let randDay = randomInteger(undefined, 30);
      let randDate = 24 * 60 * 60 * 1000 * (365 * randYear + 30 * randMonth + randDay);
      datePart = new Date(randDate).toLocaleDateString("ru", options);
      break;
  }

  fullDate = datePart + dateStr;

  switch (dateType) {
    case 2:
    case 3:
    case 4:
    case 5:
      if (datePart && datePart > 1) {
        fullDate += 's';
      }
      fullDate += ' ago';
      break;
  }
  let randHour = randomInteger(undefined, 23);
  let randMin = randomInteger(undefined, 59);
  let randSec = randomInteger(undefined, 59); 
  let randTime = ((randHour * 60 + randMin) * 60 + randSec) * 1000;
  fullDate += ' at ' + new Date(randTime).toLocaleTimeString("ru", options).slice(0, -3);
  return fullDate;
}

export const getMockPostMessage = () => {
  return textArr[randomInteger(undefined, textArr.length)];
};

export const getMockPostLikesCount = () => {
  const likesCount = 999;
  return randomInteger(undefined, likesCount);
};

export const getMockPostWatchedCount = () => {
  const watchedCount = 999;
  return randomInteger(undefined, watchedCount);
};

export const getMockPosts = () => {
  let postArr = [];
  let postArrLen = randomInteger(2, 4);
  for (let i = 0; i < postArrLen; i++) {
    postArr.push({
      id: 'id' + getMockPostID(),
      author: {
        id: 'id' + getMockPostID(),
        image: getMockPostAuthorImage(),
        name: {
          first: getMockPostAuthorFirstName(),
          last: getMockPostAuthorLastName(),
        }
      },
      publishedTime: getMockPostDate(),
      message: getMockPostMessage(),
      images: getMockPostImages(),
      likesCount: getMockPostLikesCount(),
      watchedCount: getMockPostWatchedCount(),
    });
  }
  return postArr;
};
