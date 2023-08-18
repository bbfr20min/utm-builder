let urlCount = 1;

document.getElementById('add-url').addEventListener('click', function() {
    let newLabel = document.createElement('label');
    newLabel.setAttribute('for', 'url-' + urlCount);
    newLabel.textContent = 'Your URL:';

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

//Generating the links

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
        newButton.textContent = 'Copy URL';
        newButton.classList.add('copy-button');
        newButton.addEventListener('click', function() {
            let tempElement = document.createElement('textarea');
            tempElement.value = newPara.textContent;
            document.body.appendChild(tempElement);

            tempElement.select();
            document.execCommand('copy');

            document.body.removeChild(tempElement);

            alert('Your URL is now ready for publishing!');
        });

        container.appendChild(newPara);
        container.appendChild(newButton);
    }
});

// Add a click event listener to each preset button
const presetButtons = document.querySelectorAll('.preset');
presetButtons.forEach(button => {
    button.addEventListener('click', function() {
        const source = this.getAttribute('data-source');
        const medium = this.getAttribute('data-medium');
        const campaign = this.getAttribute('data-campaign');
        
        document.getElementById('source').value = source;
        document.getElementById('medium').value = medium;
        document.getElementById('campaign').value = campaign;
    });
});

// Building the UTM parameters

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

//LinkedIn personal

document.getElementById('linkedin-personal').addEventListener('click', function() {
    let campaignInput = document.getElementById('campaign');
    if (!campaignInput.value) {
        alert('For LinkedIn - personal, the campaign parameter is mandatory. Please fill it out using your first name and first letter of your surname. After your enter campaign details click on the GENERATE URLs button');
        campaignInput.focus(); // This will set focus to the campaign input for the user.
    }
});
