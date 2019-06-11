import { ObjectID } from 'bson';

export const userFactory = () => ({
  id: new ObjectID().toString(),
  role: 'user',
});

export default {};
