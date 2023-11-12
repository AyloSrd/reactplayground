import ReactPlaygroundLogoSVG from "@/components/ui-elements/icons/ReactPlaygroundLogoSVG";
import Anchor from "@/components/ui-elements/Anchor";
import BugSVG from "@/components/ui-elements/icons/BugSVG";
import ShareSVG from "@/components/ui-elements/icons/ShareSVG";
import Button from "@/components/ui-elements/Button";
import CodeSandboxLogoSVG from "@/components/ui-elements/icons/CodeSanboxLogoSVG";
import StackblitzLogoSVG from "@/components/ui-elements/icons/StackblitzLogoSVG";
import DownloadSVG from "@/components/ui-elements/icons/DownloadSVG";
import useURLStorage from "@/hooks/playground/useURLStorage";
import { colors, fixedSizes, generalBorderStyle } from "@/tools/style-tools";
import { memo, useCallback } from "react";
import styled from "styled-components";
import { useCreateEvento } from "evento-react";

interface Props {
  onExportToZip: () => void;
  onExportToCodeSandbox: () => void;
  onExportToStackblitz: () => void;
  onReloadPlayground: () => void;
}

const Navbar = (props: Props) => {
  const evento = useCreateEvento(props);
  const { copyURLToClipBoard } = useURLStorage();

  const handleExportToZip = useCallback(() => {
    evento("exportToZip");
  }, [props]);

  const handleExportToCodeSandboxClick = useCallback(() => {
    evento("exportToCodeSandbox");
  }, [props]);

  const handleExportToStackblitz = useCallback(() => {
    evento("exportToStackblitz");
  }, [props]);

  const handleReloadClick = useCallback(() => {
    evento("reloadPlayground");
  }, []);

  const handleShareClick = useCallback(() => {
    copyURLToClipBoard().then(() => alert("link copied to clipboard"));
  }, []);

  return (
    <header>
      <Nav>
        <TitleContainer onClick={handleReloadClick}>
          <ReactPlaygroundLogoSVG height="30px" width="100%" />
          <Title>React Playground</Title>
        </TitleContainer>
        <ButtonContainer>
          <div title="Download your zipped project">
            <Button onClick={handleExportToZip}>
              <BtnContent>
                <DownloadSVG height="30px" width="30px" />
              </BtnContent>
            </Button>
          </div>
          <div title="Export to Stackblitz">
            <Button onClick={handleExportToStackblitz}>
              <BtnContent>
                <StackblitzLogoSVG height="20px" width="20px" />
              </BtnContent>
            </Button>
          </div>
          <div title="Export to CodeSandbox">
            <Button onClick={handleExportToCodeSandboxClick}>
              <BtnContent>
                <CodeSandboxLogoSVG height="20px" width="20px" />
              </BtnContent>
            </Button>
          </div>
          <div title="Get shareable link">
            <Button onClick={handleShareClick}>
              <BtnContent>
                <ShareSVG height="25px" width="25px" />
              </BtnContent>
            </Button>
          </div>
          <div title="Report bug or issue">
            <Button>
              <Anchor
                href="https://github.com/AyloSrd/reactplayground/issues"
                target="_blank"
              >
                <BtnContent>
                  <BugSVG height="30px" width="30px" />
                </BtnContent>
              </Anchor>
            </Button>
          </div>
        </ButtonContainer>
      </Nav>
    </header>
  );
};

const Nav = styled.nav`
  height: ${fixedSizes.navbarHeight};
  width: 100vw;
  max-width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: ${colors.$bg};
  padding: 0 10px;
  border-bottom: ${generalBorderStyle};
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-right: 20px;
`;

const BtnContent = styled.div`
  &:hover {
    color: ${colors.$silver100};
  }
`;

const TitleContainer = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  align-items: center;
  gap: 10px;
  cursor: pointer;
`;

const Title = styled.h1`
  display: inline-block;
  margin: 0;
  font-weight: normal;
`;

export default memo(Navbar);
