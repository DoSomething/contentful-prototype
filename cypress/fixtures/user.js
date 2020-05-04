import faker from 'faker';
import { ObjectID } from 'bson';

export const userFactory = () => ({
  id: new ObjectID().toString(),
  role: 'user',
  firstName: faker.name.firstName(),
});

export default {};
