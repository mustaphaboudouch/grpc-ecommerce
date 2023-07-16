import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ProfanityModule } from './profanity/profanity.module';
import Joi from 'joi';
import { GrpcReflectionModule } from 'nestjs-grpc-reflection';
import grpcOption from './config/grpc.option';
import { HealthModule } from './health/health.module';
import { AuthModule } from './auth/auth.module';
import { WinstonModule } from 'nest-winston';
import winstonConfig from './config/winston.config';
import { ProductModule } from './product/product.module';
import { CategoryModule } from './category/category.module';

const envSchema = Joi.object({
  MONGO_URL: Joi.string().required(),
  PORT: Joi.string().default(4002),
  HEALTH_PORT: Joi.number().default(3000),
  insecure: Joi.boolean().required(),
  PRODUCT_CERT: Joi.string().when('insecure', {
    is: false,
    then: Joi.required(),
  }),
  PRODUCT_KEY: Joi.string().when('insecure', {
    is: false,
    then: Joi.required(),
  }),
  ROOT_CA: Joi.string().when('insecure', {
    is: false,
    then: Joi.required(),
  }),
  JAEGER_URL: Joi.string().required(),
  AUTH_API_URL: Joi.string().required(),
});

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: process.env.NODE_ENV === 'production',
      validationSchema: envSchema,
      isGlobal: true,
    }),
    WinstonModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (cs: ConfigService) => winstonConfig(cs),
    }),
    MongooseModule.forRoot(process.env.MONGO_URL),
    GrpcReflectionModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (cs: ConfigService) => grpcOption(cs),
    }),
    ProductModule,
    CategoryModule,
    AuthModule,
    HealthModule,
    ProfanityModule,
  ],
})
export class AppModule {}
