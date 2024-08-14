import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, pass: string): Promise<{ access_token: string }> {
    const user = await this.usersService.findOne(email);

    if (!user || (user.password !== pass && user.password === '')) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {
      sub: user.userId,
      email: user.email,
      firstname: user.firstname,
      lastname: user.lastname,
      position: user.position,
      role: user.role,
      profileImageId: user.profileImageId,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async signUp(
    email: string,
    pass: string,
    firstname: string,
    lastname: string,
    position: string,
    role: string,
  ): Promise<{ access_token: string }> {
    const newUser = await this.usersService.addNewUser(
      email,
      pass,
      firstname,
      lastname,
      position,
      role,
    );
    if (!newUser) {
      throw new UnauthorizedException('User already exists');
    }
    const payload = {
      sub: newUser.userId,
      email: newUser.email,
      firstname: newUser.firstname,
      lastname: newUser.lastname,
      position: newUser.position,
      role: newUser.role,
      profileImageId: newUser.profileImageId,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
