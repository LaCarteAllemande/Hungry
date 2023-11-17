
enum Rating {
	I,
	II,
	III,
	IV,
	V
}

enum HealthinessDescription {
	"Bad",
	"Excellent"
}


class Recipie {
	private name: string;
	private healthiness: number;
	private time: number;
	private rating: Rating = Rating.I;
	private aliments: Ingredient[] = [];
	private quantites: number[];
	private steps: Step[];

	constructor(
		name: string,
		time: number,
		rating: Rating,
		healthiness: number = 0,
		aliments: Ingredient[] = [],
		quantites: number[] = [],
		steps: Step[] = []
	) {
		this.name = name;
		this.time = time;
		this.rating = rating;
		this.aliments = aliments;
		this.quantites = quantites;
		this.steps = steps;
	}


	public getName() {
		return this.name;
	}

	public getHealthiness() {
		return 2;
		return this.healthiness;
	}

	public getPrice() {
		return 10;
	}

	public getTime() {
		return this.time;
	}

	public toString() {
		return this.name + " " + this.time + " min " + this.rating;
	}

	public getRating(): Rating {
		return this.rating;
	}

	public getCalories(): number {
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

	static fromObject(obj: {
		name: string;
		healthiness: number;
		time: number;
		rating: Rating;
		aliments: Ingredient[];
		quantites: number[];
		steps: Step[];
	}): Recipie {
		return new Recipie(
			obj.name,
			obj.time,
			obj.rating,
			obj.healthiness,
			obj.aliments,
			obj.quantites,
			obj.steps
		);
	}


	static STORAGE_KEY = 'recipies';

	static saveRecipies(recipies: Recipie[]): void {
		const serializedRecipies = JSON.stringify(recipies.map((r) => r.toObject()));
		localStorage.setItem(Recipie.STORAGE_KEY, serializedRecipies);
	  }
	
	  static getRecipies(): Recipie[] {
		const serializedRecipies = localStorage.getItem(Recipie.STORAGE_KEY);
		if (serializedRecipies) {
		  const parsedRecipies = JSON.parse(serializedRecipies);
		  return parsedRecipies.map((obj: any) => Recipie.fromObject(obj));
		} else {
		  return [];
		}
	  }
}