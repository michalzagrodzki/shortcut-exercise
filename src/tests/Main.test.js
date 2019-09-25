import React from "react";
import { MemoryRouter } from "react-router-dom";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import Main from './../components/Main/Main';

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
        <Main />
      </MemoryRouter>, 
      container
    );
  });
  const title = container.querySelector('.main-head-section h1');
  expect(title.textContent).toBe('Twitter stream');
});

it("renders with search input field", () => {
  act(() => {
    render(
      <MemoryRouter>
        <Main />
      </MemoryRouter>, 
      container
    );
  });
  const input = container.querySelector('.main-search-section input');
  expect(input).toBeDefined();
});

it("renders with search button", () => {
  act(() => {
    render(
      <MemoryRouter>
        <Main />
      </MemoryRouter>, 
      container
    );
  });
  const button = container.querySelector('.main-search-section button');
  expect(button.textContent).toBe('Search');
});
