import { css, cx } from '@emotion/css';

interface Props {
  src: string;
  onClick: (e: React.MouseEvent<HTMLDivElement>) => any;
}

function Img(props: Props) {
  const { src, onClick } = props;

  const commonStyle = css`
    width: 100%;
    height: 100%;
    background: no-repeat center/contain url(${String(src)});
  `;

  const show = () => <div onClick={onClick} className={cx(commonStyle)} />;

  return show();
}

export default Img;
