import { NullToNAPipe } from './null-to-na.pipe';

describe('NullToNAPipe', () => {
  it('create an instance', () => {
    const pipe = new NullToNAPipe();
    expect(pipe).toBeTruthy();
  });
});
