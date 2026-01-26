import { topKFrequent, TopK } from '../top-key';

describe('topKFrequent', () => {
  describe('基本功能', () => {
    it('应该返回频率最高的 k 个元素', () => {
      const nums = [1, 1, 1, 2, 2, 3];
      const result = topKFrequent(nums, { k: 2 });
      expect(result).toEqual([1, 2]);
    });

    it('应该处理只有一个元素的数组', () => {
      const nums = [1];
      const result = topKFrequent(nums, { k: 1 });
      expect(result).toEqual([1]);
    });

    it('应该处理所有元素频率相同的情况', () => {
      const nums = [1, 2, 3, 4];
      const result = topKFrequent(nums, { k: 2 });
      expect(result).toHaveLength(2);
      expect([1, 2, 3, 4]).toEqual(expect.arrayContaining(result));
    });

    it('应该处理 k 大于元素种类数的情况', () => {
      const nums = [1, 1, 2, 2];
      const result = topKFrequent(nums, { k: 5 });
      expect(result).toHaveLength(2);
    });

    it('应该处理空数组', () => {
      const nums: number[] = [];
      const result = topKFrequent(nums, { k: 1 });
      expect(result).toEqual([]);
    });
  });

  describe('字符串类型', () => {
    it('应该支持字符串类型', () => {
      const words = ['apple', 'banana', 'apple', 'cherry', 'banana', 'apple'];
      const result = topKFrequent(words, { k: 2 });
      expect(result).toEqual(['apple', 'banana']);
    });
  });

  describe('参数验证', () => {
    it('k 必须大于 0', () => {
      expect(() => {
        topKFrequent([1, 2, 3], { k: 0 });
      }).toThrow('k must be greater than 0');

      expect(() => {
        topKFrequent([1, 2, 3], { k: -1 });
      }).toThrow('k must be greater than 0');
    });
  });
});

describe('TopK', () => {
  describe('初始化', () => {
    it('应该成功创建 TopK 实例', () => {
      const topK = new TopK({ k: 3 });
      expect(topK.size()).toBe(0);
    });

    it('k 必须大于 0', () => {
      expect(() => {
        new TopK({ k: 0 });
      }).toThrow('k must be greater than 0');

      expect(() => {
        new TopK({ k: -1 });
      }).toThrow('k must be greater than 0');
    });
  });

  describe('添加元素', () => {
    it('应该正确添加单个元素', () => {
      const topK = new TopK<number>({ k: 2 });
      topK.add(1);
      topK.add(1);
      topK.add(2);
      expect(topK.getTopK()).toEqual([1, 2]);
    });

    it('应该正确批量添加元素', () => {
      const topK = new TopK<number>({ k: 2 });
      topK.addAll([1, 1, 1, 2, 2, 3]);
      expect(topK.getTopK()).toEqual([1, 2]);
    });
  });

  describe('获取频率', () => {
    it('应该返回正确的频率', () => {
      const topK = new TopK<string>({ k: 2 });
      topK.addAll(['a', 'a', 'b', 'b', 'b', 'c']);
      expect(topK.getFrequency('a')).toBe(2);
      expect(topK.getFrequency('b')).toBe(3);
      expect(topK.getFrequency('c')).toBe(1);
      expect(topK.getFrequency('d')).toBe(0);
    });
  });

  describe('获取 Top-K', () => {
    it('应该返回频率最高的 k 个元素', () => {
      const topK = new TopK<number>({ k: 3 });
      topK.addAll([1, 1, 1, 2, 2, 3, 3, 3, 3, 4]);
      const result = topK.getTopK();
      expect(result).toEqual([3, 1, 2]);
    });

    it('应该处理空数据的情况', () => {
      const topK = new TopK<number>({ k: 2 });
      expect(topK.getTopK()).toEqual([]);
    });

    it('应该处理元素少于 k 的情况', () => {
      const topK = new TopK<number>({ k: 5 });
      topK.addAll([1, 2, 3]);
      expect(topK.getTopK()).toHaveLength(3);
    });
  });

  describe('清空数据', () => {
    it('应该清空所有数据', () => {
      const topK = new TopK<number>({ k: 2 });
      topK.addAll([1, 1, 2, 2, 3]);
      expect(topK.size()).toBe(3);
      topK.clear();
      expect(topK.size()).toBe(0);
      expect(topK.getTopK()).toEqual([]);
    });
  });

  describe('动态更新', () => {
    it('应该支持动态添加并更新 Top-K', () => {
      const topK = new TopK<string>({ k: 2 });
      topK.add('a');
      expect(topK.getTopK()).toEqual(['a']);

      topK.add('b');
      topK.add('b');
      expect(topK.getTopK()).toEqual(['b', 'a']);

      topK.add('a');
      topK.add('a');
      expect(topK.getTopK()).toEqual(['a', 'b']);
    });
  });
});
