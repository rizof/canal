  
    /* Barre de progression du temps */
    function setTime() {
       $("#time").progressbar({ value: $('video')[0].currentTime*100/$('video')[0].duration });
    }
    
    /* Trouver la position x,y d'un élément */
    function findPos(el) {
      var x = y = 0;    
      if(el.offsetParent) {    
        x = el.offsetLeft;    
        y = el.offsetTop;    
        while(el = el.offsetParent) {    
          x += el.offsetLeft;    
          y += el.offsetTop;    
        }    
      }    
      return {'x':x, 'y':y};    
    }
    
    function setVolume(value)
    {
       if(value == 0)
         $("#btn_volume").css('opacity', 0.3);
       else
         $("#btn_volume").css('opacity', 1.0);
       $("#volume").slider("option", "value", value*100);
       $('video')[0].volume = value;
    }
    
    $(document).ready(function(){
      
      var timer;
      
      //timeline de la vidéo
      $("#time").progressbar();
      
      //joue la vidéo
      $("#play").click(function(){
        $('video')[0].play();
        timer = setInterval("setTime()", 10);
      });
      
      //stop la vidéo
      $("#stop").click(function(){
        $('video')[0].pause();
        $('video')[0].currentTime = 0;
        clearInterval(timer);
        $("#time").progressbar({ value: 0 });
      });
      
      //met en pause la vidéo
      $("#pause").click(function(){
        $('video')[0].pause();
        clearInterval(timer);
      });
      
      //joue la vidéo à l'endroit cliqué dans la timeline
      $('#time').click(function(e) {
        var ev = e || window.event;
        var pos = findPos(this);      
        var diffx = ev.clientX - pos.x;      
        $("#time").progressbar({ value: diffx*100/$(this).width() });
        var duration = $('video')[0].duration;
        $('video')[0].currentTime = diffx*duration/$(this).width();      
      });
      
      //réglage du volume
      $("#volume").slider({
         slide: function(event, ui) {
           var volume = ui.value/100;           
           setVolume(volume);             
         },
         value: 50
      });
      
      //coupe ou remet le volume
      $("#btn_volume").click(function(){
        var volume = $("#volume").slider("option", "value");
        if(volume > 0)
          setVolume(0);
        else
          setVolume(0.5);
      });
      
      //plein écran
      $("#fullscreen").click(function(){
      
        var video = $('#video').get(0);
        if(video.requestFullScreen) {
                //fonction officielle du w3c
                video.requestFullScreen();
        } else if(video.webkitRequestFullScreen) {
                //fonction pour Google Chrome (on lui passe un argument pour autoriser le plein écran lors d'une pression sur le clavier)
                video.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
        } else if(video.mozRequestFullScreen){
                //fonction pour Firefox
                video.mozRequestFullScreen();
        } else {
                //si pas déjà en pleine écran
              if($('#video').attr('rel') != 'fullscreen')
              {
                //on met la vidéo en pleine écran
                $('#video').css({position: 'absolute', top: 0, left: 0, width: '100%', height: '100%'}).attr('rel', 'fullscreen');
                //on met la barre de controles en bas de la page
                $('#controls').css({position: 'absolute', bottom: 0, marginLeft: 'auto', marginRight: 'auto'});
                //la barre apparait si on passe dessus
                setTimeout("$('#controls').animate({opacity : 0.0}, 500);", 1000);
                $('#controls').hover(function(){
                  $(this).animate({opacity : 1.0}, 200);
                }, function(){
                  $(this).animate({opacity : 0.0}, 500);
                });
              }
              else
              {
                //on remet la vidéo en mode normal
                $('#video').removeAttr('style').removeAttr('rel');
                //on remet la barre de control en dessous de la vidéo
                $('#controls').animate({opacity : 1.0}, 1).off('hover').removeAttr('style').removeAttr('style');
              }    
        }
        
      });
    });
  