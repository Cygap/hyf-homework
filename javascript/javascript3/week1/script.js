const galaxies = `{
    "Galaxies": [
      "Galaxies in general",
      "Group and cluster",
      "Satellite galaxy",
      "Supercluster"
    ],
    "By component": [
      "Bulge",
      "Spiral arm",
      "Thin disk",
      "Thick disk",
      "Halo Corona",
      "Tidal tail",
      "Stellar stream"
    ],
    "By morphology": [
      "Spiral",
      "Barred spiral",
      "Lenticular",
      "Elliptical Ring",
      "Irregular"
    ],
    "By size": ["Brightest cluster", "Giant elliptical", "Dwarf"],
    "By type": [
      "Protogalaxy",
      "Starburst",
      "Dark",
      {
        "Active": [
          "Radio",
          "Seyfert",
          { "Quasar": ["Quasar", "Microquasar"] },
          "Blazar"
        ]
      }
    ]
  }`;

console.dir(JSON.parse(galaxies));
/**
 * James Webb Space Telescope API
 * you can get all public space pictures from billion light years away!
 * the detailed documentation is here: https://documenter.getpostman.com/view/10808728/UzQyphjT#ed79162e-d5b0-48c8-87c3-d94dfae64f37
 */
const myHeaders = new Headers();
myHeaders.append("X-API-KEY", "11f10492-29f8-48d5-a5e9-e9380cea38cd");

var requestOptions = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow"
};

fetch("https://api.jwstapi.com/all/type/jpg", requestOptions)
  .then((response) => response.json())
  .then((result) => console.dir(result))
  .catch((error) => console.log("error", error));
