import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';
import { comparePassword } from '../users/helpers/password';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto): Promise<{ access_token: string }> {
    const user = await this.userService.findByEmail(loginDto.email);
    const compare = await comparePassword(loginDto.password, user.password);
    if (!compare) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = {
      sub: user._id,
      email: user.email,
      image: user.image,
      is_deleted: user.is_deleted,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
