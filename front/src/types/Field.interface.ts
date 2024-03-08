export type FieldData = {
    label: string,
    placeholder: string,
    requestFieldName: string,
    fieldType: 'text' | 'password' | 'email' | 'age' | 'telephone' | 'choices' | 'choices_multi'
    isRequired: boolean,
    choices?: {label: string, key: any}[],
    isSearchable?: boolean,
}