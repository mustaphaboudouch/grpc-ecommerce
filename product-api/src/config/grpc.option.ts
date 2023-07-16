import { ChannelCredentials, ServerCredentials } from '@grpc/grpc-js';
import {
  ClientProviderOptions,
  GrpcOptions,
  Transport,
} from '@nestjs/microservices';
import { readFileSync } from 'fs';
import { addReflectionToGrpcConfig } from 'nestjs-grpc-reflection';
import { join } from 'path';
import { ConfigService } from '@nestjs/config';
import { PRODUCT_PACKAGE_NAME } from 'src/stubs/product/message';
import { AUTH_PACKAGE_NAME } from 'src/stubs/auth/message';

export default (cs: ConfigService) =>
  addReflectionToGrpcConfig({
    transport: Transport.GRPC,
    options: {
      package: PRODUCT_PACKAGE_NAME,
      url: `0.0.0.0:${cs.get('PORT')}`,
      credentials: !cs.get<boolean>('insecure')
        ? ServerCredentials.createSsl(null, [
            {
              private_key: readFileSync(cs.get('PRODUCT_KEY')),
              cert_chain: readFileSync(cs.get('PRODUCT_CERT')),
            },
          ])
        : ServerCredentials.createInsecure(),
      loader: {
        includeDirs: [join(__dirname, '../proto')],
      },
      protoPath: [join(__dirname, '../proto/product/service.proto')],
    },
  } as GrpcOptions);

export const authGrpcOptions = (cs: ConfigService): ClientProviderOptions => {
  return {
    name: AUTH_PACKAGE_NAME,
    transport: Transport.GRPC,
    options: {
      url: cs.get('AUTH_API_URL'),
      package: AUTH_PACKAGE_NAME,
      loader: {
        includeDirs: [join(__dirname, '../proto')],
      },
      protoPath: [join(__dirname, '../proto/auth/service.proto')],
      keepalive: {
        // Send keepalive pings every 10 seconds, default is 2 hours.
        keepaliveTimeMs: 10 * 1000,
        // Keepalive ping timeout after 5 seconds, default is 20 seconds.
        keepaliveTimeoutMs: 5 * 1000,
        // Allow keepalive pings when there are no gRPC calls.
        keepalivePermitWithoutCalls: 1,
      },
      credentials: !cs.get<boolean>('insecure')
        ? ChannelCredentials.createSsl(
            readFileSync(cs.get('ROOT_CA')),
            readFileSync(cs.get('PRODUCT_KEY')),
            readFileSync(cs.get('PRODUCT_CERT')),
          )
        : ChannelCredentials.createInsecure(),
    },
  };
};
