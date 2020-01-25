// get user data function
function getUserData(username) {
  return axios.get(`https://api.github.com/users/${username}`)
          .then(response => response.data)
          .catch(error => console.error(error));
}
// get user followers data function
function getFollowersData(username) {
  return axios.get(`https://api.github.com/users/${username}/followers`)
          .then(response => response.data)
          .catch(error => console.error(error));
}

let cards = document.querySelector('.cards');

let inputDiv = document.createElement('div');
let input = document.createElement('input');
let submitBtn = document.createElement('button');
let followersBtn = document.createElement('button');
let heading = document.createElement('h1');

inputDiv.classList.add('input-container');
input.classList.add('input');
submitBtn.classList.add('submit-btn');
followersBtn.classList.add('followers-btn');
heading.classList.add('input-heading');

submitBtn.textContent = 'Show my profile';
followersBtn.textContent = 'Show my Followers';
heading.textContent = '👇🏼 Enter your GitHub username 👇🏼'

inputDiv.append(input, submitBtn);

const container = document.querySelector('.container');
container.insertBefore(inputDiv, cards);
container.insertBefore(heading, inputDiv);

let inputVal = '';
let clickCount = 0;

submitBtn.addEventListener('click', (event) => {
  let inputValue = input.value;
  inputVal = input.value;

  getUserData(inputValue)
    .then(userData => {
      cards.append( createCard(userData));
      cards.append(followersBtn);

      let cardsCount = document.querySelectorAll('.card').length;
      let card = document.querySelector('.card');
      if (cardsCount > 1) {
        cards.removeChild(card);
      }
    })
    .catch(error => console.error(error));

  input.value = '';
  event.stopPropagation();
});

// display user followers on click
let followersDiv = document.createElement('div');
followersDiv.classList.add('followers-div');

followersBtn.addEventListener('click', (event) => {
  getFollowersData(inputVal)
    .then(data => {
      data.forEach(follower => {
        getUserData(follower.login)
          .then(followerData => {
            followersDiv.append( createCard(followerData));
          })
          .catch(error => console.error(error));
      })
    })
    .catch(error => console.error(error));
  
  cards.append(followersDiv);
  event.stopPropagation();
});

// card component creation function
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