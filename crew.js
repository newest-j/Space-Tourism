const crewBtnLinks = document.querySelectorAll('#btn-box .btn');
// console.log(crewBtnLinks)
const crewRole = document.querySelector('#name');
const crewName = document.querySelector('#crewname');
const crewBio = document.querySelector('.text');
const crewImg = document.querySelector('#crewimage')

async function fetchCrew() {
    try {
        const response = await fetch('data.json')
        const data = await response.json();
        // console.log(data.crew);
        return data.crew;
    }
    catch (error) {
        console.log("Error fetching crew:", error)
    }

}
fetchCrew()

let currentCrew = {}
async function setCurrentCrew() {
    const crewData = await fetchCrew();

    for (let i = 0; i < crewBtnLinks.length; i++) {
        if (crewBtnLinks[i].classList.contains('active')) {
            currentCrew = crewData[i]
        }
    }
    updateCrewContent(currentCrew)
}

for (let i = 0; i < crewBtnLinks.length; i++) {
    crewBtnLinks[i].addEventListener('click', () => {
        for (let j = 0; j < crewBtnLinks.length; j++) {
            crewBtnLinks[j].classList.remove('active')
        }
        crewBtnLinks[i].classList.add('active')
        setCurrentCrew()
    })
}

function updateCrewContent(crew){
    crewRole.innerHTML = crew.role.toUpperCase();
    crewName.innerHTML = crew.name.toUpperCase();
    crewBio.innerHTML = crew.bio;
    crewImg.src =crew.images.png;
}
