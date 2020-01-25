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
let topH1 = document.createElement('h1');
let mainUser = document.createElement('div');

inputDiv.classList.add('input-container');
input.classList.add('input');
submitBtn.classList.add('submit-btn');
followersBtn.classList.add('followers-btn');
topH1.classList.add('input-heading');
mainUser.classList.add('main');

input.type = 'text';
input.placeholder = 'here...';
submitBtn.textContent = 'Show my profile';
followersBtn.textContent = 'Show Followers';
topH1.textContent = 'Enter your GitHub username 👇🏼'

inputDiv.append(input, submitBtn);

let middleH1 = document.createElement('h1');
middleH1.textContent = 'Followers...';
middleH1.classList.add('followers-h1');

const container = document.querySelector('.container');
container.insertBefore(inputDiv, cards);
container.insertBefore(topH1, inputDiv);
container.insertBefore(mainUser, cards);

// it's declared globally so getFollowersData will have access to the input value
let inputToGetFollowers = '';
// display user followers on click
submitBtn.addEventListener('click', (event) => {
  let inputValue = input.value;
  inputToGetFollowers = input.value;

  inputDiv.append(followersBtn);
  container.insertBefore(middleH1, cards);

  // send a get request with the function
  getUserData(inputValue)
    // if promise resolved, then used the returned data
    .then(userData => {
      mainUser.append(createCard(userData));

      let mainCards = document.querySelectorAll('.main .card');
      let mainFirstCard = document.querySelector('.main .card');
      if (mainCards.length > 1) {
        mainUser.removeChild(mainFirstCard);
      }
    })
    .catch(error => console.error(error));

  input.value = '';
  event.stopPropagation();
});

// display user followers on click
followersBtn.addEventListener('click', (event) => {
  let followersDiv = document.createElement('div');
  followersDiv.classList.add('followers-div');

  getFollowersData(inputToGetFollowers)
    .then(data => {
      // create a card for each follower
      data.forEach(follower => {
        // send a get request with the function
        getUserData(follower.login)
        // if promise resolved, then used the returned data
          .then(followerData => {
            followersDiv.append( createCard(followerData));
          })
          .catch(error => console.error(error));
      })
    })
    .catch(error => console.error(error));

  cards.append(followersDiv);
  
  if (cards.children.length > 1) {
    cards.removeChild(cards.firstChild);
  }
  
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