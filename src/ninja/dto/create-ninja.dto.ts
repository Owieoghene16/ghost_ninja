import { MinLength, IsEnum } from 'class-validator';

export class CreateNinjaDto {
  @MinLength(2)
  name: string;

  @IsEnum(['melee', 'shovel'], { 
    message: 'Weapon can only be melee or shovel'
 })
  weapon: 'melee' | 'shovel';
};
