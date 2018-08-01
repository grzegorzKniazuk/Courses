
abstract class Engine {}
class DieselEngine extends Engine {}
class PetrolEngine extends Engine {}

abstract class Gearbox {}
class AutomaticGearbox extends Gearbox {}
class ManualGearbox extends Gearbox {}

class Car {
    constructor(private gearbox : Gearbox, private engine : Engine) {}
}

// Engine -> PetrolEngine
// Gearbox -> ManualGearbox





