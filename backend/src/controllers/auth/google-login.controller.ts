import { Response } from 'express';
import { AuthProvider } from '../../constants/enums/auth-provider';
import { User } from '../../models/user-model.model';
import { Role } from '../../constants/enums/role';

export async function GoogleLoginController(req: any, res: Response) {
  const { email, picture, sub, displayName: name } = req.user;
  const username = email.split('@')[0];

  const existingUser = await User.findOne({ email });

  if (!existingUser) {
    const user = new User({
      name,
      username,
      email,
      role: Role.USER,
      authProvider: AuthProvider.GOOGLE,
      avatar: picture,
      googleId: sub,
    });
    user.save();
  }

  res.json({ success: true });
  return;
}
