import React, { useMemo } from 'react'
import styled from 'styled-components'
import { addressesEqual, GU, tokenIconUrl } from '@aragon/ui'
// import { shortenAddress } from '../../../../util/web3'

function shortenAddress(address, charsLength = 4) {
  const prefixLength = 2 // "0x"
  if (!address) {
    return ''
  }
  if (address.length < charsLength * 2 + prefixLength) {
    return address
  }
  return (
    address.slice(0, charsLength + prefixLength) +
    '…' +
    address.slice(-charsLength)
  )
}

/* eslint-disable react/prop-types */
const TokenSelectorInstance = React.memo(function TokenSelectorInstance({
  address,
  name,
  symbol,
  showIcon = true,
}) {
  const hasDescription = useMemo(() => {
    return (
      name ||
      !addressesEqual(address, '0x0000000000000000000000000000000000000000')
    )
  }, [name, address])

  return (
    <div
      css={`
        display: flex;
        align-items: center;
      `}
    >
      {/* TODO: Set network type when available  */}
      {showIcon ? (
        <Icon src={tokenIconUrl(address)} />
      ) : (
        <div
          css={`
            width: ${3 * GU}px;
          `}
        />
      )}
      {symbol && (
        <span
          css={`
            margin-right: ${1 * GU}px;
          `}
        >
          {symbol}
        </span>
      )}
      <div>
        {hasDescription && <>(</>}
        {name && (
          <span
            css={`
              max-width: 110px;
              overflow: hidden;
              text-overflow: ellipsis;
            `}
          >
            {name}
          </span>
        )}
        {!addressesEqual(address, TOKEN_FAKE_ADDRESS) && (
          <span
            css={`
              margin-left: ${1 * GU}px;
            `}
          >
            {shortenAddress(address)}
          </span>
        )}
        {hasDescription && <>)</>}
      </div>
    </div>
  )
})

const Icon = styled.img.attrs({ alt: '', width: '16', height: '16' })`
  margin-right: ${1 * GU}px;
`

export default TokenSelectorInstance
