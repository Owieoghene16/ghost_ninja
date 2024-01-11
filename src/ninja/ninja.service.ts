import { Injectable } from '@nestjs/common';
import { CreateNinjaDto } from './dto/create-ninja.dto';
import { UpdateNinjaDto } from './dto/update-ninja.dto';

@Injectable()
export class NinjaService {
  private ninjas = [
    { id: 0, name: 'ninja1', weapon: 'melee' },
    { id: 1, name: 'ninja2', weapon: 'shovel' },
  ];
  getNinjas(weapon?: 'melee' | 'shovel') {
    if (weapon) {
      return this.ninjas.filter((ninja) => ninja.weapon === weapon);
    };
    return this.ninjas;
  };

  oneNinja(id: number) {
    const ninja = this.ninjas.find((ninja) => ninja.id === id);
    if (!ninja) {
      throw new Error('ninja not found');
    }
    return ninja;
  }

  createNinja(createNinjaDto: CreateNinjaDto) {
    const newNinja = {
      ...createNinjaDto,
      id: Date.now(),
    };
    this.ninjas.push(newNinja);
    return newNinja;
  }

  updateNinja(id: number, updateNinjaDto: UpdateNinjaDto) {
    this.ninjas = this.ninjas.map((ninja) => {
      if (ninja.id == id) {
        return { ...ninja, ...updateNinjaDto}
      }
      return ninja;
    })
    return this.oneNinja(id);
  }

  deleteNinja(id: number) {
    const toBeRemoved = this.oneNinja(id);
    this.ninjas.filter((ninja) => ninja.id != id);
    return toBeRemoved;
  }
};
