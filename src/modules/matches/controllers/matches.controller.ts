import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiBody,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';
import { MatchesService } from '../services/matches.service';
import { CreateMatchDto } from '../dto/create-match.dto';
import { UpdateMatchDto } from '../dto/update-match.dto';
import { UpdateMatchResultDto } from '../dto/update-match-result.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { Roles } from '../../../common/decorators/roles.decorator';

@ApiTags('Matches')
@ApiBearerAuth()
@Controller('matches')
export class MatchesController {
  constructor(private readonly matchesService: MatchesService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  @Roles('admin', 'organizer')
  @ApiOperation({ summary: 'Create a new match' })
  @ApiBody({ type: CreateMatchDto })
  @ApiResponse({ status: 201, description: 'Match created successfully' })
  create(@Body() createMatchDto: CreateMatchDto) {
    return this.matchesService.create(createMatchDto);
  }
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('tournament/:tournamentId/bracket')
  @Roles('admin', 'organizer')
  @ApiOperation({
    summary: 'Generate tournament bracket (auto create matches)',
  })
  @ApiParam({ name: 'tournamentId', description: 'Tournament ID' })
  @ApiResponse({ status: 201, description: 'Bracket generated successfully' })
  generateBracket(@Param('tournamentId') tournamentId: string) {
    return this.matchesService.generateTournamentBracket(tournamentId);
  }
  @Get()
  @ApiOperation({ summary: 'Get all matches' })
  @ApiResponse({ status: 200, description: 'List of all matches' })
  findAll() {
    return this.matchesService.findAll();
  }
  @Get('tournament/:tournamentId')
  @ApiOperation({ summary: 'Get matches by tournament ID' })
  @ApiParam({ name: 'tournamentId', description: 'Tournament ID' })
  @ApiResponse({ status: 200, description: 'Matches for the tournament' })
  findByTournament(@Param('tournamentId') tournamentId: string) {
    return this.matchesService.findByTournament(tournamentId);
  }
  @Get('tournament/:tournamentId/round/:round')
  @ApiOperation({ summary: 'Get matches by tournament and round number' })
  @ApiParam({ name: 'tournamentId', description: 'Tournament ID' })
  @ApiParam({ name: 'round', description: 'Round number' })
  @ApiResponse({ status: 200, description: 'Matches for specific round' })
  findByTournamentAndRound(
    @Param('tournamentId') tournamentId: string,
    @Param('round') round: number,
  ) {
    return this.matchesService.findByTournamentAndRound(tournamentId, +round);
  }
  @Get('participant/:participantId')
  @ApiOperation({ summary: 'Get matches by participant ID' })
  @ApiParam({ name: 'participantId', description: 'Participant ID' })
  @ApiResponse({ status: 200, description: 'Matches for the participant' })
  findByParticipant(@Param('participantId') participantId: string) {
    return this.matchesService.findByParticipant(participantId);
  }
  @Get(':id')
  @ApiOperation({ summary: 'Get a single match by ID' })
  @ApiParam({ name: 'id', description: 'Match ID' })
  @ApiResponse({ status: 200, description: 'Match details' })
  findOne(@Param('id') id: string) {
    return this.matchesService.findById(id);
  }
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':id')
  @Roles('admin', 'organizer')
  @ApiOperation({ summary: 'Update match scheduled time or status' })
  @ApiParam({ name: 'id', description: 'Match ID' })
  @ApiBody({ type: UpdateMatchDto })
  @ApiResponse({ status: 200, description: 'Match updated successfully' })
  update(@Param('id') id: string, @Body() updateMatchDto: UpdateMatchDto) {
    return this.matchesService.update(id, updateMatchDto);
  }
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':id/result')
  @Roles('admin', 'organizer')
  @ApiOperation({ summary: 'Update match result (winner and scores)' })
  @ApiParam({ name: 'id', description: 'Match ID' })
  @ApiBody({ type: UpdateMatchResultDto })
  @ApiResponse({
    status: 200,
    description: 'Match result updated successfully',
  })
  updateResult(
    @Param('id') id: string,
    @Body() updateMatchResultDto: UpdateMatchResultDto,
  ) {
    return this.matchesService.updateResult(id, updateMatchResultDto);
  }
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  @Roles('admin', 'organizer')
  @ApiOperation({ summary: 'Delete a scheduled match' })
  @ApiParam({ name: 'id', description: 'Match ID' })
  @ApiResponse({ status: 200, description: 'Match deleted successfully' })
  remove(@Param('id') id: string) {
    return this.matchesService.remove(id);
  }
}
