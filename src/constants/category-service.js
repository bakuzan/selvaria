const categories = [
  { name: 'anime' }, { name: 'develop' }, { name: 'exercise' },
  { name: 'gaming' }, { name: 'manga' }, { name: 'other' },
  { name: 'passing' }, { name: 'sleep' }, { name: 'social' },
  { name: 'wasted' }, { name: 'work' }
];

class CategoryService {
  getCategoryList() {
    return categories;
  }
}

export default new CategoryService();
