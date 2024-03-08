import "./Form.css"
import { FieldData } from "../../types/Field.interface"
import Input from "../Input/Input"
import Button from "../Button/Button"
import { useState } from "react"
import Axios from "../../utils/axiosConfig"

type FormProps = {
    action_url: string, 
    fields_data: FieldData[],
    response_callback: any | undefined,
    error_callback: any | undefined,
}

export default function Form({action_url, fields_data, response_callback, error_callback}: FormProps) {
    const [valuesArr, setValuesArr] = useState<any[]>(new Array(fields_data.length).fill(''))

    function produceSetValueFunction(index: number) {
        const func = (newValue: any) => {
            setValuesArr(valuesArr.with(index, newValue))
        }
        return func
    }

    function sendRequest() {
        const mapped = valuesArr.map((k, i) => {
            return [fields_data[i].requestFieldName, k]
        })
        if (mapped[0] !== undefined) {
            Axios.post(action_url, Object.fromEntries(mapped))
            .then((response) => {
                error_callback ? response_callback(response) : null
            })
            .catch((error) => {
                error_callback ? error_callback(error) : null
            })
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
            <Button onClick={() => {sendRequest()}}>Submit</Button>
        </div>
    )
}