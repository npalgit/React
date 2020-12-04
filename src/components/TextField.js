import styled from "styled-components";
const Text = styled.p`
font-size: 25px;
`;
const Error = styled(Text)`
  font-size: 12px;
  color: red;
`;
const StyledInput = styled.input`
  width: 70px;
  height: 70px;
  font-size: 16px;
  padding: 6px 8px;
  margin: 0px;
  border: none;
  background: #e2e1e1;
  border-color: ${(props) => (props.error ? "red" : "")};
`;
export { Text, Error, StyledInput };
