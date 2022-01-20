/* eslint-disable */
const convertToResFormat = (array) => {
  const resFormat = [];
  for (const item of array) {
    const resItem = { Word: '', Part_of_speech: '', Definitions: [] };
    resItem.Word = item.Word.S;
    resItem.Part_of_speech = item.Part_of_speech.S;
    for (const def of item.Definition.L) {
      resItem.Definitions.push(def.S);
    }
    resFormat.push(resItem);
  }
  return resFormat;
};

module.exports = { convertToResFormat };
