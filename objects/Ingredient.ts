//for 100g
class Ingredient {
	private name: string;
	private id :string;
	private calories: number;
	private protein: number;
	private carbohydrates: number;
	private fat: number
	private price:number;

	private static nbIngredients;


	constructor(name: string, calories:number, protein:number, carbohydrates:number, fat:number, price:number) {
        this.name = name;
		this.calories=calories;
		this.carbohydrates=carbohydrates;
		this.fat=fat;
		this.price=price;
		Ingredient.nbIngredients++;
		this.id = "I" + Ingredient.nbIngredients.toString();
    }

	public getName(){
		return this.name
	}

	public save(){
			const jsonString = JSON.stringify(this);

	// Save the JSON string in Local Storage
		localStorage.setItem(this.id.toString(), jsonString);
	}

	public delete(){
		localStorage.removeItem(this.id.toString());
	}

	public static save(){
		Ingredient.nbIngredients++;
		localStorage.setItem("nbIngredients", Ingredient.nbIngredients.toString());
	}
  }	


