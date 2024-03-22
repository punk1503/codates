export type FieldData = {
    label: string,
    placeholder: string,
    requestFieldName: string,
    fieldType: 'text' | 'text_large' | 'password' | 'email' | 'age' | 'telephone' | 'choices' | 'choices_multi'
    isRequired: boolean,
    choices?: {label: string, value: any}[],
    isSearchable?: boolean,
}
