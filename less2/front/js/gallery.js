window.onload = function () {
    fetch('http://localhost:3000/gallery').then((res) => {
        return res.text();
    }).then((data) => {
        const obj = JSON.parse(data);
        renderObj(obj);
    }).catch((err) => {
        console.error(err)
    });
}

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

function Gallery(idGal, classGal) {
    Container.call(this);
    this.id = idGal;
    this.className = classGal;
    this.items = [];
}

Gallery.prototype = Object.create(Container.prototype);
Gallery.prototype.constructor = Gallery;

Gallery.prototype.add = function (el) {
    this.items.push(el);
    if (this.element) this.element.appendChild(el.render());
}

Gallery.prototype.render = function (selector) {
    if (!this.element) {
        this.element = document.createElement('div');
        this.element.className = this.className;
        this.element.id = this.id;
        for (var i = 0; i < this.items.length; i++) {
            if (this.items[i] instanceof GalleryItem) {
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

function GalleryItem(srcSmall, alt, src) {
    Container.call(this);
    this.className = 'item';
    this.srcSmall = srcSmall;
    this.src = src;
    this.alt = alt;
}

GalleryItem.prototype = Object.create(Container.prototype);
GalleryItem.prototype.constructor = GalleryItem;

GalleryItem.prototype.render = function () {
    this.element = document.createElement('a');
    this.element.className = this.className;
    this.element.href = this.src;

    let img = document.createElement('img');
    img.src = this.srcSmall;

    this.element.appendChild(img);

    return this.element;
}

function generateGalleryItems(galery, items) {
    for (i in items) {
        galery.add(new GalleryItem(items[i].src_small, items[i].alt, items[i].src));
    }
}

function generateGallery(obj) {
    const gallery = new Gallery(obj.id, obj.class);
    generateGalleryItems(gallery, obj.items);
    return gallery;
}

function renderObj(obj) {
    const gallery = generateGallery(obj);
    console.log(gallery);
    gallery.render('.container');
}
