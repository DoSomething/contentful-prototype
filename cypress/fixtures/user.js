import faker from 'faker';
import { ObjectID } from 'bson';

export const userFactory = () => {
  const firstName = faker.name.firstName();

  return {
    id: new ObjectID().toString(),
    role: 'user',
    firstName,
    displayName: `${firstName} ${faker.name.lastName().charAt(0)}.`,
  };
};

export default {};
