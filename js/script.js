
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview
    var  streetAdd =  $('#street').val();
    var cityAdd = $('#city').val();
    var address=streetAdd + "," + cityAdd;
    $greeting.text('So you want to live in ' + address.toUpperCase() + ' ?');
    var streetViewUrl = 'http://maps.googleapis.com/maps/api/streetview?size=600x300&location='+address+'&key=AIzaSyBd10E9YdRYQp9cwGiuA51U2gmoqyGfCHw';
    $body.append( '<img class="bgimg" src="' + streetViewUrl + '">' );
    // YOUR CODE GOES HERE!


    var nytimesUrl = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + cityAdd + '&sort=newest&api-key=fb31c117fddf44ad90d26e1bc24a697b';


$.getJSON(nytimesUrl, function (data) {
     $nytHeaderElem.text('New York Times Articles About '+ ''+ cityAdd.toUpperCase());
     articles = data.response.docs;
     for (var i=0; i < articles.length; i++) {
         var article = articles[i];
         $nytElem.append('<li class = "article">'+
             '<a href="'+article.web_url+'">'+article.headline.main+'</a>'+'<p>'+ article.snippet +'</p>'+
         '<li>');
     };

 }).error(function(e){
   $nytHeaderElem.text("New York Times Articles could not be loaded");
 });

var wikiRequestTimeout = setTimeout(function(){
  $wikiElem.text("Failed to get wikipedia resources");
},8000);
 var wikiUrl = 'https://en.wikipedia.org/w/api.php?action=opensearch&search= '+ cityAdd + '&format=json&callback=wikiCallback';
 $.ajax({
   url:wikiUrl,
   dataType: "jsonp",
   success: function(response) {
     var articleList = response[1];

     for(var i=0; i < articleList.length; i++){
       var articleStr = articleList[i];
       var url = 'http://en.wikipedia.org/wiki/' + articleStr;
       $wikiElem.append('<li><a href="' + url + '">' +articleStr + '</a></li>');
     };
     clearTimeout(wikiRequestTimeout);

   }
 })




 return false;




}

$('#form-container').submit(loadData);
