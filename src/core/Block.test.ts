import { assert } from "chai";
import Block from "./Block";

const dummyElement = document.createElement('span');
dummyElement.textContent = 'text here';

class Dummy extends Block {
  render() {
    return dummyElement;
  }
}

const block = new Dummy('div', {
  className: 'class-1 class-2',
})

describe('Block component', () => {
  it('should the right tag name', () => {
    const result = block._meta.tagName;

    assert.equal(result, 'div');
  })

  it('should the right structure', () => {
    const result = block.getContent().innerHTML;

    assert.equal(result, '<span>text here</span>');
  })

  it('should set and get attribute', () => {
    block.getContent().setAttribute('class', 'class-3');

    assert.equal(block.getContent().getAttribute('class'), 'class-3');
  })

  it('should changes props', () => {
    block.setProps({ text: 'Hello world' });

    assert.deepEqual(block.props, {
      className: 'class-1 class-2',
      text: 'Hello world',
    });
  })
})
