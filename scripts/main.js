var generator = new presetGenerator();

function generateAllScriptLinks() {
  $('.transition-link').each(function(){
    var link = $(this);
    var transition =link.data("transition");
    var frames = $("#frames").val();
    link.attr("href", "data:application/octet-stream;charset=utf-8;base64," + btoa(generator.generateScript({
      frames: frames,
      transition: transition
    })));
    link.attr("download", transition + "-" + frames + "-frames.setting");
  });
}

$(document).ready(function() {
  generator.loadPresets(function(){
    generateAllScriptLinks();
    $('.download-area').removeClass("blocked");
  });

  $("input").keyup(function(){
    $('#frames-output').text($("#frames").val());
    generateAllScriptLinks();
  });
});
