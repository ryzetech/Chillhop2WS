# Chillhop2WS | Tampermonkey + WebSocket = :red_circle: :hearts: :musical_note:
A userscript for Tampermonkey connecting Chillhop to a local WebSocket server (+ WebSocket Server!) 🎉  
I wrote it for OBS users wanting to display the current song playing in their chillhop.com window without any form of window capture.

## 🔧 Install
### 📜 Script Setup
1. Install [Tampermonkey](https://www.tampermonkey.net/) for your preferred browser
2. Install the script by clicking on [https://github.com/ryzetech/Chillhop2WS/raw/main/Chillhop2WS.user.js](https://github.com/ryzetech/Chillhop2WS/raw/main/Chillhop2WS.user.js)

### 💻 WebSocket Server Setup
1. (If you haven't done this already) Install [Node.js](https://nodejs.org/) **Choose the LTS option (recommended for most users)!**
2. Download the contents of [the server folder](https://github.com/ryzetech/Chillhop2WS/tree/main/server) and put them in the same folder (the name doesn't matter, but call it `server` just to be sure 😉)
3. Open a terminal in said folder (Windows: Right Click, "Open in Terminal") or cd into that folder
4. Run `npm i` to set up everything you need. npm should come with your node installation!
5. Run `node server.js`. You shoud get some info if everything worked.

## ❓ How to use it
The WebSocket server will save two files in the folder: `title.txt` and `artist.txt`. You can use OBS text sources to read from that files and show them on stream. All you have to do is to add the source and specify in the properites to read from that text file.

## 💸 Does this cost me anything?
Nope! The stuff here is absolutely free to use and to tamper with! Please be aware of the **GNU GPLv3** when doing so.  
**Optional:** If you want to, you can link this project in a panel on Twitch or share it an another way. Thank you for everything, it helps me a lot! 💙

## ⚠ Errors? Problems? Questions?
Open an issue [here](https://github.com/ryzetech/Chillhop2WS/issues). Try to describe your problem as accurately as possible and include screenshots if needed. If you want to improve something, make a pull request. I am open to changes! 😃

## 👨‍💻 For the devs
You can also run your own WebSocket server. The script tries to connect to port `4001` and sends the data as a JSON object in the following format:
```json
  {
    "title":  "string" 
    "artist": "string"
  }
```
When nothing is played, the script will leave both fields as empty strings.
