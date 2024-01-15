class GeminiExtension {
  constructor() {
    this.apiKey = '';
    this.defaultModel = 'gemini-pro';
  }

  getInfo() {
    return {
      id: 'gemini',
      name: 'Gemini AI',
      blocks: [
	{
          blockType: Scratch.BlockType.LABEL,
          text: '[With Key] Normal'
        },
        {
          opcode: 'setApiKey',
          blockType: Scratch.BlockType.COMMAND,
          text: 'Set API Key to [API_KEY]',
          arguments: {
            API_KEY: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: ''
            }
          }
        },
        {
          opcode: 'requestGemini',
          blockType: Scratch.BlockType.REPORTER,
          text: 'Request Gemini [TEXT]',
          arguments: {
            TEXT: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: 'Write a story about a magic backpack'
            }
          }
        },
        {
          blockType: Scratch.BlockType.LABEL,
          text: '[No Key] Reverse Proxy'
        },
        {
           opcode: 'requestGeminiFromProxy',
           blockType: Scratch.BlockType.REPORTER,
           text: 'Request Gemini [TEXT] from our reverse proxy',
           arguments: {
            TEXT: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: 'Write a story about a magic backpack'
            }
          }
        },
        {
          blockType: Scratch.BlockType.LABEL,
          text: 'Advanced Area'
        },
        {
          opcode: 'requestGeminiJSON',
          blockType: Scratch.BlockType.REPORTER,
          text: 'Request Gemini using JSON [JSON]',
          arguments: {
            JSON: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: '{"contents":[{"parts":[{"text":"Write a story about a magic backpack"}]}]}'
            }
          }
        },
        {
          opcode: 'requestGeminiFromModel',
          blockType: Scratch.BlockType.REPORTER,
          text: 'Request Gemini using JSON [JSON] from model [MODEL]',
          arguments: {
            JSON: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: '{"contents":[{"parts":[{"text":"Write a story about a magic backpack"}]}]}'
            },
            MODEL: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: 'gemini-pro'
            }
          }
        }
      ]
    };
  }

  setApiKey({ API_KEY }) {
    this.apiKey = API_KEY;
  }

  async requestGemini({ TEXT }) {
    return this.makeRequest({ text: TEXT }, this.defaultModel);
  }

  async requestGeminiJSON({ JSON }) {
    return this.makeRequest(JSON, this.defaultModel);
  }

  async requestGeminiFromModel({ JSON, MODEL }) {
    return this.makeRequest(JSON, MODEL);
  }

  async makeRequest(inputText, modelName) {
    if (!this.apiKey) {
      return 'Error: API Key not set';
    }
    
    const requestPayload = {
      contents: [
        {
          parts: [
            {
              text: inputText
            }
          ]
        }
      ]
    };

    const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${this.apiKey}`;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestPayload)
      });

      if (!response.ok) {
        throw new Error(`Gemini API Error: ${response.status} - ${response.statusText}`);
	console.log(response);
      }

      const responseData = await response.json();
      return responseData.candidates[0].content.parts[0].text;
    } catch (error) {
      console.error('Gemini API Error:', error.message);
      return 'Error: API Key not valid';
    }
  }
  async requestGeminiFromProxy({ TEXT }) {

    const requestPayload = {
        text: TEXT
    };

    const url = 'https://api.rubyteam.tech/generateContent';

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestPayload)
      });

      if (!response.ok) {
        throw new Error(`Gemini Proxy Error: ${response.status} - ${response.statusText}`);
      }

      const responseData = await response.json();
      return responseData.candidates[0].content.parts[0].text;
    } catch (error) {
      console.error('Gemini Proxy Error:', error.message);
      return 'Error: Request to proxy failed';
    }
  }
}

Scratch.extensions.register(new GeminiExtension());
