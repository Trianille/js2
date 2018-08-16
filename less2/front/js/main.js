function Container() {
    this.id = '';
    this.className = '';
    this.element = '';
}

Container.prototype.render = function () {
    return this.element;
}

Container.prototype.remove = function () {
    let el = this.element;
    el.parentNode.removeChild(el);
}

function Menu(idMenu, classMenu) {
    Container.call(this);
    this.id = idMenu;
    this.className = classMenu;
    this.items = [];
}

Menu.prototype = Object.create(Container.prototype);
Menu.prototype.constructor = Menu;

Menu.prototype.add = function (el) {
    this.items.push(el);
    if (this.element) this.element.appendChild(el.render());
}

Menu.prototype.render = function (selector) {
    if (!this.element) {
        this.element = document.createElement('ul');
        this.element.className = this.className;
        this.element.id = this.id;
        for (var i = 0; i < this.items.length; i++) {
            if (this.items[i] instanceof MenuItem) {
                this.element.appendChild(this.items[i].render());
            }
        }
    }
    if (selector) {
        document.querySelector(selector).innerHTML = '';
        document.querySelector(selector).appendChild(this.element);
    }

    return this.element;
}

function MenuItem(href, label, submenu) {
    Container.call(this);
    this.className = 'menu-item';
    this.href = href;
    this.label = label;
    this.submenu = submenu ? submenu.render() : '';
}

MenuItem.prototype = Object.create(Container.prototype);
MenuItem.prototype.constructor = MenuItem;

MenuItem.prototype.add = function (submenu) {
    this.submenu = submenu.render();
    this.element.appendChild(this.submenu);
}

MenuItem.prototype.render = function () {
    this.element = document.createElement('li');
    this.element.className = this.className;

    let link = document.createElement('a');
    link.href = this.href;
    link.innerHTML = this.label;

    this.element.appendChild(link);
    if (this.submenu) this.element.appendChild(this.submenu);

    return this.element;
}

window.onload = function () {
    fetch('http://localhost:3000/menu').then((res) => {
        return res.text();
    }).then((data) => {
        const obj = JSON.parse(data);
        renderObj(obj);
    }).catch((err) => {
        console.error(err)
    });
}

function generateMenuItems(menu, items) {
    for (i in items) {
        if (items[i].submenu) {
            menu.add(new MenuItem(items[i].href, items[i].text, generateMenu(items[i].submenu)));
        } else {
            menu.add(new MenuItem(items[i].href, items[i].text));
        }
    }
}

function generateMenu(obj) {
    console.log(obj.id, obj.class);
    const menu = new Menu(obj.id, obj.class);
    generateMenuItems(menu, obj.items);
    return menu;
}

function renderObj(obj) {
    console.log(obj);
    const menu = generateMenu(obj);
    menu.render('.nav');
}
