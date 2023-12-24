import AddSVG from "@/components/ui-elements/icons/AddSVG";
import Button from "@/components/ui-elements/Button";
import { colors } from "@/tools/style-tools";
import { useCreateEvento } from "evento-react";
import React, { memo, useCallback } from "react";
import styled from "styled-components";

interface Props {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => any;
}

const AddButton = (props: Props) => {
  const evento = useCreateEvento(props);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      evento("click", e);
    },
    [props],
  );

  return (
    <Button onClick={handleClick}>
      <AddSVG height={"25px"} width={"25px"} />
    </Button>
  );
};

export default memo(AddButton);
