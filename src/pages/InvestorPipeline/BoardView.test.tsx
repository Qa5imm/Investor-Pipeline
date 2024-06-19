import { screen, render } from "@testing-library/react";
import { Column } from "./BoardView";

jest.mock("react-intersection-observer", () => {});
jest.mock("@tanstack/react-query", () => {});

const title = "Identified";
const deals = [
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

describe("Board View", () => {
  it("should place card in the correct column", async () => {
    render(<Column deals={deals} title={title} onUpdateDeals={jest.fn} />);

    expect(screen.getByText("TechStars")).toBeInTheDocument();
    expect(screen.getByText("TechStars")).toBeInTheDocument();
    expect(screen.queryByText("Twitter")).not.toBeInTheDocument();
  });
});
