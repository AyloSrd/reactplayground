import { colors } from "@/tools/style-tools";
import { memo } from "react";
import styled from "styled-components";

const Button = styled.button`
  background: none;
  border: none;
  color: ${colors.$silver200};
  min-height: 30px;
  min-width: 30px;
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:hover {
    color: ${colors.$silver100};
  }
`;

export default memo(Button);
