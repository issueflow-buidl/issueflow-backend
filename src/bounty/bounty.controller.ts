import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, HttpCode } from '@nestjs/common';
import { BountyService } from './bounty.service';
import { CreateBountyDto } from './dto/create-bounty.dto';
import { UpdateBountyDto } from './dto/update-bounty.dto';
import { ClaimBountyDto } from './dto/claim-bounty.dto';

@Controller('bounties')
export class BountyController {
  constructor(private readonly bountyService: BountyService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createBountyDto: CreateBountyDto) {
    return this.bountyService.create(createBountyDto);
  }

  @Get()
  findAll() {
    return this.bountyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bountyService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBountyDto: UpdateBountyDto) {
    return this.bountyService.update(id, updateBountyDto);
  }

  @Post(':id/claim')
  @HttpCode(HttpStatus.OK)
  claim(@Param('id') id: string, @Body() claimBountyDto: ClaimBountyDto) {
    return this.bountyService.claim(id, claimBountyDto);
  }

  @Post(':id/cancel')
  @HttpCode(HttpStatus.OK)
  cancel(@Param('id') id: string) {
    return this.bountyService.cancel(id);
  }

  @Post(':id/complete')
  @HttpCode(HttpStatus.OK)
  complete(@Param('id') id: string) {
    return this.bountyService.complete(id);
  }
}