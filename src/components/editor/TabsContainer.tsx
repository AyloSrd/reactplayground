import AddButton from "@/components/ui-elements/AddButton";
import BrushButton from "@/components/ui-elements/BrushButton";
import Tab from "@/components/editor/Tab";
import TabInput from "@/components/editor/TabInput";
import { ENTRY_POINT_JSX } from "@/hooks/playground/useVFS";
import { generateNewTabName } from "@/tools/editor-tools";
import { useCreateEvento } from "evento-react";
import { memo, useCallback, useState } from "react";
import { colors, generalBorderStyle } from "@/tools/style-tools";
import styled from "styled-components";
import Tooltip from "@/components/ui-elements/Tooltip";
import { useTabsScroller } from "@/hooks/playground/editor/useTabsScroller";
interface Props {
  currentTab: string;
  onFormat: () => void;
  onTabCreate: (e: CustomEvent<string>) => void;
  onTabDelete: (e: CustomEvent<string>) => void;
  onTabEdit: (e: CustomEvent<{ current: string; next: string }>) => void;
  onTabSelect: (e: CustomEvent<string>) => void;
  tabs: string[];
}

function TabsContainer(props: Props) {
  const { currentTab, tabs } = props;
  const {
    containerRef,
    tabsRef,
    isOverflowedLeft,
    isOverflowedRight,
    handleScroll,
  } = useTabsScroller({ tabs });

  const [editedTab, setEditedTab] = useState<null | string>(null);
  const [newTab, setNewTab] = useState<null | string>(null);

  const evento = useCreateEvento(props);

  const handleAddClick = useCallback(() => {
    setNewTab(generateNewTabName(tabs));
  }, []);

  const handleNewTabAdd = useCallback(
    (e: CustomEvent<{ current: string; next: string }>) => {
      evento("tabCreate", e.detail.next).then((res) => {
        if (res) {
          setNewTab(null);
        }
      });
    },
    [newTab],
  );

  const handleTabDelete = useCallback(
    (e: CustomEvent<string>) => {
      evento("tabDelete", e.detail);
    },
    [evento],
  );

  const handleTabEdit = useCallback(
    (e: CustomEvent<{ current: string; next: string }>) => {
      const { current, next } = e.detail;
      if (next === ENTRY_POINT_JSX) {
        setEditedTab(null);
        return;
      }

      evento("tabEdit", { current, next }).then((res) => {
        if (res) {
          setEditedTab(null);
        }
      });
    },
    [],
  );

  const handleTabEditRequest = useCallback((e: CustomEvent<string>) => {
    setEditedTab(e.detail);
  }, []);

  const handleTabSelect = useCallback(
    (e: CustomEvent<string>) => {
      evento("tabSelect", e.detail);
    },
    [evento],
  );

  const handleFormatClick = useCallback(() => {
    evento("format");
  }, [evento]);

  return (
    <Container hasBefore={isOverflowedLeft} ref={containerRef}>
      <Nav onScroll={handleScroll} ref={tabsRef}>
        <Tabs hasRightPadding={isOverflowedRight}>
          {tabs.map((tab) =>
            tab === editedTab ? (
              <TabInput
                existingTabNames={tabs}
                key={tab}
                onNewNameSubmit={handleTabEdit}
                tab={tab}
              />
            ) : (
              <Tab
                currentTab={currentTab}
                key={tab}
                onDelete={handleTabDelete}
                onEditRequest={handleTabEditRequest}
                onSelect={handleTabSelect}
                tab={tab}
              />
            ),
          )}
          {typeof newTab === "string" && (
            <TabInput
              existingTabNames={tabs}
              onNewNameSubmit={handleNewTabAdd}
              tab={newTab}
            />
          )}
        </Tabs>
      </Nav>
      <Buttons hasBefore={isOverflowedRight}>
        <Tooltip text="Add new file">
          <AddButton onClick={handleAddClick} />
        </Tooltip>
        <Tooltip text="Format code">
          <BrushButton onClick={handleFormatClick} />
        </Tooltip>
      </Buttons>
    </Container>
  );
}

const Nav = styled.nav`
  position: relative;
  width: 100%;
  max-width: 100%;
  flex-wrap: nowrap;
  overflow-x: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const Tabs = styled.ul<{
  hasRightPadding: boolean;
}>`
  width: 100%;
  list-style-type: none;
  height: 100%;
  margin: 0;
  padding: ${(hasRightPadding) => (hasRightPadding ? "0 50px 0 0" : "0")};
  display: flex;
  align-items: center;
`;

const Container = styled.div<{
  hasBefore: boolean;
}>`
  position: relative;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr auto;
  border-bottom: ${generalBorderStyle};
  &::before {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    width: 50px;
    pointer-events: none;
    left: 0;
    background-image: linear-gradient(to right, ${colors.$bg}, transparent);
    z-index: 2;
    opacity: ${({ hasBefore }) => (hasBefore ? 1 : 0)};
  }
`;

const Buttons = styled.div<{
  hasBefore: boolean;
}>`
  padding: 0 10px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 5px;
  position: relative;
  &::before {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    width: 50px;
    pointer-events: none;
    left: -50px;
    background-image: linear-gradient(to left, ${colors.$bg}, transparent);
    z-index: 2;
    opacity: ${({ hasBefore }) => (hasBefore ? 1 : 0)};
  }
`;

export default memo(TabsContainer);
