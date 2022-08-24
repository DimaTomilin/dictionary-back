const getRandomItem = (array, count) => {
  const randomIndex = Math.floor(Math.random() * count);
  return [array[randomIndex]];
};

const getRandomItemByLetter = (array, letter) => {
  const filtredArray = array.filter((word) => word.Word[0] === letter);
  const randomIndex = Math.floor(Math.random() * filtredArray.length);
  return [filtredArray[randomIndex]];
};

module.exports = { getRandomItem, getRandomItemByLetter };
