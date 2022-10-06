interface FilterInitialState {
  check: {
    [key: string]: { [key: number | string]: boolean };
  };
  area: {
    [key: string]: string;
  };
  price: {
    [key: string]: number;
  };
}

interface ObjDataProcessing {
  check: {
    sort: {
      [key: string | number]: string | number | true | null;
    };
    target: {
      [key: string]: string | number | true | null;
    };
    date: {
      [key: number]: string | number | true | null;
    };
    free: { 1: string | number | true | null };
  };
  area: {
    areaNo: string | number | true | null;
  };
  price: {
    min: string | number | true | null;
    max: string | number | true | null;
  };
}

export type { FilterInitialState, ObjDataProcessing };
