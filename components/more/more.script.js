function initializeMore() {

fetch('mock/more.json')
  .then(response => response.json())
  .then(moreItemsData => {
    const container = document.querySelector('.more-items-container');
    container.innerHTML=""
    moreItemsData.forEach(item => {
        const itemWrapper = document.createElement('div');
        itemWrapper.classList.add('more-item-wrapper');

        const moreItem = document.createElement('div');
        moreItem.classList.add('more-item');
        
        const logo = document.createElement('img');
        logo.src = item.logo;
        logo.alt = 'more-icon';
        moreItem.appendChild(logo);

        const title = document.createElement('p');
        title.classList.add('text-xlg', 'text-bold', 'text-center');
        title.textContent = item.title;
        moreItem.appendChild(title);

        const description = document.createElement('p');
        description.classList.add('text-center', 'more-item-description');
        description.textContent = item.description;
        moreItem.appendChild(description);

        const ctaLink = document.createElement('a');
        ctaLink.href = item.ctaLink;
        ctaLink.target = '_blank';
        const ctaContainer = document.createElement('div');
        ctaContainer.classList.add('more-item-cta-container');

        const ctaText = document.createElement('p');
        ctaText.classList.add('text-bold');
        ctaText.textContent = item.ctaText;
        ctaContainer.appendChild(ctaText);

        const arrowIcon = document.createElement('img');
        arrowIcon.src = 'https://assets.www.happyfox.com/v2/images/right-arrow-small.svg';
        arrowIcon.alt = 'arrow-right';
        arrowIcon.classList.add('arrow-right');
        ctaContainer.appendChild(arrowIcon);

        ctaLink.appendChild(ctaContainer);
        moreItem.appendChild(ctaLink);

        itemWrapper.appendChild(moreItem);
        container.appendChild(itemWrapper);
    });
  })
  .catch(error => console.error('Error loading the JSON data:', error));
}

document.addEventListener('more',initializeMore)