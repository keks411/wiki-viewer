//random article
document.getElementById("btnrn").addEventListener("click", function() {

  window.open("http://en.wikipedia.org/wiki/Special:Random");

})

// search
document.getElementById("buttonwp").addEventListener("click", function() {

  var jumbo = document.getElementById("jumbo");

  var str = document.getElementById("searchwp");
  var err = document.getElementById("errormsg");

  strln = str.value.length;

  if (strln <= 2) {
    err.style.color = "red";
    err.innerHTML = "Empty values or less than 3 characters is not allowed";
    err.style.visibility = "visible";
    jumbo.style.visibility = "hidden";
  } else {

    var myNode = document.getElementById("rowp");
    while (myNode.firstChild) {
      myNode.removeChild(myNode.firstChild);
    }

    err.style.color = "black";
    err.innerHTML = "";
    err.style.visibility = "hidden";

    var searchterm = str.value;
    var apicall = "https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&list=search&exsentences=1&exintro=1&explaintext&exsectionformat=wiki&srsearch=" + searchterm + "&srlimit=10&callback=?";

    $.getJSON(apicall, function(json) {

      for (i = 0; i < 10; i++) {
        var snippet = JSON.stringify(json.query.search[i].snippet);
        var title = JSON.stringify(json.query.search[i].title);
        jumbo.style.visibility = "visible";
        snippet = snippet.replace(/<(?:.|\n)*?>/gm, '');
        snippet = snippet.slice(1,-1);
        snippet = snippet + " ....";
        title = title.slice(1,-1);
        
        
        
        var a = document.createElement("a");
        a.href = "https://en.wikipedia.org/wiki/" + title;
        a.title = "LINK";
     
        
       
        
        

        var node = document.createElement("p");
        var text = document.createTextNode(title);
        node.style.color = "blue";
        node.style.marginLeft = "5px";
        node.style.marginRight = "5px";
        a.appendChild(text);
        node.appendChild(a);
        document.getElementById("rowp").appendChild(node);

        node = document.createElement("p");
        text = document.createTextNode(snippet);
        node.style.fontSize = "14px";
        node.appendChild(text);
        node.style.marginLeft = "5px";
        node.style.marginRight = "5px";
        document.getElementById("rowp").appendChild(node);
      }

    });

  }
})