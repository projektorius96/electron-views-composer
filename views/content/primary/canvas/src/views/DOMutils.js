EventTarget.prototype.on = EventTarget.prototype.addEventListener;
EventTarget.prototype.rm = EventTarget.prototype.removeEventListener;
EventTarget.prototype.dispatch = EventTarget.prototype.dispatchEvent;

Object.defineProperties(HTMLDivElement.prototype, {
    'layers' : {
        get(){
            return this.children
        }
    }
});

Object.defineProperties(Array.prototype, {
    'on' : {
        value: Array.prototype.forEach
    }
    ,
});
