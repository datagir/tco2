import { findAssociatedTechs, findUsageByName, updateUsage } from '../globalUtils';
import { TECH_MOCK, ALL_TECHS_MOCK } from './globalUtils.mocks'

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

describe('findAssociatedTechs', () => {
  let allTechs, currentTech

  beforeEach(() => {
    currentTech = TECH_MOCK()
    allTechs = ALL_TECHS_MOCK()
  })

  it('Should return the associated techs', () => {
    // Given that current is DIESEL-B7, which defines HEV as a linked techno
    // And DIESEL-HVO also defines DIESEL-B7 as associated,
    // And it's not in DIESEL-B7 otherVehicleTechnologyWithSameEnergy list

    // When requiring the other vehicle techs
    const otherTechs = findAssociatedTechs(currentTech, allTechs)

    // Then otherTechs should include all associated techs
    expect(otherTechs).toEqual(['HEV', 'DIESEL-HVO'])
  })

  it('should return the associated techs even if current tech has no otherTech defined', () => {
    expect(findAssociatedTechs({ vehicleTechnology: 'HEV' }, allTechs)).toEqual(['DIESEL-B7'])
    expect(findAssociatedTechs({
      vehicleTechnology: 'HEV',
      otherVehicleTechnologyWithSameEnergy: []
    }, allTechs)).toEqual(['DIESEL-B7'])
    expect(findAssociatedTechs({
      vehicleTechnology: 'HEV',
      otherVehicleTechnologyWithSameEnergy: null
    }, allTechs)).toEqual(['DIESEL-B7'])
    expect(findAssociatedTechs({
      vehicleTechnology: 'BIO-GNC'
    }, allTechs)).toEqual(['GNC', 'BEV'])
  })
  it('Should return an empty array if no tech associated', () => {
    expect(findAssociatedTechs({ vehicleTechnology: 'DIESEL-B100'}, allTechs)).toEqual([])
  })
  it('Should return an empty array', () => {
    expect(findAssociatedTechs({})).toEqual([])
    expect(findAssociatedTechs(undefined)).toEqual([])
    expect(findAssociatedTechs(null)).toEqual([])
    expect(findAssociatedTechs(null)).toEqual([])
    expect(findAssociatedTechs({}, allTechs)).toEqual([])
  })
})
