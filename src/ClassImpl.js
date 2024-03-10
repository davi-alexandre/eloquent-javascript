function extend(child, parent) {
  // 1. inherit static parent bindings as secondary props
  child.__proto__ = parent;
  child.prototype = {
    constructor: child,
    // 2. inherit instance parent bindings as secondary props
    __proto__: parent.prototype,
  };
}

/** @class constructor */
function Animal(species) {
  this.species = species;
  Animal.animals ??= []; // static field
  Animal.animals.push(this);
}
// static method
Animal.getAnimals = () => Animal.animals;
// instance method
Animal.prototype.getSpecies = function () {
  return this.species;
};

/** @class constructor */
const Human = (function (_super) {
  extend(Human, _super);
  function Human(name) {
    _super.call(this, 'homo sapiens', ...arguments);
    this.name = name;
  }
  Human.prototype.sayName = function () {
    console.log('Hi, my name is', this.name);
  };
  return Human;
})(Animal);

const me = new Human('Davi');
console.log(me);
me.sayName();
console.log(me.species);
console.log(me.getSpecies());
console.log(Animal.animals === Animal.getAnimals());
