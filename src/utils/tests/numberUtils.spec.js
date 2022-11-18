import { parseLocalNumber } from '../numberUtils';

describe('parseLocalNumber', () => {
  it('should return the formatted string', () => {
    expect(parseLocalNumber(10)).toEqual('10')
  })
  it('should conserve signs', () => {
    expect(parseLocalNumber(-10)).toEqual('-10')
  })
  it('should format with locals', () => {
    expect(parseLocalNumber(10000)).toEqual('10 000')
    expect(parseLocalNumber(-10000)).toEqual('-10 000')
    expect(parseLocalNumber(10000000)).toEqual('10 000 000')
  })
  it('should return 0', () => {
    expect(parseLocalNumber(undefined)).toEqual('0')
    expect(parseLocalNumber(null)).toEqual('0')
    expect(parseLocalNumber('')).toEqual('0')
    expect(parseLocalNumber('0')).toEqual('0')
    expect(parseLocalNumber(0)).toEqual('0')
    expect(parseLocalNumber(-0)).toEqual('0')
    expect(parseLocalNumber(+0)).toEqual('0')
  })
})
