import Button from "@/components/ui-elements/Button";
import ExpandSVG from "@/components/ui-elements/icons/ExpandSVG";
import {
  colors,
  fixedSizes,
  generalBorderStyle,
  transitionDuration,
} from "@/tools/style-tools";
import { consoleStyles } from "@/tools/console-tools";
import { Console as Logs } from "console-feed";
import { Message } from "console-feed/lib/definitions/Component";
import { useCreateEvento } from "evento-react";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";

interface Props {
  logs: Message[];
  onClear: () => any;
}

const Console = (props: Props) => {
  const { logs } = props;

  const [isConsoleOpen, setIsConsoleOpen] = useState<boolean>(false);

  const scrollRef = useRef<HTMLDivElement>(null);

  const evento = useCreateEvento(props);

  const handleClearClick = useCallback(() => {
    evento("clear");
  }, []);

  const handleOpenCloseConsole = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setIsConsoleOpen(e.target.checked);
    },
    [],
  );

  useEffect(() => {
    if (isConsoleOpen) {
      scrollRef?.current?.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [logs]);

  return (
    <Section>
      <Nav>
        <Label htmlFor="open-close">
          <OpenCloseCheckbox
            checked={isConsoleOpen}
            id="open-close"
            onChange={handleOpenCloseConsole}
            type="checkbox"
          />
          <ExpandSVG
            direction={isConsoleOpen ? "down" : "up"}
            height={"20px"}
            width={"20px"}
          />
          Console ({logs.length})
        </Label>
        <Button onClick={handleClearClick}>
          <BtnContent>Clear</BtnContent>
        </Button>
      </Nav>
      <ConsoleBody className={isConsoleOpen ? "open" : "closed"}>
        <Logs logs={logs} styles={consoleStyles} variant={"dark"} />
        <div ref={scrollRef} />
      </ConsoleBody>
    </Section>
  );
};

const Section = styled.section`
  background-color: ${colors.$bg};
  justify-self: stretch;
  display: flex;
  flex-direction: column;
  min-width: 0;
`;

const ConsoleBody = styled.div`
  overflow: auto;
  min-width: 0;

  &.open {
    height: 200px;
    max-height: 200px;
    transition: ${transitionDuration.fast};
    border-top: ${generalBorderStyle};
  }

  &.closed {
    height: 200px;
    max-height: 0;
    transition: ${transitionDuration.fast};
  }
`;

const BtnContent = styled.span`
  color: ${colors.$silver200};

  &:hover {
    color: ${colors.$silver100};
    text-decoration: underline;
  }
`;

const Nav = styled.nav`
  height: ${fixedSizes.editorTabsContainerHeight};
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
`;

const Label = styled.label`
  cursor: pointer;
  display: flex;
  align-items: center;

  &:hover {
    color: ${colors.$silver100};
  }
`;

const OpenCloseCheckbox = styled.input`
  display: none;
`;

export default memo(Console);
