import { client as fetch } from './client';

export const getAllPetCategories = async () => {
  const _tmp = {};
  try {
    const allPetCategories = await fetch('/pets/categories');
    for (let category of allPetCategories) {
      if (!_tmp[category.species]) {
        _tmp[category.species] = [];
      }

      if (!_tmp[category.species].includes(category.breed)) {
        _tmp[category.species].push(category.breed);
      }
    }
  } catch (err) {
    console.error(err);
  }
  return _tmp;
};
