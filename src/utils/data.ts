export type User = {
  name: string;
  password: string;
  role: "admin" | "agent";
}

const admins : User[] = [
    { name: "admin", password: "admin" , role: "admin"},
]

 

const login = (credential:{name:string,password:string})=>{
    return new Promise<User>((resolve, reject)=>{
            setTimeout(()=>{
                
                const user = admins.find(user=>user.name === credential.name&& user.password=== credential.password)
                if (!user) {
                  return reject(new Error("User not found"));
                }
                return resolve(user);
            },2000)
    })
}
  export {
    admins,
    login
  }

