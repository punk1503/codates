import "./Form.css"
import { FieldData } from "../../types/Field.interface"
import Input from "../Input/Input"
import Button from "../Button/Button"
import { useState} from "react"
import axios from "axios"

type FormProps = {
    action_url: string, 
    fields_data: FieldData[]
}

export default function Form({action_url, fields_data}: FormProps) {
    const [valuesArr, setValuesArr] = useState<any[]>(new Array(fields_data.length).fill(''))

    function produceSetValueFunction(index: number) {
        const func = (newValue: any) => {
            setValuesArr(valuesArr.with(index, newValue))
            // setValuesArr([...valuesArr.slice(0, index), newValue, ...valuesArr.slice(index+1)])
        }
        return func
    }

    function sendRequest() {
        const mapped = valuesArr.map((k, i) => [fields_data[i].requestFieldName, k])
        if (mapped[0] !== undefined) {
            axios.post(action_url, Object.fromEntries(mapped))
        }
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
            <Button onClick={sendRequest}>Submit</Button>
        </div>
    )
}