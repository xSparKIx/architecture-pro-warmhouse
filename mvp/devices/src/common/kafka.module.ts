import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ClientsModule, Transport } from "@nestjs/microservices";

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'COMMAND_SERVICE',
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.KAFKA,
          options: {
            client: {
              clientId: 'commands',
              brokers: [configService.get('KAFKA_BROKER') || 'localhost:9092']
            },
            consumer: {
              groupId: configService.get('CONSUMER') || 'default',
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