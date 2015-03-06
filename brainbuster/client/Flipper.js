var idxRandomImage = Math.floor(Math.round((2) * Math.random()));
var currenImageId = "";
var devWidth = jQuery(window).width();
   console.log( "devWidth := " + devWidth );
var devWidth = (devWidth-185)/2;
   console.log( "devWidth := " + devWidth );
Session.set("currenImageId", "http://upload.wikimedia.org/wikipedia/tr/e/ed/Bart_Simpson.svg");
Session.set("deviceWidth",  devWidth) ;   
console.log("deviceWidthsession" + Session.get("deviceWidth"));
var totalIntervals=0;
var gameRound= new Array();
var i=0;
var matchCounter=0;

function populateArray () {
  
      matchCount=0;
 //   for (i=0; i<20; i++) {
      while (matchCount<20) {
      gameRound[i] = Math.floor(Math.round((2) * Math.random()));
      console.log ( gameRound[i] +",");
      if (i % 2==0) {
          if (gameRound[i]==gameRound[i-2])
            {  
             console.log ("So far you have " +matchCount + "matches");
             console.log ("You have a match for the value " + gameRound[i] +'at' +i );
             matchCount++;
            }
       
      }
      console.log ("\n");

      i++;
   }
      n=gameRound.length;
      console.log ("You needed an array sized at " + n);
}







/*
Router.map(function() {
  this.route('viewsFlipper', {
    path: 'Flipper'
  });
});
*/

Router.route('/Flipper', function () {
  this.render('views_Flipper');
});

populateArray();

var intervalThread=Meteor.setInterval(flipSurface, 3000);



function flipSurface(event, fview) {
  
    idxRandomImage = Math.round((2) * Math.random());
    
    console.log( "idx := " + idxRandomImage );
    
    switch (idxRandomImage) {
    case 0:
        Session.set("currenImageId", "http://demosthenes.info/assets/images/thumbnails/homer-simpson.svg");
        break;
    case 1:
        Session.set("currenImageId", "http://upload.wikimedia.org/wikipedia/tr/e/ed/Bart_Simpson.svg");
        break;
    case 2:
        Session.set("currenImageId", "http://bl.ocks.org/d/1007813/octocat.svg");
        break;
    default: 
        Session.set("currenImageId", "http://bl.ocks.org/d/1007813/octocat.svg");
}
    
  fview.parent.view.flip({ curve : 'easeInOutExpo', duration : 500});
}

Template.gen_image.helpers({
  next_image: function () {
    return Session.get("currenImageId");
  }
});

Template.flipper.helpers({
  device_wid: function () {
    console.log ("helper called with device width set to " +Session.get("deviceWidth"));
    return [ Session.get('deviceWidth'), 0 ];

  }
})

Template.flipper_front.famousEvents({ 'click': flipSurface });
Template.flipper_back.famousEvents({ 'click': flipSurface });

