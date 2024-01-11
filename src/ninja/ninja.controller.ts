import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Query,
  Body,
  NotFoundException,
  ParseIntPipe,
  ValidationPipe,
} from '@nestjs/common';
import { CreateNinjaDto } from './dto/create-ninja.dto';
import { UpdateNinjaDto } from './dto/update-ninja.dto';
import { NinjaService } from './ninja.service';

@Controller('ninjas')
export class NinjaController {
  constructor(private readonly ninjaService: NinjaService) {}
  @Post()
  createNinjas(@Body(new ValidationPipe()) createNinjaDto: CreateNinjaDto) {
    return this.ninjaService.createNinja(createNinjaDto);
  }

  @Get()
  getNinjas(@Query('weapon') weapon: 'melee' | 'shovel') {
    // const service = new NinjaService();
    return this.ninjaService.getNinjas(weapon);
  }

  @Get(':id')
  getOneNinja(@Param('id', ParseIntPipe) id: number) {
    try {
      return this.ninjaService.oneNinja(id);
    } catch (err) {
      throw new NotFoundException();
    }
  }

  @Put(':id')
  updateNinjas(
    @Param('id') id: string,
    @Body() updateNinjaDto: UpdateNinjaDto,
  ) {
    return this.ninjaService.updateNinja(+id, updateNinjaDto);
  }

  @Delete(':id')
  removeNinjas(@Param('id') id: number) {
    return this.ninjaService.deleteNinja(id);
  }
}
