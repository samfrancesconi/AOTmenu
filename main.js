class Item {
    constructor(name, strenght, speed, spirit) {
        this.name = name;
        this.strenght = strenght;
        this.speed = speed;
        this.spirit = spirit;
    }
};
class Shop {
    constructor(swords, engines, arms) {
        this.swords = swords;
        this.engines = engines;
        this.arms = arms;
    };
    purchaseSword() {
        this.swords = this.swords - 1;
        if (this.swords < 0) {
            console.log("Item Unavailable")
            this.swords = 0
        }
    };
    sellSword() {
        this.swords = this.swords + 1;
        if (this.swords > 4) {
            console.log("Slots are full")
            this.swords = 4
        }
    };
    purchaseEngine() {
        this.engines = this.engines - 1;
        if (this.engines < 0) {
            console.log("Item Unavailable")
            this.engines = 0
        }
    };
    sellEngine() {
        this.engines = this.engines + 1;
        if (this.engines > 3) {
            console.log("Slots are full")
            this.engines = 3
        }
    };
    purchaseArm() {
        this.arms = this.arms - 1;
        if (this.arms < 0) {
            console.log("Item Unavailable")
            this.arms = 0
        }
    };
    sellArm() {
        this.arms = this.arms + 1;
        if (this.arms > 2) {
            console.log("Slots are full")
            this.arms = 2
        }
    };
};
class BackPack {
    constructor(strenght, speed, spirit, timeChanged, timeChecked, lightRed) {
        this.oggetto = [];
        this.strenght = strenght;
        this.speed = speed;
        this.spirit = spirit;
        this.timeChanged = timeChanged;
        this.timeChecked = timeChecked;
        this.lightRed = lightRed;

    };

    insertItem(item) {
        this.strenght = this.strenght + item.strenght;
        this.speed = this.speed + item.speed;
        this.spirit = this.spirit + item.spirit;
        if (this.strenght > 30) {
            this.strenght = 30;
            console.log("You can't keep more pieces of this object")
        }
        else if (this.speed > 15) {
            this.speed = 15;
            console.log("You can't keep more pieces of this object")
        }
        else if (this.spirit > 10) {
            this.spirit = 10;
            console.log("You can't keep more pieces of this object")
        }
    };

    getItem(item) {
        this.strenght = this.strenght - item.strenght;
        this.speed = this.speed - item.speed;
        this.spirit = this.spirit - item.spirit;

        if (this.strenght < 0) {
            this.strenght = 0;
            console.log("You don't own any of these items")
        }
        else if (this.speed < 0) {
            this.speed = 0;
            console.log("You don't own any of these items")
        }
        else if (this.spirit < 0) {
            this.spirit = 0;
            console.log("You don't own any of these items")
        }
    };
    control() {
        if (this.strenght !== backpackFirst.strenght) {
            backpackFirst.strenght = this.strenght;
            this.timeChanged = new Date();
            this.timeChecked = this.timeChanged
            console.log("light red, sword moved");
        }
        else if (this.speed !== backpackFirst.speed) {
            backpackFirst.speed = this.speed;
            this.timeChanged = new Date();
            this.timeChecked = this.timeChanged
            console.log("light red, engine moved");
        }
        else if (this.spirit !== backpackFirst.spirit) {
            backpackFirst.spirit = this.spirit;
            this.timeChanged = new Date();
            this.timeChecked = this.timeChanged
            console.log("light red, coat of arms moved");
        }
        else {
            console.log("lightgreen")
            this.timeChecked = new Date();
        }
    };
    changeSpotted() {
        if (this.timeChanged === this.timeChecked) {
            this.lightRed = true;
        }
        else {
            this.lightRed = false;
        }
    };
};
class Character {
    constructor(name, strenght, speed, spirit, primaryBackpack, secondaryBackpack) {
        this.name = name;
        this.strenght = strenght;
        this.speed = speed;
        this.spirit = spirit;
        this.primaryBackpack = primaryBackpack;
        this.secondaryBackpack = secondaryBackpack;
        this.currentBackpack = "primary";
    }

    setPrimaryBackpack(backpack) {
        this.primaryBackpack = "firstBackpack";
        this.strenght = backpack.strenght;
        this.speed = backpack.speed;
        this.spirit = backpack.spirit;
    };

    setSecondaryBackpack(backpack) {
        this.secondaryBackpack = "secondBackpack";
        this.strenght = backpack.strenght;
        this.speed = backpack.speed;
        this.spirit = backpack.spirit;
    };

