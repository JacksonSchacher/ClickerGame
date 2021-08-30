let resource = 0;

let clickValue = 1;

let clickUpgrades = {
    cUpgrade1: {
        price: 5,
        quantity: 0,
        multiplier: 1
    },
    cUpgrade2: {
        price: 10,
        quantity: 0,
        multiplier: 5
    }
};

let autoUpgrades = {
    aUpgrade1: {
        price: 50,
        quantity: 0,
        multiplier: 30
    },
    aUpgrade2: {
        price: 100,
        quantity: 0,
        multiplier: 150
    }
};

let autoUpgradesValue = 0

let bugClick = document.querySelector('#bug-click');
let imgContainer = document.querySelector('#click-img')

function mine() {
    resource += clickValue
    document.getElementById('click-img').classList.toggle('img-shake')
    drawTotal()
}
const bugClicked = document.getElementById('bug-click')
imgContainer.addEventListener("click", function(event) {
    var xPosition = event.clientX - imgContainer.getBoundingClientRect().left - (bugClick.clientWidth / 2);
    var yPosition = event.clientY - imgContainer.getBoundingClientRect().top - (bugClick.clientHeight / 2);
    // in case of a wide border, the boarder-width needs to be considered in the formula above
    bugClick.style.left = xPosition + "px";
    bugClick.style.top = yPosition + "px";
    bugClicked.classList.remove('hidden')
    bugClicked.classList.add('fade-out')
    document.getElementById('bugs-clicked').innerText = "+" + clickValue
    setTimeout(function() {
        bugClicked.classList.add('hidden'),
            bugClicked.classList.remove('fade-out')
    }, 500);
});

function drawTotal() {
    let total = resource
    const CURR_TOTAL_ELEM = document.getElementById('current-total')

    CURR_TOTAL_ELEM.innerText = total

    achievement()
    buttonIsClickable()

}

function buttonIsClickable() {
    for (const upgrade in clickUpgrades) {
        if (resource >= clickUpgrades[upgrade].price) {
            document.getElementById(upgrade + "-btn").removeAttribute("disabled")
        } else {
            document.getElementById(upgrade + "-btn").setAttribute("disabled", "")
        }
    }
    for (const upgrade in autoUpgrades) {
        if (resource >= autoUpgrades[upgrade].price) {
            document.getElementById(upgrade + "-btn").removeAttribute("disabled")
        } else {
            document.getElementById(upgrade + "-btn").setAttribute("disabled", "")
        }
    }
}

function buyClickUpgrade(index) {
    let cUpgradeIndex = clickUpgrades[index]
    console.log(cUpgradeIndex['price'])

    if (resource >= cUpgradeIndex['price']) {
        // increase quantity of click upgrade quantity
        cUpgradeIndex['quantity']++
            // remove resource = to price of click upgrade
            resource -= cUpgradeIndex['price']

        clickerUpgrade(index)
        drawTotal()
        drawClickUpgrade(index)
        cUpgradeIncrease(index)
    }
}
//SECTION CLICKER
function clickerUpgrade(index) {
    let cUpgradeIndex = clickUpgrades[index]

    clickValue += cUpgradeIndex['multiplier']
}

function drawClickUpgrade(index) {
    let cUpgradeIndex = clickUpgrades[index]
    const CLICK_UPGRADE_ELEM = document.getElementById(index)

    CLICK_UPGRADE_ELEM.innerText = cUpgradeIndex['quantity']
}

function cUpgradeIncrease(index) {
    let cUpgradeIndex = clickUpgrades[index]
    cUpgradeIndex['price'] *= (cUpgradeIndex['multiplier'] + cUpgradeIndex['quantity'])

    drawCUpgradeIncrease(index)
}

function drawCUpgradeIncrease(index) {
    let cUpgradeIndex = clickUpgrades[index]
    const C_UPGRADE_INCREASE_ELEM = document.getElementById(index + '-price')

    C_UPGRADE_INCREASE_ELEM.innerText = cUpgradeIndex['price']
}

// SECTION AUTO

function buyAutoUpgrade(index) {
    let aUpgradeIndex = autoUpgrades[index]
    console.log(aUpgradeIndex['price'])

    if (resource >= aUpgradeIndex['price']) {
        aUpgradeIndex['quantity']++
            resource -= aUpgradeIndex['price']

        autoUpgrade(index)
        drawTotal()
        drawAutoUpgrade(index)
        aUpgradeIncrease(index)
    }
}

