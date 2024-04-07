import { UserCollection, pbClient } from "~/pocketbase/client"
import { UsersResponse } from "../types/pocketbase-types"




const generateRandomeUsername = () =>  {
  return Math.random().toString(36).substring(7)
}

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  console.log(body)

  const authData = await pbClient.admins.authWithPassword(process.env.POCKETBASE_ADMIN_USER!, process.env.POCKETBASE_ADMIN_PASSWORD!);

  const userName = generateRandomeUsername();

  const user = await UserCollection.create<UsersResponse>({
    username: userName,
    email: `${userName}@fake.com`,
    password: '12345678',
    passwordConfirm: '12345678',
    name: body.user    
  })

  console.log(`${authData.admin.email} created user ${user.username} with name ${user.name}`)

  pbClient.authStore.clear()

  return user.username
})
