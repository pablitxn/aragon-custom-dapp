import React, { useCallback, useState } from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  Field,
  GU,
  Info,
  SidePanel,
  TextInput,
  useSidePanelFocusOnReady,
} from '@aragon/ui'

const NewVotePanel = React.memo(function NewVotePanel({
  panelState,
  onCreateVote,
}) {
  return (
    <SidePanel
      title="New Vote"
      opened={panelState.visible}
      onClose={panelState.requestClose}
    >
      <NewVotePanelContent onCreateVote={onCreateVote} />
    </SidePanel>
  )
})

function NewVotePanelContent({ onCreateVote }) {
  const [question, setQuestion] = useState('')
  const [whitelistState, setWhitelistState] = useState([
    { id: 'owner', value: '' },
  ])

  const inputRef = useSidePanelFocusOnReady()

  const handleSubmit = useCallback(
    event => {
      event.preventDefault()
      onCreateVote(question.trim())
    },
    [onCreateVote, question]
  )

  const handleQuestionChange = useCallback(event => {
    setQuestion(event.target.value)
  }, [])

  const handleWhiteListChanges = useCallback(event => {
    const { id, value } = event.target

    setWhitelistState(prev =>
      prev.map(input => {
        if (input.id === id) return { ...input, value }
        return input
      })
    )
  }, [])

  const handleNewAddresses = useCallback(() => {
    const newID = Math.random()
      .toString(36)
      .substring(2, 15)

    setWhitelistState(prev => [...prev, { id: newID, value: '' }])
  }, [])

  return (
    <div>
      <form
        css={`
          margin-top: ${3 * GU}px;
        `}
        onSubmit={handleSubmit}
      >
        <Field label="Question">
          <TextInput
            ref={inputRef}
            value={question}
            onChange={handleQuestionChange}
            required
            wide
          />
        </Field>
        <Field
          label="White List"
          style={{ display: 'flex', flexDirection: 'column' }}
        >
          {whitelistState.map(({ id, value }) => (
            <input
              key={id}
              id={id}
              value={value}
              onChange={handleWhiteListChanges}
              placeholder={`Enter ${id}`}
            />
          ))}
          <button type="button" onClick={handleNewAddresses}>
            add new address
          </button>
        </Field>
        <div
          css={`
            margin-bottom: ${3 * GU}px;
          `}
        >
          <Info>
            These votes are informative and used for signaling. They don’t have
            any direct repercussions on the organization.
          </Info>
        </div>
        <Button disabled={!question} mode="strong" type="submit" wide>
          Create new vote
        </Button>
      </form>
    </div>
  )
}

NewVotePanelContent.propTypes = {
  onCreateVote: PropTypes.func,
}

NewVotePanelContent.defaultProps = {
  onCreateVote: () => {},
}

export default NewVotePanel
