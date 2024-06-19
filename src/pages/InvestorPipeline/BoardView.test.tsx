//@ts-nocheck
import { fireEvent, render, screen } from "@testing-library/react";
import StateProvider from "../../providers/StateProvider";
import useDealsQuery from "../../hooks/useDealsQuery";
import { useInView } from "react-intersection-observer";
import BoardView, { Column } from "./BoardView";

jest.mock("react-intersection-observer", () => {
  return {
    useInView: jest.fn(),
  };
});
jest.mock("@tanstack/react-query", () => {});
jest.mock("../../hooks/useDealsQuery");

const title = "Identified";
const mockedDeals = [
  {
    name: "TechStars",
    pipelineStage: "Identified",
    investments: 450,
    "3monCount": 5,
    dealNotes: "",
  },
  {
    name: "AngelPad",
    pipelineStage: "Identified",
    investments: 200,
    "3monCount": 3,
    dealNotes: "",
  },
  {
    name: "Twitter",
    pipelineStage: "Call Scheduled",
    investments: 300,
    "3monCount": 8,
    dealNotes: "",
  },
];

const formattedMockDealsData = {
  pages: [
    {
      data: [mockedDeals[0]],
    },
  ],
};

describe("Board View", () => {
  const mockFunction = jest.fn();
  it("should place card in the correct column", async () => {
    render(
      <Column deals={mockedDeals} title={title} onUpdateDeals={jest.fn} />
    );

    expect(screen.getByText("TechStars")).toBeInTheDocument();
    expect(screen.getByText("AngelPad")).toBeInTheDocument();
    expect(screen.queryByText("Twitter")).not.toBeInTheDocument();
  });

  it("should correctly drag and drop cards between columns", async () => {
    useDealsQuery.mockReturnValue({
      data: formattedMockDealsData,
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
        <BoardView />
      </StateProvider>
    );

    const card = screen.getByTestId("TechStars");

    const dragColumn = screen.getByTestId("Identified");
    const dropColumn = screen.getByTestId("Disappeared");

    const dataTransfer = {
      setData: jest.fn(),
      getData: jest.fn(() => "TechStars" ),
    };

    fireEvent.dragStart(card, { dataTransfer });
    fireEvent.dragOver(dropColumn);
    fireEvent.drop(dropColumn, { dataTransfer });
    fireEvent.dragEnd(card);
    expect(dropColumn).toHaveTextContent("TechStars");
    expect(dragColumn).not.toHaveTextContent("TechStars");
  });
});
