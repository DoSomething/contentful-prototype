import faker from 'faker';

export const groupTypeFactory = () => ({
  id: faker.random.number(),
  name: faker.company.companyName(),
});

export const groupFactory = () => {
  const groupType = groupTypeFactory();

  return {
    id: faker.random.number(),
    name: `${faker.address.city()} Office`,
    goal: faker.random.number(),
    groupTypeId: groupType.id,
    groupType,
  };
};
