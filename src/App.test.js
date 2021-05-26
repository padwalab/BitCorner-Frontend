import { render, screen, fireEvent } from "@testing-library/react";
import Search from "./components/Search";

test("test1", () => {
  render(<Search />);
  const source3 = screen.getByTestId("searchKeys");
  fireEvent.change(source3, { target: { value: "288" } });
  expect(source3.value).toBe("288");
});
test("test2", () => {
  render(<Search />);
  const source3 = screen.getByTestId("searchKeys");
  fireEvent.change(source3, { target: { value: "275" } });
  expect(source3.value).toBe("275");
});
test("test3", () => {
  render(<Search />);
  const source3 = screen.getByTestId("searchKeys");
  fireEvent.change(source3, { target: { value: "312" } });
  expect(source3.value).toBe("312");
});
test("test4", () => {
  render(<Search />);
  const source3 = screen.getByTestId("searchKeys");
  fireEvent.change(source3, { target: { value: "453" } });
  expect(source3.value).toBe("453");
});
test("test5", () => {
  render(<Search />);
  const source3 = screen.getByTestId("searchKeys");
  fireEvent.change(source3, { target: { value: "674" } });
  expect(source3.value).toBe("674");
});
