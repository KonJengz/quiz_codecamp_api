import { Types } from 'mongoose';
import { TestCase } from '../../domain/test-cases.domain';

type TestCaseDocument = Omit<TestCase, 'id'> & { _id: Types.ObjectId };

export class TestCaseMapper {
  public static toDomain(documentEntity: TestCaseDocument) {
    if (!documentEntity) return null;

    let { _id, ...rest } = documentEntity;
    return new TestCase({ id: _id.toString(), ...rest });
  }
}
