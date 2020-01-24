/* Step 1: using axios, send a GET request to the following URL 
   (replacing the palceholder with your Github name):
   https://api.github.com/users/<your name>
*/
const getPromise = axios.get('https://api.github.com/users/rbabaci1');

/* Step 2: Inspect and study the data coming back, this is YOUR 
   github info! You will need to understand the structure of this 
   data in order to use it to build your component function 

   Skip to Step 3.
*/
console.log(getPromise);

let cards = document.querySelector('.cards');

getPromise
  .then(response => {
  // Step 4: Pass the data received from Github into your function, 
  // create a new component and add it to the DOM as a child of .cards
  cards.append(createCard(response.data));
    return response.data;
  })  /******   Stretch   *******/
  .then(userData => axios.get(userData.followers_url) )
  .then(followersObj => followersObj.data )
  .then(followersDataArray => followersDataArray.forEach(follower => {
    cards.append(createCard(follower));
  }))
  .catch (error => console.error(error) );

/* Step 3: Create a function that accepts a single object as its only argument,
  Using DOM methods and properties, create a component that will return the following DOM element:

<div class="card">
  <img src={image url of user} />
  <div class="card-info">
    <h3 class="name">{users name}</h3>
    <p class="username">{users user name}</p>
    <p>Location: {users location}</p>
    <p>Profile:  
      <a href={address to users github page}>{address to users github page}</a>
    </p>
    <p>Followers: {users followers count}</p>
    <p>Following: {users following count}</p>
    <p>Bio: {users bio}</p>
  </div>
</div>
*/

function createCard(dataObj) {
  let card = document.createElement('div');
  let image = document.createElement('img');
  let cardInfo = document.createElement('div');
  let heading = document.createElement('h3');

  let userName = document.createElement('p');
  let location = document.createElement('p');
  let link = document.createElement('a');
  let userPageLink = document.createElement('p');
  let followers = document.createElement('p');
  let following = document.createElement('p');
  let bio = document.createElement('p');

  card.classList.add('card');
  cardInfo.classList.add('card-info');
  heading.classList.add('name');
  userName.classList.add('username');

  image.src = dataObj.avatar_url;
  heading.textContent = dataObj.name;
  userName.textContent = dataObj.login;
  location.textContent = `Location: ${dataObj.location}`;
  userPageLink.textContent = 'Profile: ';
  link.href = dataObj.html_url;
  link.textContent = 'address to users github page';
  followers.textContent = `Followers: ${dataObj.followers}`;
  following.textContent = `Following: ${dataObj.following}`;
  bio.textContent = `Bio: ${dataObj.bio}`;

  userPageLink.append(link);
  cardInfo.append(heading, userName, location, userPageLink, followers, following, bio);
  card.append(image, cardInfo);

  return card;
}