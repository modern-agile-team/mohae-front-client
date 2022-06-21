/** @format */

import Main from './Main';
import Agreement from './Agreement';
import PersonalInfo from './PersonalInfo';
interface Props {
  [key: string]: any;
}

export default function Register({ text }: Props) {
  const main = false,
    agreement = false,
    info = false;
  const show = {
    main: <Main text={text} />,
    agreement: <Agreement />,
    info: <PersonalInfo />,
  };

  return <>{show.info}</>;
}
