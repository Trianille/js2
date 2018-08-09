// ДЗ
// добавить зерна +
// проверку на пустую кофеварку + (ошибка в консоли)
// реализовать метод стоп для кофеварки +


const Amount = class {
    constructor(min, max) {
        this.min = min;
        this.max = max;
    }

    fit(amount) {
        return (this.min <= amount && this.max > amount) ? amount : this.min > amount ? false : amount;
    }
}

function CoffeeMachine(power) {
    let coffeeMaking;
    let waterAmount = 0;
    let coffeeAmount = 0;
    const allowableWater = new Amount(50, 1500);
    const allowableCoffee = new Amount(15, 150);
    const waterPortion = 50;
    const coffeePortion = 15;
    const maxTemp = 90;
    const waterHeatCapacity = 4200;

    this.addWater = function (newAmount) {
        waterAmount = allowableWater.fit(newAmount);
        if (waterAmount == false) {
            console.log('Слишком мало воды');
        }
    };

    this.addCoffee = function (newAmount) {
        coffeeAmount = allowableCoffee.fit(newAmount);
        if (waterAmount == false) {
            console.log('Слишком мало кофе');
        }
    }

    const calcBoilTime = function () {
        return waterAmount ? (waterAmount * waterHeatCapacity * maxTemp) / power : false;
    };

    this.getBoilTime = function () {
        return calcBoilTime();
    };

    this.launch = function () {
        if (waterAmount && coffeeAmount) {
            console.log('Кофе варится!');
            coffeeMaking = setTimeout(function () {
                coffeeAmount -= coffeePortion;
                waterAmount -= waterPortion;
                console.log('Кофе готов!');
                console.log('Осталось воды: ' + waterAmount + ', кофе: ' + coffeeAmount);
            }, calcBoilTime());
        } else {
            console.log('Слишком мало воды или зерен');
        }

    }

    this.stop = function () {
        clearTimeout(coffeeMaking);
        console.log('Приготовление остановлено');
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const vitek = new CoffeeMachine(3500);
    vitek.addWater(50);
    vitek.addCoffee(50);
    vitek.launch();
    const newEl = document.createElement('button');
    newEl.classList.add('btn-stop');
    newEl.innerText = 'Stop';
    newEl.addEventListener('click', function () {
        vitek.stop();
    });
    document.querySelector('.container').appendChild(newEl);

});
