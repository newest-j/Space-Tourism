const technologyBtnLinks = document.querySelectorAll('#techbtn .btn');
// console.log(technologyBtnLinks);
const technologyName = document.querySelector('.techname');
const technologyText = document.querySelector('.para3');
const technologyImage = document.querySelector('.techimage')

async function fetchTechnology() {
    try {
        const response = await fetch('data.json')
        const data = await response.json();
        // console.log(data.technology)
        return data.technology;
    }
    catch (error) {
        console.log("Error fetching technology:", error);
    }
}
fetchTechnology()

let currentTechnology = {}
async function setCurrentTechnology() {
    const technologyData = await fetchTechnology();
    for (let i = 0; i < technologyBtnLinks.length; i++) {
        if (technologyBtnLinks[i].classList.contains('active')) {
            currentTechnology = technologyData[i]
        }
    }
    updateTechnologyContent(currentTechnology)
}

for (let i = 0; i < technologyBtnLinks.length; i++) {
    technologyBtnLinks[i].addEventListener('click', () => {
        for (let j = 0; j < technologyBtnLinks.length; j++) {
            technologyBtnLinks[j].classList.remove('active')
        }
        technologyBtnLinks[i].classList.add('active');
        setCurrentTechnology()
    })
}

function updateTechnologyContent(technology) {
technologyName.innerHTML = technology.name.toUpperCase();
technologyText.innerHTML = technology.description;
technologyImage.src = technology.images['portrait']

}