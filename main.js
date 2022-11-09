let carnival = {
    catalogue:['Teddy Bear', 'Big Red Ball', 'Huge Bear', 'Candy', 'Stuffed Tiger',
        'Stuffed Dragon', 'Skateboard', 'Toy Car', 'Basketball', 'Scary Mask'],
    welcome(){
        console.log('WELCOME TO THE CARNIVAL GIFT SHOP!');
    },
    greeting(){
        console.log('Hello friend! Thank you for visiting the carnival!');
    },
    showCatalogue(){
        console.log("Here's the list of gifts:\n")
        this.catalogue.forEach((item) => console.log(item));
    }
}
carnival.welcome();
carnival.greeting();
carnival.showCatalogue();
