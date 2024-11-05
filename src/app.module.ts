import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CsvModule } from './csv/csv.module';

@Module({
  imports: [ConfigModule.forRoot(), CsvModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
