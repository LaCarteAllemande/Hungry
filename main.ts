

const nbIngredients = +localStorage.getItem("nbIngredients");

for (let i = 0; i < nbIngredients; i++){
    const storedData = localStorage.getItem("I"+i.toString())
    if (storedData) {
      const parsedObject = JSON.parse(storedData);
      console.log(parsedObject); // This will log the object { name: "John", age: 30 }
    }
}



// Attach the addAliment function to the button's click event
const addAlimentButton = document.getElementById('addAlimentButton') as HTMLInputElement;
addAlimentButton.addEventListener('click', addAliment);

// Function to add an aliment to the list
function addAliment() {
    const nameInput = document.getElementById('alimentName') as HTMLInputElement;
    const caloriesInput = document.getElementById('alimentCalories') as HTMLInputElement;
    const alimentList = document.getElementById('alimentList') as HTMLUListElement;

    const name = nameInput.value;
    const calories = parseFloat(caloriesInput.value);

    if (!name || isNaN(calories)) {
        alert('Please enter a valid name and calories.');
        return;
    }

    // Create a new Aliment object
    const aliment = new Ingredient(name, calories, 0,0,0,0);

    // Create a list item to display the aliment
    const listItem = document.createElement('li');
    listItem.textContent = `${aliment.getName()} -`;

    // Add the list item to the ul element
    //alimentList.appendChild(listItem);

    // Clear the input fields
    nameInput.value = '';
    caloriesInput.value = '';
    Ingredient.save();
}


