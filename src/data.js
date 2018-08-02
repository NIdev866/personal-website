import ProfilePicture from './Assets/Custom/ProfilePicture.png';
import ExperienceLogo1 from './Assets/Custom/ExperienceLogo1.png';
import Portfolio1Laptop from './Assets/Custom/Portfolio1/Laptop.mp4';
import Portfolio1Mobile from './Assets/Custom/Portfolio1/Mobile.mp4';
import Portfolio2Laptop from './Assets/Custom/Portfolio2/Laptop.mp4';
import Portfolio2Mobile from './Assets/Custom/Portfolio2/Mobile.mp4';
import Portfolio3Laptop from './Assets/Custom/Portfolio3/Laptop.png';
import Portfolio3Mobile from './Assets/Custom/Portfolio3/Mobile.png';
import Education1Laptop from './Assets/Custom/Education1/Laptop.mp4';
import Education1Img1 from './Assets/Custom/Education1/Img1.png';
import Education1Img2 from './Assets/Custom/Education1/Img2.png';
import Education2Img1 from './Assets/Custom/Education2/Img1.png';

export const about = {
  firstName: 'Nikodem',
  lastName: 'Ignas',
  profilePicture: ProfilePicture,
  title: 'ReactJS Front End Engineer',
  description: `Skilled ReactJS Front End Engineer 
  specialised in building responsive ReactJS websites 
  and web apps. Experienced in combining other Front 
  End tools and libraries such as Redux.`,
  githubUrl: 'https://github.com/NIdev866',
  codepenUrl: 'https://codepen.io/NIdev866',
  youtubeUrl: '#',
  youtubeText: 'Making of this website'
};

export const experience = [
  {
    headerTitle: 'Loanable',
    mainTitle: 'Loanable LTD',
    logo: ExperienceLogo1,
    position: 'ReactJS Front End Engineer',
    monthStarted: 'December',
    yearStarted: '2017',
    monthFinished: 'June',
    yearFinished: '2018',
    description: `Built two websites, as well as a ReactJS 
    powered form-generating software used for creating 
    forms very quickly. Led the Front End in ReactJS 
    for both websites.`,
    technologiesUsed: [
      'Li-form React',
      'Custom CMS for managing JSON data'
    ]
  },
  {
    headerTitle: 'BITREC',
    mainTitle: 'BITREC LTD',
    position: 'ReactJS Front End Engineer',
    monthStarted: 'August',
    yearStarted: '2017',
    monthFinished: 'November',
    yearFinished: '2017',
    description: `Built a web app aiming to make outsourcing 
    of human resources simpler for jobseekers and employers 
    alike. Created the entire Front End in ReactJS 
    for the app.`,
    technologiesUsed: [
      'Redux',
      'Redux-form',
      'Google Maps API'
    ]
  },
];

export const portfolio = [
  {
    headerTitle: 'GetaQuote',
    company: 'Loanable LTD',
    laptop: Portfolio1Laptop,
    mobile: Portfolio1Mobile,
    description: `A quote comparison website that utilised the 
    same ReactJS form generating software as Loanable, with 
    more tailored theme and animation features.`
  },
  {
    headerTitle: 'Loanable',
    company: 'Loanable LTD',
    laptop: Portfolio2Laptop,
    mobile: Portfolio2Mobile,
    description: `A fully responsive loan broker website built 
    entirely in ReactJS, with software developed for it for 
    automating creation of forms out of a JSON schema.`
  },
  {
    headerTitle: 'SmartHRO',
    company: 'BITREC LTD',
    laptop: Portfolio3Laptop,
    mobile: Portfolio3Mobile,
    description: `ReactJS web based application that used Google 
    Maps to help jobseekers locate workplaces, and helped recruiters 
    create job postings.`
  },
];

export const skills = [
  'ReactJS',
  'HTML',
  'CSS',
  'JavaScript',
  'Redux',
  'Redux-form',
  'Bootstrap',
  'Git',
  'Pull Requests',
  'Code Review',
  'Git Branching',
  'Merge Conflicts',
  'Pair Programming',
  'ESlint',
  'Agile',
  'JIRA',
  'SASS',
  'SCSS',
  'React-Router',
  'Responsive development',
  'Performance optimization',
  'Code Reusability',
  'Cross-browser optimization',
  'Mobile first development',
  'Desktop first development',
  'BrowserStack',
  'Avocode',
  'Heroku',
  'Sync & Async',
  'AJAX',
  'Axios',
  'Fetch',
  'Redux-thunk',
  'Data Driven Development',
  'CRUD functionality',
  'ES6',
  'ES7',
  'JSON',
  'CircleCI',
  'Continuous Integration',
  'Webpack',
  'Babel',
  'Unit testing',
  'Github',
  'NPM',
  'YARN'
];

export const education = [
  {
    headerTitle: 'FreeCodeCamp',
    mainTitle: 'FreeCodeCamp',
    url: 'https://www.freecodecamp.org/nidev866',
    laptop: Education1Laptop,
    images: [
      Education1Img1,
      Education1Img2
    ],
    monthCompleted: 'August',
    yearCompleted: '2017'
  },
  {
    headerTitle: 'Uxbridge College',
    mainTitle: 'Uxbridge College, Uxbridge, UK',
    subTitle: 'Level 3 Diploma in IT',
    images: [
      Education2Img1,
    ],
    monthCompleted: 'June',
    yearCompleted: '2014'
  }
];

export const contact = {
  details: {
    phoneNumber: '07730884410',
    emailAddress: 'nikodemignas@gmail.com',
    linkedIn: 'https://www.linkedin.com/in/nikodemignas'
  },
  formSubmissionUrl: '#'
};
