import { ApiProperty } from '@nestjs/swagger';

export class ChangePassword {
  @ApiProperty()
  oldPassword: string;
  @ApiProperty()
  newPassword: string;
}