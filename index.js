document.addEventListener('DOMContentLoaded', function () {
    
  // Fetch the list of animals
  async function fetchAnimalList() {
     const response = await fetch('http://localhost:3000/characters/');
     const data = await response.json();
     return data;
   }

    // Function to fetch the details of a specific animal by ID
 async function fetchAnimalDetails(animalId) {
     const response = await fetch(`http://localhost:3000/characters/${animalId}`);
     const data = await response.json();
     return data;
   }
     // display the list of animals
   async function displayAnimalList() {
     const animalListContainer = document.getElementById('animalList');
     const animalList = await fetchAnimalList();

     animalList.forEach(animal => {
       const listItem = document.createElement('li');
       listItem.textContent = animal.name;
       listItem.addEventListener('click', () => displayAnimalDetails(animal.id));
       animalListContainer.appendChild(listItem);
     });
   }
   // displayy the details of a specific animal by ID
   async function displayAnimalDetailsById() {
     const inputElement = document.getElementById('animalId');
     const animalId = parseInt(inputElement.value, 10);

     if (!isNaN(animalId)) {
       await displayAnimalDetails(animalId);
     } else {
       alert('Please enter a valid numeric animal ID.');
     }
   }
   

   async function displayAnimalDetails(animalId) {
     const animalDetailsContainer = document.getElementById('animalDetails');
     const animalDetails = await fetchAnimalDetails(animalId);

     // Clear previous details
     animalDetailsContainer.innerHTML = '';

     // Display animal details
     const detailsElement = document.createElement('div');
     detailsElement.innerHTML = `
       <h3>${animalDetails.name}</h3>
       <img src="${animalDetails.image}" alt="${animalDetails.name}">
       <p>Votes: ${animalDetails.votes}</p>
       
     `;

     const voteButton = document.createElement('button')
     voteButton.innerHTML= `<button id="votesButton" >Add Vote</button>`

     voteButton.addEventListener('click', function(){
         addVote(animalId)
     })

    
     animalDetailsContainer.appendChild(detailsElement);
     animalDetailsContainer.appendChild(voteButton);
   }

   // add votes for a specific animal
 async function addVote(animalId) {
     const animalDetailsContainer = document.getElementById('animalDetails');
     const votesElement = animalDetailsContainer.querySelector('p');

     const currentVotes = parseInt(votesElement.textContent.split(' ')[1], 10);
     const newVotes = currentVotes + 1;
     votesElement.textContent = `Votes: ${newVotes}`;
   }

    // Function to reset votes to 0
 function resetVotes() {
     const animalDetailsContainer = document.getElementById('animalDetails');
     const votesElement = animalDetailsContainer.querySelector('p');
     votesElement.textContent = 'Votes: 0';
   }

   document.getElementById('reset').addEventListener('click', resetVotes)


   displayAnimalList();
   
})