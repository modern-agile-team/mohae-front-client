import { css, cx } from '@emotion/css';
import { Props } from '../button';

function ArrowBtn(props: Props) {
  const { big, small, up, right, down, left, main, light, dark, onClick } =
    props;

  interface Imgs {
    [shape: string]: {
      [color: string]: string;
    };
  }

  const imgs: Imgs = {
    up: {
      dark: css`
        background: no-repeat center/contain url('img/arrow-up-dark3.png');
      `,
    },

    right: {
      main: css`
        background: no-repeat right/contain url('img/arrow-right-main.png');
      `,
      light: css`
        background: no-repeat right/contain url('img/arrow-right-light1.png');
      `,
    },

    down: {
      dark: css`
        background: no-repeat center/contain url('img/arrow-down-dark3.png');
      `,
    },

    left: {
      main: css`
        background: no-repeat left/contain url('img/arrow-left-main.png');
      `,
      light: css`
        background: no-repeat left/contain url('img/arrow-left-light1.png');
      `,
      dark: css`
        background: no-repeat left/contain url('img/arrow-left-dark1.png');
      `,
    },
  };

  const size = () =>
    big
      ? css`
          width: 48px;
          height: 48px;
        `
      : css`
          width: 24px;
          height: 24px;
        `;

  const checkProps = () =>
    Object.keys(props)
      .map(prop => imgs[prop])
      .filter(el => el);

  const rowNation = () =>
    checkProps().map(el => (main ? [el.main] : [el.light]));

  const colNation = () => checkProps().map(el => [el.dark]);

  const show = () => (
    <div
      onClick={onClick}
      className={cx(!(up || down || dark) ? rowNation() : colNation(), size())}
    />
  );

  return show();
}

export default ArrowBtn;
