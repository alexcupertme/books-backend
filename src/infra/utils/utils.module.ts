import { Module } from '@nestjs/common';
import { ArrayUtils } from './array.utils';
import { NumberUtils } from './number.utils';

@Module({
  providers: [ArrayUtils, NumberUtils],
  exports: [ArrayUtils, NumberUtils],
})
export class UtilsModule {}
