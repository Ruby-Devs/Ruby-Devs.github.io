let loginData = {};

let couldLogin = false;

class RubyAuthExt {
  constructor(runtime) {
    this.runtime = runtime;
    this.popupWindow = null;
    this.loginPromise = null;
  }

  getInfo() {
    return {
      id: 'rubyauthext',
      name: 'Ruby Auth',
      color1: "#d93434",
      docsURI: "https://gist.github.com/Gen1x-ALT/b59154880385379f08b4c134f7b2b568",
      blocks: [
        {
          blockType: Scratch.BlockType.LABEL,
          text: 'Allow popups in this website.'
        },
        {
          blockType: Scratch.BlockType.LABEL,
          text: 'Works better with a JSON extension.'
        },
        {
          opcode: 'log_in',
          blockType: Scratch.BlockType.COMMAND,
          text: 'try to log in to app name [APP]',
          arguments: {
            APP: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: 'goofy goober, inc'
            },
          }
        },
        '---',
        {
          opcode: 'succeeded',
          blockType: Scratch.BlockType.BOOLEAN,
          text: 'did user log in successfully?',
        },
        {
          opcode: 'getdata',
          blockType: Scratch.BlockType.REPORTER,
          text: 'user data in JSON',
        },
        '---',
        {
          opcode: 'getspecific',
          blockType: Scratch.BlockType.REPORTER,
          text: 'out of user data, get [VALUE]',
          arguments: {
            VALUE: {
              type: Scratch.ArgumentType.STRING,
              menu: 'SPECIFIC_VAL'
            },
          }
        },
      ],
      menus: {
        SPECIFIC_VAL: {
          acceptReporters: false,
          items: ['id', 'username', 'scratchteam', 'history', "joined at", 'profile', "pfp resolutions", "status (WIWO)", "bio (about me)"]
        }
      }
    };
  }


  log_in(args) {
    const url = 'https://ruby-devs.vercel.app/auth/?app=' + encodeURIComponent(args.APP);

    // Open the popup window
    this.popupWindow = window.open(url, '_blank', 'width=800,height=600');

    couldLogin = false;
    loginData = {}

    // Create a promise for login
    this.loginPromise = new Promise((resolve, reject) => {
      // Check if the popup window is closed
      const checkClosed = setInterval(() => {
        if (this.popupWindow.closed) {
          clearInterval(checkClosed);
          couldLogin = false;
          loginData = {}
          reject("no don't close the popup")
        }
      }, 100);

      // Add an event listener for the 'message' event from the popup
      window.addEventListener('message', (event) => {
        // Check if the message is from the popup window
        if (event.source === this.popupWindow) {
          // Handle the message data (you can customize this part based on your requirements)
          loginData = event.data;
          console.log(loginData)
          clearInterval(checkClosed);
          if (event.data) {
            couldLogin = true;
            resolve("logged in yay")
          } else {
            couldLogin = false;
            loginData = {}
            reject("what the hell happened")
          }

          // Close the popup window after processing the message
          this.popupWindow.close();
        }
      });
    });

    return this.loginPromise;
  }

  succeeded() {
    return couldLogin;
  }

  getdata() {
    return JSON.stringify(loginData)
  }

  getspecific(args) {
    if (!loginData) {
      return "undefined";  // or handle the case when loginData is undefined in a way that makes sense for your application
    }

    if (args.VALUE === "joined at" || args.VALUE === "pfp resolutions" || args.VALUE === "status (WIWO)" || args.VALUE === "bio (about me)") {
      // Handle specific cases with unique keys
      if (args.VALUE === "joined at") {
        return loginData.history && loginData.history.joined !== undefined ? loginData.history.joined.toString() : "undefined";
      } else if (args.VALUE === "pfp resolutions") {
        return JSON.stringify(loginData.profile && loginData.profile.images || "undefined");
      } else if (args.VALUE === "status (WIWO)") {
        return loginData.profile && loginData.profile.status !== undefined ? loginData.profile.status.toString() : "undefined";
      } else if (args.VALUE === "bio (about me)") {
        return loginData.profile && loginData.profile.bio !== undefined ? loginData.profile.bio.toString() : "undefined";
      }
    } else {
      // For other cases, check if the key exists in loginData
      const value = loginData[args.VALUE];
      return value !== undefined ? (typeof value === 'string' ? value : JSON.stringify(value)) : "undefined";
    }
  }
}

Scratch.extensions.register(new RubyAuthExt());
