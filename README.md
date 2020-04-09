# liri-node-app

- Github repo: https://github.com/hishamss/liri-node-app.git
- LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a Language Interpretation and Recognition Interface. LIRI will is a command line node app that takes in parameters and gives you back data. LIRI takes in one of the following commands:
- oncert-this (LIRI sends requests using the axios package to Bands in Town in order to get the available events for artist)
- spotify-this-song (LIRI sends requests to Spotify using node-spotify-api packages to get information about song )
- movie-this (LIR sends requests using the axios package to omdbapi to get inforamtion about movie)
- do-what-it-says (LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands)

1. Search the bands in town >> node liri.js concert-this backstreet boys
   ![band in town](/ReadMeImages/step1.jpg)
2. if no band was entered, it will search for "Celine Dion" events
   ![band in town-default](/ReadMeImages/step2.jpg)
3. Search for song information >> node liri.js spotify-this-song physical
   ![search for song](/ReadMeImages/step3.jpg)
4. if no song was entered, it will search for "The Sign" by Ace of Base.
   ![search for song-default](/ReadMeImages/step4.jpg)
5. search for movie information >> node liri.js movie-this the town
   ![search for movie](/ReadMeImages/step5.jpg)
6. if no movie was entered, it will search for Mr. Nobody
   ![search for movie-default](/ReadMeImages/step6.jpg)
7. Take input from random.txt to call one of LIRI's command(spotify-this-song, movie-this, concert-this)

   - Text in random.txt: concert-this,"akon"
   - Liri command to read from random.txt: node liri.js do-what-it-says (this command will search for Akon events)
   - ![take input from random.txt](/ReadMeImages/step7.jpg)

   # Bonus:

   - log the enetered command and the output to log.txt file
     ![log out to log.txt](/ReadMeImages/step8.jpg)
     ![bonus](/ReadMeImages/bonus.gif)
