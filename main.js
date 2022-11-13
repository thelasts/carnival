const input = require('sync-input');
class Item {
    constructor(id, name, price){
        this.id = id;
        this.name = name;
        this.price = price;
    }
}
//visitor
let visitor = {
    tickets: 0,
    checkTickets(){
        console.log('Total tickets:', this.tickets);
    },
    buyGift() {
        // no gifts to buy
        if (carnival.catalogue.length === 0){
            console.log('Wow! There are no gifts to buy.\n');
            return;
        }
        let userInput = +input('Enter the number of the gift you want to get:');
        //invalid item
        if (isNaN(userInput)){
            console.log('Please enter a valid number!\n');
            return;
        }
        let item = carnival.catalogue.find((item) => item.id === userInput);
        //no gift found
        if (item === undefined){
            console.log('There is no gift with that number!\n');
            return;
        }
        //not enough money
        if (this.tickets < item.price){
            console.log("You don't have enough tickets to buy this gift.\n");
        } else {
            this.tickets -= item.price;
            console.log('Here you go, one', item.name + '!');
            carnival.removeItem(item.id);
        }
        this.checkTickets();
    },
    addTickets(){
    let userInput = input('Enter the ticket amount:');
    //input handle
    if (isNaN(userInput) || userInput < 0 || userInput > 1000){
        console.log('Please enter a valid number between 0 and 1000.');
        return;
    }
    this.tickets += +userInput;
    this.checkTickets();
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
    },
    removeItem(id){
        let toRemove = this.catalogue.findIndex((item) => item.id === id);
        this.catalogue.splice(toRemove, 1);
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

const actions = ['Buy a gift', 'Add tickets', 'Check tickets', 'Show gifts', 'Exit the shop'];

function showActions(actions){
    let data = '';
    actions.forEach((item, index) => data += String(index + 1) + '-' + item + (index === actions.length - 1 ? '' : ' '));
    return data;
}

let isActive = true;

while (isActive) {
    let userInput = input(`What do you want to do?\n${showActions(actions)}\n`);
    switch (userInput) {
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
        case '5':
            isActive = false;
            break;
        default:
            console.log('Please enter a valid number!');
            break;
    }
}
carnival.bye();
