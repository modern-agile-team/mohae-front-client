interface ContainerProps {
  used: 'board' | 'main';
  resetPageNation?: () => void;
}

interface PresenterProps {
  used: string;
  resetPageNation?: () => void;
}

export type { ContainerProps, PresenterProps };
