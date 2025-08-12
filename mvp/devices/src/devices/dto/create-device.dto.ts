import { IsNotEmpty, IsOptional, IsString } from "class-validator";

/**
 * DTO создания устройства
 */
export class CreateDeviceDto {
    @IsString()
    @IsNotEmpty()
    readonly name: string;

    @IsString()
    @IsOptional()
    readonly description: string = '';

    @IsString()
    @IsNotEmpty()
    readonly type: string;

    @IsString()
    @IsNotEmpty()
    readonly serial_number: string;

    @IsString()
    @IsOptional()
    readonly status: 'active'|'inactive'|'error' = 'active'
}