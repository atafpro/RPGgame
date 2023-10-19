let health = 100;
let gold = 50;
let xp = 0;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["stick"];

const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const monsterhealth = document.querySelector("#monsterhealth");
const monstername = document.querySelector("#monstername");
const goldtext = document.querySelector("#goldtext");
const playerhealthtext = document.querySelector("#playerhealthtext");
const Xptext = document.querySelector("#Xptext");
const challenge = document.querySelector("#challenge");
const text = document.querySelector("#text");
const monsterStats= document.querySelector("#Monsterstats");


function fightSlime(){
    goFight();
    fighting = 0;

}
function fightBeast(){
    goFight();
    fighting = 1;

}
function fightDragon(){
    goFight();
    fighting = 2;

}

const monsters = [
    {
        name:"slime",
        level:8,
        health:60
    },
    {
        name:"beast",
        level:15,
        health:100
    },
    {
        name:"The Dragon",
        level:20,
        health:300
    },
] 

const weapons = [
    {
        name:"stick",
        power:5
    },
    {
        name:"knives",
        power:30
    },
    {
        name:"dagger",
        power:50
    },
    {
        name:"sword",
        power:100
    }
]


function goStore () {
    update(locations[1]);
}

const locations =[
    //object inside array//
    { 
        name:"TownHall",
        "button text":["Go to store","Go to cave", "Fight dragon"],
        "button functions" : [goStore,goCave,goFight],
        text:"You are the in the town square."
    },
    //comma between obj//
    {      
        name:"store",
        "button text":["Buy 10 health (10gold)","Buy new weapon (30gold)","Return to Town Hall"],
        "button functions":[buyHealth,buyWeapon,goTown],
        text:"You have reached the store. Shop wisely!"
    },
    {
        name:"fighting",
        "button text":["Attack","Dodge","Return"],
        "button functions":[attack,dodge,goTown],
        text:"You are now fighting the" + monsters[fighting] + ". Hunt it down to save the people."
    },
    {
        name:"cave",
        "button text":["Fight Slime","Fight Beast","Return"],
        "button functions":[fightSlime,fightBeast,goTown],
        text:"You have reached the cave , find monsters and hunt them down for prizes."

    },
    {
        name:"defeat",
        "button text":["Play Again","Play Again","Play Again"],
        "button functions":[restart,restart,restart],
        text:// monsters[fighting].name + //
        "The monster prevails. Do you want to try to defeat it again?"
        
    },
    {
        name:"win",
        "button text":["Return","Return","Return"],
        "button functions":[goTown,goTown,goTown],
        text:"Congratulations! You have defeated the." + monsters[fighting] + ".",
    },
    {
        name:"wingame",
        "button text":["Replay","Replay","Replay"],
        "button functions":[restart,restart,restart],
        text:"Congratulations! You have defeated the." + monsters[fighting] + ". The town is free and the people are truly grateful to you."
    }
]

function win(){
    update(locations[5]);
    xp += monsters[fighting].health;
}

button1.onclick=goStore;
button2.onclick=goCave;
button3.onclick=goFight;

function update(location){
    monsterStats.style.display = "none";
    button1.innerText=location["button text"][0];
    button2.innerText=location["button text"][1];
    button3.innerText=location["button text"][2];

    button1.onclick=location["button functions"][0];
    button2.onclick=location["button functions"][1];
    button3.onclick=location["button functions"][2];

    text.innerText = location.text;

}



/* functions
we are going to make js functions*/
 

//objects:instead of index get data like array through properties.//

function goCave () {
    update(locations[3]);
}

function buyWeapon(){
    if(currentWeapon < (weapons.length - 1)){
        if(gold>=30){
        gold-= 30;
        let newWeapon = weapons[currentWeapon + 1].name;
        text.innerText = "You have got a new " + newWeapon + ".";
        
        inventory.push(newWeapon);
        text.innerText = "Your belongings are "+ inventory +".";

        goldtext.innerText = gold;
        }else{
            text.innerText = "You do not have enough gold."
        }
    }else{
        text.innerText = "You already have the most destructive weapon.";
        button2.innerText = "Sell weapon(15 gold)";
        button2.onclick = sellWeapon;

    }       
}
function sellWeapon(){
    if (inventory.length > 1 )
    gold += 15;
    goldtext.innerText = gold;
    //only applicable inside if//
    let currentWeapon = inventory.shift();
    text.innerText = "You sold the " + currentWeapon + ".";
    text.innerText = "Your inventory consists of" + inventory;
}
function buyHealth(){
    /*gold = gold -30
    health = health + 10*/
    if (gold >= 10){
        gold -= 10;
        health += 10;
        goldtext.innerText = gold;
        playerhealthtext.innerText  = health;

    }else{
        text.innerText = "You do not have enough gold to buy health.";
    }
}

  

function goTown (){
    update(locations[0]);


}
function goFight(){
    update(locations[2]);
    monsterhealth = monsters[fighting].health;
    monsterStats.style.display = "block";

}
function attack(){
    text.innerText = "You got attacked by the" + monsters[fighting].name ;
    text.innerText += "And you attacked it with "+ weapons[currentWeapon].name;
    health -= monsters[fighting].level;
    monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * xp ) + 1;
    playerhealthtext.innerText = health;
    monsterhealth.innerText = monsterHealth;
    if(health <= 0){
        defeat();
    }else if(monsterHealth <= 0){
        //double == to check//
       fighting === 2 ? winGame() : win();
    }

    }
function winGame(){
    update(locations[6])

}    

function defeat(){
    update(locations[4]);
}
function dodge(){
    text.innerText = "You dodged the" + monsters[fighting].name + "'s attack.";

}

function restart(){
    let health = 100;
    let gold = 50;
    let xp = 0;
    let currentWeapon = 0;
    let fighting;
    let monsterHealth;
    let inventory = ["stick"];
    goTown();
}


/*const audio = new Audio();
Audio.src ="mixkit-metal-click-1122.wav"*/

