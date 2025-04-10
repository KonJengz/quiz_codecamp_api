import { Repository } from 'src/infrastructure/persistence/config/repository';
import { Submission } from '../domain/submission.domain';

export abstract class SubmissionRepository extends Repository<
  Submission,
  Omit<Submission, 'id' | 'createdAt' | 'updatedAt'>
> {
  public abstract upsert(
    data: Omit<Submission, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Submission>;
}
