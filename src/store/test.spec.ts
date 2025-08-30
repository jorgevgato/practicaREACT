import type { RootState } from ".";
import type { Advert } from "../pages/adverts/types";
import { authLogin, advertsLoaded } from "./action";
import { adverts, auth } from "./reducer";
import { getAdverts, getDetail } from "./selectors";

describe("actions", () => {
  test('should return "auth/login" action', () => {
    const expected = { type: "auth/login" };
    const result = authLogin();
    expect(result).toEqual(expected);
  });

  test('should return "adverts/loaded" action'),
    () => {
      const expected = { type: "adverts/loaded", payload: [] };
      const result = advertsLoaded([]);
      expect(result).toEqual(expected);
    };
});

describe("reducers", () => {
  test('should manage "auth/login" action', () => {
    const result = auth(undefined, { type: "auth/login" });
    expect(result).toBe(true);
  });

  test('should manage "auth/logout" action', () => {
    const result = auth(undefined, { type: "auth/logout" });
    expect(result).toBe(false);
  });

  test("should manage any other action", () => {
    const result = auth(true, { type: "tags/loaded", payload: [] });
    expect(result).toBe(true);
  });

  test('should manage "adverts/created" action', () => {
    const advert: Advert = {
      id: "101",
      createdAt: "2025-05-26T17:48:08.000Z",
      name: "Test",
      sale: true,
      price: 111,
      tags: ["work"],
      photo: null,
    };
    const result = adverts([], {
      type: "adverts/created",
      payload: advert,
    });
    expect(result).toEqual([advert]);
    expect(result).toHaveLength(1);
  });
});

describe("selectors", () => {
  const adverts: Advert[] = [
    {
      id: "101",
      createdAt: "2025-05-26T17:48:08.000Z",
      name: "Test advert 1",
      sale: true,
      price: 111,
      tags: ["work"],
      photo: null,
    },
    {
      id: "102",
      createdAt: "2025-05-27T17:48:08.000Z",
      name: "Test advert 2",
      sale: false,
      price: 222,
      tags: ["lifestyle"],
      photo: null,
    },
  ];
  const detail: Advert = {
    id: "103",
    createdAt: "2025-05-28T17:48:08.000Z",
    name: "Detail advert",
    sale: true,
    price: 333,
    tags: ["mobile"],
    photo: null,
  };
  const mockState: RootState = {
    auth: false,
    adverts,
    tags: ["work", "lifestyle", "mobile"],
    detail,
  };

  test("getAdverts should return adverts from state", () => {
    const result = getAdverts(mockState);
    expect(result).toEqual(adverts);
    expect(result).toHaveLength(2);
  });

  test("getDetail should return current advert detail", () => {
    const result = getDetail(mockState);
    expect(result).toEqual(detail);
    expect(result?.id).toBe("103");
  });
});
