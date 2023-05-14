import React, { KeyboardEvent } from 'react'
import { CustomInputNumber } from 'features/searchVacancies/Filters/InputsNumberContainer/CustomInputNumber/CustomInputNumber'
import { setSearchQueryParams } from 'features/searchVacancies/searchVacancies.slice'
import { useAppDispatch } from 'common/hooks/useAppHooks'
import { useSearch } from 'common/hooks/useSearch'

export const InputsNumberContainer = () => {
  const dispatch = useAppDispatch()
  const { payment_fromState, setSearch, payment_toState } = useSearch()
  const pressEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    e.key === 'Enter' && setSearch()
  }
  return (
    <>
      <CustomInputNumber
        data-elem='salary-from-input'
        value={payment_fromState ?? ''}
        onChange={value => {
          dispatch(setSearchQueryParams({ payment_from: value === '' ? null : value }))
        }}
        placeholder='От'
        onKeyDown={pressEnter}
        min={0}
        max={payment_toState ? payment_toState : undefined}
        step={1000}
      />
      <CustomInputNumber
        data-elem='salary-to-input'
        value={payment_toState ?? ''}
        onChange={value => {
          dispatch(setSearchQueryParams({ payment_to: value === '' ? null : value }))
        }}
        placeholder='До'
        step={1000}
        onKeyDown={pressEnter}
        min={payment_fromState ? +payment_fromState : 0}
      />
    </>
  )
}
