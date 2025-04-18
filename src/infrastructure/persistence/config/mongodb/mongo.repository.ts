import mongoose from 'mongoose';
import { DomainStatusEnums } from 'src/common/types/products-shared.type';

export class MongoRepositoryHelper {
  public static statusFilter<T>(
    status: DomainStatusEnums,
  ): mongoose.FilterQuery<T> {
    switch (status) {
      case DomainStatusEnums.ALL:
        return {};
      case DomainStatusEnums.INACTIVE:
        return {
          deletedAt: {
            $ne: null,
          },
        };
      default:
        return {
          deletedAt: null,
        };
    }
  }
}
