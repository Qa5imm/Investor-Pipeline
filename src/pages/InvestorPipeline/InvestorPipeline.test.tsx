// @ts-nocheck

// intergration testing
import { render, screen } from "@testing-library/react";
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
jest.mock("../hooks/useDealsQuery");

const user = userEvent.setup();
const mockFunction = jest.fn();
const mockDealsData = [
  {
    name: "TechStars",
    pipelineStage: "Identified",
    investments: 450,
    "3monCount": 5,
    dealNotes: "",
  },
];
const formattedMockDealsData = {
  pages: [
    {
      data: mockDealsData,
    },
  ],
};
test("should syncrhonize state changes between two viwes", async () => {
  // Mock implementation of useDealsQuery
  useDealsQuery.mockReturnValue({
    data: formattedMockDealsData,
    isLoading: false,
    isError: false,
    fetchNextPage: mockFunction,
    isFetchingNextPage: false,
    isFetchNextPageError: false,
  });

  // Mock implementation of useDealsQuery
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
  const toggleButton = screen.getByLabelText("List View");

  await user.selectOptions(stageDropdown, "Disappeared");
  await user.click(saveButton);
  expect(stageDropdown).toHaveValue("Disappeared");

  // this will change the view from list to board
  await user.click(toggleButton);

  // testing whether updated changes reflect in the board view
  const stageColumn = screen.getByTestId("Disappeared");
  expect(stageColumn).toHaveTextContent("TechStars");
});
