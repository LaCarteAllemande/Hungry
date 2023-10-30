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
