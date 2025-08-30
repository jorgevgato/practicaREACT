import { describe, test, expect, vi, beforeEach } from "vitest";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import LoginPage from "./login-page";

vi.mock("../../store/hooks", () => ({
  useLoginAction: vi.fn(),
}));

import { useLoginAction } from "../../store/hooks";

vi.mock("react-router", async () => {
  const actual =
    await vi.importActual<typeof import("react-router")>("react-router");
  return {
    ...actual,
    useLocation: () => ({ state: {} }),
    useNavigate: () => vi.fn(),
  };
});

describe("LoginPage component", () => {
  const mockStore = configureMockStore();
  const store = mockStore({
    auth: false,
    adverts: [],
    tags: [],
    detail: null,
  });

  const mockedLoginAction = useLoginAction as unknown as ReturnType<
    typeof vi.fn
  >;

  beforeEach(() => {
    mockedLoginAction.mockReset();
  });

  const renderComponent = () =>
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>,
    );

  test("should render LoginPage and match snapshot", () => {
    const { container } = renderComponent();
    expect(container).toMatchSnapshot();
  });
});
