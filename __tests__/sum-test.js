jest.unmock('../public/sum')

describe('sum', () =>{
  it('adds 1+2', () => {
    var sum = require('../public/sum');
    expect(sum(1,2)).toBe(3);
  })
})
