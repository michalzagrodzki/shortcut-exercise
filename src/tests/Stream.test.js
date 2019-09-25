import React from "react";
import { MemoryRouter } from "react-router-dom";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import Stream from './../components/Stream/Stream';

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("renders with title", () => {
  act(() => {
    render(
      <MemoryRouter>
        <Stream />
      </MemoryRouter>, 
      container
    );
  });
  const title = container.querySelector('.stream-head-section h1');
  expect(title.textContent).toBe('Twitter Stream');
});
