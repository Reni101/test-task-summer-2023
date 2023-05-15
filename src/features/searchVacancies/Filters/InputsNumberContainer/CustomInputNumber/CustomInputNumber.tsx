import { ChevronDown } from 'tabler-icons-react'
import { NumberInput, NumberInputHandlers, NumberInputProps } from '@mantine/core'
import { useRef } from 'react'
import styles from 'features/searchVacancies/Filters/InputsNumberContainer/CustomInputNumber/CustomInput.module.scss'
import { stepInput } from 'common/constant/constant'

const inputStyles = {
  input: { height: '42px', borderRadius: '8px', margin: ' 8px 0 8px;' }
}

export const CustomInputNumber = (props: NumberInputProps) => {
  const handlers = useRef<NumberInputHandlers>()

  const increment = () => {
    handlers.current?.increment()
  }
  const decrement = () => {
    handlers.current?.decrement()
  }

  return (
    <NumberInput
      {...props}
      handlersRef={handlers}
      styles={inputStyles}
      step={stepInput}
      rightSectionWidth={40}
      rightSection={
        <div className={styles.rightSection}>
          <ChevronDown style={{ transform: 'rotate(180deg)' }} onClick={increment} />
          <ChevronDown onClick={decrement} />
        </div>
      }
    />
  )
}
