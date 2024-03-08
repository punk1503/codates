export default function reformToSelectData(data: {id: number, name: string}) {
    let newData = {
        value: data.id,
        label: data.name
    }
    return newData
}