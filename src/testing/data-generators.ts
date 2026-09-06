import { faker } from '@faker-js/faker';

export type TestUser = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export const generateUser = (): TestUser => {
  const name = faker.person.fullName();
  const email = faker.internet.email().toLocaleLowerCase();
  const password = generatePassword();
  return { name, email, password, confirmPassword: password };
};

export const generatePassword = () => {
  const uppercase = faker.string.alpha({ casing: 'upper', length: 2 });
  const lowercase = faker.string.alpha({ casing: 'lower', length: 4 });
  const numbers = faker.string.numeric(2);
  const special = faker.helpers.arrayElement(['!', '@', '#', '$', '%']);
  return `${uppercase}${lowercase}${numbers}${special}`;
};
