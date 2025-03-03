import { Timestamp } from "@angular/fire/firestore";

export interface PDeObras {
    id: string;
    NombreCompletoCliente: string;
    NombreCompletoEmpleado: string;
    Fecha: Timestamp | null;
    Horas: number | null;
    Concepto: string;
    Observaciones: string;
    DireccionObra: string;//Se relaciona con obra
}
