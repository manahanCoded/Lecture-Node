import { userRepository } from "../repositories/userRepository.js";

class UserService {
  getAll() {
    return userRepository.getAll();
  }

  search(search) {
    const trimmedSearch = Object.keys(search).reduce((acc, key) => {
      acc[key] = typeof search[key] === 'string' ? search[key].trim() : search[key];
      return acc;
    }, {});

    const item = userRepository.getOne(trimmedSearch);
    if (!item) {
      throw new Error(`User not found`); 
    }
    return item;
  }

  create(userData) {
    const existingUserByEmail = userRepository.getOne({ email: userData.email });
    if (existingUserByEmail) {
      throw new Error("User with this email already exists");
    }
    const existingUserByPhone = userRepository.getOne({ phone: userData.phone });
    if (existingUserByPhone) {
      throw new Error("User with this phone number already exists");
    }
    return userRepository.create(userData);
  }

  update(id, userData) {
    const existingUser = this.search({ id });
    if (!existingUser) {
      throw new Error("User not found");
    }

    if (userData.email && userData.email !== existingUser.email) {
      const userWithSameEmail = userRepository.getOne({ email: userData.email });
      if (userWithSameEmail) {
        throw new Error("User with this email already exists");
      }
    }

    if (userData.phone && userData.phone !== existingUser.phone) {
      const userWithSamePhone = userRepository.getOne({ phone: userData.phone });
      if (userWithSamePhone) {
        throw new Error("User with this phone number already exists");
      }
    }

    return userRepository.update(id, userData);
  }

  delete(id) {
    const user = this.search({ id });
    if (!user) {
      throw new Error("User not found");
    }
    return userRepository.delete(id);
  }
}

const userService = new UserService();

export { userService };