    getCurrentBackpack() {
        if (this.currentBackpack == "primary") {
            return this.primaryBackpack;
        }

        return this.secondaryBackpack;
    };
};

var sword = new Item("sword", 30, 0, 0);
var engine = new Item("engine", 0, 15, 0);
var arms = new Item("Arms of coat", 0, 0, 10);
var firstBackpack = new BackPack(0, 0, 0, new Date(), new Date(), false);
var secondBackpack = new BackPack(0, 0, 0, new Date(), new Date(), false);
var backpackFirst = new BackPack(0, 0, 0, new Date(), new Date(), false);
var mikaza = new Character("Mikaza", 0, 0, 0, new BackPack(), new BackPack());
let currentBackpack = mikaza.getCurrentBackpack();
currentBackpack.insertItem(sword);
var shop = new Shop(3, 2, 1);
var item = "";
const objects = document.getElementsByClassName('object');
const targets = document.getElementsByClassName('target');
const blades = document.getElementById("spada");
const gas = document.getElementById("gas");
const jacket = document.getElementById("stemma");
const suite = document.getElementById("zaino");
const merch = document.getElementById("negozio");
const strenght = document.getElementById("strenght");
const speed = document.getElementById("speed");
const spirit = document.getElementById("spirit");




function acquireItem(item) {
    if (item == "sword") {
        shop.purchaseSword();
        firstBackpack.insertItem(sword);
        suite.appendChild(blades)
    }

    else if (item == "gas") {
        shop.purchaseEngine();
        firstBackpack.insertItem(engine);
        suite.appendChild(gas)
    }
    else if (item == "engine") {
        shop.purchaseArm();
        firstBackpack.insertItem(arms);
        suite.appendChild(jacket)
    }
};

function releaseItem(item) {
    if (item == "sword") {
        shop.sellSword();
        firstBackpack.getItem(sword);
        merch.appendChild(blades)
    }
    else if (item == "gas") {
        shop.sellEngine();
        firstBackpack.getItem(engine);
        merch.appendChild(gas)
    }
    else if (item == "engine") {
        shop.sellArm();
        firstBackpack.getItem(arms);
        merch.appendChild(jacket)
    }
};



function controllaOggetti() {
    firstBackpack.control();
    firstBackpack.changeSpotted();

    if (firstBackpack.lightRed == true) {

        if (backpackFirst.strenght > 0) {
            disponiSpada();
        }

        else {
            merch.appendChild(blades)
        }


        if (backpackFirst.speed > 0) {
            disponiGas();
        }
        else {
            merch.appendChild(gas)
        }


        if (backpackFirst.spirit > 0) {
            disponiJacket();
        }
        else {
            merch.appendChild(jacket)
        }


    };

};


setInterval(function () { controllaOggetti() }, 1000);


function disponiSpada() {
    if (firstBackpack.lightRed == true) {
        suite.appendChild(blades)
    };
};
function disponiGas() {
    if (firstBackpack.lightRed == true) {
        suite.appendChild(gas)
    };
};
function disponiJacket() {
    if (firstBackpack.lightRed == true) {
        suite.appendChild(jacket)
    };
};


blades.addEventListener('dragstart', () => {
    blades.classList.add('dragging');
    item = "sword";
});
blades.addEventListener('dragend', () => {
    blades.classList.remove('dragging');
    item = "";
});

gas.addEventListener('dragstart', () => {
    gas.classList.add('dragging');
    item = "gas";
});
gas.addEventListener('dragend', () => {
    gas.classList.remove('dragging');
    item = "";
});

jacket.addEventListener('dragstart', () => {
    jacket.classList.add('dragging');
    item = "engine"
});
jacket.addEventListener('dragend', () => {
    jacket.classList.remove('dragging');
    item = "";
});


suite.addEventListener('dragover', (e) => {
    e.preventDefault();
    console.log("dragover")
});
suite.addEventListener('drop', () => {
    acquireItem(item);
    const dragged = document.querySelector('.dragging');
    suite.appendChild(dragged);
    strenght.innerHTML = firstBackpack.strenght;
    speed.innerHTML = firstBackpack.speed;
    spirit.innerHTML = firstBackpack.spirit;
});

merch.addEventListener('dragover', (e) => {
    e.preventDefault();
    console.log("dragover")
});
merch.addEventListener('drop', () => {
    releaseItem(item);
    const dragged = document.querySelector('.dragging');
    merch.appendChild(dragged);
    strenght.innerHTML = firstBackpack.strenght;
    speed.innerHTML = firstBackpack.speed;
    spirit.innerHTML = firstBackpack.spirit;
});
