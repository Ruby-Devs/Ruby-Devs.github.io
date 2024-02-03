(function(Scratch) {
  "use strict";
  if (!Scratch.extensions.unsandboxed) {
    throw new Error("Ruby Maps must run unsandboxed!")
  } // no need to return, throw new error stops this

  var leafletScript = document.createElement('script');
  leafletScript.src = 'https://unpkg.com/leaflet/dist/leaflet.js';
  leafletScript.onload = function() {
    console.log('Leaflet script loaded');
    prepare();
  };
  document.head.appendChild(leafletScript);

  var leafletStylesheet = document.createElement('link');
  leafletStylesheet.rel = 'stylesheet';
  leafletStylesheet.href = 'https://unpkg.com/leaflet/dist/leaflet.css';
  leafletStylesheet.onload = function() {
    console.log('Leaflet stylesheet loaded');
  }
  document.head.appendChild(leafletStylesheet);

  var map = null;
  var mapClosedPromise = null;
  var markerGroup = null;
  var clickedCoordinates = [];

  let skin = "OpenStreetMap";

  let onWin = true;

  var canUseDarkMode = true;

  class MapExt {
    getInfo() {
      return {
        id: 'rubymaps',
        name: 'Ruby Maps',
        color1: '#3ab4c9',
        color2: '#3196a8',
        color3: '#287b8a',
        blocks: [
          {
            opcode: 'displayType',
            blockType: Scratch.BlockType.COMMAND,
            text: 'display map on [TYPE]',
            arguments: {
              TYPE: {
                type: Scratch.ArgumentType.STRING,
                menu: "DISPLAY"
              }
            },
          },
          "---",
          {
            opcode: 'showmap',
            blockType: Scratch.BlockType.COMMAND,
            text: "show map and wait until it's closed",
          },
          {
            opcode: 'showmap_withtitle',
            blockType: Scratch.BlockType.COMMAND,
            text: "show map with title [TITLE] and wait until it's closed",
            arguments: {
              TITLE: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "Please choose a location",
              }
            }
          },
          {
            opcode: 'closeMap',
            blockType: Scratch.BlockType.COMMAND,
            text: "close map",
          },
          '---',
          {
            opcode: 'darkmode',
            blockType: Scratch.BlockType.COMMAND,
            text: 'to map, [SET] dark mode',
            arguments: {
              SET: {
                type: Scratch.ArgumentType.STRING,
                menu: "DARKMODE",
              }
            }
          },
          {
            opcode: 'darkcheck',
            blockType: Scratch.BlockType.BOOLEAN,
            text: 'current layer can use dark mode?',
          },
          '---',
          {
            opcode: 'setMapLayer',
            blockType: Scratch.BlockType.COMMAND,
            text: 'set map layer to [LAYER]',
            hideFromPalette: true,
            arguments: {
              LAYER: {
                type: Scratch.ArgumentType.STRING,
                menu: 'MAPLAYERS',
              },
            },
          },
          {
            opcode: 'setMapLayer',
            blockType: Scratch.BlockType.COMMAND,
            text: 'set map layer to [LAYER]',
            arguments: {
              LAYER: {
                type: Scratch.ArgumentType.STRING,
                menu: 'MAPLAYERS2',
              },
            },
          },
          {
            opcode: 'getMapLayer',
            blockType: Scratch.BlockType.REPORTER,
            text: "current map layer",
          },
          '---',
          {
            opcode: 'setMapCenter',
            blockType: Scratch.BlockType.COMMAND,
            text: 'set map center to lat [LAT] lng [LNG]',
            arguments: {
              LAT: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: -34.603722,
              },
              LNG: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: -58.381592,
              },
            },
          },
          {
            opcode: 'getLatestRecordedCoords',
            blockType: Scratch.BlockType.REPORTER,
            text: "latest coordinates the user selected",
          },
          {
            opcode: 'getAllRecordedCoords',
            blockType: Scratch.BlockType.REPORTER,
            text: "all coordinates the user selected",
          },
          {
            opcode: 'getMapCenter',
            blockType: Scratch.BlockType.REPORTER,
            text: 'get map center',
          },
          {
            opcode: 'resetRecordedCoords',
            blockType: Scratch.BlockType.COMMAND,
            text: "reset array of user-selected coords",
          },
          '---',
          {
            opcode: 'zoom',
            blockType: Scratch.BlockType.COMMAND,
            text: 'zoom [ZOOM] by [AMOUNT]',
            arguments: {
              ZOOM: {
                type: Scratch.ArgumentType.STRING,
                menu: 'ZOOM',
              },
              AMOUNT: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 1,
              }
            },
          },
          {
            opcode: 'getZoomLevel',
            blockType: Scratch.BlockType.REPORTER,
            text: 'map zoom level',
          },
          {
            opcode: 'resetZoom',
            blockType: Scratch.BlockType.COMMAND,
            text: 'reset map zoom',
          },
          '---',
          {
            opcode: 'addMarker',
            blockType: Scratch.BlockType.COMMAND,
            text: 'add marker at lat [LAT] lng [LNG] with popup [POPUP]',
            arguments: {
              LAT: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 40.71188505937827,
              },
              LNG: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: -74.00628754052013,
              },
              POPUP: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'New York',
              },
            },
          },
          {
            opcode: 'removeAllMarkers',
            blockType: Scratch.BlockType.COMMAND,
            text: 'remove all markers',
          },
          {
            blockType: Scratch.BlockType.LABEL,
            text: 'Nominatim API (very useful)',
          },
          {
            opcode: 'coordslookup',
            blockType: Scratch.BlockType.REPORTER,
            text: 'search place at lat [LAT] lng [LNG]',
            arguments: {
              LAT: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: -37.9977225,
              },
              LNG: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: -57.5482703,
              },
            },
          },
          {
            opcode: 'placelookup',
            blockType: Scratch.BlockType.REPORTER,
            text: 'look up location with name [PLACE]',
            arguments: {
              PLACE: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'Mar del Plata, Partido de General Pueyrredón, Buenos Aires, Argentina', // where i live -gen1x
              }
            },
          },
        ],
        menus: {
          MAPLAYERS: ['OpenStreetMap', 'Google Maps', 'Google Satellite', 'Google Hybrid', 'Dark Matter'], // Note: Needed for Compatibility
          MAPLAYERS2: {
            acceptReporters: true,
            items: ['OpenStreetMap', 'Google Maps', 'Google Satellite', 'Google Hybrid', 'Dark Matter']
          },
          ZOOM: ['in', 'out'],
          DARKMODE: ['add', 'remove'],
          DISPLAY: ["window", "canvas"]
        }
      };
    }

    darkmode(args) {
      if (canUseDarkMode) {
        if (args.SET == "add") {
          const darkModeStylesheet = document.createElement('link');
          darkModeStylesheet.rel = 'stylesheet';
          darkModeStylesheet.href = 'https://ruby-devs.vercel.app/maps/darkmode.css';
          document.head.appendChild(darkModeStylesheet);
        } else {
          const darkModeStylesheet = document.querySelector('link[href="https://ruby-devs.vercel.app/maps/darkmode.css"]');

          if (darkModeStylesheet) {
            darkModeStylesheet.remove();
          }
        }
      }
    }

    darkcheck() { return canUseDarkMode }

    showmap() {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement.mozRequestFullScreen) { // Firefox
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullscreen) { // Chrome, Safari, and Opera
        document.documentElement.webkitRequestFullscreen();
      } else if (document.documentElement.msRequestFullscreen) { // IE/Edge
        document.documentElement.msRequestFullscreen();
      }
      if (!mapClosedPromise) {
        mapClosedPromise = new Promise((resolve) => {
          // Open the modal
          let myMap = document.querySelectorAll(`[class^="mapModal"]`);
          if (myMap.length === 0) return;
          const thisMap = myMap[onWin ? 1 : 0]; // item 0 is the Canvas copy
          thisMap.style.display = 'block';
          thisMap.querySelector('#mapModalTitle').innerText = "Choose a location and click on it:";

          // Resolve the promise when the map is closed
          const closeBtn = thisMap.querySelector('#closeBtn');
          closeBtn.addEventListener('click', () => {
            // Exit fullscreen
            if (document.exitFullscreen) {
              document.exitFullscreen();
            } else if (document.mozCancelFullScreen) { // Firefox
              document.mozCancelFullScreen();
            } else if (document.webkitExitFullscreen) { // Chrome, Safari, and Opera
              document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) { // IE/Edge
              document.msExitFullscreen();
            }
            // Where is the map set in the html. go to line 600
            // Close the modals
            // wdym... not clear, ok
            myMap[0].style.display = 'none';
            myMap[1].style.display = 'none';
            resolve();
            // Reset mapClosedPromise after the map is closed
            mapClosedPromise = null;
          });
        });
      }

      return mapClosedPromise;
    }

    showmap_withtitle(args) {
      const title = args.TITLE; // Get the title from the block argument
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement.mozRequestFullScreen) { // Firefox
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullscreen) { // Chrome, Safari, and Opera
        document.documentElement.webkitRequestFullscreen();
      } else if (document.documentElement.msRequestFullscreen) { // IE/Edge
        document.documentElement.msRequestFullscreen();
      }

      if (!mapClosedPromise) {
        mapClosedPromise = new Promise((resolve) => {
          // Open the modal
          let myMap = document.querySelectorAll(`[class^="mapModal"]`);
          if (myMap.length === 0) return;
          const thisMap = myMap[onWin ? 1 : 0]; // item 0 is the Canvas copy
          thisMap.style.display = 'block';
          thisMap.querySelector('#mapModalTitle').innerText = title;

          // Resolve the promise when the map is closed
          const closeBtn = thisMap.querySelector('#closeBtn');
          closeBtn.addEventListener('click', () => {
            // Exit fullscreen
            if (document.exitFullscreen) {
              document.exitFullscreen();
            } else if (document.mozCancelFullScreen) { // Firefox
              document.mozCancelFullScreen();
            } else if (document.webkitExitFullscreen) { // Chrome, Safari, and Opera
              document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) { // IE/Edge
              document.msExitFullscreen();
            }

            // Close the modals
            myMap[0].style.display = 'none';
            myMap[1].style.display = 'none';
            resolve();
            // Reset mapClosedPromise after the map is closed
            mapClosedPromise = null;
          });
        });
      }

      return mapClosedPromise;
    }

    closeMap() {
      let myMap = document.querySelectorAll(`[class^="mapModal"]`);
      if (myMap.length === 0) return;
      // I couldve done it by simply hiding the map, but it would break the promise, so its easier to do this:
      myMap[0].querySelector('#closeBtn').click();
      myMap[1].querySelector('#closeBtn').click();
    }
    
    setMapLayer(args) {
      skin = args.LAYER;
      const layerType = args.LAYER;
      let myMap = document.querySelectorAll(`[class^="mapModal"]`);
      if (myMap.length === 0) return;
      const thisMap = myMap[onWin ? 1 : 0].querySelector('#map');

      switch (layerType) {
        case 'OpenStreetMap':
          canUseDarkMode = true;
          setTileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', 'osm.streets', '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors', thisMap);
          break;

        case 'Google Hybrid':
          canUseDarkMode = false;
          setTileLayer('https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}', 'google.hybrid', '&copy; <a href="https://maps.google.com/" target="_blank">Google Maps</a>', thisMap);
          break;

        case 'Google Satellite':
          canUseDarkMode = false;
          setTileLayer('https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', 'google.satellite', '&copy; <a href="https://maps.google.com/" target="_blank">Google Maps</a>', thisMap);
          break;

        case 'Google Maps':
          canUseDarkMode = true;
          setTileLayer('https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', 'google.maps', '&copy; <a href="https://maps.google.com/" target="_blank">Google Maps</a>', thisMap);
          break;

        case 'Dark Matter':
          canUseDarkMode = false;
          setTileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', 'dark.matter', '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions" target="_blank">CARTO</a>', thisMap);
          break;

        default: break;
      }

      function setTileLayer(url, id, attribution, target) {
        if (target.map) {
          target.map.eachLayer((layer) => {
            if (layer instanceof L.TileLayer) {
              target.map.removeLayer(layer);
            }
          });

          L.tileLayer(url, {
            minZoom: 2,
            maxZoom: 19,
            id: id,
            attribution: attribution,
          }).addTo(target.map);
        }

        if (!canUseDarkMode) {
          const darkModeStylesheet = document.querySelector('link[href="https://ruby-devs.vercel.app/maps/darkmode.css"]');

          if (darkModeStylesheet) {
            darkModeStylesheet.remove();
          }
        }
      }
    }

    zoom(args) {
      if (map) {
        const currentZoom = map.getZoom();
        if (args.ZOOM == 'in') map.setZoom(currentZoom + args.AMOUNT);
        else map.setZoom(currentZoom - args.AMOUNT);
      }
    }

    getZoomLevel() {
      if (map) {
        return map.getZoom();
      }
      return 13; // Default value if the map is not initialized
    }

    resetZoom() {
      if (map) {
        map.setZoom(13); // Set the default zoom level, adjust as needed
      }
    }

    getMapCenter() {
      if (map) {
        const center = map.getCenter();
        return JSON.stringify({ lat: center.lat, lng: center.lng });
      }
      return JSON.stringify({ lat: 0, lng: 0 }); // Default values if the map is not initialized
    }

    setMapCenter(args) {
      const lat = args.LAT;
      const lng = args.LNG;

      if (map) {
        map.setView([lat, lng]);
      }
    }

    addMarker(args) {
      const lat = args.LAT;
      const lng = args.LNG;
      const popupContent = args.POPUP;

      if (!markerGroup) markerGroup = L.layerGroup().addTo(map);

      console.log('Adding marker:', lat, lng, popupContent);

      const marker = L.marker([lat, lng]).addTo(markerGroup);

      if (popupContent) {
        console.log('Adding popup:', popupContent);
        const popup = L.popup({ autoPan: false })
          .setContent(popupContent)
          .setLatLng([lat, lng])
          .addTo(map);
      }
    }

    /*userMarker(args) {
      const lat = userCoords[0];
        nst lng = userCoords[1];
      const popupContent = args.POPUP;

      if (!markerGroup) {
        markerGroup = L.layerGroup().addTo(map);
      }

      console.log('Adding marker:', lat, lng, popupContent);

        nst marker = L.marker([lat, lng]).addTo(markerGroup);

          popupContent) {
          nsole.log('Adding popup:', popupContent);
        const popup = L.popup({ autoPan: false })
          .setContent(popupContent)
          .setLatLng([lat, lng])
          .addTo(map);
      }
    }*/

    removeAllMarkers() {
      if (markerGroup) markerGroup.clearLayers();
    }

    getLatestRecordedCoords() {
      if (clickedCoordinates.length > 0) {
        const latestCoords = clickedCoordinates[clickedCoordinates.length - 1];
        return JSON.stringify([latestCoords.lat, latestCoords.lng]);
      }
      return JSON.stringify([0, 0]); // Default values if no coordinates recorded
    }

    getAllRecordedCoords() { return JSON.stringify(clickedCoordinates) }

    resetRecordedCoords() { clickedCoordinates = [] }

    coordslookup(args) {
      return fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${args.LAT}&lon=${args.LNG}`)
        .then(response => response.json())
        .then(data => {
          return JSON.stringify(data);
        })
        .catch(error => {
          console.error('Error fetching location data: ', error)
          return JSON.stringify({})
        });
    }

    placelookup(args) {
      const placeName = args.PLACE;

      return fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(placeName)}`)
        .then(response => response.json())
        .then(data => {
          return JSON.stringify(data);
        })
        .catch(error => {
          console.error('Error fetching location data:', error);
          return JSON.stringify({});
        });
    }

    displayType(args) { onWin = args.TYPE === "window" }
    getMapLayer() { return skin }
  }

  function prepare() {
    const mapModal = document.createElement('div');
    mapModal.id = 'mapModal';
    mapModal.classList.add('mapModal');
    mapModal.style.pointerEvents = "auto";
    mapModal.style.display = 'none';
    mapModal.style.position = 'fixed';
    mapModal.style.top = "0%";
    mapModal.style.left = "0%";
    mapModal.style.width = '100%';
    mapModal.style.height = '100%';
    mapModal.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    mapModal.style.zIndex = '999';

    const mapContainer = document.createElement('div');
    mapContainer.id = 'map';
    mapContainer.style.width = '75%';
    mapContainer.style.height = '75%';
    mapContainer.style.position = 'absolute';
    mapContainer.style.top = '50%';
    mapContainer.style.left = '50%';
    mapContainer.style.transform = 'translate(-50%, -50%)'; // Center the map container
    mapContainer.style.backgroundColor = '#ffffff';
    mapContainer.style.borderRadius = '14px';
    mapContainer.style.border = "solid";
    mapContainer.style.borderColor = "#3196a8";
    mapContainer.style.borderWidth = "4px";
    mapModal.appendChild(mapContainer);

    // Title Element
    const titleElement = document.createElement('div');
    titleElement.id = 'mapModalTitle';
    titleElement.style.color = '#ffffff'; // Set title color
    titleElement.style.fontSize = '24px'; // Set title font size
    titleElement.style.marginTop = '10px'; // Adjust title margin
    titleElement.style.textAlign = 'center';
    mapModal.appendChild(titleElement);

    const closeBtn = document.createElement('img');
    closeBtn.id = 'closeBtn';
    closeBtn.src = 'https://i.ibb.co/cXW4Zwq/X-1.png';
    closeBtn.style.position = 'absolute';
    closeBtn.style.top = '10px';
    closeBtn.style.right = '10px';
    closeBtn.style.height = '50px';
    closeBtn.style.cursor = 'pointer';
    mapModal.appendChild(closeBtn);

    document.body.appendChild(mapModal);
    const cloneModal = mapModal.cloneNode(true);
    cloneModal.style.top = "-50%";
    cloneModal.style.left = "-50%";
    Scratch.vm.renderer.addOverlay(cloneModal, "scale-centered");

    function initializeMapAndMarker(mapContainer) {
      if (!mapContainer.map) {
        mapContainer.map = L.map(mapContainer).setView([51.505, -0.09], 13);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors'
        }).addTo(mapContainer.map);
        if (!mapContainer.markerGroup) {
          mapContainer.markerGroup = L.layerGroup().addTo(mapContainer.map);
        }
        mapContainer.map.clickedCoordinates = [];
        mapContainer.map.on('click', (e) => handleMapClick(e, mapContainer.map, mapContainer.markerGroup));
      }
    }
    initializeMapAndMarker(mapModal.querySelector('#map'));
    initializeMapAndMarker(cloneModal.querySelector('#map'));
  }

  // Define the handleMapClick function outside of the class
  function handleMapClick(e, map, markerGroup) {
    const { lat, lng } = e.latlng;

    // Use Nominatim API to get the location name
    fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`)
      .then(response => response.json())
      .then(data => {
        const locationName = data.display_name || "Unknown Location";

        map.clickedCoordinates.push({ lat, lng });
        clickedCoordinates.push({lat, lng});
        // Remove previous pins
        if (markerGroup) {
          markerGroup.clearLayers();
        } else {
          markerGroup = L.layerGroup().addTo(map);
        }

        // Create a marker and add it to the map
        const marker = L.marker([lat, lng]).addTo(map);
        marker.bindPopup(locationName).openPopup();

        // Add the marker to the marker group
        markerGroup.addLayer(marker);
      })
      .catch(error => console.error('Error fetching location data:', error));
  }

  Scratch.extensions.register(new MapExt());
})(Scratch);