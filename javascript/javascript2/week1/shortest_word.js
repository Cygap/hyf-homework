const danishWords = ["bil", "plante", "kaffe", "bog", "ø", "planetarium"];
function findShortest(wordsArray) {
  wordsArray.sort((wordA, wordB) => wordA.length - wordB.length);
  return wordsArray[0];
}

console.log(findShortest(danishWords));

function countDanishLetters(string) {
  const result = {};
  let total = 0;
  for (let char of string) {
    if (char.match(/[åøæ]/i)) {
      total++;
      if (result[char]) {
        result[char]++;
      } else {
        result[char] = 1;
      }
    }
  }
  result["total"] = total;
  return result;
}

const danishString = "Jeg har en blå bil";
console.dir(countDanishLetters(danishString));
const danishString2 = "Blå grød med røde bær";
console.dir(countDanishLetters(danishString2));
