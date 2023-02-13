console.log("hello");

fetch("/api/contacts")
  .then((res) => res.json())
  .then((contacts) =>
    contacts.forEach((contact) => {
      const listItem = document.createElement("li");
      listItem.innerText = `${contact.name}, ${contact.phone}`;

      document.querySelector("ul").appendChild(listItem);
    })
  );

document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);
  for (const [key, value] of formData) {
    console.log(key, value);
  }
});
