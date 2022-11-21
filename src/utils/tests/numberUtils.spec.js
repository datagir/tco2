import { decodeLocalizedNumber, encodeLocalizedNumber, parseLocalNumber } from '../numberUtils';

describe('parseLocalNumber', () => {
  it('should return the formatted string', () => {
    expect(parseLocalNumber(10)).toEqual('10')
  })
  it('should conserve signs', () => {
    expect(parseLocalNumber(-10)).toEqual('-10')
  })
  it('should remove sign before 0 signs', () => {
    expect(parseLocalNumber('-0')).toEqual('0')
    expect(parseLocalNumber(-0)).toEqual('0')
    expect(parseLocalNumber('+0')).toEqual('0')
    expect(parseLocalNumber(+0)).toEqual('0')
  })
  it('should format with locals', () => {
    expect(parseLocalNumber(10000)).toEqual('10 000')
    expect(parseLocalNumber(-10000)).toEqual('-10 000')
    expect(parseLocalNumber(10000000)).toEqual('10 000 000')
  })
  it('should return isNil parameter value', () => {
    expect(parseLocalNumber(undefined)).toEqual(undefined)
    expect(parseLocalNumber(null)).toEqual(undefined)
    expect(parseLocalNumber('')).toEqual(undefined)
    expect(parseLocalNumber('0')).toEqual('0')
    expect(parseLocalNumber(0)).toEqual('0')
    expect(parseLocalNumber(-0)).toEqual('0')
    expect(parseLocalNumber(+0)).toEqual('0')
  })
  it('should preserve decimal separator', () => {
    expect(parseLocalNumber(2.5)).toEqual('2.5')
    expect(parseLocalNumber(.5)).toEqual('0.5')
    expect(parseLocalNumber(0.5)).toEqual('0.5')
  })
  it('should remove non numerical characters', () => {
    expect(parseLocalNumber('abc')).toEqual(undefined)
    expect(parseLocalNumber('abc5')).toEqual('5')
    expect(parseLocalNumber('a235bc5')).toEqual('2355')
  })
})


describe('Test encodeLocalizedNumber', () => {
  it('Should convert the number into string', () => {
    expect(encodeLocalizedNumber(5)).toEqual('5')
  })
  it('should localize string number', () => {
    expect(encodeLocalizedNumber(5000)).toEqual('5 000')
  })
  it('should set nil value to empty string', () => {
    expect(encodeLocalizedNumber(undefined)).toEqual('')
    expect(encodeLocalizedNumber(null)).toEqual('')
  })
  it('should apply min max values', () => {
    expect(encodeLocalizedNumber(-5, 0, 10)).toEqual('0')
    expect(encodeLocalizedNumber(20, 0, 10)).toEqual('10')
  })
  it('should conserve decimals', () => {
    expect(encodeLocalizedNumber(2.5)).toEqual('2.5')
  })
});

describe('Test decodeLocalizedNumber', () => {
  it('Should convert the string into number', () => {
    expect(decodeLocalizedNumber('5')).toEqual(5)
  })
  it('should localize string number', () => {
    expect(decodeLocalizedNumber('5 000')).toEqual(5000)
  })
  it('should set empty values to undefined', () => {
    expect(decodeLocalizedNumber('')).toEqual(undefined)
    expect(decodeLocalizedNumber(undefined)).toEqual(undefined)
    expect(decodeLocalizedNumber(null)).toEqual(undefined)
  })
  it('should apply min max values', () => {
    expect(decodeLocalizedNumber('-5', 0, 10)).toEqual(0)
    expect(decodeLocalizedNumber('20', 0, 10)).toEqual(10)
  })
  it('should conserve decimals', () => {
    expect(decodeLocalizedNumber('2.5')).toEqual(2.5)
  })
});
