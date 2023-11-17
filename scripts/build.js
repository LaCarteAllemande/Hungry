//for 100g
var IngredienType;
(function (IngredienType) {
    IngredienType["Fruit"] = "Fruit";
    IngredienType["Meat"] = "Meat";
})(IngredienType || (IngredienType = {}));
class Ingredient {
    constructor(name, calories, protein, carbohydrates, fat, price) {
        this.name = name;
        this.calories = calories;
        this.carbohydrates = carbohydrates;
        this.fat = fat;
        this.price = price;
        Ingredient.nbIngredients++;
        this.id = "I" + Ingredient.nbIngredients.toString();
    }
    getName() {
        return this.name;
    }
    getType() {
        return this.type;
    }
    save() {
        const jsonString = JSON.stringify(this);
        // Save the JSON string in Local Storage
        localStorage.setItem(this.id.toString(), jsonString);
    }
    delete() {
        localStorage.removeItem(this.id.toString());
    }
    static save() {
        Ingredient.nbIngredients++;
        localStorage.setItem("nbIngredients", Ingredient.nbIngredients.toString());
    }
    static getIngredients() {
        return new Array();
    }
}
class Profile {
    //nothing to do here
    getPriceCategory(price) {
        if (price >= this.expensive)
            return 3;
        else if (price >= this.medium)
            return 2;
        else
            return 1;
    }
}
var Rating;
(function (Rating) {
    Rating[Rating["I"] = 0] = "I";
    Rating[Rating["II"] = 1] = "II";
    Rating[Rating["III"] = 2] = "III";
    Rating[Rating["IV"] = 3] = "IV";
    Rating[Rating["V"] = 4] = "V";
})(Rating || (Rating = {}));
var HealthinessDescription;
(function (HealthinessDescription) {
    HealthinessDescription[HealthinessDescription["Bad"] = 0] = "Bad";
    HealthinessDescription[HealthinessDescription["Excellent"] = 1] = "Excellent";
})(HealthinessDescription || (HealthinessDescription = {}));
class Recipie {
    constructor(name, time, rating, healthiness = 0, aliments = [], quantites = [], steps = []) {
        this.rating = Rating.I;
        this.aliments = [];
        this.name = name;
        this.time = time;
        this.rating = rating;
        this.aliments = aliments;
        this.quantites = quantites;
        this.steps = steps;
    }
    getName() {
        return this.name;
    }
    getHealthiness() {
        return 2;
        return this.healthiness;
    }
    getPrice() {
        return 10;
    }
    getTime() {
        return this.time;
    }
    toString() {
        return this.name + " " + this.time + " min " + this.rating;
    }
    getRating() {
        return this.rating;
    }
    getCalories() {
        return 100;
    }
    toObject() {
        return {
            name: this.name,
            healthiness: this.healthiness,
            time: this.time,
            rating: this.rating,
            aliments: this.aliments,
            quantites: this.quantites,
            steps: this.steps
        };
    }
    static fromObject(obj) {
        return new Recipie(obj.name, obj.time, obj.rating, obj.healthiness, obj.aliments, obj.quantites, obj.steps);
    }
    static saveRecipies(recipies) {
        const serializedRecipies = JSON.stringify(recipies.map((r) => r.toObject()));
        localStorage.setItem(Recipie.STORAGE_KEY, serializedRecipies);
    }
    static getRecipies() {
        const serializedRecipies = localStorage.getItem(Recipie.STORAGE_KEY);
        if (serializedRecipies) {
            const parsedRecipies = JSON.parse(serializedRecipies);
            return parsedRecipies.map((obj) => Recipie.fromObject(obj));
        }
        else {
            return [];
        }
    }
}
Recipie.STORAGE_KEY = 'recipies';
class Step {
}
const NB_CELLS = 6;
const recipies = Recipie.getRecipies();
const ingredients = Ingredient.getIngredients();
console.log("what i got ", recipies);
if (recipies.length > 0) {
    recipies.forEach((recipie) => {
        console.log(recipie);
        addRecipie(recipie);
    });
}
document.addEventListener('DOMContentLoaded', function () {
    const saveRecipie_Btn = document.getElementById('saveRecipie');
    saveRecipie_Btn.addEventListener('click', saveRecipie);
    const deleteRecipie_Btn = document.getElementById('deleteBtn');
    deleteRecipie_Btn.addEventListener('click', delteRecipie);
    const recipieInfo_Btns = document.getElementsByClassName('recipieInfoBtn');
    const addAliment_Btn = document.getElementById('addAlimentBtn');
    addAliment_Btn.addEventListener("click", addAliment);
    for (let element of recipieInfo_Btns) {
        element = element;
        element.addEventListener('click', updateRecipieModal);
    }
    let hoverTimeout = null;
    const delay = 100;
    const itemGroup = document.getElementById('ratingGroup');
    const items = itemGroup === null || itemGroup === void 0 ? void 0 : itemGroup.querySelectorAll('.star');
    if (items) {
        items.forEach((item, index) => {
            item.addEventListener('mouseenter', () => {
                clearTimeout(hoverTimeout);
                // Apply a style change to the hovered item and previous items
                for (let i = 0; i <= index; i++) {
                    items[i].classList.add('fill-black');
                }
                for (let i = index + 1; i < 5; i++) {
                    items[i].classList.remove('fill-black');
                }
                const ratingNumber = document.getElementById('ratingNumber');
                ratingNumber.innerText = (index + 1).toString();
            });
        });
    }
});
function addAliment() {
    const recipieModal = document.getElementById('modalRecipie');
    const line = document.createElement("div");
    const selectMenu = document.createElement("select");
    for (let t in IngredienType) {
        const group = document.createElement("optgroup");
        group.innerText = t;
        for (const ingredient of ingredients) {
            if (ingredient.getType() == IngredienType[t]) {
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
function delteRecipie(event) {
    const clickedButton = event.target;
    let index = parseInt(clickedButton.getAttribute('data-object-id'), 10);
    recipies.splice(index, 1);
    console.log(recipies);
    Recipie.saveRecipies(recipies);
    location.reload();
}
function updateRecipieModal(event) {
    const clickedButton = event.target;
    const deleteBtn = document.getElementById('deleteBtn');
    let index = parseInt(clickedButton.getAttribute('data-object-id'), 10);
    deleteBtn.setAttribute('data-object-id', index.toString());
    const childElement = document.getElementById('modalTitle');
    let r = recipies.at(index);
    childElement.textContent = r.getName();
}
function saveRecipie() {
    const nameInput = document.getElementById('recipieName');
    const timeInput = document.getElementById('recipieTime');
    const ratingNumber = document.getElementById('ratingNumber');
    //const recipieInput = document.getElementById('recipieRating') as HTMLInputElement;
    const name = nameInput.value;
    const time = +timeInput.value;
    const rating = +ratingNumber.innerText;
    //const rating =+ recipieInput.value as number;
    if (!name || time == 0) {
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
function fetchRecipies() {
    const jsonArray = localStorage.getItem('recipies');
    let recipies = [];
    if (jsonArray) {
        recipies = JSON.parse(jsonArray);
        console.log('Retrieved array:', recipies);
    }
    else {
        console.log('No data found in localStorage');
    }
    return recipies;
}
function addRecipie(r) {
    const recipieTable = document.getElementById('recipieTable');
    const newRow = recipieTable.insertRow(recipieTable.rows.length);
    let cells = new Array();
    for (let i = 0; i < NB_CELLS; ++i) {
        cells.push(newRow.insertCell(i));
        cells[i].classList.add("case");
    }
    cells[0].innerHTML = r.getName();
    const hDiv = document.createElement("div");
    const p1 = document.createElement("p");
    const p2 = document.createElement("p");
    p1.innerHTML = r.getHealthiness().toString();
    p2.innerHTML = HealthinessDescription[r.getHealthiness() - 1];
    hDiv.classList.add("case-content");
    p1.classList.add("healthiness-score");
    p2.classList.add("healthiness-text");
    hDiv.appendChild(p1);
    hDiv.appendChild(p2);
    cells[1].appendChild(hDiv);
    cells[2].innerHTML = r.getTime().toString() + " min";
    const rDiv = document.createElement("div");
    rDiv.classList.add("case-content");
    let stars = new Array();
    for (let i = 0; i < r.getRating(); i++) {
        const img = document.createElement("img");
        img.src = "/assets/star.svg";
        img.classList.add("star-symbol");
        rDiv.appendChild(img);
    }
    for (let i = r.getRating(); i < 5; i++) {
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
    for (let i = 0; i < priceCategory; i++) {
        const euro = document.createElement("img");
        euro.src = "assets/euro.svg";
        euro.classList.add("euro-symbol");
        pDiv.appendChild(euro);
    }
    cells[5].appendChild(pDiv);
}
function rememberRecipies(recipies) {
    localStorage.setItem('recipies', JSON.stringify(recipies));
}
