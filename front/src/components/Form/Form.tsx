import "./Form.css"
import { FieldData } from "../../types/Field.interface"
import Input from "../Input/Input"
import { useState} from "react"
import axios from "axios"

export default function Form({action_url, fields_data}: {action_url: string, fields_data: FieldData[]}) {
    const [valuesArr, setValuesArr] = useState<any[]>(["Hello", "World"])

    function produceSetValueFunction(index: number) {
        const func = (newValue: any) => {
            setValuesArr([...valuesArr.slice(0, index), newValue, ...valuesArr.slice(index+1)])
        }
        return func
    }

    function sendRequest() {
        axios.post(action_url, console.log(Object.fromEntries(valuesArr.map((k, i) => [fields_data[i].requestFieldName, k])))        )
    }

    return (
        <div className="custom_form">
            {fields_data.map((field_data, index) => {
                return <Input 
                    key={index} 
                    data={field_data} 
                    value={valuesArr[index]} 
                    setValue={produceSetValueFunction(index)}
                />
            })}

            {valuesArr.map((value, index) => {
                return (
                    <p key={index}>{index}: {value}</p>
                )
            })}
            <button className="custom_form__button" onClick={sendRequest}>Submit</button>
        </div>
    )
}