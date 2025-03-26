type CategoryInputConstructor = Category;

export class Category {
  id: string;
  name: string;
  isChallenge: boolean;

  constructor({ id, name, isChallenge }: CategoryInputConstructor) {
    this.id = id;
    this.name = name;
    this.isChallenge = isChallenge;
  }
}
