
Kanji flashcard app 
-------------------

**Learn you a kanji for great good!**  
Learn some commonly used kanji characters and have fun with this simple flashcard game for ios.  

### About the data
App uses lists of [Jōyō kaji](https://en.wikipedia.org/wiki/J%C5%8Dy%C5%8D_kanji).  
List of jōyō kanji taken from https://en.wikipedia.org/wiki/List_of_j%C5%8Dy%C5%8D_kanji  
Grade 07 and up means that it is taught in secondary school.  
Secondary school characters are split into 5 sections.  

### About the source code
Project uses [SwiftyJSON](https://github.com/SwiftyJSON/SwiftyJSON). Install it with [Carthage](https://github.com/Carthage/Carthage).  

### Notes
Inspect core data:  
```bash

# Navigate to correct sqlite file - somewhere in 
$ cd ~/Library/Developer/CoreSimulator/Devices/

# Searching for it can be a bit tedious
$ find . -name LearnYouKanji
$ find . -name "*.sqlite"

# Use sqlite command line manager 
$ sqlite3 LearnYouKanji.sqlite

# output table to inspect
$ sqlite3 LearnYouKanji.sqlite "SELECT * FROM ZQUESTION ;" > output.txt
```

### Important  
(Info.plist)  
App Transport Security is good for your users. Make sure to re-enable it prior to releasing your app for production.  

### Troubleshooting  
podfile:  
develop from ios xcworkspace. Not xcodeproj.  
react-navigation:  
Add `RCTLinkingIOS` to podfile ?  
update node (6 -> 8) ?  
clean npm:  
`rm -rf node_modules && npm install`
`watchman watch-del-all`
`node_modules/react-native/packager/packager.sh --reset-cache`


<img src="https://github.com/JamieRobertson/learn-you-kanji/blob/master/screenshots/github/lyk-screenshot-1.png" width="320" height="480" />
&nbsp;
<img src="https://github.com/JamieRobertson/learn-you-kanji/blob/master/screenshots/github/lyk-screenshot-2.png" width="320" height="480" />
<br style="clear: both;">

<img src="https://github.com/JamieRobertson/learn-you-kanji/blob/master/screenshots/github/lyk-screenshot-3.png" width="320" height="480" />
&nbsp;
<img src="https://github.com/JamieRobertson/learn-you-kanji/blob/master/screenshots/github/lyk-screenshot-4.png" width="320" height="480" />
