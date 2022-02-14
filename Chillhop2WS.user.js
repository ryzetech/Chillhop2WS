// ==UserScript==
// @name         Chillhop2WebSocket
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  Takes the current song playing on chillhop.com and sends it to a local WebSocket Server
// @author       ryzetech
// @match        https://chillhop.com/user/*
// @icon         https://www.google.com/s2/favicons?domain=chillhop.com
// @grant        none
// @connect      github.com
// @updateURL    https://github.com/ryzetech/Chillhop2WS/raw/main/Chillhop2WS.user.js
// ==/UserScript==

/*
    I built this live on https://twitch.com/ryzetech
    Check me out for coding, games and funny talks in English and German!
    This script contains just a bit gay.
*/


(function() {
    'use strict';

    // haha sock
    let socket = new WebSocket("ws://localhost:4001/");

    // yeet yourself if you can't reach the server within one second
    setTimeout(function() {
        if (socket.readyState !== 1) {
            alert("Connection to WebSocket Server could not be made");
        } else {
            // if you actually made it, send a clean packet to clear the files
            socket.send(JSON.stringify({"title": "", "artist": ""}));
        }
    }, 1000);

    // close event (just in case)
    socket.onclose = function(event) {
        if (event.wasClean) {
            alert(`[CLOSE] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
        } else {
            alert('[CLOSE] Connection died');
        }
    };

    // init control vars
    var title, artist, isPlaying = false;

    // set up the elements to get song name and artist from
    const elemTitle = document.getElementsByClassName("jp-title")[0];
    const elemArtists = document.getElementsByClassName("jp-artists")[0].children;

    // do this every second
    var getter = setInterval(function() {
        // might aswell kill this if we don't need it
        if (socket.readyState !== 1) {
            clearInterval(getter);
        }
        // build a string where every artist is added
        let artistString = "";

        // elemArtists is an array with links to artists, we have to extract some stuff
        for (let el of elemArtists) {
            if (artistString.length === 0) {
                artistString += el.innerHTML;
            } else {
                artistString += (", " + el.innerHTML);
            }
        }

        // check if the window isn't playing anything
        if (!window.isPlaying) {
            // if that isn't noted yet
            if (isPlaying) {
                // send a clear packet and note it
                socket.send(JSON.stringify({"title": "", "artist": ""}));
                isPlaying = false;
            }
        // if the window is playing again or if the data changed, send a new packet
        } else if (!isPlaying || elemTitle.innerHTML !== title || artistString !== artist) {
            // note everything, just in case
            isPlaying = true;
            title = elemTitle.innerHTML;
            artist = artistString;
            // send everything to the server
            socket.send(JSON.stringify({"title": title, "artist": artist}));
        }
    }, 1000);
})();
