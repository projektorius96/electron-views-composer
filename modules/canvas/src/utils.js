Object.defineProperties(HTMLDivElement.prototype, {
    'layers' : {
        get(){
            return this.children
        }
    }
    ,
    add: {
        value: function(children) {
            this.append(...children)
        }
    }
    ,
});

Object.defineProperties(Array.prototype, {
    'on' : {
        value: Array.prototype.forEach
    }
    ,
});

Object.defineProperties(Function.prototype, {
    'value' : {
        get() {
            return this.name;
        }
    }
    ,
});

export function getIterable(nonIterable) {
    if (!Array.isArray(nonIterable)){
        return Array.from(nonIterable)
    }
}
