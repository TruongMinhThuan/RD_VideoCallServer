import { CreateChatRoomDTO } from "@server/dto";
import { CRUD } from "@server/interfaces/crud.interface";



export class ChatRoomService implements CRUD {
    list(limit: number, page: number): Promise<any> {
        throw new Error("Method not implemented.");
    }
    create(resource: CreateChatRoomDTO): Promise<any> {
        console.log('====================================');
        console.log('create room:: ',resource);
        console.log('====================================');
        throw new Error("Method not implemented.");
    }
    putById(id: string, resource: any): Promise<string> {
        throw new Error("Method not implemented.");
    }
    readById(id: string): Promise<any> {
        throw new Error("Method not implemented.");
    }
    deleteById(id: string): Promise<string> {
        throw new Error("Method not implemented.");
    }
    patchById(id: string, resource: any): Promise<string> {
        throw new Error("Method not implemented.");
    }
      
}

