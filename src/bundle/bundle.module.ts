import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BundleSchema } from './bundle.model';
import { SubscriptionBundleController } from './bundle.controller';
import { BundleService } from './bundle.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Bundle', schema: BundleSchema }]),
  ],
  controllers: [SubscriptionBundleController],
  providers: [BundleService /*SubscriptionTypeService*/],
  exports: [BundleService],
})
export class BundleModule {}
