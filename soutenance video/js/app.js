var main = function() {
 // montrer le menu
  $('#plus').click(function() {
    $('#sidebar, .back').animate({
      right: "0px"
    }, 400);
    $('#moins').animate({
        right:"24.8%"
    },300)
    $('#plus').toggle(200);
    return false;
    });
// cacher le menu
  $('#moins').click(function() {
    $('#sidebar, .back').animate({
      right: "-27%"
    }, 200);
    $('#moins').animate({
        right:"-20%"
    },300)
    $('#plus').toggle(400);
    return true;
  });
// cacher le bouton play au demarrage du dom
$('#play').hide();
// au clik du pause interveser les deux bouton
$('#pause').click(function() {
$('#play').show('slow');
return true;
$('#pause').hide(200);
return false
  });
 // au click du play la meme chause a l'inverser
 $('#play').click(function() {
 $('#play').hide('slow');
 return false
 $('#pause').show('slow');
 return false;

 });
// au mouvement de la sourie le controls apparait
 $(document).mousemove(function(){
 $('#controls').show('slow');
 $('#moins').show('slow');
 $('#retour').show('slow');
 })


};


$(document).ready(main);












