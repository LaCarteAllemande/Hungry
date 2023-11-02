
enum Rating {
	I,
	II,
	III,
	IV,
	V
  }

enum HealthinessDescription{
	"Bad",
	"Excellent"
}


class Recipie{
	private name:string;
	private healthiness:number;
	private calories:number;
	private time: number;
	private rating:Rating;
	private aliments:Ingredient[];
	private quantites:number[];
	private steps:Step[];

	constructor(name: string, time:number, rating:Rating) {
        this.name = name;
		this.time = time;
		this.rating=rating;
    }

	public getName(){
		return this.name;
	}

	public getHealthiness(){
		return 2;
		return this.healthiness;
	}

	public getPrice(){
		return 10;
	}

	public getTime(){
		return this.time;
	}

	public toString(){
		return this.name + " " + this.time + " min " + this.rating;
	}

	public getRating(){
		return 2;
		return this.rating;
	}

	public getCalories(){
		return 100;
	}

	public save(){

	}
}