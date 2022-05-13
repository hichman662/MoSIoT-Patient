/* eslint-disable @typescript-eslint/naming-convention */
export class UserData {
  constructor(
   public Id: number,
   public BirthDate?: Date,
   public Surnames?: string,
   public Address?: string,
   public Phone?: string,
   public Photo?: string,
   public IsActive?: boolean,
   public Type?: number,
   public IsDiseased?: boolean,
   public Email?: string,
  )
{}
}
