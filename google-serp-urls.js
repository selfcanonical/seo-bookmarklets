javascript:(function() {
    var results = document.querySelectorAll('.g');
    var output = '<html><head><title>Extracted URLs</title></head><body>';
    output += '<h1>SERP Titles and URLs</h1><h2>Total results: ' + results.length + '</h2><ul>';
    results.forEach(function(result) {
        var title = result.querySelector('h3') ? result.querySelector('h3').innerText : '';
        var url = result.querySelector('a') ? result.querySelector('a').href : '';
        if (title && url) {
            output += '<li>' + title + '<br><a href="' + url + '" target="_blank">' + url + '</a></li>';
        }
    });
    output += '</ul></body></html>';
    var newWindow = window.open();
    newWindow.document.write(output);
    newWindow.document.close();
})();
