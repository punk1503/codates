import { FieldData } from "../../types/Field.interface"
import PhoneInput from 'react-phone-number-input/input'
import "./Input.css"

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
                        <input type="number" min={1}></input>
                    </div>
                )
            case 'telephone':
                return (
                    <div>
                        <label>{data.label}</label>
                        <PhoneInput className="custom_input" defaultCountry={"RU"} placeholder={data.placeholder} value={value} onChange={setValue}></PhoneInput>
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