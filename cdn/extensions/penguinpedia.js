const languages = [
  { text: 'English', value: 'en' },
  { text: 'Simple English', value: 'simple' },
  { text: 'Cebuano', value: 'ceb' },
  { text: 'German', value: 'de' },
  { text: 'Swedish', value: 'sv' },
  { text: 'French', value: 'fr' },
  { text: 'Dutch', value: 'nl' },
  { text: 'Russian', value: 'ru' },
  { text: 'Spanish', value: 'es' },
  { text: 'Italian', value: 'it' },
  { text: 'Polish', value: 'pl' },
  { text: 'Japanese', value: 'ja' },
  { text: 'Chinese', value: 'zh' },
  { text: 'Ukrainian', value: 'uk' },
  { text: 'Vietnamese', value: 'vi' },
  { text: 'Waray', value: 'war' },
  { text: 'Arabic', value: 'ar' },
  { text: 'Portuguese', value: 'pt' },
  { text: 'Persian', value: 'fa' },
  { text: 'Catalan', value: 'ca' },
  { text: 'Serbian', value: 'sr' },
  { text: 'Indonesian', value: 'id' },
  { text: 'Korean', value: 'ko' },
  { text: 'Norwegian', value: 'no' },
  { text: 'Chechen', value: 'ce' }
];

let menu = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACsAAAA5CAMAAACYnSJiAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAABg1BMVEUAAABfWv9fWv9fWv9fWv9fWv9fWv9fWv9fWv9fWv9fWv9fWv9fWv9fWv9fWv9fWv9fWv9fWv9fWv9fWv9fWv9fWv9fWv9fWv9fWv9fWv9fWv9fWv9fWv9fWv9fWv9fWv9fWv9fWv9fWv9fWv9fWv9fWv9fWv9fWv9fWv9fWv9fWv9fWv9fWv9fWv9fWv9fWv9fWv9fWv9fWv9fWv9fWv9fWv9fWv9fWv9fWv9fWv9fWv9fWv9fWv9fWv9fWv9fWv9fWv9fWv9fWv9fWv9fWv9fWv9fWv9fWv9fWv9fWv9fWv9fWv9fWv9fWv9fWv9fWv9fWv9fWv9fWv9fWv9fWv9fWv9fWv9fWv9fWv9fWv9fWv9fWv9fWv9fWv9fWv9fWv9fWv9fWv9fWv9fWv9fWv9fWv9fWv9fWv9fWv9fWv9fWv9fWv9fWv9fWv9fWv9fWv9fWv9fWv9fWv9fWv9fWv9fWv9fWv9fWv9fWv9fWv9fWv9fWv9fWv9fWv9fWv9fWv////+LXef+AAAAf3RSTlMABxgtQ1x1jqe+1OPf08a2kGY7CIT3uGEKge14KXys+O+NSycPAw0fQsnSHcfpIMVW/ncCfWjdQPxI0DTsI4e57lMcnLv6AaqbC/vlrbe9IuRfe8jqDGq1qBUWJhB26DceBhM8dK/zEb8/4S9ZaZi8582yj+IxgEHe9Voak2w+nKd0KgAAAAFiS0dEgGW9nmgAAAAJb0ZGcwAAABYAAAAYAI2+zxEAAAAJdnBBZwAAAF4AAAB9ALnH0zUAAAF+SURBVEjH7dTpOwJRFAbwO9KiRRkRMUKLtSyVsmSLyDqyk6zZ98iuf93zdC5mNJnjs87H9/19uHOXIUQwTJGiWKlSa0q0Or2h1GgqY8uFNTFnfpuKSkvVt63OyIy1hvm0tRzHmetsX1V9Q6PdwThdTc1cC41aFaKVtLXT3O0RpGwHhLZOEfZ0QdwtSr0+SLv8orgH0gARjwriYK8w7IOw/4clRsgHHAgbCkIxiLBkCIphBmGVdIdGEHaU2jDCEjc0Wowdg2Y8grATdBEuhJ2kNoqwJmimMOsNQzONsTPQzGLsXM4hy+4vi7DzUPARhF2AIkYQdjGbLy0jLAv5CpG3UUM2Xo3IW+8afNg6kbUbcMf4TSJn41uJbKYPEUnr296J73qde6H9g+QhRJojIm1z5vgk9yQl7an6jJC89vzi8kqrc1/rb25TFjuRnvx3p2AL9v/aO7ABBL2nrzEtTx8eqX16duZXL/5YKskL3rnV+Op7e5e0ack/CP8Hm5CiHxIRb9f1MAi3AAAAAElFTkSuQmCC"

