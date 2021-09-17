import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Greeting from "./Geeting";
describe("Greeting component", () => {
  test("renders Hello World as a text", () => {
    //arrange
    render(<Greeting />);

    //act
    screen.getByText("Hello world");

    //assert
    const helloWorldElement = screen.getByText("Hello World", { exact: false });
    expect(helloWorldElement).toBeInTheDocument();
  });

  test("renders good to see if the button was NOT clicked", () => {
    //arrange
    render(<Greeting />);

    //assert
    const goodToSeeYouElement = screen.getByText("It's good to see you!", {
      exact: false,
    });
    expect(goodToSeeYouElement).toBeInTheDocument();
  });

  test("renders good to see if the button was clicked", () => {
    //arrange
    render(<Greeting />);

    //screen.getByText("Change text").click()
    const buttonElement = screen.getByRole("button");
    userEvent.click(buttonElement);
    //assert
    const changedElement = screen.getByText("Changed!", { exact: false });

    expect(changedElement).toBeInTheDocument();
  });
  test("renders no good to see if the button was clicked", () => {
    //arrange
    render(<Greeting />);

    //screen.getByText("Change text").click()
    const buttonElement = screen.getByRole("button");
    userEvent.click(buttonElement);
    //assert
    const changedElement = screen.queryByText("It's good to see you!", {
      exact: false,
    });

    expect(changedElement).toBeNull();
  });
});
