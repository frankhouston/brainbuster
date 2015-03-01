
if (Meteor.isClient) {


 // famous globals for APP code
  Transform=null;
  FView.ready(function(require) {
    Transform        = famous.core.Transform;

    // Famono: load famo.us shims and CSS
    famous.polyfills; // jshint ignore:line
    famous.core.famous; // jshint ignore:line
  

  });


//KRAO Code from screenshot!!

//KRAO added code from famous.js


  // haha, for CDN loads :)
 
Router.configure({
  layoutTemplate: 'layout',
});

Router.route('/', function () {
  this.render('timbre');
});
  





  

  
  


  UI.registerHelper('dstache', function() {
    return '{{';
  });

 



/*

  Template.layout.helpers({
    getTransition: function() {
      var useForPages = Session.get('transitionPages');
      return useForPages ? Session.get('currentTransition') : 'opacity';
    }
  });

*/

//KRAO END Added code from famous.js 



//Router.map(function() {
 // this.route('timbre', { path: '/examples/timbre' });
//});

Session.set('menuOpen', false);

// Translation for "main" page, depending on whether menu is open or not
Template.timbre.helpers({
  menuTranslate: function() {
    /*return Session.get('menuOpen') ? [300,0,20] : [0,0,20]; */
    return Session.get('menuOpen') ? [0,240,20] : [0,0,20]; 
  }
});


Template.timbre.rendered = function() {
  FView.registerView('Scrollview', famous.views.Scrollview);

  var fview = FView.from(this);
  var Transform = famous.core.Transform; // see shortcut help below

  // "Fly in" animation (see examples/animations for more)
  fview.modifier.setTransform(
    Transform.translate(-500,-500)
  );
  fview.modifier.setTransform(
    Transform.translate(0,0),
    { duration : 1000, curve: 'easeOut' }
  );


}

// Set the transition to be used when translate= changes reactively
Template.timbre_main.rendered = function() {
  FView.from(this).modifierTransition = { curve: 'easeOut', duration: 500 };

}

// On click, toggle the menuOpen state / reactive Session variable
Template.timbre_main.famousEvents({
  'click': function(event, tpl) {
    Session.set('menuOpen', !Session.get('menuOpen'));
  }
});


//KRAO Code added to handle menu item clicks

Template.timbre_menu_click.rendered = function() {
  //var fview=FView.from(this);
  var fview=FView.byId("stripmenu");

  var target=fview.surface||fview.view;
  target.on('click', function() {
      alert ('clicked on Introduction');
      console.log(target);
      console.log(fview);
   
  });

var fview2=FView.byId("stripmenu2");
  
  var target2=fview2.surface||fview2.view;
  target2.on('click', function() {
     // alert ('clicked on Play Game');
      Router.go("/Flipper");
      console.log(target);
      console.log(fview);
   
  });  

  var fview3=FView.byId("stripmenu3");
  
  var target3=fview3.surface||fview3.view;
  target3.on('click', function() {
      alert ('clicked on Settings');
      console.log(target);
      console.log(fview);
   
  });



  var fview4=FView.byId("stripmenu4");
  
  var target4=fview4.surface||fview4.view;
  target4.on('click', function() {
      alert ('clicked on About');
      console.log(target);
      console.log(fview);
   
  });  
  
}


// Simple queue.  Push functions which will get run and removed every 100ms
var queue = [];
Meteor.setInterval(function() {
  if (queue.length)
    queue.shift()();
}, 100);

Deps.autorun(function() {
  if (Session.get('menuOpen'))
    _.each(FView.byId('timbre-menu').children, function(strip) {
      // Move the strips out of sight immediately
      strip.modifier.setTransform(Transform.translate(-500,85));

      // And queue them to stagger in back to their original position
      queue.push(function() {
        strip.modifier.setTransform(Transform.translate(0,0),
          { duration: 500, curve: 'easeOut' });
      });
    });
});


}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
