    /**
     * @description Dinosaur Constructor, it is called in function createDinos()
     * @param an dinosaur object that contains one data entry retrieved from `dino.json` file
     * @constructor
     */
    function Dino(dino){
        this.species = dino.species;
        this.weight = dino.weight;
        this.height = dino.height;
        this.diet = dino.diet;
        this.where = dino.where;
        this.when = dino.when;
        this.fact = dino.fact
    }


    /**
     * @description Read in dino.json file and create corresponding dinosaur objects
     * The result objects are stroed in array dino_array
     * @returns an array of dino objects
    */
    function createDinos() {
        return fetch("dino.json")
        .then((res) => res.json())
        .then((res) => {
            data = res["Dinos"];
            const dino_array = [];
            for (let i = 0; i < data.length; i++){
                dino_array.push(new Dino(data[i]));
            }
            return dino_array;
        })
        .catch((error) => {
            console.error("Failed in reading file");
        });
    }

    /**
     * @description get human data from form
     * @returns a human object 
     */
    function getHumanData(){
        return {
            name: document.getElementById('name').value,
            height: document.getElementById('feet').value * 12 + document.getElementById('inches').value,
            weight: document.getElementById('weight').value,
            diet:document.getElementById('diet').value
        }
    }

    /**
     * @description Create Human Object
     * @returns the human object with data filled in based on user inputs
     */
    function createHuman() {
        return getHumanData();
    }


    /**
     * @description Create Comparing method 1, comparing weights
     * @returns a string sentence with the comparing result
     */
    Dino.prototype.CompareWeight = function (){
        let human = createHuman();
        let humanWeight = parseInt(human['weight']);
        if (parseInt(this.weight) > humanWeight){
            return `${this.species} weighs more than you.`;
        } else if (parseInt(this.weight) < humanWeight) {
            return `You weigh more than ${this.species}.`;
        } else {
            return `You and ${this.species} have the same weight.`;
        }
    }


    /**
     * @description Create Comparing method 2, comparing heights
     * @returns a string sentence with the comparing result
     */
     Dino.prototype.CompareHeight= function (){
        let human = createHuman();
        let humanHeight = parseInt(human['height']);
        if (parseInt(this.height) > humanHeight){
            return `${this.species} is taller than you.`;
        } else if (parseInt(this.height) < humanHeight) {
            return `You are taller than ${this.species}.`;
        } else {
            return `You and ${this.species} have the same height.`;
        }
    }


    /**
     * @description Create Comparing method 3, comparing diets
     * @returns a string sentence with the comparing result
     */
    Dino.prototype.CompareDiet = function (){
        let human = createHuman();
        let humanDiet = (human['diet']).toLowerCase();
        if (this.diet.toLowerCase() === humanDiet){
            return `${this.species} and you have the same diet ${this.diet}.`;
        } else {
            return `${this.species} enjoys this diet: ${this.diet}, but you prefer ${humanDiet}.`;
        }
    }

    /**
     *
     * @param dino one single dinosaur object
     * @param human one human object
     * @returns a random fact string, out of 6 possibilities
     */
    function getRandomFact(dino,human){
        // random_num is a random number between 0 and 5 (inclusive)
        const random_num = Math.floor(Math.random() * 6);
        switch(random_num){
            case 0:
                return dino.CompareWeight();
            case 1:
                return dino.CompareHeight();
            case 2:
                return dino.CompareDiet();
            case 3:
                return `${dino.species} lived in ${dino.where}.`;
            case 4:
                return `${dino.species} lived in ${dino.when}.`;
            case 5:
                return `${dino.fact}`;
        }
    }

    /**
     * @description  Randomize array in-place using Durstenfeld shuffle algorithm 
     * Credit belongs to : https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
     * This function is used in generateTiles()
     * @param  array 
     * @returns shuffled array 
     */
    function shuffleArray(array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    }

    /**
     * @description 
     * @param dinos an array of dinosaur objects
     * @param human one human object
     */
    function generateTiles(dinos,human){
        let fact;
        dinos = shuffleArray(dinos);
        // insert an empty string into dinos array and deleting 0 items first(so just an insert)
        dinos.splice(4, 0, '');
        for (let i = 0; i < dinos.length; i++){

            if (i !== 4){
                let dino = dinos[i];
                let dino_div = document.createElement('div');
                dino_div.className = 'grid-item';
                
                //if dino's species is Pigeon, always output its fact attribute Otherwise invoke getRandomFact() function to get a random fact
                if (dino.species != 'Pigeon'){
                    fact = getRandomFact(dino,human);
                } else{
                    fact = dino.fact;
                }
           
                dino_div.innerHTML = `<h3>${dino.species}</h3><img src="images/${dino.species.toLowerCase()}.png"><p>${fact}</p>`;
                document.getElementById('grid').appendChild(dino_div);
            }
            else {
                let human_div = document.createElement('div');
                human_div.className = 'grid-item';
                human_div.innerHTML = `<h3>${human.name}</h3><img src="images/human.png">`;
                document.getElementById('grid').appendChild(human_div);

            }
        }
    }
    

    document.getElementById("btn").addEventListener("click", async function() {
        let dinos = [];
        const human = createHuman();
        dinos = await createDinos();

        document.getElementById("dino-compare").style.display = "none";
        generateTiles(dinos, human)
    });



