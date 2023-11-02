//for 100g
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
    constructor(name, time, rating) {
        this.name = name;
        this.time = time;
        this.rating = rating;
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
        return 2;
        return this.rating;
    }
    getCalories() {
        return 100;
    }
    save() {
    }
}
class Step {
}
const NB_CELLS = 6;
const saveRecipie_Btn = document.getElementById('saveRecipie');
saveRecipie_Btn.addEventListener('click', saveRecipie);
let hoverTimeout = null;
const delay = 100; // 500 milliseconds (0.5 seconds)
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
        });
        item.addEventListener('mouseleave', () => {
            // Remove the style change when the mouse leaves
            hoverTimeout = setTimeout(() => {
                items.forEach((item) => {
                    for (let i = 1; i <= index; i++) {
                        item.classList.remove('fill-black');
                    }
                });
            }, delay);
        });
    });
}
// Function to add an aliment to the list
function saveRecipie() {
    const nameInput = document.getElementById('recipieName');
    const timeInput = document.getElementById('recipieTime');
    //const recipieInput = document.getElementById('recipieRating') as HTMLInputElement;
    const name = nameInput.value;
    const time = +timeInput.value;
    //const rating =+ recipieInput.value as number;
    if (!name || time == 0) {
        alert('Please enter a valid name and calories.');
        return;
    }
    // Create a new Aliment object
    const recipie = new Recipie(name, time, 0);
    recipie.save();
    addRecipie(recipie);
    console.log(recipie);
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
    cells[2].innerHTML = r.getTime().toString();
    const rDiv = document.createElement("div");
    rDiv.classList.add("case-content");
    let stars = new Array();
    for (let i = 0; i < r.getRating(); i++) {
        const img = document.createElement("img");
        img.src = "/assets/star.svg";
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
