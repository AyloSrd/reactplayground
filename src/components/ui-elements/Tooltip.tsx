import React, { type FC, type PropsWithChildren } from "react";

interface Props {
  text: string;
}

const Tooltip: FC<PropsWithChildren<Props>> = ({ children, text }) => (
  <div title={text}>{children}</div>
);

export default Tooltip;
