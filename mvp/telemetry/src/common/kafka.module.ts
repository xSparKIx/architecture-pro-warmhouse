import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ClientsModule, Transport } from "@nestjs/microservices";

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'TELEMETRY_SERVICE',
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.KAFKA,
          options: {
            client: {
              clientId: 'telemetry',
              brokers: [configService.get('KAFKA_BROKER') || 'localhost:9092']
            },
            consumer: {
              groupId: configService.get('CONSUMER') || 'default_telemetry',
              allowAutoTopicCreation: true,
            }
          }
        })
      }
    ])
  ],
  exports: [ClientsModule],
})
export class KafkaModule { }