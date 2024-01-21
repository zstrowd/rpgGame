let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["stick"]


// getting access to the buttons
const button1 = document.querySelector("#button1")
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterNameText =document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");

const weapons = [
    {
        name: "stick",
        power: 5,
    },
    {
        name: "Dull Dagger",
        power: 15,
    },
    {
        name: "Rusty War Hammer",
        power: 20,
    },
    {
        name: "Rusty long sword",
        power: 35
    }
]

const locations = [
    {
        name: "town square",
        "button text": ["Go to store", "Go to cave", "Fight Dragon"],
        "button functions": [goStore, goCave, fightDragon],
        text: "You are in the Town Square. You see a sign that says: \"STORE\"."
    },
    {
        name: "Store",
        "button text": ["Buy 10 health (10 gold)", "Buy weapon (30 gold)", "Go to town square."],
        "button functions": [buyHealth, buyWeapon, goTown],
        text: "Welcome! Can I interest you in some fine goods? (You have entered the store)"
    },
    {
        name: "cave",
        "button text": ["Fight Goblin (Lvl 1)", "Fight Slime (Lvl 1)", "Go to town square (flee)"],
        "button functions": [fightGoblin, fightSlime, goTown],
        text: "You enter a dark cave lit up by torches. You see movement in front of you. What do you do?"
    },
    {
        name: "fight",
        "button text": ["attack", "dodge", "run"],
        "button functions": [attack, dodge, goTown],
        text: "You are fighting a fearsome foe!!"
    },
    {
        name: "kill monster",
        "button text": ["Go to Town Square", "Go to Town Square", "Go to Town Square"],
        "button functions": [goTown, goTown, easterEgg],
        text: "The monster withers away. You have gained XP and gold. You feel a foreign power slowly building up inside of you..."
    },
    {
        name: "lose",
        "button text" : ["Restart", "Restart", "Restart"],
        "button functions": [restart, restart, restart],
        text: "You have perished. Your power dwindles away like a candle... Retry?"
    },
    {
        name: "win",
        "button text" : ["Restart", "Restart", "Restart"],
        "button functions": [restart, restart, restart],
        text: "You have slayed the dragon. The power within you slowly fades. This time, you feel it is for the best..."
    },
    {
        name: "easter egg",
        "button text": ["Touch 2", "Touch 8", "Leave (This is obviously a trap..)"],
        "button functions": [pickTwo, pickEight, goTown],
        text: "You accidently stumble across a secret entrance. There are two pillars, one says \"2\" and the other says \"8\". What do you do?"
    }
];

const monsters = [
    {
        name: "Slime",
        level: 1,
        health: 20
    },
    {
        name: "Goblin",
        level: 1,
        health: 25
    },
    {
        name: "Beast Rabbit",
        level: 3,
        health: 35
    },
    {
        name: "Frost Dragon",
        level: 20,
        health: 300
    }
]
// initializing buttons

button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;



// FUNCTIONS

//Traveling Functionality

function goTown() {
    update(locations[0]);
}

function goStore() {
    update(locations[1]);
}

function goCave(){
    update(locations[2]);
}

function update(location) {
    monsterStats.style.display = "none";
    button1.innerText = location["button text"][0];
    button2.innerText = location["button text"][1];
    button3.innerText = location["button text"][2];
    button1.onclick = location["button functions"][0];
    button2.onclick = location["button functions"][1];
    button3.onclick = location["button functions"][2];
    text.innerText = location.text;
}

// buying and selling functionality

function buyHealth() {
    if (gold >= 10){
        gold -= 10;
        health += 10;
        goldText.innerText = gold;
        healthText.innerText = health;
        text.innerText = "Thank you for your purchase. Please come again!";
    }
    else {
        text.innerText = "Sorry lad, you don't have enough gold. ";
    }
}

