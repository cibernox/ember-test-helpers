import getElement from './-get-element';
import fireEvent from './fire-event';
import { __focus__ } from './focus';
import settled from '../settled';
import isFocusable from './-is-focusable';
import { nextTickPromise } from '../-utils';

/**
  @private
  @param {Element} element the element to double-click on
*/
export function __doubleClick__(element) {
  fireEvent(element, 'mousedown');

  if (isFocusable(element)) {
    __focus__(element);
  }

  fireEvent(element, 'mouseup');
  fireEvent(element, 'click');
  fireEvent(element, 'mousedown');
  fireEvent(element, 'mouseup');
  fireEvent(element, 'click');
  fireEvent(element, 'dblclick');
}

/**
  Double-clicks on the specified target.

  Sends a number of events intending to simulate a "real" user clicking on an
  element.

  For non-focusable elements the following events are triggered (in order):

  - `mousedown`
  - `mouseup`
  - `click`
  - `mousedown`
  - `mouseup`
  - `click`
  - `dblclick`

  For focusable (e.g. form control) elements the following events are triggered
  (in order):

  - `mousedown`
  - `focus`
  - `focusin`
  - `mouseup`
  - `click`
  - `mousedown`
  - `mouseup`
  - `click`
  - `dblclick`

  The exact listing of events that are triggered may change over time as needed
  to continue to emulate how actual browsers handle clicking a given element.

  @public
  @param {string|Element} target the element or selector to double-click on
  @return {Promise<void>} resolves when settled
*/
export default function doubleClick(target) {
  return nextTickPromise().then(() => {
    if (!target) {
      throw new Error('Must pass an element or selector to `doubleClick`.');
    }

    let element = getElement(target);
    if (!element) {
      throw new Error(`Element not found when calling \`doubleClick('${target}')\`.`);
    }

    __doubleClick__(element);
    return settled();
  });
}
