import Select from 'react-select'

type CustomSelectProps = {
    onChange: (parameter: any) => void,
    options: any[] | undefined,
    value: any,
    isMulti: boolean,
    isSearchable: boolean | undefined,
}

export default function CustomSelect ({onChange, options, value, isMulti, isSearchable}: CustomSelectProps) {
    return(
         <Select
              options={options}
              onChange={(val) => isMulti
                  ? onChange(val.map((c: any) => c.value))
                  : onChange(val.value)
              }
              value={isMulti
                  ? options?.filter((c) => value.includes(c.value))
                  : options?.find((c) => c.value === value)
              }
              isMulti={isMulti}
              isSearchable={isSearchable}
          />
         )
  }