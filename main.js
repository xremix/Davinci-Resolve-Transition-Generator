var generator = new presetGenerator();

function generateAllScriptLinks() {
  $('#movetoleftlink').attr("href", "data:application/octet-stream;charset=utf-8;base64," + btoa(generator.generateScript({
    frames: $("#frames").val(),
    transition: "movetoleft"
  })));
  $('#movetorightlink').attr("href", "data:application/octet-stream;charset=utf-8;base64," + btoa(generator.generateScript({
    frames: $("#frames").val(),
    transition: "movetoright"
  })));

  $('#movetorightlink').attr("href", "data:application/octet-stream;charset=utf-8;base64," + btoa(generator.generateScript({
    frames: $("#frames").val(),
    transition: "movetoright"
  })));

    $('#movedownlink').attr("href", "data:application/octet-stream;charset=utf-8;base64," + btoa(generator.generateScript({
      frames: $("#frames").val(),
      transition: "movedown"
    })));
  $('#moveuplink').attr("href", "data:application/octet-stream;charset=utf-8;base64," + btoa(generator.generateScript({
    frames: $("#frames").val(),
    transition: "moveup"
  })));
}

$(document).ready(function() {
  generator.loadPreset("transition-presets/move-horizontal.setting", function(){
    generateAllScriptLinks();
  });

  $("input").keyup(function(){
    generateAllScriptLinks();
  });
});
