let urlCount = 1;

document.getElementById('add-url').addEventListener('click', function() {
    let newLabel = document.createElement('label');
    newLabel.setAttribute('for', 'url-' + urlCount);
    newLabel.textContent = 'Base URL:';

    let newInput = document.createElement('input');
    newInput.setAttribute('type', 'url');
    newInput.setAttribute('id', 'url-' + urlCount);
    newInput.setAttribute('name', 'url-' + urlCount);
    newInput.required = true;

    let urlContainer = document.getElementById('url-container');
    urlContainer.appendChild(newLabel);
    urlContainer.appendChild(newInput);

    urlCount++;
});

document.getElementById('utm-form').addEventListener('submit', function(event) {
    event.preventDefault();

    let source = document.getElementById('source').value;
    let medium = document.getElementById('medium').value;
    let campaign = document.getElementById('campaign').value;

    let container = document.getElementById('generated-urls-container');
    container.innerHTML = '';

    for (let i = 0; i < urlCount; i++) {
        let url = document.getElementById('url-' + i).value;

        let utmUrl = buildUTMUrl(url, source, medium, campaign);

        let newPara = document.createElement('p');
        newPara.textContent = utmUrl;

        let newButton = document.createElement('button');
        newButton.textContent = 'Copy';
        newButton.classList.add('copy-button');
        newButton.addEventListener('click', function() {
            let tempElement = document.createElement('textarea');
            tempElement.value = newPara.textContent;
            document.body.appendChild(tempElement);

            tempElement.select();
            document.execCommand('copy');

            document.body.removeChild(tempElement);

            alert('URL copied to clipboard!');
        });

        container.appendChild(newPara);
        container.appendChild(newButton);
    }
});

function buildUTMUrl(baseURL, utmSource, utmMedium, utmCampaign) {
    let url = new URL(baseURL);
    if (utmSource) {
        url.searchParams.set('utm_source', utmSource);
    }
    if (utmMedium) {
        url.searchParams.set('utm_medium', utmMedium);
    }
    if (utmCampaign) {
        url.searchParams.set('utm_campaign', utmCampaign);
    }

    return url.toString();
}
