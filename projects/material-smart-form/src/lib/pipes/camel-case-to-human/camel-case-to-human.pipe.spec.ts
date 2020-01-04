import { CamelCaseToHumanPipe } from './camel-case-to-human.pipe';

describe('CamelCaseToHumanPipe', () => {
  it('create an instance', () => {
    const pipe = new CamelCaseToHumanPipe();
    expect(pipe).toBeTruthy();
  });
});
