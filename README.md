# Chillhop2WS | Tampermonkey + WebSocket = :red_circle: :hearts: :musical_note:
A userscript for Tampermonkey connecting Chillhop to a local WebSocket server (+ WebSocket Server!) 🎉  
I wrote it for OBS users wanting to display the current song playing in their chillhop.com window without any form of window capture.

## 🔧 Install
### 📜 Script Setup
1. Install [Tampermonkey 🐒](https://www.tampermonkey.net/) for your preferred browser
2. Install the script by clicking on [https://github.com/ryzetech/Chillhop2WS/raw/main/Chillhop2WS.user.js](https://github.com/ryzetech/Chillhop2WS/raw/main/Chillhop2WS.user.js)

### 💻 WebSocket Server Setup
1. (If you haven't done this already) Install [Node.js](https://nodejs.org/) **Choose the LTS option (recommended for most users)!**
2. Download the contents of [the server folder](https://github.com/ryzetech/Chillhop2WS/tree/main/server) and put them in the same folder (the name doesn't matter, but call it `server` just to be sure 😉)
3. Open a terminal in said folder (Windows: Right Click, "Open in Windows Terminal" | I hope Linux and macOS users know how to operate their terminal, if not pls look it up) or cd into that folder
4. Run `npm i` to set up everything you need. **The npm command should come with your Node installation!**
5. Run `node server.js`. You shoud get some info if everything worked. Note that the script only works as long as you have the terminal window open!

## ❓ How to use it
The WebSocket server will save two files in the folder: `title.txt` and `artist.txt`. You can use OBS text sources to read from that files and show them on stream. All you have to do is to add the source and specify in the properites to read from that text file.

## 💸 Does this cost me anything?
Nope! The stuff here is absolutely free to use and to tamper with! 👍 Please be aware of the **GNU GPLv3** license when doing so.  
**Optional:** If you want to, you can link this project in a panel on Twitch or share it in another way. Thank you for everything, it helps me a lot! 💙
  
![Example Panel for Twitch](https://github.com/ryzetech/Chillhop2WS/raw/main/Twitch%20panel%20stuff/chillhopBanner.jpg)  
  linking to `https://github.com/ryzetech/Chillhop2WS/`
(just an example)

## ⚠️ Errors? Problems? Questions?
If you have questions or problems, open an issue [here](https://github.com/ryzetech/Chillhop2WS/issues). Try to describe your problem as accurately as possible and include screenshots if needed. If you want to improve something, make a pull request. I am open to changes! 😃

## 👨‍💻 For the devs
You can also run your own WebSocket server. The script tries to connect to port `4001` and sends the data as a JSON object in the following format:
```json
  {
    "title":  "string" 
    "artist": "string"
  }
```
When nothing is played, the script will leave both fields as empty strings.

## :heart: A final note
I've built most of the code live on [https://twitch.tv/ryzetech](https://twitch.tv/ryzetech). If you want to see more coding stuff, games and relaxed talking, you can visit and follow me there!
