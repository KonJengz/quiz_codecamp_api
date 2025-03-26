import { MongooseModule } from '@nestjs/mongoose';
import { MongooseConfigService } from './mongodb/mongoose.config';
import mongodbConfig from 'src/config/database/mongodb/mongodb.config';

export const infraStructureDatabaseModule = MongooseModule.forRootAsync({
  useClass: MongooseConfigService,
});

export const infraStructureDatabaseConfig = mongodbConfig;
