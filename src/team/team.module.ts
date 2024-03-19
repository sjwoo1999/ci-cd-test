/* eslint-disable @typescript-eslint/no-unused-vars */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Team } from './entities/team.entity';
import { TeamController } from './team.controller';
import { TeamService } from './team.service';
import { Player } from './entities/player.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Team, Player])],
  providers: [TeamService],
  controllers: [TeamController],
})
export class TeamModule {}
