import faker from 'faker';

const images = [
    require('./images/img1.jpg'),
    require('./images/img2.jpg'),
    require('./images/img3.jpg'),
    require('./images/img4.jpg'),
    require('./images/img5.jpg'),
    require('./images/img6.jpg'),
    require('./images/img7.jpg'),
    require('./images/img8.jpg'),
    require('./images/img9.jpg'),
    require('./images/img10.jpg'),
    require('./images/img11.jpg'),
    require('./images/img12.jpg'),
]

const avatars = [
  require('./images/avatar1.jpg'),
  require('./images/avatar2.jpg'),
  require('./images/avatar3.jpg'),
  require('./images/avatar4.jpg'),
  require('./images/avatar5.jpg'),
];

const formatDate = (date: Date) => `${date.getMonth()}/${date.getDay()}/${date.getFullYear()}`;

const oneProduct = () => ({
  url: faker.image.animals(500, 500, true),
  image: images[faker.random.number(images.length - 1)],
  title: faker.commerce.productName(),
  description: faker.lorem.paragraph(),
  likes: faker.random.number(100),
  views: faker.random.number(200),
  price: faker.random.number(100, 500),
  comments: Array(20).fill(0).map(_ => (
    {
      author: faker.name.findName(),
      avatar: avatars[faker.random.number(4)],
      comment: faker.lorem.sentence(),
      time: formatDate(faker.date.recent()),
    }
  ))
});

const getProducts = (count = 50) => Array(count).fill(0).map(oneProduct);

export default {
  oneProduct,
  getProducts,
}