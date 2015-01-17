# Twitter Card
Simple module that appends the proper meta tags for your own custom twitter card

# Install
    npm install twitter-card --save-dev

# Usage

    var twitterCard = require('twitter-card.js');
    twitterCard({
       "type" : "summary|summary-large|photo|image|gallery|player",
       "url"  : "https://www.evernote.com"
       "handle" : "@evernote",
       "creator": "@augburto",
       "title" : "Tweet Title",
       "description" : "Description included in tweet"
       "content" : {
            "gallery" : {
                "images" : ["https://www.image.com/1/"] // up to 4 images
            },
            "player"  : {
                "embed"  : "https://www.youtube.com/embed/xtG-JbiH-Gc",
                "image"  : "https://i.ytimg.com/vi/xtG-JbiH-Gc/mqdefault.jpg",
                "width"  :  350,
                "height" :  196
            }
        }
    });

# Notes
* Currently `app` is not supported but hoping to add this soon
* Working on adding support to directly validate twitter-card
* Hoping to remove jQuery as a dependency
