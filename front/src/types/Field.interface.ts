export type FieldData = {
    label: string,
    placeholder: string,
    requestFieldName: string,
    fieldType: 'text' | 'password' | 'email' | 'age' | 'telephone' | 'choices'
    isRequired: boolean,
    choices?: {value: string, key: string}[],
}