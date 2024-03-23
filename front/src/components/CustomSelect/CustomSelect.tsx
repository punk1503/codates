import Select from 'react-select'
import './CustomSelect.css'

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
            className='custom_select'
            options={options}
            onChange={onChange}
            value={value}
            isMulti={isMulti}
            isSearchable={isSearchable}
          />
         )
  }
