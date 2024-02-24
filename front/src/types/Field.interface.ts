export type FieldData = {
    label: string,
    placeholder: string,
    requestFieldName: string,
    fieldType: 'text' | 'password' | 'email' | 'age' | 'telephone'
    isRequired: boolean
}