function buyWeapon() {
    if (currentWeapon < weapons.length - 1){
        if (gold >= 30){
            gold -= 30;
            currentWeapon++;
            goldText.innerText = gold;
            let newWeapon = weapons[currentWeapon].name;
            text.innerText = "You have obtained " + newWeapon + "!";
            inventory.push(newWeapon);
            text.innerText += " In your inventory you have: " + inventory;
        }
        else{
            text.innerText = "Lad, you're lacking some gold. Come back when you got enough.";

        }
    }
    else {
        text.innerText = "You already have the best weapon!";
        button2.innerText = "Sell weapon for 15 gold";
        button2.onlclick = sellWeapon;
    }
}

function sellWeapon() {
    if (inventory.length > 1){
        gold += 15;
        gold.innerText = gold;
        let currentWeapon = inventory.shift();
        text.innerText = "You have sold a " + currentWeapon + "!";
        text.innerText += " In your inventory you have: " + inventory;
    }
    else {
        text.innerText = "Lad that is your only weapon....";
    }
}

// fighting monster functionality

function fightGoblin() {
    fighting = 1;
    goFight();
}

function fightSlime() {
    fighting = 0;
    goFight();
}

function fightDragon (){
    fighting = 3;
    goFight();
}
function goFight() {
    update(locations[3]);
    monsterHealth = monsters[fighting].health;
    monsterStats.style.display = "block";
    console.log(monsters[fighting].name);
    monsterNameText.innerText = monsters[fighting].name;
    monsterHealthText.innerText = monsterHealth;

}

function attack() {
    text.innerText = "The " + monsters[fighting].name + " is attacking!"
    text.innerText += " You attack the " + monsters[fighting].name + " with a " + weapons[currentWeapon].name + "!";
    if (isMonsterHit()) {
        health -= getMonsterAttackValue(monsters[fighting].level);
    }
    else {
        text.innerText += " You missed."
    }
    monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;
    healthText.innerText = health;
    monsterHealth.innerText = monsterHealth
    if (health <= 0){
        lose();
    }
    else if (monsterHealth <= 0){
        fighting === 3 ? winGame() : defeatMonster();
    }

    if (Math.random() <= .1 && inventory.length != 1) {
        text.innerText += " Your " + inventory.pop() + " breaks!";
        currentWeapon--;
    }
}

function getMonsterAttackValue(level){
    let hit = (level * 5) - (Math.floor(Math.random() * xp));

    return hit;
}

function isMonsterHit() {
    return Math.random() > .20 || health < 20;
}

function dodge() {
    text.innerText = "You have dodged the attack from the " + monsters[fighting].name + "!";
}

function defeatMonster(){
    gold += Math.floor(monsters[fighting].level * 6.7);
    xp += monsters[fighting].level;
    goldText.innerText = gold;
    xpText.innerText = xp;
    update(locations[4])
}

function lose(){
    update(locations[5]);
}

function restart(){
    xp = 0;
    health = 100;
    gold = 50;
    currentWeapon = 0;
    inventory = ["stick"];
    goldText.innerText = gold;
    healthText.innerText = health;
    xpText.innerText = xp;
    goTown();
}

function winGame() {
    update(locations[6]);
}

function easterEgg() {
    update(locations[7]);
}

function pickTwo() {
    pick(2)
}

function pickEight() {
    pick(8)
}

function pick(guess) {
    let numbers = [];

    while (numbers.length < 10){
        numbers.push(Math.floor(Math.random() * 11))
    }

    text.innerText = "You chose to touch pillar" + guess + "." + "Here are the numbers that flash before you:\n";
    
    for (let i = 0; i < 10; i++) {
        text.innerText += numbers[i] + "\n";
    }

    if (numbers.indexOf(guess) !== -1){
        text.innerText += "Your number was in the list! You have obtained 30 gold!!";
        gold += 30;
        goldText.innerText = gold;
    }
    else {
        text.innerText += "Your number was not in the list. Arrows fly at you hitting your leg making you lose 10 health.";
        health -= 10;
        healthText.innerText = health;

        if (health <= 0) {
            lose();
        }
    }
}