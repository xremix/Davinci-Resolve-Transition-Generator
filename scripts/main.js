var generator = new presetGenerator();

function generateAllScriptLinks() {
  $('.transition-link').each(function(){
    var link = $(this);
    link.attr("href", "data:application/octet-stream;charset=utf-8;base64," + btoa(generator.generateScript({
      frames: $("#frames").val(),
      transition: link.data("transition")
    })));
  });
}

$(document).ready(function() {
  generator.loadPresets(function(){
    generateAllScriptLinks();
  });

  $("input").keyup(function(){
    generateAllScriptLinks();
  });
});
