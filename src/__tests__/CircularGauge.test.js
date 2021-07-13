import { render } from "@testing-library/react";
import CircularGauge from "../CircularGauge";

describe("CircularGauge", () => {
  it("should render with 0%", () => {
    const { container } = render(<CircularGauge value={0} />);
    expect(container).toMatchSnapshot();
  });

  it("should render with 1%", () => {
    const { container } = render(<CircularGauge value={1} />);
    expect(container).toMatchSnapshot();
  });

  it("should render with 1% and an offset origin", () => {
    const { container } = render(<CircularGauge value={1} origin={30} />);
    expect(container).toMatchSnapshot();
  });

  it("should render with 50%", () => {
    const { container } = render(<CircularGauge value={1} />);
    expect(container).toMatchSnapshot();
  });

  it("should render with 100%", () => {
    const { container } = render(<CircularGauge value={100} />);
    expect(container).toMatchSnapshot();
  });

  it("should render with custom colors", () => {
    const { container } = render(
      <CircularGauge
        value={10}
        fillColor="#bada55"
        backgroundColor="#00b1ec"
        pageColor="#1e1e1e"
      />
    );
    expect(container).toMatchSnapshot();
  });

  it("should render with custom children", () => {
    const { container } = render(
      <CircularGauge value={77}>
        Custom <strong>children</strong>
      </CircularGauge>
    );
    expect(container).toMatchSnapshot();
  });
});
