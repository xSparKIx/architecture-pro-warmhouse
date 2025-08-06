import { IsJSON, IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";

/**
 * DTO создания функции устройства
 */
export class CreateFunctionalDto {
    @IsUUID()
    @IsNotEmpty()
    readonly deviceId: string;

    @IsString()
    @IsNotEmpty()
    readonly name: string;

    @IsString()
    @IsOptional()
    readonly description: string;

    @IsJSON()
    @IsNotEmpty()
    readonly command: Record<string, any>;
}