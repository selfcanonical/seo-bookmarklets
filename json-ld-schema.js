javascript:(function() {
  var schemas = document.querySelectorAll('script[type="application/ld+json"]');
  var schemaCount = schemas.length;
  
  if (schemaCount > 0) {
    var newWindow = window.open("", "_blank");
    newWindow.document.write("<style>body { font-family: Arial, sans-serif; background-color: #1e1e1e; color: #d4d4d4; padding: 20px; } pre { background-color: #2d2d2d; padding: 10px; border-radius: 5px; white-space: pre-wrap; } code { color: #d4d4d4; }</style>");
    newWindow.document.write("<h1>Found " + schemaCount + " JSON-LD " + (schemaCount === 1 ? "Schema" : "Schemas") + "</h1>");
    schemas.forEach(function(schema) {
      var rawJson = schema.innerHTML.trim();
      try {
        var prettyJson = JSON.stringify(JSON.parse(rawJson), null, 2);
        newWindow.document.write("<pre><code>" + schema.outerHTML.replace(rawJson, prettyJson).replace(/</g, '&lt;').replace(/>/g, '&gt;') + "</code></pre><hr>");
      } catch (e) {
        newWindow.document.write("<pre><code>" + schema.outerHTML.replace(/</g, '&lt;').replace(/>/g, '&gt;') + "</code></pre><hr>");
      }
    });
    newWindow.document.close();
  } else {
    alert("No JSON-LD schema found on this page.");
  }
})();
