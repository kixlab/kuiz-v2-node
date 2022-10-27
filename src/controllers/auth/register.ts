import { RegisterParams, RegisterResults } from '../../api/auth/register'
import { UserModel } from '../../db/user'
import { Post } from '../methods'

export const register = Post<RegisterParams, RegisterResults>(async ({ name, email, image }) => {
  const user = await UserModel.findOne({ email })

  if (user) {
    return {
      new: user.classes.length === 0,
      user,
    }
  }

  const newUser = new UserModel({ name, email, imageUrl: image })
  await newUser.save()
  return {
    new: true,
    user: newUser,
  }
})
