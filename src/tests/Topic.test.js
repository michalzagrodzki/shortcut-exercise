import React from "react";
import { MemoryRouter } from "react-router-dom";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import Topic from './../components/Topic/Topic';

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
        <Topic />
      </MemoryRouter>, 
      container
    );
  });
  const title = container.querySelector('.topic-head-section h1');
  expect(title.textContent).toBe('Twitter Topic Stream');
});
