class GofileUploader {
  getInfo() {
    return {
      id: 'gofileuploader',
      name: 'Gofile Uploader',
      blocks: [
        {
          opcode: 'getBestServer',
          blockType: Scratch.BlockType.REPORTER,
          text: 'Get Best Gofile Server'
        },
        {
          opcode: 'uploadFile',
          blockType: Scratch.BlockType.REPORTER,
          text: 'Upload File to Gofile [data] [filename] and get the url',
          arguments: {
            data: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: 'Hello, Gofile!',
            },
            filename: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: 'uploadedFile.txt',
            }
          }
        }
      ]
    };
  }

  getBestServer() {
    return new Promise(resolve => {
      fetch('https://api.gofile.io/getServer')
        .then(response => response.json())
        .then(data => {
          if (data.status === 'ok') {
            resolve(data.data.server);
          } else {
            resolve(null);
          }
        })
        .catch(error => {
          console.error(error);
          resolve(null);
        });
    });
  }

  uploadFile(args) {
    const { data, filename } = args;
    const formData = new FormData();
    const blob = new Blob([data], { type: 'text/plain' });
    formData.append('file', blob, filename);

    return new Promise(resolve => {
      this.getBestServer().then(bestServer => {
        if (bestServer) {
          const uploadURL = `https://${bestServer}.gofile.io/uploadFile`;

          fetch(uploadURL, {
            method: 'POST',
            body: formData,
          })
            .then(response => response.json())
            .then(data => {
              if (data.status === 'ok') {
                const directDownloadLink = `${data.data.downloadPage}`;
                resolve(directDownloadLink);
              } else {
                resolve(null);
              }
            })
            .catch(error => {
              console.error(error);
              resolve(null);
            });
        } else {
          resolve(null);
        }
      });
    });
  }
}

Scratch.extensions.register(new GofileUploader());
