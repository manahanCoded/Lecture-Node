import { fighterRepository } from "../repositories/fighterRepository.js";

class FighterService {
  getAll() {
    return fighterRepository.getAll();
  }

  search(search) {
    const item = fighterRepository.getOne(search);
    if (!item) {
      throw new Error("Fighter not found");
    }
    return item;
  }

  create(fighterData) {
    const existingFighter = fighterRepository.getOne({ 
      name: { $regex: new RegExp(`^${fighterData.name}$`, 'i') } 
    });
    
    if (existingFighter) {
      throw new Error("Fighter with this name already exists");
    }

    if (!fighterData.health) {
      fighterData.health = 85;
    }

    return fighterRepository.create(fighterData);
  }

  update(id, fighterData) {
    const existingFighter = this.search({ id });
    
    if (fighterData.name) {
      const fighterWithSameName = fighterRepository.getOne({ 
        name: { $regex: new RegExp(`^${fighterData.name}$`, 'i') },
        id: { $ne: id } 
      });
      
      if (fighterWithSameName) {
        throw new Error("Fighter with this name already exists");
      }
    }

    return fighterRepository.update(id, fighterData);
  }

  delete(id) {
    const fighter = this.search({ id });
    return fighterRepository.delete(id);
  }
}

const fighterService = new FighterService();

export { fighterService };