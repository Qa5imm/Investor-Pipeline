// @ts-nocheck

import { fireEvent, render, screen } from "@testing-library/react";
import InvestorPipeline from "./InvestorPipeline";
import StateProvider from "../../providers/StateProvider";
import useDealsQuery from "../../hooks/useDealsQuery";
import { useInView } from "react-intersection-observer";
import userEvent from "@testing-library/user-event";

jest.mock("react-intersection-observer", () => {
  return {
    useInView: jest.fn(),
  };
});
jest.mock("@tanstack/react-query", () => {});
jest.mock("../../hooks/useDealsQuery");

const mockDeals = [
  {
    name: "TechStars",
    pipelineStage: "Identified",
    investments: 450,
    "3monCount": 5,
    dealNotes: "",
  },
];
const formattedMockDeals = {
  pages: [
    {
      data: mockDeals,
    },
  ],
};

describe("Investor Pipeline", () => {
  // intergration testing
  it("should syncrhonize state changes from list to board view", async () => {
    const user = userEvent.setup();
    const mockFunction = jest.fn();

    useDealsQuery.mockReturnValue({
      data: formattedMockDeals,
      isLoading: false,
      isError: false,
      fetchNextPage: mockFunction,
      isFetchingNextPage: false,
      isFetchNextPageError: false,
    });

    useInView.mockReturnValue({
      ref: { current: {} },
      InView: {},
    });
    render(
      <StateProvider>
        <InvestorPipeline />
      </StateProvider>
    );
    const stageDropdown = screen.getByTestId("dropdown");
    const saveButton = screen.getByTestId("save-button");
    const toggleButton = screen.getByText("List View");

    await user.selectOptions(stageDropdown, "Disappeared");
    await user.click(saveButton);
    expect(stageDropdown).toHaveValue("Disappeared");

    // this will change the view from list to board
    await user.click(toggleButton);

    // testing whether updated changes reflect in the board view
    const stageColumn = screen.getByTestId("Disappeared");
    expect(stageColumn).toHaveTextContent("TechStars");
  });

  it("should syncrhonize state changes from board to list view", async () => {
    const user = userEvent.setup();
    const mockFunction = jest.fn();

    useDealsQuery.mockReturnValue({
      data: formattedMockDeals,
      isLoading: false,
      isError: false,
      fetchNextPage: mockFunction,
      isFetchingNextPage: false,
      isFetchNextPageError: false,
    });

    useInView.mockReturnValue({
      ref: { current: {} },
      InView: {},
    });

    const dataTransfer = {
      setData: jest.fn(),
      getData: jest.fn(() => "TechStars"),
    };
    render(
      <StateProvider>
        <InvestorPipeline />
      </StateProvider>
    );

    const toggleButton = screen.getByText("List View");

    // this will change the view from list to board view (default is list View)
    await user.click(toggleButton);

    const card = screen.getByTestId("TechStars");
    const dropColumn = screen.getByTestId("Disappeared");

    fireEvent.dragStart(card, { dataTransfer });
    fireEvent.dragOver(dropColumn);
    fireEvent.drop(dropColumn, { dataTransfer });
    fireEvent.dragEnd(card);
    expect(dropColumn).toHaveTextContent("TechStars");

    // this will change the view from board to list
    await user.click(toggleButton);

    // testing whether updated changes reflect in the list view
    const stageDropdown = screen.getByTestId("dropdown");
    expect(stageDropdown).toHaveValue("Disappeared");
  });

  // unit testing
  it("should change the view on toggle", async () => {
    const user = userEvent.setup();
    const mockFunction = jest.fn();

    useDealsQuery.mockReturnValue({
      data: formattedMockDeals,
      isLoading: false,
      isError: false,
      fetchNextPage: mockFunction,
      isFetchingNextPage: false,
      isFetchNextPageError: false,
    });

    useInView.mockReturnValue({
      ref: { current: {} },
      InView: {},
    });
    render(
      <StateProvider>
        <InvestorPipeline />
      </StateProvider>
    );
    const toggleButton = screen.getByText("List View");
    expect(screen.getByText("List View")).toBeInTheDocument();
    await user.click(toggleButton);
    expect(screen.getByText("Board View")).toBeInTheDocument();
  });
});
