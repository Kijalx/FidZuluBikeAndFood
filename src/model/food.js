class Food {
    constructor(name,brand,weight,calories,price){
        if(price == null, name == null){
            throw Error(`invalid argument ${price} or ${name}`);
        }
        this.name = name;
        this.brand = brand;
        this.weight = weight;
        this.calories = calories;
        this.price = price;
    }
    toString(){
        return JSON.stringify(this);
    }
}

module.exports = Food;