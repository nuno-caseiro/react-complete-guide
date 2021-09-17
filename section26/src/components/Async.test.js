import { render, screen } from "@testing-library/react";
import Async from "./Async";

describe("async component", () => {
  test("renders posts if request succeeds", async () => {
      //simular caso de sucesso sem enviar pedidos desnecessarios
    window.fetch = jest.fn();
    //async de seguida porque .json devolve uma promise
    window.fetch.mockResolvedValueOnce({
      json: async () => [{id: 'p1', title: 'first post'}],
    });
    render(<Async />);

    const listItemElements = await screen.findAllByRole("listitem", {}, {});
    expect(listItemElements).not.toHaveLength(0);
  });
});
