// initializing variables
// Decided not to hide crudcrudKEY anywhere - it is valid for only 24 hours
const screenshotKEY = "af35d9bda9msh1d5d601753355fcp1d5ca1jsnc37e78a50099";
const crudcrudKEY = "3454dc8fc29e4c269600bb3028ff235f";
const crudcrudURL = "https://crudcrud.com/api";
const baseSCR_URL = "https://website-screenshot6.p.rapidapi.com/screenshot";
let currentUser = {
  email: "john@smith",
  hash: -946852072
};

/**
 * Deletes the screenshot record from crudcrud.
 * @param {hex} id - unique number to identify user. the format provided by crudcrud.com
 */
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

/**
 * Gets the target url, then calls website-screenshot6.p.rapidapi.com to get the link with the image.
 * Posts the screenshot and metadata to crudcrud by calling postScreenshot.
 * Then calls renderScreenshot to show it on the page.
 * @param {object} event - form submit.
 */
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

    renderScreenshot(screeenshotToRender);
    buttonElement.innerText = "Get your screenshot";
  } catch (error) {
    screenshotElement.innerText = `Cannot fetch your url, please check its validity, error: ${error.message}`;
  }
}

/**
 * Returns a hash code from a string - to emulate secure storage of passwords.
 * @param  {String} str The string to hash.
 * @return {Number}    A 32bit integer
 * @see http://werxltd.com/wp/2010/05/13/javascript-implementation-of-javas-string-hashcode-method/
 * @returns {Number} - unique sequence of digits for a given string.*/
function hashCode(str) {
  let hash = 0;
  for (let i = 0, len = str.length; i < len; i++) {
    let chr = str.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
}

/**
 * Saves the addres of the screenshot with metadata to crudcrud.com.
 * @param {String} url - web address with the screenshot image.
 * @param {String} target - web adress of the site, from which the screenshot was taken.
 * @param {Object} user - metadata of the user, which saved the screenshot.
 * @returns {Object} result - the object with all the added data (for rendering at a later stage).
 */
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

  const result = await response.json();

  return result;
}

/**
 * Fetches screenshot data for the current user, then calls rendering function with the array of
 * screnshot objects to render.
 * @param {String} user - user id, currently implemented as user email.
 */
async function getAllScreenshots(user) {
  try {
    const response = await fetch(`${crudcrudURL}/${crudcrudKEY}/screenshots`);
    if (!response.ok) {
      throw new Error(response.status);
    }
    const result = await response.json();
    const listToRender = result.filter(
      (screenshot) => screenshot.userId === user
    );

    if (!listToRender.length) {
      throw new Error("Your user doesn't have any screenshots saved...");
    }
    renderScreenshots(listToRender);
  } catch (error) {
    console.log(error.message);
  }
}

/**
 * Clears the container, then calls rendering function for each screenshot object.
 * @param {Array} screenshots - array of objects with screenshot data
 */
function renderScreenshots(screenshots) {
  document.getElementById("screenshot-container").innerHTML = "";
  screenshots.forEach((screenshot) => renderScreenshot(screenshot));
}

/**
 * shows the screenshot on the page, adds delete button with the relevant eventlistener.
 * @param {Object} screenshot - object with all the metadata for rendering screenshot.
 */
function renderScreenshot(screenshot) {
  const screenshotElement = document.createElement("div");
  screenshotElement.id = screenshot._id;
  document.getElementById("screenshot-container").append(screenshotElement);
  screenshotElement.innerHTML = `<img src="${screenshot.url}" alt="screeenshot of ${screenshot.target}" width="600px">
  <button class="button delete" onclick="deleteScreenShot('${screenshot._id}')">Delete screenshot</button>`;
}

/**
 * Posts the user data to crudcrud.
 * @param {String} user - user identification
 * @param {Number} hash - user password hash (moque one)
 */
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

/**
 * Checks the users at Crudcrud, if there are none - creates one automatically. If there are users -
 * checks entered credentials against user data at crudcrud. If the user exists and the password is correct
 * calls the function to get and render screenshots.
 * @param {Object} event form submit
 */
async function loginUser(event) {
  event.preventDefault();
  try {
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

    currentUser = result.find(
      (nextUser) => nextUser.userId === user && nextUser.hash === hash
    );

    if (!currentUser) {
      throw new Error("User with these credentials is not found");
    }
    getAllScreenshots(user);
    document.querySelector(".modal-container").classList.toggle("hidden");
    document.getElementById("change-user").innerText = user;
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

/**
 * Shows oogin modal to change the user.
 * @param {Object} event - click
 */
function changeUser(event) {
  event.preventDefault();
  document.querySelector(".modal-container").classList.toggle("hidden");
}

//event listeners
document.getElementById("login-form").addEventListener("submit", loginUser);

document.getElementById("change-user").addEventListener("click", changeUser);

document
  .querySelector("#get-screenshot-form")
  .addEventListener("submit", getScreenShot);

document
  .getElementById("new-user-button")
  .addEventListener("click", () =>
    createUser(
      document.getElementById("user-email").value,
      hashCode(document.getElementById("password").value)
    )
  );
