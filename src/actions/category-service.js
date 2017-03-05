import { paths } from '../constants/paths.js';
import Query from './query/query';

class CategoryService {
  getCategoryList() {
    if (this.categories) return Promise.resolve(this.categories);
    
    return Query.fetchFromServer(paths.query.categoryList).then(categories => {
      this.categories = categories;
      return categories;
    });
  }
}

export default new CategoryService();
