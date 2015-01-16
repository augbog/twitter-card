// Twitter-Card
// Simple module that appends the proper meta tags for your own custom twitter card

// Dependencies: Requires jQuery

// Usage: 
// var twitterCard = require('twitter-card.js');
// twitterCard({
//    "type" : "gallery",
//    "url"  : "https://www.evernote.com"
//    "handle" : "@evernote",
//    "creator": "@augburto",
//    "title" : "Tweet Title",
//    "description" : "Description included in tweet"
//    "content" : {
//       "gallery" : {
//          "images" : ["https://www.image.com/1/"] // up to 4 images
//       },
//       "player"  : {
//          "embed"  : "https://www.youtube.com/embed/pYUG9xW6wdQ",
//          "image"  : "https://i.ytimg.com/vi/pYUG9xW6wdQ/mqdefault.jpg",
//          "width"  :  350,
//          "height" :  196
//        }
//    }
// });

// Validate your Twitter card at https://cards-dev.twitter.com/validator
// make post request to cards-dev.twitter.com/validator/validate
// if card is null or status != 'Ok', no valid card

module.exports = function(options) {
  // if we have more than one image url... it must be a gallery?
  var template = "";

  var twitterCardMetaTemplate =
  '<meta name="twitter:card" content="__CARD_TYPE__" />' +
  '<meta name="twitter:site" content="__HANDLE__" />' +
  '<meta name="twitter:title" content="__TITLE__">' +
  '<meta name="twitter:description" content="__DESC__">' +
  '<meta name="twitter:url" content="__URL__" />';

  switch(options.type) {
    case 'summary' :
      break;
    case 'summary-large':
      twitterCardMetaTemplate += '<meta name="twitter:creator" content="__CREATOR__" />';
      break;
    case 'photo':
      twitterCardMetaTemplate += '<meta name="twitter:image" content="' + options.images +'">';
      break;
    case 'image':
      twitterCardMetaTemplate += '<meta name="twitter:image" content="' + options.images +'">';
      break;
    case 'gallery':
      twitterCardMetaTemplate += '<meta name="twitter:creator" content="__CREATOR__" />';
      if (options.content.gallery.images.constructor === Array) {
        // twitter gallery only accepts 4 images
        var galleryLength = options.content.gallery.images.length > 4 ? 4 : options.content.gallery.images.length;
        for (var i=0; i < galleryLength; i++) {
          twitterCardMetaTemplate += '<meta name="twitter:image' + i + '" content="' + options.content.gallery.images[i] +'">';
        }
      } else {
        twitterCardMetaTemplate += '<meta name="twitter:image" content="' +options.content.gallery.images +'">';
      }
      break;
    // TODO: add support for app, player, and product twitter cards
    case 'app':
      break;
    case 'player':
      // currently supports youtube
      var playerWidth  = options.content.player.hasOwnProperty('width') ? options.content.player.width : 350;
      var playerHeight  = options.content.player.hasOwnProperty('height') ? options.content.player.height : 195;
      
      twitterCardMetaTemplate +=
      '<meta name="twitter:image:src" content="' + options.content.player.image + '">' +
      '<meta name="twitter:image:width" content="' + playerWidth + '">' +
      '<meta name="twitter:image:height" content="' + playerHeight + '">' +
      '<meta name="twitter:player" content="' + options.content.player.embed + '">' +
      '<meta name="twitter:player:stream" content="' + options.content.player.embed + '">' +
      // default for youtube
      '<meta name="twitter:player:stream:content_type" content="video/mp4; codecs=&quot;avc1.42E01E1, mp4a.40.2&quot;">' +
      '<meta name="twitter:player:width" content="' + playerWidth + '">' +
      '<meta name="twitter:player:height" content="' + playerHeight + '">';
      break;
    case 'product':
      break;
  }

  var twitterCard = twitterCardMetaTemplate.replace(/__(\w+)__/g, function(match) {
    return {
      '__CARD_TYPE__' : options.type,
      '__TITLE__' : options.title,
      '__DESC__' : options.description.length >= 140 ? options.description.substring(0, 137) + '...' : options.description,
      '__CREATOR__' : options.creator,
      '__HANDLE__' : options.handle,
      '__URL__' : options.url
    }[match];
  });

  // if twitter card meta data already exists, replace
  // TODO: remove jQuery as a dependency
  if ($('meta[name*="twitter"]').length > 0) {
    $('meta[name*="twitter"]').remove();
  }
  $('head').append(twitterCard); 
}