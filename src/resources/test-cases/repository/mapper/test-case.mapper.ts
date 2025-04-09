import { TestCase } from '../../domain/test-cases.domain';
import { TestCaseSchemaClass } from '../entities/test-cases.entities';

export class TestCaseMapper {
  public static toDomain(documentEntity: TestCaseSchemaClass) {
    if (!documentEntity) return null;

    let { id, _id, ...rest } = documentEntity;

    if (!id) id = _id.toString();

    return new TestCase({ id, ...rest });
  }
}
