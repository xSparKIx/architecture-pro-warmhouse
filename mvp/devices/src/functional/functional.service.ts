import { Injectable } from "@nestjs/common";

@Injectable()
export class FunctionalService {
    executeCommand(command) {
        console.log(command);
    }
}