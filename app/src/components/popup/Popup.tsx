import { css, cx } from '@emotion/css';
import { font } from '../../styles';
import { Box } from '../../components';

interface Props {
  [key: string]: any;
}

function Popup({ text1, text2, visible, children }: Props) {
  const container = css`
    visibility: ${visible ? 'visible' : 'hidden'};
  `;

  const box = css`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 3;
  `;

  const text = css`
    width: 230px;
    line-height: 23.8px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    ${font.size[14]}
    ${font.weight.regular}
  `;

  const btnWrapper = css`
    width: 156px;
    margin-top: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    & :not(:first-child) {
      margin-left: 8px;
    }
  `;

  const overlay = css`
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    z-index: 2;
  `;

  return (
    <div className={cx(container)}>
      <Box size={[360, 205]} className={box}>
        <div className={cx(text)}>
          {text1}
          <br />
          {text2}
        </div>
        <div className={cx(btnWrapper)}>{children}</div>
      </Box>
      <div className={cx(overlay)}></div>
    </div>
  );
}

export default Popup;
