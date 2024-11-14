class Bike {
    constructor(name,brand,color,price){
        if(price == null, name == null){
            throw Error(`invalid argument ${price} or ${name}`);
        }
        this.name = name;
        this.brand = brand;
        this.color = color;
        this.price = price;
    }
    toString(){
        return JSON.stringify(this);
    }
}

module.exports = Bike;