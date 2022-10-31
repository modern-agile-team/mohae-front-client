interface Basket {
  [numberKey: number]: {
    [key: string]: string;
  };
}

interface RecommendProps {
  imgUrl: { default: string; hover: string };
  text: { first: string; second: string };
}

export type { Basket, RecommendProps };
