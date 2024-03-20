/* eslint-disable @typescript-eslint/no-unused-vars */
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { Role } from 'src/user/types/userRole.type';

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { UpdateTeamDto } from './dto/update-team.dto';
import { TeamService } from './team.service';
import { PaginationQueryDto } from './dto/pagination-query.dto';

@Controller('team')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @UseGuards(RolesGuard)
  @Get()
  async findAll() {
    return await this.teamService.findAll();
  }

  // @Get(':id')
  // async findOne(@Param('id') id: number) {
  //   return await this.teamService.findOne(id);
  // }

  @UseGuards(RolesGuard)
  @Roles(Role.Admin)
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async create(@UploadedFile() file: Express.Multer.File) {
    await this.teamService.create(file);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.Admin)
  @Put(':id')
  async update(@Param('id') id: number, @Body() updateTeamDto: UpdateTeamDto) {
    await this.teamService.update(id, updateTeamDto);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.Admin)
  @Delete(':id')
  async delete(@Param('id') id: number) {
    await this.teamService.delete(id);
  }

  // ===============================================
  // Player 관련 API
  // ===============================================
  @Get('/players')
  async findAllPlayers(@Query() paginationQuery: PaginationQueryDto) {
    return await this.teamService.findAllPlayers(paginationQuery);
  }

  @Get(':id/players')
  async findPlayersByTeamId(
    @Param('id') teamId: number,
    @Query() paginationQuery: PaginationQueryDto,
  ) {
    return await this.teamService.findPlayersByTeamId(teamId, paginationQuery);
  }

  @Get('/stats')
  async getTeamStats() {
    return await this.teamService.getTeamStats();
  }
}
