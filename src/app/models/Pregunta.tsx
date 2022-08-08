import { Tag } from "./Tag";

export interface Pregunta {
    preguntaID: number;
    usuarioID: number;
    titulo: string;
    texto: string;
    fechaCreacion: string;
    tags: Tag[];
    tagIds: number[];
    nombre:string;
    apellido:string
}