function pause()
  {
      let myAudio = document.getElementById("music");
      if(myAudio.paused)
      {
          myAudio.play();
      }
      else
      {
         myAudio.pause();
      }
  }