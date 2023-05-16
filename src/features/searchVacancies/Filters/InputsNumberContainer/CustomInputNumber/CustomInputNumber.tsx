import { ChevronDown } from 'tabler-icons-react'
import { NumberInput, NumberInputHandlers, NumberInputProps } from '@mantine/core'
import { useRef } from 'react'
import styles from 'features/searchVacancies/Filters/InputsNumberContainer/CustomInputNumber/CustomInput.module.scss'
import { stepInput } from 'common/constant/constant'

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
      type='number'
      classNames={{ input: styles.inputContainer }}
      step={stepInput}
      rightSectionWidth={40}
      rightSection={
        <div className={styles.rightSection}>
          <ChevronDown onClick={increment} />
          <ChevronDown onClick={decrement} />
        </div>
      }
    />
  )
}
