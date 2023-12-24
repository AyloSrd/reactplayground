import { OutputType } from "@/hooks/playground/useEsbuild";
import { sandboxAttributes, srcDoc } from "@/tools/iframe-tools";
import { useCreateEvento } from "evento-react";
import { memo, useCallback, useEffect, useRef } from "react";
import styled from "styled-components";

interface Props {
  onLoad: (evt: CustomEvent<Window>) => void;
  onPageRefresh: () => void;
  output: OutputType;
  shouldRefresh: boolean;
}

const Iframe = (props: Props) => {
  const { output, shouldRefresh } = props;

  const iframeRef = useRef<HTMLIFrameElement>(null);

  const evento = useCreateEvento(props);

  const handleIframeLoad = useCallback(() => {
    const iframeWindow = iframeRef?.current?.contentWindow;

    if (iframeWindow) {
      iframeWindow.postMessage(output, "*");
      evento("load", iframeWindow);
    }
  }, [output, props]);

  useEffect(() => {
    if (shouldRefresh && iframeRef && iframeRef.current) {
      iframeRef.current.srcdoc = srcDoc;
      evento("pageRefresh");
    }
    iframeRef?.current?.contentWindow?.postMessage(output, "*");
  }, [output, shouldRefresh]);

  return (
    <StyledIframe
      allow="clipboard-read; clipboard-write"
      onLoad={handleIframeLoad}
      ref={iframeRef}
      sandbox={sandboxAttributes}
      srcDoc={srcDoc}
      title="ReactREPL"
    />
  );
};

const StyledIframe = styled.iframe`
  border: none;
  height: 100%;
  width: 100%;
`;

export default memo(Iframe);
