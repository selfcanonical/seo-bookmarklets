javascript:(function(){
    function isInternalLink(url) {
        return url.indexOf(window.location.hostname) > -1;
    }
    
    var links = document.getElementsByTagName('a');
    var internalLinks = [];
    var externalLinks = [];

    for (var i = 0; i < links.length; i++) {
        var href = links[i].href;
        var anchorText = links[i].innerText.trim() || links[i].textContent.trim();
        if (href) {
            if (isInternalLink(href)) {
                internalLinks.push({href: href, text: anchorText});
            } else {
                externalLinks.push({href: href, text: anchorText});
            }
        }
    }

    var newWindow = window.open();
    newWindow.document.write('<html><head><title>Link Summary</title></head><body>');
    newWindow.document.write('<h1>Link Summary</h1>');
    newWindow.document.write('<h2>Total Links: ' + links.length + '</h2>');
    newWindow.document.write('<h2>Internal Links (' + internalLinks.length + '):</h2>');
    newWindow.document.write('<ul>');
    for (var i = 0; i < internalLinks.length; i++) {
        newWindow.document.write('<li>' + internalLinks[i].text + ' - <a href="' + internalLinks[i].href + '" target="_blank">' + internalLinks[i].href + '</a></li>');
    }
    newWindow.document.write('</ul>');
    newWindow.document.write('<h2>External Links (' + externalLinks.length + '):</h2>');
    newWindow.document.write('<ul>');
    for (var i = 0; i < externalLinks.length; i++) {
        newWindow.document.write('<li>' + externalLinks[i].text + ' - <a href="' + externalLinks[i].href + '" target="_blank">' + externalLinks[i].href + '</a></li>');
    }
    newWindow.document.write('</ul>');
    newWindow.document.write('</body></html>');
})();
