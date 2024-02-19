# Privacy
All requests done to our APIs that are not Scratch's will never store your credentials. You can look in the code yourself for more details.

# The service
This can be implemented in basically any web app.

All you need to do is launch a new pop up from your page to ours, like this:
```javascript
const authWindow = window.open('https://ruby-devs.vercel.app/auth/?app=goober', '_blank', 'width=600,height=600');
```

After that, you can something like this to retrieve the data back:
```javascript
window.addEventListener('message', (event) => {
  if (event.origin === "https://ruby-devs.vercel.app/") {
    const stuff = event.data;
    console.log(stuff.username + " has logged in successfully")
  }
});
```
The data our API gives is the user info straight from the Scratch API.
It's something like this (placeholder):
```json
{
    "id": 101401581,
    "username": "G1nX",
    "scratchteam": false,
    "history": {
        "joined": "2022-09-29T01:04:49.000Z"
    },
    "profile": {
        "id": 100404382,
        "images": {
            "90x90": "https://cdn2.scratch.mit.edu/get_image/user/101401581_90x90.png?v=",
            "60x60": "https://cdn2.scratch.mit.edu/get_image/user/101401581_60x60.png?v=",
            "55x55": "https://cdn2.scratch.mit.edu/get_image/user/101401581_55x55.png?v=",
            "50x50": "https://cdn2.scratch.mit.edu/get_image/user/101401581_50x50.png?v=",
            "32x32": "https://cdn2.scratch.mit.edu/get_image/user/101401581_32x32.png?v="
        },
        "status": "Currently on PenguinMod",
        "bio": "Hey\nMoved away from scratch.",
        "country": "Argentina"
    }
}
```
That's all! This API has simplicity in mind, so you won't have to do much in order to incorporate it into your personal projects :)

# The extension
_That's a work in progress. Once it releases, I will include its documentation here._
