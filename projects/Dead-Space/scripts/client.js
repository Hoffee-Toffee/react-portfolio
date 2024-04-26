window.onload = function() {
    window["active"] = document.getElementById('menu').children[1]
}

function activate(element){
    if (element !== window["active"]){
        window["active"].classList.remove("active")
        element.classList.add("active")
        window["active"] = element
    }
}

document.addEventListener('keydown', function(e) {
    if ( ["ArrowUp", "ArrowDown"].includes(e.key) ) {
        var buttons = document.getElementById('menu').children
        buttons = Array.prototype.slice.call(buttons)
        buttons.shift()
        index = buttons.indexOf(window["active"])

        if (e.key == "ArrowUp"){
            index = (buttons.length + index - 1) % (buttons.length) + 1
        }
        else {
            index = (index + 1) % (buttons.length) + 1
        }

        activate(document.getElementById('menu').children[index])
    }
    else if (e.key == "Enter"){
        window["active"].click()
    }
})