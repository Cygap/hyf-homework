// const a = [22, 54, 33, 67, 91];
// a.push(42);
// a.unshift(43);
// console.log(a.length);
// a.shift();
// a.pop();
// console.log(a.length);
// for (let i = 0; i < a.length; i++) console.log(a[i]);
// for (let item of a) console.log(item);
// console.log(a.toString());
// console.log(a.join(" -*-*- "));
// if (a.includes(33)) {
//   console.log(
//     `33 exists at position ${a.lastIndexOf(33) + 1} (human counting from 1)`
//   );
// }

classmates = [
  { name: "vipavee", age: 20 },
  { name: "Natalia", age: 20 },
  { name: "Alex", age: 37 },
  {},
];
classmates[1].age++;
console.log(classmates[1].age);

for (let person of classmates) {
  if (person.name === "Alex") {
    console.log(
      `Alex is found!!! at position ${classmates.indexOf(person) + 1}`
    );
    break;
  }
}

console.log(Object.keys(classmates[3]));

const cat = {
  name: "Bertie",
  breed: "Cymric",
  color: "White",
  greeting: function () {
    console.log("Miow!");
  },
};
const catName = "name";
console.log(cat[catName]);
cat.greeting();
cat.color = "black";


const myFavBand = {
name: "Beatles",
nationality: "British", 
genre: "Soft rock"
members: 4,
formed: 1957,
split: 1970,
albums: [
    {
      
      "released": "22.03.1963",
      "album": "Please Please Me",
      "cover": "https://is4-ssl.mzstatic.com/image/thumb/Music/v4/63/11/dc/6311dc1f-f8cb-6cfb-36c1-21dcfd143da7/source/600x600bb.jpg"
    },
    {
      
      "released": "22.11.1963",
      "album": "With the Beatles",
      "cover": "https://is2-ssl.mzstatic.com/image/thumb/Music/v4/2e/ef/98/2eef98bb-7f0d-a524-4ef9-a7d3f06acae4/source/600x600bb.jpg"
    },
    {
      
      "released": "10.07.1964",
      "album": "A Hard Day’s Night",
      "cover": "https://is4-ssl.mzstatic.com/image/thumb/Music/v4/34/fd/0a/34fd0a7b-7fb5-9bc5-032b-c1cd3d89ddd1/source/600x600bb.jpg"
    },
    {
      
      "released": "04.12.1964",
      "album": "Beatles For Sale",
      "cover": "https://is2-ssl.mzstatic.com/image/thumb/Music/v4/5f/f5/91/5ff59179-0878-5018-9a75-71f3bb2ad357/source/600x600bb.jpg"
    },
    {
      
      "released": "06.08.1965",
      "album": "Help!",
      "cover": "https://is1-ssl.mzstatic.com/image/thumb/Music/v4/5b/7d/6e/5b7d6e78-9095-7453-c9ec-21032ddb8c1a/source/600x600bb.jpg"
    },
    {
      
      "released": "03.12.1965",
      "album": "Rubber Soul",
      "cover": "https://is5-ssl.mzstatic.com/image/thumb/Music/v4/f8/4b/79/f84b79f5-4b11-2e98-2e38-23a8c575d42a/source/600x600bb.jpg"
    },
    {
      
      "released": "05.08.1966",
      "album": "Revolver",
      "cover": "https://is1-ssl.mzstatic.com/image/thumb/Music/v4/b3/db/c7/b3dbc75f-4146-3556-ffce-4b679b3aca7e/source/600x600bb.jpg"
    },
    {
      
      "released": "01.06.1967",
      "album": "Sgt. Pepper’s Lonely Hearts Club Band",
      "cover": "https://is5-ssl.mzstatic.com/image/thumb/Music/v4/8c/2a/05/8c2a0589-3e7b-c207-64ea-17643bac5e97/source/600x600bb.jpg"
    },
    {
      
      "released": "27.11.1967",
      "album": "Magical Mystery Tour",
      "cover": "https://is4-ssl.mzstatic.com/image/thumb/Music/v4/33/d3/2e/33d32ef8-61d5-1785-d27b-fd3ab8ae7438/source/600x600bb.jpg"
    },
    {
      
      "released": "22.11.1968",
      "album": "The Beatles",
      "cover": "https://is1-ssl.mzstatic.com/image/thumb/Music/v4/9d/39/13/9d39136a-7ede-758e-b6bd-86dbafc3d454/source/600x600bb.jpg"
    },
    {
      
      "released": "17.01.1969",
      "album": "Yellow Submarine",
      "cover": "https://is2-ssl.mzstatic.com/image/thumb/Music/v4/d5/d0/7b/d5d07b72-f45e-cc17-f56b-962177368344/source/600x600bb.jpg"
    },
    {
      
      "released": "26.09.1969",
      "album": "Abbey Road",
      "cover": "https://is2-ssl.mzstatic.com/image/thumb/Music/v4/40/d0/29/40d029b5-4c32-53d2-69d1-ea04a513c345/source/600x600bb.jpg"
    },
    {
      
      "released": "08.05.1970",
      "album": "Let It Be",
      "cover": "https://is4-ssl.mzstatic.com/image/thumb/Music/v4/ff/8d/33/ff8d33f4-6c44-aedd-0b6c-2796930bef80/source/600x600bb.jpg"
    }
  ]
}

const bandInfo = `${myFavBand.name} is my favourite band. It had ${myFavBand.members} members and released ${myFavBand.albums.length} albums`
// console.log(
//   classmates.forEach((element) => {
//     console.log(element.name);
//     return element.name === "Alex";
//   })
// );
