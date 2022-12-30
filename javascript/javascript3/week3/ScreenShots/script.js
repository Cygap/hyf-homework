// initializing variables
const screenshotKEY = "af35d9bda9msh1d5d601753355fcp1d5ca1jsnc37e78a50099";
const crudcrudKEY = "b77fe83d04e14a2c8c641b5050a00587";
const crudcrudURL = "https://crudcrud.com/api";
const baseSCR_URL = "https://website-screenshot6.p.rapidapi.com/screenshot";
const currentUser = {
  email: "john@smith",
  password: "qwerty",
  hash: "209485249853"
};

async function getScreenShot(event) {
  event.preventDefault();
  const targetSite = document.getElementById("target-address").value;
  let screenshotUrl;

  const screenshotElement = document.createElement("div");
  document.getElementById("screenshot-container").append(screenshotElement);

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": screenshotKEY,
      "X-RapidAPI-Host": "website-screenshot6.p.rapidapi.com"
    }
  };

  screenshotElement.innerText = "Fetching your url...";

  try {
    const response = await fetch(
      `${baseSCR_URL}?url=${targetSite}&width=1920&height=1080`,
      options
    );
    if (!response.ok) {
      throw new Error(response.message);
    }
    screenshotElement.innerText = "Prepairing the picture for display...";
    const result = await response.json();
    console.dir(result);
    screenshotUrl = result.screenshotUrl;
  } catch (error) {
    screenshotElement.innerText = `Cannot fetch your url, please check its validity, error: ${error.message}`;
  }

  document.getElementById("target-address").value = "";

  screenshotElement.innerHTML = `<img src="${screenshotUrl}" alt="screeenshot of ${targetSite}" width="600px">
  <button class="button" id="delete">Delete scrennshot</button>`;

  postScreenshot(screenshotUrl, targetSite, currentUser);
}

async function postScreenshot(url, target, user) {
  const body = {
    url,
    target,
    userId: user.email,
    userHash: user.hash
  };
  const response = await fetch(`${crudcrudURL}/${crudcrudKEY}/screenshots`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    method: "POST",
    body: JSON.stringify(body)
  });
}

//event listeners
document
  .querySelector("#get-screenshot-form")
  .addEventListener("submit", getScreenShot);
