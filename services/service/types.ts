export type Service = {
  id: number,
  url: string,
  userName: string,
  firstName: string,
  lastName: string,
  phoneNumber: string,
  email: string,
  typeId: number,
  typeName: string,
  description: string,
  badgeName: string,
  address: string, //possible ------ si pas d'adresse
  species: string[],
}