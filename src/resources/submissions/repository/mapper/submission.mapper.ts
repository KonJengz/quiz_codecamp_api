import { Submission } from '../../domain/submission.domain';
import { SubmissionSchemaClass } from '../entities/submissions.entity';

export class SubmissionMapper {
  public static toDomain(documentEntity: SubmissionSchemaClass): Submission {
    if (!documentEntity) return null;

    const {
      id,
      questionId: qIdBuffer,
      userId: usrIdBuffer,
      ...rest
    } = documentEntity.toObject();

    return new Submission({
      ...rest,
      id,
      questionId: qIdBuffer.toString(),
      userId: usrIdBuffer.toString(),
    });
  }
}
