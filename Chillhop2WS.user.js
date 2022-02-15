// ==UserScript==
// @name         Chillhop2WebSocket
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  Takes the current song playing on chillhop.com and sends it to a local WebSocket Server
// @author       ryzetech
// @match        https://chillhop.com/user/*
// @icon         https://www.google.com/s2/favicons?domain=chillhop.com
// @grant        none
// ==/UserScript==

/*
    I built this live on https://twitch.com/ryzetech
    Check me out for coding, games and funny talks in English and German!
    This script contains just a bit gay.
*/

(function() {
    'use strict';

    // ALERT BOX THING

    // insert styles
    const styleStuff = document.createElement('style');
    styleStuff.innerHTML = `
/* message box */
.msgbox {
  padding: 20px;
  color: white;
  margin-bottom: 15px;
  transition: opacity 0.5s;
  border-radius: 20px;
  text-align: center;
}

.msgbox.error { background-color: #F44336; }
.msgbox.success { background-color: #04AA6D; }

/* close button */
.closebtn {
  margin-left: 15px;
  color: white;
  font-weight: bold;
  float: right;
  font-size: 22px;
  line-height: 20px;
  cursor: pointer;
  transition: 0.3s;
}

/* close button hover */
.closebtn:hover {
  color: black;
}`;
    document.head.appendChild(styleStuff);

    // insert alertBox
    function showAB(string, level) {
        let col;
        switch (level) {
            case "error":
            col = "#f44336";
            break;

            case "warn":
            col = "#ff9800";
            break;

            case "success":
            col = "#04aa6d";
            break;

            default:
            col = "#f44336";
        }

        let alertBox = document.createElement("div");
        alertBox.classList.add("msgbox");
        alertBox.style.backgroundColor = col;

        let alertBoxMsg = document.createElement("span");
        alertBoxMsg.innerHTML = string;

        let alertBoxClose = document.createElement("span");
        alertBoxClose.innerHTML = "&times;";
        alertBoxClose.classList.add("closebtn");
        alertBoxClose.onclick = function(){
            let div = this.parentElement;
            div.style.opacity = "0";
            setTimeout(function() {
                div.style.display = "none";
                div.style.opacity = "1";
            }, 500);
        }

        alertBox.appendChild(alertBoxMsg);
        alertBox.appendChild(alertBoxClose);

        document.getElementsByClassName("overlay-messages")[0].appendChild(alertBox);
    }

    // note if the connection failed from the start of the script
    let wsfailed = false;

    // haha sock
    let socket = new WebSocket("ws://localhost:4001/");

    // yeet yourself if you can't reach the server within one second
    setTimeout(function() {
        if (socket.readyState !== 1) {
            // alert("Connection to WebSocket Server could not be made");
            showAB("Connection to WebSocket Server could not be made", "warn");
            wsfailed = true;
        } else {
            // if you actually made it, send a clean packet to clear the files
            showAB("Connection established!", "success");
            socket.send(JSON.stringify({"title": "", "artist": ""}));
        }
    }, 1000);

    // close event (just in case)
    socket.onclose = function(event) {
        if (!event.wasClean && !wsfailed) {
            showAB('[CLOSE] Connection died', "error");
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