let icon = "data:image/webp;base64,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"

class PenguinPedia {
  getInfo() {
    return {
      id: 'penguinpedia',
      name: 'PenguinPedia',
      color1: '#3A90C7', // Bright blue
      color2: '#1F5776', // Darker blue
      color3: '#0E3243', // Darkest blue
      menuIconURI: menu,
      blockIconURI: icon,
      blocks: [
        {
          opcode: 'getarticle',
          blockType: Scratch.BlockType.REPORTER,
          text: 'search for [ARTICLE] in [LANGUAGE]',
          arguments: {
            ARTICLE: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: "pizza"
            },
            LANGUAGE: {
              type: Scratch.ArgumentType.STRING,
              menu: 'LANGS'
            }
          }
        },
        {
          opcode: 'getarticlesummary',
          blockType: Scratch.BlockType.REPORTER,
          text: 'summary of [ARTICLE] in [LANGUAGE]',
          arguments: {
            ARTICLE: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: "pizza"
            },
            LANGUAGE: {
              type: Scratch.ArgumentType.STRING,
              menu: 'LANGS'
            }
          }
        },
        {
          opcode: 'getarticleimage',
          blockType: Scratch.BlockType.REPORTER,
          text: 'image URL of [ARTICLE] in [LANGUAGE]',
          arguments: {
            ARTICLE: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: "pizza"
            },
            LANGUAGE: {
              type: Scratch.ArgumentType.STRING,
              menu: 'LANGS'
            }
          }
        },
        '---',
        {
          opcode: 'getpagecount',
          blockType: Scratch.BlockType.REPORTER,
          text: 'number of pages for [ARTICLE] in [LANGUAGE]',
          arguments: {
            ARTICLE: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: "pizza"
            },
            LANGUAGE: {
              type: Scratch.ArgumentType.STRING,
              menu: 'LANGS'
            }
          }
        },
        {
          opcode: 'getlastmodified',
          blockType: Scratch.BlockType.REPORTER,
          text: 'last modification date of [ARTICLE] in [LANGUAGE]',
          arguments: {
            ARTICLE: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: "pizza"
            },
            LANGUAGE: {
              type: Scratch.ArgumentType.STRING,
              menu: 'LANGS'
            }
          }
        },
        {
          opcode: 'getcategories',
          blockType: Scratch.BlockType.REPORTER,
          text: 'categories of [ARTICLE] in [LANGUAGE]',
          arguments: {
            ARTICLE: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: "pizza"
            },
            LANGUAGE: {
              type: Scratch.ArgumentType.STRING,
              menu: 'LANGS'
            }
          }
        },
        "---",
        {
          opcode: 'getreferences',
          blockType: Scratch.BlockType.REPORTER,
          text: 'references of [ARTICLE] in [LANGUAGE]',
          arguments: {
            ARTICLE: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: "pizza"
            },
            LANGUAGE: {
              type: Scratch.ArgumentType.STRING,
              menu: 'LANGS'
            }
          }
        },

      ],
      menus: {
        LANGS: {
          acceptReporters: false,
          items: languages
        }
      }
    };
  }

  getarticle(args) {
    const articleTitle = encodeURIComponent(args.ARTICLE.toLowerCase());
    const lang = args.LANGUAGE;
    const url = `https://${lang}.wikipedia.org/w/api.php?action=query&prop=extracts&format=json&exlimit=1&titles=${articleTitle}&explaintext=1&exsectionformat=plain&origin=*&exsection=0&exintro&redirects=1`;

    return fetch(url)
      .then(response => {
        if (!response.ok) {
          return "Network response was not ok"
        }
        return response.json();
      })
      .then(data => {
        const pages = data.query.pages;
        const pageId = Object.keys(pages)[0];
        const extract = pages[pageId].extract;

        if (!extract) {
          return "Oops! Couldn't find that article...";
        }

        return extract;
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
        return "There was a problem with the fetch operation.";
      });
  }

  getarticlesummary(args) {
    const articleTitle = encodeURIComponent(args.ARTICLE.toLowerCase());
    const lang = args.LANGUAGE;
    const url = `https://${lang}.wikipedia.org/w/api.php?action=query&prop=extracts&format=json&exlimit=1&titles=${articleTitle}&explaintext=1&exsectionformat=plain&origin=*&exsection=0&exintro&redirects=1`;

    return fetch(url)
      .then(response => {
        if (!response.ok) {
          return "Network response was not ok"
        }
        return response.json();
      })
      .then(data => {
        const pages = data.query.pages;
        const pageId = Object.keys(pages)[0];
        const extract = pages[pageId].extract;

        if (!extract) {
          return "Oops! Couldn't find a summary for that article...";
        }

        const summary = extract.slice(0, 200) + (extract.length > 200 ? '...' : '');

        return summary;
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
        return "There was a problem with the fetch operation.";
      });
  }

  getarticleimage(args) {
    const articleTitle = encodeURIComponent(args.ARTICLE.toLowerCase());
    const lang = args.LANGUAGE;
    const url = `https://${lang}.wikipedia.org/w/api.php?action=query&format=json&prop=pageimages&titles=${articleTitle}&origin=*&pithumbsize=450`; // Change pithumbsize to 450

    return fetch(url)
      .then(response => {
        if (!response.ok) {
          return "Network response was not ok";
        }
        return response.json();
      })
      .then(data => {
        const pages = data.query.pages;
        const pageId = Object.keys(pages)[0];
        const thumbnail = pages[pageId].thumbnail;

        if (!thumbnail) {
          return "No image found for this article...";
        }

        // Update the imageURL to the 450px variant
        const imageURL = thumbnail.source.replace(/(\/\d+px-)/, '/450px-');

        return imageURL;
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
        return "There was a problem with the fetch operation.";
      });
  }

  getpagecount(args) {
    const articleTitle = encodeURIComponent(args.ARTICLE.toLowerCase());
    const lang = args.LANGUAGE;
    const url = `https://${lang}.wikipedia.org/w/api.php?action=query&list=search&srsearch=${articleTitle}&utf8=&format=json&origin=*`;

    return fetch(url)
      .then(response => {
        if (!response.ok) {
          return "Network response was not ok"
        }
        return response.json();
      })
      .then(data => {
        const searchInfo = data.query.searchinfo;
        const pageCount = searchInfo.totalhits;
        return pageCount;
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
        return "There was a problem with the fetch operation.";
      });
  }

  getlastmodified(args) {
    const articleTitle = encodeURIComponent(args.ARTICLE.toLowerCase());
    const lang = args.LANGUAGE;
    const url = `https://${lang}.wikipedia.org/w/api.php?action=query&prop=revisions&titles=${articleTitle}&rvprop=timestamp&format=json&origin=*`;

    return fetch(url)
      .then(response => {
        if (!response.ok) {
          return "Network response was not ok"
        }
        return response.json();
      })
      .then(data => {
        const pages = data.query.pages;
        const pageId = Object.keys(pages)[0];
        const timestamp = pages[pageId].revisions[0].timestamp;
        return timestamp;
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
        return "There was a problem with the fetch operation.";
      });
  }

  getcategories(args) {
      const articleTitle = encodeURIComponent(args.ARTICLE.toLowerCase());
      const lang = args.LANGUAGE;
      const url = `https://${lang}.wikipedia.org/w/api.php?action=query&prop=categories&titles=${articleTitle}&format=json&origin=*`;

      return fetch(url)
        .then(response => {
          if (!response.ok) {
            return ["Network response was not ok"];
          }
          return response.json();
        })
        .then(data => {
          const pages = data.query.pages;
          const pageId = Object.keys(pages)[0];
          const categories = pages[pageId].categories.map(category => category.title);

          return JSON.stringify(categories);
        })
        .catch(error => {
          console.error('There was a problem with the fetch operation:', error);
          return ["There was a problem with the fetch operation."];
        });
  }
  
  getreferences(args) {
      const articleTitle = encodeURIComponent(args.ARTICLE.toLowerCase());
      const lang = args.LANGUAGE;
      const url = `https://${lang}.wikipedia.org/w/api.php?action=query&prop=extlinks&titles=${articleTitle}&format=json&origin=*`;

      return fetch(url)
        .then(response => {
          if (!response.ok) {
            return ["Network response was not ok"];
          }
          return response.json();
        })
        .then(data => {
          const pages = data.query.pages;
          const pageId = Object.keys(pages)[0];
          const extlinks = pages[pageId].extlinks.map(link => link['*']);

          return JSON.stringify(extlinks);
        })
        .catch(error => {
          console.error('There was a problem with the fetch operation:', error);
          return ["There was a problem with the fetch operation."];
        });
  }
}

Scratch.extensions.register(new PenguinPedia());
