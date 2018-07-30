'use strict';

function presetGenerator() {
  var originalScript;
  this.loadPreset = function(url, done) {
    $.get(url, function(d) {
      console.log(d);
      originalScript = d;
      done && done();
    });

  };
  function getOriginalScript(id) {
    return originalScript;
  }


  this.generateScript = function(config) {
    config.startFrame = 0;
    config.endFrame = config.frames - 1;

    config.firstBlurFrame = config.startFrame + 1;
    config.lastBlurFrame = config.endFrame - 1;

    var scriptText = getOriginalScript("#preset");

    scriptText = scriptText.replace(/@STARTFRAME@/g, config.startFrame);
    scriptText = scriptText.replace(/@ENDFRAME@/g, config.endFrame);
    scriptText = scriptText.replace(/@FIRSTBLURFRAME@/g, config.firstBlurFrame);
    scriptText = scriptText.replace(/@LASTBLURFRAME@/g, config.lastBlurFrame);

    if(config.transition == "movetoleft") {
      scriptText = scriptText.replace(/@Point1@/g,
        `
              { Linear = true, LockY = true, X = 0, Y = 0, RX = -0.333333333333333, RY = 0 },
              { Linear = true, LockY = true, X = -1, Y = 0, LX = 0.333333333333333, LY = 0 }
        `);

      scriptText = scriptText.replace(/@Point2@/g,
        `
              { Linear = true, LockY = true, X = @P2P1X@1, Y = 0, RX = @P2P1RX@0.333333333333333, RY = 0 },
              { Linear = true, LockY = true, X = 0, Y = 0, LX = @P2P2LX@0.333333333333333, LY = 0 }
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
