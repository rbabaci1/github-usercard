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
getPromise.then((r) => console.log(r.data));

/* Step 4: Pass the data received from Github into your function, 
   create a new component and add it to the DOM as a child of .cards
*/

/* Step 5: Now that you have your own card getting added to the DOM, either 
          follow this link in your browser https://api.github.com/users/<Your github name>/followers 
          , manually find some other users' github handles, or use the list found 
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.
          
          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/

const followersArray = [];

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
let object = {
    login: "rbabaci1",
    id: 44828927,
    node_id: "MDQ6VXNlcjQ0ODI4OTI3",
    avatar_url: "https://avatars2.githubusercontent.com/u/44828927?v=4",
    gravatar_id: "",
    url: "https://api.github.com/users/rbabaci1",
    html_url: "https://github.com/rbabaci1",
    followers_url: "https://api.github.com/users/rbabaci1/followers",
    following_url: "https://api.github.com/users/rbabaci1/following{/other_user}",
    gists_url: "https://api.github.com/users/rbabaci1/gists{/gist_id}",
    starred_url: "https://api.github.com/users/rbabaci1/starred{/owner}{/repo}",
    subscriptions_url: "https://api.github.com/users/rbabaci1/subscriptions",
    organizations_url: "https://api.github.com/users/rbabaci1/orgs",
    repos_url: "https://api.github.com/users/rbabaci1/repos",
    events_url: "https://api.github.com/users/rbabaci1/events{/privacy}",
    received_events_url: "https://api.github.com/users/rbabaci1/received_events",
    type: "User",
    site_admin: false,
    name: "Rabah Babaci",
    company: null,
    blog: "rabah.live",
    location: "San Francisco",
    email: null,
    hireable: true,
    bio: "Hard-working immigrant, passionate about writing code and making things work. I'm currently a student @LambdaSchool.",
    public_repos: 28,
    public_gists: 0,
    followers: 3,
    following: 5,
    created_at: "2018-11-07T06:12:41Z",
    updated_at: "2020-01-23T03:11:15Z"
}

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
  userPageLink.textContent = 'Profile:';
  link.href = dataObj.html_url;
  link.textContent = 'address to users github page';
  followers.textContent = `Followers: ${dataObj.followers}`;
  following.textContent = `Following: ${dataObj.following}`;
  bio.textContent = `Bio: ${dataObj.bio}`;

  userPageLink.append(link);
  cardInfo.append(heading, userName, location, userPageLink, followers, following, bio);
  card.append(image, cardInfo);
  
  console.log(card);

  return card;
}
createCard(object)
/* List of LS Instructors Github username's: 
  tetondan
  dustinmyers
  justsml
  luishrd
  bigknell
*/
