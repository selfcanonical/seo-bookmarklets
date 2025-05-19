javascript:(function(){
    function extractUrlsFromXml(xmlText) {
        var parser = new DOMParser();
        var xmlDoc = parser.parseFromString(xmlText, "text/xml");
        var locs = [];
        var locElements = xmlDoc.getElementsByTagName('loc');
        for (var i = 0; i < locElements.length; i++) {
            locs.push(locElements[i].textContent);
        }
        return locs;
    }
    function decompressAndExtractUrls(gzipBlob) {
        var reader = new FileReader();
        reader.onload = function() {
            try {
                var decompressed = new TextDecoder('utf-8').decode(pako.inflate(new Uint8Array(reader.result)));
                var locs = extractUrlsFromXml(decompressed);
                var newTab = window.open();
                newTab.document.write('<html><body><h1>URLs in this sitemap:</h1>');
                newTab.document.write('<h2>Total URLs: ' + locs.length + '</h2>');
                newTab.document.write('<ul>');
                for (var i = 0; i < locs.length; i++) {
                    newTab.document.write('<li><a href="' + locs[i] + '">' + locs[i] + '</a></li>');
                }
                newTab.document.write('</ul></body></html>');
                newTab.document.close();
            } catch (error) {
                console.error('Error decompressing Gzip:', error);
            }
        };
        reader.readAsArrayBuffer(gzipBlob);
    }
    function fetchXmlAndExtractUrls(url) {
        fetch(url)
            .then(response => {
                var contentType = response.headers.get('Content-Type');
                if (contentType && contentType.includes('gzip')) {
                    return response.blob().then(decompressAndExtractUrls);
                } else {
                    return response.text().then(xmlText => {
                        var locs = extractUrlsFromXml(xmlText);
                        var newTab = window.open();
                        newTab.document.write('<html><body><h1>URLs in this sitemap:</h1>');
                        newTab.document.write('<h2>Total URLs: ' + locs.length + '</h2>');
                        newTab.document.write('<ul>');
                        for (var i = 0; i < locs.length; i++) {
                            newTab.document.write('<li><a href="' + locs[i] + '">' + locs[i] + '</a></li>');
                        }
                        newTab.document.write('</ul></body></html>');
                        newTab.document.close();
                    });
                }
            })
            .catch(error => console.error('Error fetching XML:', error));
    }
    if (window.location.href.match(/\.xml(\?|$)|\.gz(\?|$)/)) {
        fetchXmlAndExtractUrls(window.location.href);
    } else {
        var sitemapUrl = window.location.protocol + '//' + window.location.host + '/sitemap.xml';
        fetchXmlAndExtractUrls(sitemapUrl);
    }
})();
