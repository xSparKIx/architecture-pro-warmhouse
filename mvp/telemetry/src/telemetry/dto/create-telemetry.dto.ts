import { IsJSON, IsNotEmpty, IsString } from 'class-validator';

/**
 * DTO создания телеметрии
 */
export class CreateTelemetryDto {
    @IsString()
    @IsNotEmpty()
    readonly deviceId: string;

    @IsNotEmpty()
    @IsJSON()
    readonly data: Record<string, any>;
}