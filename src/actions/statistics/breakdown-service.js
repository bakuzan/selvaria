import React from 'react';
import CategoryItem from '../../components/category-item/category-item';

class BreakdownService {
  generateDayRowDetail(times) {
    const detail = [];
    times.forEach(item => {
      const existingCategory = detail.find(x => x.category === item.category);
      if (existingCategory) {
        existingCategory.count++;
      } else {
        detail.push({ category: item.category, count: 1 });
      }
    });

    return detail.sort((a, b) => {
      const aCount = a.count / 2;
      const bCount = b.count / 2;
      if (aCount > bCount) return -1;
      if (aCount < bCount) return 1;
      return 0;
    }).map((item, index) => {
      const categoryItem = { ...item, hours: `${item.count / 2}h` };
      return (
        <CategoryItem key={index} item={categoryItem} />
      );
    });
  }
}

export default new BreakdownService();
