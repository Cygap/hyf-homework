// initializing variables
const screenshotKEY = "af35d9bda9msh1d5d601753355fcp1d5ca1jsnc37e78a50099";
const crudcrudKEY = "015f575110104eb2980297c1947ca0db";
const crudcrudURL = "https://crudcrud.com/api";
const baseSCR_URL = "https://website-screenshot6.p.rapidapi.com/screenshot";
let currentUser = {
  email: "john@smith",
  hash: -946852072
};

async function deleteScreenShot(id) {
  const response = await fetch(
    `${crudcrudURL}/${crudcrudKEY}/screenshots/${id}`,
    {
      method: "DELETE"
    }
  );
  console.dir(response.status);
  document.getElementById(id).remove();
}

async function getScreenShot(event) {
  event.preventDefault();
  const targetSite = document.getElementById("target-address").value;

  const buttonElement = document.getElementById("get-screenshot-button");

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": screenshotKEY,
      "X-RapidAPI-Host": "website-screenshot6.p.rapidapi.com"
    }
  };

  buttonElement.innerText = "Fetching your url...";

  try {
    const response = await fetch(
      `${baseSCR_URL}?url=${targetSite}&width=1920&height=1080`,
      options
    );
    if (!response.ok) {
      throw new Error(response.message);
    }
    buttonElement.innerText = "Prepairing the picture for display...";
    const result = await response.json();

    const screenshotUrl = result.screenshotUrl;
    document.getElementById("target-address").value = "";
    const screeenshotToRender = await postScreenshot(
      screenshotUrl,
      targetSite,
      currentUser
    );
    console.dir(screeenshotToRender);
    renderScreenshot(screeenshotToRender);
    buttonElement.innerText = "Get your screenshot";
  } catch (error) {
    screenshotElement.innerText = `Cannot fetch your url, please check its validity, error: ${error.message}`;
  }
}

/**
 * Returns a hash code from a string
 * @param  {String} str The string to hash.
 * @return {Number}    A 32bit integer
 * @see http://werxltd.com/wp/2010/05/13/javascript-implementation-of-javas-string-hashcode-method/
 */
function hashCode(str) {
  let hash = 0;
  for (let i = 0, len = str.length; i < len; i++) {
    let chr = str.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
}

async function postScreenshot(url, target, user) {
  const body = {
    url,
    target,
    userId: user.userId
  };
  const response = await fetch(`${crudcrudURL}/${crudcrudKEY}/screenshots`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    method: "POST",
    body: JSON.stringify(body)
  });
  console.dir(response);
  const result = await response.json();
  console.dir(result);
  return result;
}

async function getScreenshots(user) {
  try {
    const response = await fetch(`${crudcrudURL}/${crudcrudKEY}/screenshots`);
    if (!response.ok) {
      throw new Error(response.status);
    }
    const result = await response.json();
    const listToRender = result.filter(
      (screenshot) => screenshot.userId === user
    );
    console.log(listToRender);
    if (!listToRender.length) {
      throw new Error("Your user doesn't have any screenshots saved...");
    }
    renderScreenshots(listToRender);
  } catch (error) {
    console.log(error.message);
  }
}
function renderScreenshots(screenshots) {
  screenshots.forEach((screenshot) => renderScreenshot(screenshot));
}

function renderScreenshot(screenshot) {
  const screenshotElement = document.createElement("div");
  screenshotElement.id = screenshot._id;
  document.getElementById("screenshot-container").append(screenshotElement);
  screenshotElement.innerHTML = `<img src="${screenshot.url}" alt="screeenshot of ${screenshot.target}" width="600px">
  <button class="button delete" onclick="deleteScreenShot('${screenshot._id}')">Delete screenshot</button>`;
}
async function createUser(user, hash) {
  const body = {
    userId: user,
    hash
  };
  const response = await fetch(`${crudcrudURL}/${crudcrudKEY}/users`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    method: "POST",
    body: JSON.stringify(body)
  });
}

async function loginUser(event) {
  event.preventDefault();
  try {
    console.log(`${crudcrudURL}/${crudcrudKEY}/users`);
    const response = await fetch(`${crudcrudURL}/${crudcrudKEY}/users`);

    if (!response.ok) {
      throw new Error(response.status);
    }
    const result = await response.json();
    const hash = hashCode(document.getElementById("password").value);
    const user = document.getElementById("user-email").value;
    if (!result.length) {
      createUser(user, hash);
      throw new Error(
        "You have jsut created a new user, please login once again"
      );
    }
    console.dir(result);

    currentUser = result.find(
      (nextUser) => nextUser.userId === user && nextUser.hash === hash
    );
    console.dir(currentUser);
    if (!currentUser) {
      throw new Error("User with these credentials is not found");
    }
    getScreenshots(user);
    document.querySelector(".modal-container").classList.toggle("hidden");
  } catch (error) {
    document.getElementById(
      "login-button"
    ).innerHTML = `Cannot login! ${error.message}`;
    setTimeout(
      () => (document.getElementById("login-button").innerHTML = "Log in"),
      2000
    );
  }
}

//event listeners
document.getElementById("login-form").addEventListener("submit", loginUser);

document
  .querySelector("#get-screenshot-form")
  .addEventListener("submit", getScreenShot);
