/** @format */

import Main from './Main';
import Agreement from './Agreement';
import PersonalInfo from './PersonalInfo';
interface Props {
  [key: string]: any;
}

export default function Register({ text }: Props) {
  return (
    <>
      {/* <Main text={text} /> */}
      {/* <Agreement /> */}
      <PersonalInfo />
    </>
  );
}
