$(document).ready(function() {
  $.getJSON( "https://api.github.com/search/repositories?q=stars:>=500+language:PHP", function( data ) {
    $('.totalCount').append(data.total_count);
    var output = '';
    $.each( data.items, function( key, val ) {
      output += '<div class="row">';
      output += '<div class="two columns">';
      output += '<img src="' + val.owner.avatar_url + '" alt="Smiley face" height="100" width="100"> ';
      output += '</div>';
      output += '<div class="ten columns">';
      output += '<h5><a href="' + val.svn_url + '"  target="_blank">' + val.full_name + '</a></h5>';
      output += '<p>' + val.description + '</p>';
      output += '<p><i class="material-icons">code</i>:' + val.language + '<i class="material-icons">star</i>:' + val.stargazers_count + ' </p>';
      output += '</div></div><hr>';
    });
    $('#gitlist').html(output);
  });
  //Search By language
  $('#search').keypress(function(e){
    var key = e.which;
    if(key == 13)  // If the Enter Key is pressed
    {
    $( "#gitlist" ).empty();
      var searchField = $('#search').val();
      var regex = new RegExp(searchField, "i");
      console.log('searchField : ', searchField);
      var gitAPI = "https://api.github.com/search/repositories?q=stars:>=500+language:";
      gitAPI += searchField;
      var output = '';
      $.getJSON(gitAPI, function(data) {
        $('.totalCount').html("The Total Number of repositories for " +searchField+  " is " + data.total_count);
        var output = '';
        $.each( data.items, function( key, val ) {
          output += '<div class="row">';
          output += '<div class="two columns">';
          output += '<img src="' + val.owner.avatar_url + '" alt="Smiley face" height="100" width="100"> ';
          output += '</div>';
          output += '<div class="ten columns">';
          output += '<h5><a href="' + val.svn_url + '"  target="_blank">' + val.full_name + '</a></h5>';
          output += '<p>' + val.description + '</p>';
          output += '<p><i class="material-icons">code</i>:' + val.language + '<i class="material-icons">star</i>:' + val.stargazers_count + ' </p>';
          output += '</div></div><hr>';
        });
        output += '</div>';
        $('#gitlist').html(output);
      });
      }
    });

    //Search autocomplete Feature
    $.getJSON("https://gist.githubusercontent.com/mayurah/5a4d45d12615d52afc4d1c126e04c796/raw/ccbba9bb09312ae66cf85b037bafc670356cf2c9/languages.json", function(data) {
         //autocomplete
         $( "#search" ).autocomplete({
             minLength: 1,
             source: data
          })
    });
});
