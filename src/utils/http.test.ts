import { expect, use } from 'chai';
import sinonChai from 'sinon-chai';
import { createSandbox, SinonStub } from 'sinon';
import { HTTP } from './index';

describe('HTTP Transport', () => {
  use(sinonChai);
  const sandbox = createSandbox();
  let http: HTTP;
  let request: SinonStub<any>;

  beforeEach(() => {
    http = new HTTP();
    request = sandbox.stub(http, 'request' as keyof typeof http)
      .callsFake(() => Promise.resolve({
        status: 200,
        response: 'any',
      }));
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should stringify query object for GET request where all parameters are string', () => {
    http.get('', {
      data: {
        a: '1',
        b: '2',
        c: '3',
      },
    });

    expect(request).calledWithMatch('?a=1&b=2&c=3');
  });

  it(`should stringify query object for GET request where all parameters are string and number`, () => {
    http.get('', {
      data: {
        a: 1,
        b: 'string',
      },
    });

    expect(request).calledWithMatch('?a=1&b=string');
  });

  it(`should encode characters for query`, () => {
    http.get('', {
      data: {
        a: '1+2',
        b: '2 2',
      },
    });

    expect(request).calledWithMatch('?a=1%2B2&b=2%202');
  });

  it(`should encode characters for query`, () => {
    http.get('', {
      data: {
        a: '1=2&1',
      },
    });

    expect(request).calledWithMatch('?a=1%3D2%261');
  });
});
