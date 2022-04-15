import React, { useCallback } from "react"
import { useAragonApi } from "@aragon/api-react"
import {
  Box,
  Button,
  GU,
  Header,
  IconMinus,
  IconPlus,
  Main,
  SyncIndicator,
  Tabs,
  Text,
  textStyle,
} from "@aragon/ui"

function App() {
  // const [apps, appStatus] = useApps()
  const { api, appState, path, requestPath } = useAragonApi()
  // const asd = useAragonApi()
  const { count, isSyncing } = appState

  const pathParts = path.match(/^\/tab\/([0-9]+)/)
  const pageIndex = Array.isArray(pathParts)
    ? parseInt(pathParts[1], 10) - 1
    : 0

  const saludar = useCallback(async () => {
    console.log(api)
    const d = await api.call("saludar").toPromise()
    console.log(d)
  }, [api])

  return (
    <Main>
      {isSyncing && <SyncIndicator />}
      <Header
        primary="Counter"
        secondary={
          <span
            css={`
              ${textStyle("title2")}
            `}
          >
            {count}
          </span>
        }
      />
      {/* {console.log((async () => await asdd())())} */}
      {/* {console.log(asd)} */}
      <Tabs
        items={["Tab 1", "Tab 2"]}
        selected={pageIndex}
        onChange={(index) => requestPath(`/tab/${index + 1}`)}
      />
      <Box
        css={`
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          height: ${50 * GU}px;
          ${textStyle("title3")};
        `}
      >
        Count: {count} asdas
        <div>
          <Button
            display="icon"
            icon={<IconMinus />}
            label="Decrement"
            onClick={saludar}
          />
          <Button
            display="icon"
            icon={<IconPlus />}
            label="Increment"
            onClick={() => api.increment(1).toPromise()}
            css={`
              margin-left: ${2 * GU}px;
            `}
          />
        </div>
      </Box>
    </Main>
  )
}

export default App
