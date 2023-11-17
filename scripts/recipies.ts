const NB_CELLS=6;

const recipies = Recipie.getRecipies() as  Recipie[];
const ingredients = Ingredient.getIngredients() as Ingredient[];
console.log("what i got ",recipies);

if (recipies.length > 0) {
  recipies.forEach((recipie)  => {
    console.log(recipie);
    addRecipie(recipie);
  });
}


document.addEventListener('DOMContentLoaded', function() {
  const saveRecipie_Btn = document.getElementById('saveRecipie') as HTMLButtonElement;
  saveRecipie_Btn.addEventListener('click', saveRecipie);
  const deleteRecipie_Btn = document.getElementById('deleteBtn') as HTMLButtonElement;
  deleteRecipie_Btn.addEventListener('click', delteRecipie);
  const recipieInfo_Btns = document.getElementsByClassName('recipieInfoBtn') as HTMLCollection;
  const addAliment_Btn = document.getElementById('addAlimentBtn') as HTMLButtonElement;
  addAliment_Btn.addEventListener("click", addAliment);
  for (let element of recipieInfo_Btns){
    element = element as HTMLButtonElement;
    element.addEventListener('click', updateRecipieModal);
  }

  
  
  let hoverTimeout: NodeJS.Timeout | null = null;
  const delay = 100;
  const itemGroup = document.getElementById('ratingGroup');
  const items = itemGroup?.querySelectorAll('.star');
  if (items) {
    items.forEach((item, index) => {
  
      item.addEventListener('mouseenter', () => {
        clearTimeout(hoverTimeout);
        // Apply a style change to the hovered item and previous items
        for (let i = 0; i <= index; i++) {
          items[i].classList.add('fill-black');
        }
        for (let i = index+1; i < 5; i++) {
          items[i].classList.remove('fill-black');
        }
        const ratingNumber = document.getElementById('ratingNumber') as HTMLHeadingElement;
        ratingNumber.innerText = (index+1).toString();
      });
  
    });
  }
});


function addAliment(){
  const recipieModal = document.getElementById('modalRecipie') as HTMLFormElement;
  const line = document.createElement("div");
  const selectMenu = document.createElement("select");
  for (let t in IngredienType){
    const group = document.createElement("optgroup");
    group.innerText =  t;
    for (const ingredient of ingredients){
      if (ingredient.getType() == IngredienType[t]){
        const option = document.createElement("option");
        option.innerText = ingredient.getName();
        group.appendChild(option);
      }

    }
    selectMenu.appendChild(group);

  }
  
  line.appendChild(selectMenu);
  line.classList.add("flex", "inline-center");
  recipieModal.appendChild(line);
}
function delteRecipie(event: Event){
  const clickedButton = event.target as HTMLButtonElement;
  let index = parseInt(clickedButton.getAttribute('data-object-id'),10) as number;
  recipies.splice(index, 1);
  console.log(recipies);
  Recipie.saveRecipies(recipies);
  location.reload();
}
function updateRecipieModal(event: Event){
  const clickedButton = event.target as HTMLButtonElement;
  const deleteBtn = document.getElementById('deleteBtn') as HTMLButtonElement;
  
  let index = parseInt(clickedButton.getAttribute('data-object-id'),10) as number;
  deleteBtn.setAttribute('data-object-id', index.toString());
  const childElement = document.getElementById('modalTitle') as HTMLHeadingElement;
  let r = recipies.at(index) as Recipie;
  childElement.textContent =r.getName();
}


function saveRecipie() {
    const nameInput = document.getElementById('recipieName') as HTMLInputElement ;
    const timeInput = document.getElementById('recipieTime') as HTMLInputElement;
    const ratingNumber = document.getElementById('ratingNumber') as HTMLHeadingElement;
    //const recipieInput = document.getElementById('recipieRating') as HTMLInputElement;
    const name = nameInput.value; 
    const time =+ timeInput.value as number;
    const rating =+ ratingNumber.innerText as number;
    //const rating =+ recipieInput.value as number;
    if (!name || time==0) {
        alert('Please enter a valid name and calories.');
        return;
    }


    // Create a new Aliment object
    const recipie = new Recipie(name, time, rating);
    recipies.push(recipie);
    console.log('new array:', recipies);
    Recipie.saveRecipies(recipies);
    addRecipie(recipie);   
}

function fetchRecipies(){
  const jsonArray: string | null = localStorage.getItem('recipies');
  let recipies: Recipie[] = [];

  if (jsonArray) {
    recipies = JSON.parse(jsonArray);
    console.log('Retrieved array:', recipies);
  } else {
    console.log('No data found in localStorage');
  }

  return recipies;  
}

function addRecipie(r:Recipie){
    const recipieTable = document.getElementById('recipieTable') as HTMLTableElement ;
    const newRow = recipieTable.insertRow(recipieTable.rows.length);
    
    let cells: HTMLTableCellElement[] = new Array();
    for (let i=0; i< NB_CELLS; ++i){
        cells.push(newRow.insertCell(i));
        cells[i].classList.add("case");
    }

    cells[0].innerHTML = r.getName();


    const hDiv = document.createElement("div");
    const p1 = document.createElement("p");
    const p2 = document.createElement("p");
    p1.innerHTML = r.getHealthiness().toString();
    p2.innerHTML = HealthinessDescription[r.getHealthiness()-1];
    hDiv.classList.add("case-content");
    p1.classList.add("healthiness-score");
    p2.classList.add("healthiness-text");
    hDiv.appendChild(p1);
    hDiv.appendChild(p2);
    cells[1].appendChild(hDiv);

    
    cells[2].innerHTML = r.getTime().toString() + " min";


    const rDiv = document.createElement("div");
    rDiv.classList.add("case-content");
    let stars:SVGAElement[] =new Array();
    for (let i=0; i< r.getRating(); i++){
      const img = document.createElement("img");
      img.src = "/assets/star.svg";
      img.classList.add("star-symbol");
      rDiv.appendChild(img);
    }

    for (let i=r.getRating(); i< 5; i++){
      const img = document.createElement("img");
      img.src = "/assets/emptyStar.svg";
      img.classList.add("star-symbol");
      rDiv.appendChild(img);
    }
    cells[3].appendChild(rDiv);


    cells[4].innerHTML = r.getCalories().toString();

    const priceCategory = 2;


    const pDiv = document.createElement("div");
    pDiv.classList.add("case-content");
    for (let i=0; i< priceCategory; i++){
      const euro = document.createElement("img");
      euro.src = "assets/euro.svg";
      euro.classList.add("euro-symbol");
      pDiv.appendChild(euro);
    }

    cells[5].appendChild(pDiv);


}

function rememberRecipies(recipies:Recipie[]){
  localStorage.setItem('recipies', JSON.stringify(recipies));
}




