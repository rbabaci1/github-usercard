
function getUserData(username) {
  return axios.get(`https://api.github.com/users/${username}`)
          .then(response => response.data)
          .catch(error => console.error(error));
}

function getFollowersData(username) {
  return axios.get(`https://api.github.com/users/${username}/followers`)
          .then(response => response.data)
          .catch(error => console.error(error));
}

let cards = document.querySelector('.cards');

let inputDiv = document.createElement('div');
let input = document.createElement('input');
let submitBtn = document.createElement('button');
let heading = document.createElement('h1');

inputDiv.classList.add('input-container');
input.classList.add('input');
submitBtn.classList.add('submit-btn');
heading.classList.add('input-heading');

submitBtn.textContent = 'Submit';
heading.textContent = '👇🏼 Insert your GitHub username 👇🏼'

inputDiv.append(input, submitBtn);

const container = document.querySelector('.container');
container.insertBefore(inputDiv, cards);
container.insertBefore(heading, inputDiv);

submitBtn.addEventListener('click', () => {
  let inputValue = input.value;

  getUserData(inputValue)
    .then(userData => {
      cards.append( createCard(userData));
    })
    .catch(error => console.error(error));

  input.value = '';
});
  


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