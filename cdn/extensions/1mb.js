class ShortenerExtension {
  getInfo() {
    return {
      id: '1mbshortener',
      name: '1MB Shortener',
      color1: '#3467eb',
      color2: '#3467eb',
      color3: '#3467eb',
      blocks: [
        {
          opcode: 'shortenURL',
          blockType: Scratch.BlockType.REPORTER,
          text: 'Shorten URL of [URL] with short code [shortCode]',
          arguments: {
            URL: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: 'https://example.com/'
            },
            shortCode: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: 'example'
            }
          }
        },
        {
          opcode: 'shortenRandomURL',
          blockType: Scratch.BlockType.REPORTER,
          text: 'Shorten URL of [URL] with random code',
          arguments: {
            URL: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: 'https://example.com/'
            }
          }
        }
      ]
    };
  }

  async shortenURL(args) {
    const longURL = args.URL;
    const shortCode = args.shortCode;

    const apiURL = 'https://1mb.tech/api/shorten';
    const requestData = {
      long: longURL,
      short: shortCode
    };

    try {
      const response = await fetch(apiURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
      });

      const result = await response.json();

      if (response.ok) {
        return result.shortURL;
      } else {
        throw new Error(result.error || 'Unknown error');
      }
    } catch (error) {
      throw new Error('Failed to shorten URL: ' + error.message);
    }
  }

  async shortenRandomURL(args) {
    const longURL = args.URL;

    const apiURL = 'https://1mb.tech/api/shorten';
    const requestData = {
      long: longURL
    };

    try {
      const response = await fetch(apiURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
      });

      const result = await response.json();

      if (response.ok) {
        return result.shortURL;
      } else {
        throw new Error(result.error || 'Unknown error');
      }
    } catch (error) {
      throw new Error('Failed to shorten URL: ' + error.message);
    }
  }
}

Scratch.extensions.register(new ShortenerExtension());
