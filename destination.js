
const destinationNavLinks = document.querySelectorAll('#destination-nav .nav-link');
const destinationImg = document.querySelector('.destination-img');
const destinationText = document.querySelector('.text');
const destinationDistance = document.querySelector('.dist');
const destinationTravel = document.querySelector('.travel');
const destinationName = document.querySelector('#destination-name');

async function fetchDestinations() {
  try {
    const response = await fetch('data.json');
    const data = await response.json();
    // console.log(data)
    return data.destinations;
  } catch (error) {
    console.error('Error fetching destinations:', error);
  }
}


let currentDestination = {}
async function setCurrentDestination() {
  const destinationData = await fetchDestinations();

  for (let i = 0; i < destinationNavLinks.length; i++) {
    if (destinationNavLinks[i].classList.contains('active')) {
      currentDestination = destinationData[i]
    }
  }

  updateDestinationContent(currentDestination)
}

for (let i = 0; i < destinationNavLinks.length; i++) {
  destinationNavLinks[i].addEventListener('click', () => {
    for (let j = 0; j < destinationNavLinks.length; j++) {
      destinationNavLinks[j].classList.remove('active')
    }
    destinationNavLinks[i].classList.add('active')
    setCurrentDestination();
  })
}

function updateDestinationContent(destination){
  destinationImg.src= destination.images['png'];
  destinationText.innerHTML= destination.description;
  destinationDistance.innerHTML= destination.distance.toUpperCase();
  destinationTravel.innerHTML= destination.travel.toUpperCase();
  destinationName.innerHTML = destination.name.toUpperCase();
}