function autoUpgrade(index) {
    let aUpgradeIndex = autoUpgrades[index]

    autoUpgradesValue += (aUpgradeIndex['multiplier'])
}

function drawAutoUpgrade(index) {
    let aUpgradeIndex = autoUpgrades[index]
    const AUTO_UPGRADE_ELEM = document.getElementById(index)

    AUTO_UPGRADE_ELEM.innerText = aUpgradeIndex['quantity']
}

function aUpgradeIncrease(index) {
    let aUpgradeIndex = autoUpgrades[index]
    aUpgradeIndex['price'] *= Math.round((aUpgradeIndex['multiplier'] + aUpgradeIndex['quantity']) / 5)

    drawAUpgradeIncrease(index)
}

function drawAUpgradeIncrease(index) {
    let aUpgradeIndex = autoUpgrades[index]
    const A_UPGRADE_INCREASE_ELEM = document.getElementById(index + '-price')

    A_UPGRADE_INCREASE_ELEM.innerText = aUpgradeIndex['price']
}

function collectAutoUpgrades() {
    document.getElementById('auto-bugs-clicked').classList.remove('hidden')
    resource += autoUpgradesValue
    document.getElementById('auto-bugs-clicked').innerText = '+' + autoUpgradesValue
    setTimeout(function() { document.getElementById('auto-bugs-clicked').classList.add('hidden') }, 1000)
    drawTotal()
}

function autoInterval() {
    collectInterval = setInterval(collectAutoUpgrades, 3000);

}

function muteButton() {
    for (const upgrade in clickUpgrades) {
        if (Object.hasOwnProperty.call(clickUpgrades, upgrade)) {
            const element = clickUpgrades[upgrade];
            let elementPrice = element.price
        }
    }

}


// Toasts for Achievements!
var executed100 = true
var executed1000 = true
var executed10000 = true
var executed100000 = true
var executed1000000 = true

async function achievement() {
    if (resource >= 100 && executed100) {
        executed100 = false;
        Swal.fire({
            toast: true,
            position: 'top-right',
            icon: "success",
            iconColor: 'white',
            title: 'Debug Intern',
            text: 'Squashed 100 bugs!!',
            customClass: {
                popup: 'colored-toast'
            },
            showConfirmButton: false,
            timer: 4500,
            timerProgressBar: true
        })
    }
    if (resource >= 1000 && executed1000) {
        executed1000 = false;
        Swal.fire({
            toast: true,
            position: 'top-right',
            icon: "success",
            iconColor: 'white',
            title: 'Junior Debug Engineer',
            text: 'Squashed 1000 bugs!!',
            customClass: {
                popup: 'colored-toast'
            },
            showConfirmButton: false,
            timer: 4500,
            timerProgressBar: true
        })
    }
    if (resource >= 10000 && executed10000) {
        executed10000 = false;
        Swal.fire({
            toast: true,
            position: 'top-right',
            icon: "success",
            iconColor: 'white',
            title: 'Senior Bug Killer',
            text: 'Squashed 10000 bugs!!',
            customClass: {
                popup: 'colored-toast'
            },
            showConfirmButton: false,
            timer: 4500,
            timerProgressBar: true
        })
    }
    if (resource >= 100000 && executed100000) {
        executed100000 = false;
        Swal.fire({
            toast: true,
            position: 'top-right',
            icon: "success",
            iconColor: 'white',
            title: 'EXTERMINATOR',
            text: 'Squashed 100000 bugs!!',
            customClass: {
                popup: 'colored-toast'
            },
            showConfirmButton: false,
            timer: 4500,
            timerProgressBar: true
        })
    }
    if (resource >= 1000000 && executed1000000) {
        executed1000000 = false;
        Swal.fire({
            toast: true,
            position: 'top-right',
            icon: "success",
            iconColor: 'white',
            title: 'Bug Destroyer',
            text: 'Squashed 1000000 bugs!!',
            customClass: {
                popup: 'colored-toast'
            },
            showConfirmButton: false,
            timer: 4500,
            timerProgressBar: true
        })
    }
}
// prevent image dragging
document.getElementById('click-img').ondragstart = function() {
    return false;
};

// invoke interval 
autoInterval()