import React from 'react';

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
    return detail.map(item => {
      return (
        <li key={item.category} className="category-item">
          <span className={`preview-colour ${item.category}`}></span>
          <span>{item.category || 'uncategorised'} : {`${item.count / 2}h`}</span>
        </li>
      );
    });
  }
}

export default new BreakdownService();
