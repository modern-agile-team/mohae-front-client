/** @format */

import { Img, Btn } from '../../components';

export default function Completion() {
  const text: { [key: string]: any } = {
    completion: '회원 탈퇴가 완료되었습니다.',
    description: '모해를 이용해 주시고 사랑해 주셔서 감사합니다. ',
    sub: '더욱 더 노력하고 발전하는 모해가 되겠습니다.',
    toMain: '메인 바로가기',
  };

  return (
    <>
      <div className={'img'}>
        <Img src={'/img/complete.png'} />
      </div>
      <div className={'description'}>{text.completion}</div>
      <div className={'desc-completion'}>
        <div>{text.description}</div>
        <div>{text.sub}</div>
      </div>
      <div className={'btn-main'}>
        <Btn>
          <span>{text.toMain}</span>
          <div className={'move'}>
            <Img src={'/img/move.png'} />
          </div>
        </Btn>
      </div>
    </>
  );
}
