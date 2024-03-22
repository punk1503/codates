import "./Input.css"
import { FieldData } from "../../types/Field.interface"
import PhoneInput from 'react-phone-number-input/input'
import CustomSelect from "../CustomSelect"

export default function Input({data, value, setValue}: {data: FieldData, value: any, setValue: (value: any) => void}) {
    function switchRenderInput() {
        switch (data.fieldType) {
            case 'text':
                return (
                    <div>
                        <label>{data.label}</label>
                        <input value={value} onChange={(event) => setValue(event.target.value)} className="custom_input" type="text" placeholder={data.placeholder}/>
                    </div>
                )
            case 'text_large':
                return (
                    <div>
                        <label>{data.label}</label>
                        <textarea rows={10} className="custom_input" value={value} onChange={(event) => setValue(event.target.textContent)}></textarea>
                    </div>
                )
            case 'password':
                return (
                    <div>
                        <label>{data.label}</label>
                        <input value={value} onChange={(event) => setValue(event.target.value)} className="custom_input" type="password" placeholder={data.placeholder}/>
                    </div>
                )
            case 'email':
                return (
                    <div>
                        <label>{data.label}</label>
                        <input value={value} onChange={(event) => setValue(event.target.value)} className="custom_input" type="email" placeholder={data.placeholder} />
                    </div>
                )
            case 'age':
                return (
                    <div>
                        <label>{data.label}</label>
                        <input placeholder={data.placeholder} min={18} className="custom_input" type="number" value={value} onChange={(event) => {setValue(event.target.value)}}></input>
                    </div>
                )
            case 'telephone':
                return (
                    <div>
                        <label>{data.label}</label>
                        <PhoneInput className="custom_input" defaultCountry={"RU"} placeholder={data.placeholder} value={value} onChange={setValue}></PhoneInput>
                    </div>
                )
            case 'choices':
                return (
                    <div>
                        <label>{data.label}</label>
                        <CustomSelect value={value} onChange={setValue} isMulti={false} options={data.choices} isSearchable={data?.isSearchable}></CustomSelect>
                    </div>
                )
            case 'choices_multi':
                return (
                    <div>
                        <label>{data.label}</label>
                        <CustomSelect value={value} onChange={setValue} isMulti={true} options={data.choices} isSearchable={data?.isSearchable}></CustomSelect>
                    </div>
                )
            default:
                return (
                    <label>NO SUCH INPUT TYPE</label>
                )
        }
    }

    return (
        switchRenderInput()
    )
}
