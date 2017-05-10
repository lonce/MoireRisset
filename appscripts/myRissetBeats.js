// To use the sound on a web page with its current parameters (and without the slider box):
define(
 ["jsaSound/jsaModels/RissetBasic"],

function(sndFactory){
return function(){
  var snd = sndFactory();

snd.setParam("play", 0);
snd.setParam("Frequency", 60);
snd.setParam("Type", 2.36);
snd.setParam("Spacing", 0.02);
snd.setParam("Gain", 0.3);
snd.setParam("Attack Time", 0.25);
snd.setParam("Release Time", 1);
return(snd);
}
});
