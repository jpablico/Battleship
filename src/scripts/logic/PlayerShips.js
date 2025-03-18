class Ships() {
  constructor() {
    this.ships = [];
  }

  addShip(ship) {
    this.ships.push(ship);
  }

  getShips() {
    return this.ships;
  }
}

export { SetupShips};