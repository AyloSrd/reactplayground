import BrushSVG from "@/components/ui-elements/icons/BrushSVG";
import Button from "@/components/ui-elements/Button";
import { colors } from "@/tools/style-tools";
import { useCreateEvento } from "evento-react";
import React, { memo, useCallback, type FC } from "react";
import styled from "styled-components";

interface Props {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => any;
}

const BrushButton: FC<Props> = (props) => {
  const evento = useCreateEvento(props);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      evento("click", e);
    },
    [props],
  );

  return (
    <Button onClick={handleClick}>
      <BrushSVG height={"25px"} width={"25px"} />
    </Button>
  );
};

export default memo(BrushButton);
