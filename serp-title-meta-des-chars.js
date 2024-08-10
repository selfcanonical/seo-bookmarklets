javascript:(function() {
    function getTextLength(text) {
        return text ? text.length : 0;
    }

    function addLengthInfo(element, text) {
        const length = getTextLength(text);
        const lengthInfo = document.createElement('span');
        lengthInfo.style.fontWeight = 'bold';
        lengthInfo.style.color = '#2068f9';
        lengthInfo.style.fontSize = '20px';
        lengthInfo.textContent = ` (${length} chars)`;
        element.appendChild(lengthInfo);
    }

    function showPopup(minTitle, maxTitle, minDesc, maxDesc) {
        const popup = document.createElement('div');
        popup.style.position = 'fixed';
        popup.style.bottom = '10px';
        popup.style.left = '10px';
        popup.style.backgroundColor = '#333';
        popup.style.padding = '30px';
        popup.style.border = '2px solid #000';
        popup.style.borderRadius = '5px';
        popup.style.boxShadow = '0px 0px 10px rgba(0, 0, 0, 0.5)';
        popup.style.fontSize = '20px';
        popup.style.zIndex = '10000';
        popup.innerHTML = `
            <strong>Title:</strong><br>
            Min: ${minTitle} chars<br>
            Max: ${maxTitle} chars<br><br>
            <strong>Meta Description:</strong><br>
            Min: ${minDesc} chars<br>
            Max: ${maxDesc} chars<br>
        `;
        document.body.appendChild(popup);
    }

    let minTitleLength = Infinity;
    let maxTitleLength = 0;
    let minDescLength = Infinity;
    let maxDescLength = 0;

    const searchResults = document.querySelectorAll('div.g');

    searchResults.forEach(result => {
        const titleElement = result.querySelector('h3');
        const descriptionElement = result.querySelector('div[data-sncf~="1"]');

        if (titleElement) {
            const titleText = titleElement.textContent;
            const titleLength = getTextLength(titleText);
            minTitleLength = Math.min(minTitleLength, titleLength);
            maxTitleLength = Math.max(maxTitleLength, titleLength);
            addLengthInfo(titleElement, titleText);
        }

        if (descriptionElement) {
            const descriptionText = descriptionElement.textContent;
            const descLength = getTextLength(descriptionText);
            minDescLength = Math.min(minDescLength, descLength);
            maxDescLength = Math.max(maxDescLength, descLength);
            addLengthInfo(descriptionElement, descriptionText);
        }
    });

    if (minTitleLength === Infinity) minTitleLength = 0;
    if (minDescLength === Infinity) minDescLength = 0;

    showPopup(minTitleLength, maxTitleLength, minDescLength, maxDescLength);
})();
