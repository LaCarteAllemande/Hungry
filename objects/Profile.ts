

class Profile{
    private medium:number;
    private expensive:number;


    //nothing to do here
    public getPriceCategory(price:number){
        if (price>= this.expensive)
            return 3
        else if (price>= this.medium)
            return 2

        else
        return 1
    }
}