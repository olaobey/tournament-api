import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiParam,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { ParticipantsService } from '../services/participants.service';
import { CreateParticipantDto } from '../dto/createParticipant.dto';
import { UpdateParticipantDto } from '../dto/updateParticipant.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { Roles } from '../../../common/decorators/roles.decorator';

@ApiTags('Participants')
@ApiBearerAuth()
@Controller('participants')
export class ParticipantsController {
  constructor(private readonly participantsService: ParticipantsService) {}

  @Post()
  @ApiOperation({ summary: 'Register a new participant' })
  @ApiBody({ type: CreateParticipantDto })
  @ApiResponse({
    status: 201,
    description: 'Participant registered successfully',
  })
  create(@Body() createParticipantDto: CreateParticipantDto, @Request() req) {
    // Allow registration without authentication, but track user if authenticated
    const userId = req.user?.id;
    return this.participantsService.create(createParticipantDto, userId);
  }
  @Get()
  @ApiOperation({ summary: 'Get all participants' })
  @ApiResponse({ status: 200, description: 'List of all participants' })
  findAll() {
    return this.participantsService.findAll();
  }
  @Get('tournament/:tournamentId')
  @ApiOperation({ summary: 'Get all participants by tournament ID' })
  @ApiParam({ name: 'tournamentId', description: 'Tournament ID' })
  @ApiResponse({
    status: 200,
    description: 'List of participants for tournament',
  })
  findByTournament(@Param('tournamentId') tournamentId: string) {
    return this.participantsService.findByTournament(tournamentId);
  }
  @Get('tournament/:tournamentId/active')
  @ApiOperation({
    summary: 'Get active (not eliminated) participants by tournament ID',
  })
  @ApiParam({ name: 'tournamentId', description: 'Tournament ID' })
  @ApiResponse({ status: 200, description: 'List of active participants' })
  findActiveByTournament(@Param('tournamentId') tournamentId: string) {
    return this.participantsService.findActiveByTournament(tournamentId);
  }
  @Get(':id')
  @ApiOperation({ summary: 'Get a participant by ID' })
  @ApiParam({ name: 'id', description: 'Participant ID' })
  @ApiResponse({ status: 200, description: 'Participant details' })
  findOne(@Param('id') id: string) {
    return this.participantsService.findById(id);
  }
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':id')
  @Roles('admin', 'organizer')
  @ApiOperation({ summary: 'Update participant details' })
  @ApiParam({ name: 'id', description: 'Participant ID' })
  @ApiBody({ type: UpdateParticipantDto })
  @ApiResponse({ status: 200, description: 'Participant updated successfully' })
  update(
    @Param('id') id: string,
    @Body() updateParticipantDto: UpdateParticipantDto,
  ) {
    return this.participantsService.update(id, updateParticipantDto);
  }
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  @Roles('admin', 'organizer')
  @ApiOperation({ summary: 'Delete a participant' })
  @ApiParam({ name: 'id', description: 'Participant ID' })
  @ApiResponse({ status: 200, description: 'Participant deleted successfully' })
  remove(@Param('id') id: string) {
    return this.participantsService.remove(id);
  }
}
