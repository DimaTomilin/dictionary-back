/* eslint-disable */
const convertToResFormat = (array) => {
  const resFormat = [];
  for (const item of array) {
    const resItem = { Word: '', Part_of_speech: '', Definition: [] };
    resItem.Word = item.Word.S;
    resItem.Part_of_speech = item.Part_of_speech.S;
    for (const def of item.Definition.L) {
      resItem.Definition.push(def.S);
    }
    resFormat.push(resItem);
  }
  return resFormat;
};

module.exports = { convertToResFormat };
