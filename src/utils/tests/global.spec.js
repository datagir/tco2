import { findUsageByName, updateUsage } from '../global';

describe('Global Utils test', () => {
  let urban, interUrban, longHaul
  let usages

  beforeEach(() => {
    urban = {
      use: 'URBAN',
      percentage: 40,
      name: 'Urbain'
    }
    interUrban = {
      use: 'INTERURBAN',
      percentage: 40,
      name: 'Extra urbain'
    }
    longHaul = {
      use: 'LONGHAUL',
      percentage: 20,
      name: 'Autoroute'
    }
    usages = [urban, interUrban, longHaul]
  })

  describe('Test findUsageByName', () => {
    it('should find the right usage', () => {
      expect(findUsageByName('INTERURBAN', usages)).toEqual(interUrban)
      expect(findUsageByName('LONGHAUL', usages)).toEqual(longHaul)
    })
    it('should return undefined if name doesn t exist', () => {
      expect(findUsageByName('abcd', usages)).toBeUndefined()
      expect(findUsageByName(undefined, usages)).toBeUndefined()
    })
    it('should return undefined if usages are null', () => {
      expect(findUsageByName('LONGHAUL', [])).toBeUndefined()
      expect(findUsageByName('INTERURBAN', undefined)).toBeUndefined()
      expect(findUsageByName('INTERURBAN', null)).toBeUndefined()
    })
  });

  describe('Test updateUsage', () => {
    it('should update usage and adjust total on the next index', () => {
      const result = updateUsage({ name: 'URBAN', value: 50 }, usages)

      expect(result.length).toEqual(3)
      expect(result[0].percentage).toEqual(50)
      expect(result[1].percentage).toEqual(30)
      expect(result[2].percentage).toEqual(20)
    })
    it('should update usage and adjust total on another index', () => {
      const result = updateUsage({ name: 'INTERURBAN', value: 90 }, usages)

      expect(result.length).toEqual(3)
      expect(result[0].percentage).toEqual(10)
      expect(result[1].percentage).toEqual(90)
      expect(result[2].percentage).toEqual(0)
    })
    it('should update usage and adjust total on last index', () => {
      const result = updateUsage({ name: 'LONGHAUL', value: 90 }, usages)

      expect(result.length).toEqual(3)
      expect(result[0].percentage).toEqual(0)
      expect(result[1].percentage).toEqual(10)
      expect(result[2].percentage).toEqual(90)
    })
    it('should update usage if new value is lower', () => {
      const result = updateUsage({ name: 'INTERURBAN', value: 10 }, usages)

      expect(result.length).toEqual(3)
      expect(result[0].percentage).toEqual(40)
      expect(result[1].percentage).toEqual(10)
      expect(result[2].percentage).toEqual(50)
    })
    it('should update 2 usages if new value is higher', () => {
      urban.percentage = 40
      interUrban.percentage = 30
      longHaul.percentage = 30
      const result = updateUsage({ name: 'INTERURBAN', value: 90 }, usages)

      expect(result.length).toEqual(3)
      expect(result[0].percentage).toEqual(10)
      expect(result[1].percentage).toEqual(90)
      expect(result[2].percentage).toEqual(0)
    })
    it('should update apply min values', () => {
      const result = updateUsage({ name: 'INTERURBAN', value: -90 }, usages)

      expect(result.length).toEqual(3)
      expect(result[0].percentage).toEqual(40)
      expect(result[1].percentage).toEqual(0)
      expect(result[2].percentage).toEqual(60)
    })
    it('should update apply max values', () => {
      const result = updateUsage({ name: 'INTERURBAN', value: 150 }, usages)

      expect(result.length).toEqual(3)
      expect(result[0].percentage).toEqual(0)
      expect(result[1].percentage).toEqual(100)
      expect(result[2].percentage).toEqual(0)
    })
    it('should work with one item', () => {
      const result = updateUsage({ name: 'INTERURBAN', value: 60 }, [interUrban])

      expect(result.length).toEqual(1)
      expect(result[0].percentage).toEqual(100)
    })
    it('should set value to 100 if only one item', () => {
      const result = updateUsage({ name: 'INTERURBAN', value: 0 }, [interUrban])

      expect(result.length).toEqual(1)
      expect(result[0].percentage).toEqual(100)
    })
  })
})
