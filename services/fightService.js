import { fightRepository } from "../repositories/fightRepository.js";

class FightService {
  getAll() {
    return fightRepository.getAll();
  }

  search(search) {
    const item = fightRepository.getOne(search);
    if (!item) {
      throw new Error("Fight not found");
    }
    return item;
  }

  create(fightData) {
    if (!fightData.fighter1 || !fightData.fighter2) {
      throw new Error("Both fighters must be specified");
    }

    if (!fightData.date) {
      fightData.date = new Date().toISOString();
    }

    return fightRepository.create(fightData);
  }
}

const fightService = new FightService();

export { fightService };