const input = require('sync-input');
//visitor
let visitor = {
    tickets: 100,
    checkTickets(){
        console.log('Total tickets:', this.tickets);
    },
    buyGift() {
        let userInput = input('Enter the number of the gift you want to get:');
        let item = carnival.catalogue[--userInput];
        console.log('Here you go, one', item.name + '!');
        this.tickets -= item.price;
        this.checkTickets();
    },
    addTickets(){
    let userInput = input('Enter the ticket amount:');
    this.tickets += +userInput;
    this.checkTickets();
    }
}
class Item {
    constructor(id, name, price){
        this.id = id;
        this.name = name;
        this.price = price;
    }
}

let carnival = {
    catalogue:[],
    welcome(){
        console.log('WELCOME TO THE CARNIVAL GIFT SHOP!');
    },
    greeting(){
        console.log('Hello friend! Thank you for visiting the carnival!');
    },
    bye(){
        console.log('Have a nice day!');
    },
    showCatalogue(){
        console.log("Here's the list of gifts:\n")
        this.catalogue.forEach((item) => console.log(`${item.id}- ${item.name}, Cost: ${item.price} tickets`));
        console.log();
    },
    addItem(id=0, name, price){
        let item = new Item(id === 0 ? 1 : id, name, price);
        this.catalogue.push(item);
    }

}

//init catalogue. given data is in arrays, because i'm lazy to refactor it :)
const names = ['Teddy Bear', 'Big Red Ball', 'Huge Bear', 'Candy', 'Stuffed Tiger',
    'Stuffed Dragon', 'Skateboard', 'Toy Car', 'Basketball', 'Scary Mask'];
const prices = [10, 5, 50, 8, 15, 30, 100, 25, 20, 75];

for (let i = 0; i < names.length; i++){
    carnival.addItem(i + 1, names[i], prices[i]);
}

carnival.welcome();
carnival.greeting();
carnival.showCatalogue();

const actions = ['Buy a gift', 'Add tickets', 'Check tickets', 'Show gifts'];

function showActions(actions){
    let data = '';
    actions.forEach((item, index) => data += String(index + 1) + '-' + item + (index === actions.length - 1 ? '' : ' '));
    return data;
}
let mainInput = input(`What do you want to do?\n${showActions(actions)}`);
switch (mainInput){
    case '1':
        visitor.buyGift();
        break;
    case '2':
        visitor.addTickets();
        break;
    case '3':
        visitor.checkTickets();
        break;
    case '4':
        carnival.showCatalogue();
        break;
    default:
        console.log('Yet unknown command');
        break;
}
carnival.bye();
