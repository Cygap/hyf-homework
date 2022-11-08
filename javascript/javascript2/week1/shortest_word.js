const danishWords = ["bil", "plante", "kaffe", "bog", "ø", "planetarium"];
function findShortest(wordsArray) {
  wordsArray.sort((wordA, wordB) => wordA.length - wordB.length);
  return wordsArray[0];
}
const section = document.getElementById("warm-up");
const display = document.createElement("div");
display.innerText = `From words: ${danishWords}`;
const renderedResult = document.createElement("div");
renderedResult.innerText = `the shortest word is "${findShortest(
  danishWords
)}"`;
section.append(display, renderedResult);

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
const secondDisplay = document.createElement("div");
const danishString = "Jeg har en blå bil";
const count1 = countDanishLetters(danishString);
const danishString2 = "Blå grød med røde bær";
const count2 = countDanishLetters(danishString2);
secondDisplay.innerHTML = `<p>In a sthring "${danishString}"</p>
<p>there are following danish letters<p>
<p>${JSON.stringify(count1)}</p>
<p>In a sthring "${danishString2}"</p>
<p>there are following danish letters<p>
<p>${JSON.stringify(count2)}</p>`;
section.append(secondDisplay);
