var idxRandomImage = Math.round((2) * Math.random());
var currenImageId = "";
  
Session.set("currenImageId", "http://upload.wikimedia.org/wikipedia/tr/e/ed/Bart_Simpson.svg");
    

Router.map(function() {
  this.route('viewsFlipper', {
    path: 'Flipper'
  });
});



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


Template.flipper_front.famousEvents({ 'click': flipSurface });
Template.flipper_back.famousEvents({ 'click': flipSurface });

