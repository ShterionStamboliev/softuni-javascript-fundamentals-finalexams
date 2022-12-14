function plantDiscovery(input) {
    const obj = {};
    const plantNum = Number(input.shift());

    for (let i = 0; i < plantNum; i++) {
        let [plant, rarity] = input[i].split('<->');
        rarity = Number(rarity);
        obj[plant] = {rarity, rating: [] };
    }
    for (const info of input) {
        let command = info.split(': ');
        if (command === 'Exhibition') {
            break;
        }

        if (command[0] === 'Rate') {
            command = command[1].split(' - ');
            const plantName = command[0];
            const plantRating = Number(command[1]);
            obj[plantName] ? obj[plantName].rating.push(plantRating) : console.log('error');

        } else if (command[0] === 'Update') {
            command = command[1].split(' - ');
            const plantName = command[0];
            const newPlantRarity = Number(command[1]);
            obj[plantName] ? obj[plantName].rarity = newPlantRarity : console.log('error');

        } else if (command[0] === 'Reset') {
            const plantName = command[1];
            obj[plantName] ? obj[plantName].rating = [] : console.log('error');
        } 
    }
     console.log(`Plants for the exhibition:`);
    
    for (const plant of Object.keys(obj)) {
        console.log(`- ${plant}; Rarity: ${obj[plant].rarity}; Rating: ${avg(obj[plant].rating).toFixed(2)}`);
    }
    
    function avg(arr) {
        if (!arr.length) return 0;
        return arr.reduce((a, b) => a + b, 0) / arr.length;
    }
}
plantDiscovery([
"3",
"Arnoldii<->4",
"Woodii<->7",
"Welwitschia<->2",
"Rate: Woodii - 10",
"Rate: Welwitschia - 7",
"Rate: Arnoldii - 3",
"Rate: Woodii - 5",
"Update: Woodii - 5",
"Reset: Arnoldii",
"Exhibition"
]);
