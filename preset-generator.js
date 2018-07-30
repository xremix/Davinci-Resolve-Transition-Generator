'use strict';

function presetGenerator() {
  var presetScripts = {};
  this.loadPresets = function( done) {
    $.get("transition-presets/move-horizontal.setting", function(d) {
      presetScripts["moveScript"] = d;
      $.get("transition-presets/zoom-in-v2.setting", function(d) {
        presetScripts["zoomScript"] = d;
        done && done();
      });
    });

  };
  function getOriginalScript(transition) {
    console.log(transition);
    if(transition == "movetoleft" || transition == "movetoright" || transition == "moveup" || transition == "movedown"){
      return presetScripts["moveScript"];
    }else if(transition == "zoomin"){
        return presetScripts["zoomScript"];
    }
    throw "Don't know this transition";
  }


  this.generateScript = function(config) {
    config.startFrame = 0;
    config.endFrame = config.frames - 1;

    config.firstBlurFrame = config.startFrame + 1;
    config.lastBlurFrame = config.endFrame - 1;

    config.middleFrame = parseInt(config.endFrame / 2);


    var scriptText = getOriginalScript(config.transition);

    scriptText = scriptText.replace(/@STARTFRAME@/g, config.startFrame);
    scriptText = scriptText.replace(/@ENDFRAME@/g, config.endFrame);
    scriptText = scriptText.replace(/@FIRSTBLURFRAME@/g, config.firstBlurFrame);
    scriptText = scriptText.replace(/@LASTBLURFRAME@/g, config.lastBlurFrame);


    scriptText = scriptText.replace(/@BEFOREMIDDLEFRAME@/g, (config.middleFrame-1));
    scriptText = scriptText.replace(/@MIDDLEFRAME@/g, config.middleFrame);
    scriptText = scriptText.replace(/@AFTERMIDDLEFRAME@/g, (config.middleFrame+1));

    if(config.transition == "movetoleft") {
      scriptText = scriptText.replace(/@Point1@/g,
        `
              { Linear = true, LockY = true, X = 0, Y = 0, RX = -0.333333333333333, RY = 0 },
              { Linear = true, LockY = true, X = -1, Y = 0, LX = 0.333333333333333, LY = 0 }
        `);

      scriptText = scriptText.replace(/@Point2@/g,
        `
        { Linear = true, LockY = true, X = 1, Y = 0, RX = 0.333333333333333, RY = 0 },
        { Linear = true, LockY = true, X = 0, Y = 0, LX = 0.333333333333333, LY = 0 }
        `);
    }else if(config.transition == "movetoright") {
      scriptText = scriptText.replace(/@Point1@/g,
        `
        { Linear = true, LockY = true, X = 0, Y = 0, RX = 0.333333333333333, RY = 0 },
        { Linear = true, LockY = true, X = 1, Y = 0, LX = -0.333333333333333, LY = 0 }
        `);

      scriptText = scriptText.replace(/@Point2@/g,
        `
          { Linear = true, LockY = true, X = -1, Y = 0, RX = 0.333333333333333, RY = 0 },
          { Linear = true, LockY = true, X = 0, Y = 0, LX = -0.333333333333333, LY = 0 }
        `);
    }else if(config.transition == "moveup") {
      scriptText = scriptText.replace(/@Point1@/g,
        `
          { Linear = true, LockY = true, X = 0, Y = 0, RX = 0, RY = 0.333333333333333 },
          { Linear = true, LockY = true, X = 0, Y = 1, LX = 0, LY = -0.333333333333333 }
        `);

      scriptText = scriptText.replace(/@Point2@/g,
        `
          { Linear = true, LockY = true, X = 0, Y = -1, RX = 0, RY = 0.333333333333333 },
          { Linear = true, LockY = true, X = 0, Y = 0, LX = 0, LY = -0.333333333333333 }
        `);
    }else if(config.transition == "movedown") {
      scriptText = scriptText.replace(/@Point1@/g,
        `
          { Linear = true, LockY = true, X = 0, Y = -1, RX = 0, RY = 0.333333333333333 },
          { Linear = true, LockY = true, X = 0, Y = 0, LX = 0, LY = -0.333333333333333 }
        `);

      scriptText = scriptText.replace(/@Point2@/g,
        `
        { Linear = true, LockY = true, X = 0, Y = 0, RX = 0, RY = 0.333333333333333 },
        { Linear = true, LockY = true, X = 0, Y = 1, LX = 0, LY = -0.333333333333333 }
        `);
    }
    if(config.transition == "movedown" || config.transition == "moveup") {
      scriptText = scriptText.replace(/@BlurAngle@/g, "Angle = Input { Value = 90, },");
    }

    scriptText = scriptText.replace(/@[a-zA-Z0-9]+@/g, "");
    return scriptText;
  };
}
