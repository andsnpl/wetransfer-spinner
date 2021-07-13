import { render } from "@testing-library/react";
import Spinner from "../Spinner";

describe("Spinner", () => {
  it("should render in the READY state", () => {
    const { container } = render(<Spinner state="READY" value={0} />);
    expect(container).toMatchSnapshot();
  });

  it("should render in the ACTIVE state", () => {
    const { container } = render(<Spinner state="ACTIVE" value={0} />);
    expect(container).toMatchSnapshot();
  });

  it("should render in the PAUSED state", () => {
    const { container } = render(<Spinner state="PAUSED" value={0} />);
    expect(container).toMatchSnapshot();
  });

  it("should render when partially completed", () => {
    const { container } = render(<Spinner state="ACTIVE" value={66} />);
    expect(container).toMatchSnapshot();
  });
});
