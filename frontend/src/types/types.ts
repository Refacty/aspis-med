export interface Patient {
    id: number
    name: string
    cpf: string
    contact: string
    address: string
    observations: string
    registrationDate: Date // ou Date, dependendo de como você manipula datas
}
