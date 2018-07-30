function presetGenerator(){
  var originalScript;
  this.loadPreset = function(url, done){
    $.get(url, function(d){
      console.log(d);
      originalScript = d;
      done && done();
    });

  };
  function getOriginalScript(id){
    return originalScript;
  }


  this.generateScript = function(config){
    config.startFrame = 0;
    config.endFrame = config.frames - 1;

    config.firstBlurFrame = config.startFrame + 1;
    config.lastBlurFrame = config.endFrame - 1;

    var scriptText = getOriginalScript("#preset");

    scriptText = scriptText.replace(/@STARTFRAME@/g, config.startFrame);
    scriptText = scriptText.replace(/@ENDFRAME@/g, config.endFrame);
    scriptText = scriptText.replace(/@FIRSTBLURFRAME@/g, config.firstBlurFrame);
    scriptText = scriptText.replace(/@LASTBLURFRAME@/g, config.lastBlurFrame);

    if(config.transition == "movetoleft"){
      scriptText = scriptText.replace(/@P1P1RX@/g, "-");
      scriptText = scriptText.replace(/@P1P2X@/g, "-");
      scriptText = scriptText.replace(/@P2P1RX@/g, "-");
    }else if(config.transition == "movetoright"){
      scriptText = scriptText.replace(/@P1P2LX@/g, "-");
      scriptText = scriptText.replace(/@P2P1X@/g, "-");
      scriptText = scriptText.replace(/@P2P2LX@/g, "-");
    }
    scriptText = scriptText.replace(/@P\dP\d..?@/g, "");
    // console.log(scriptText);
    return scriptText;
  };
}
