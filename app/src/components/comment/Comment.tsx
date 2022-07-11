import styled from "@emotion/styled";
import CommentInputForm from "./CommentInputForm";

const Comment = () => {
  return (
    <Wrapper>
      <CommentInputForm />
    </Wrapper>
  );
};

export default Comment;

const Wrapper = styled.div`
  box-shadow: 0px 0px 8px rgba(132, 131, 141, 0.5);
  border-radius: 6px;
  padding: 16px 24px;
`;
