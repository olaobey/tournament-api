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
  ApiBearerAuth,
  ApiOperation,
  ApiBody,
  ApiResponse,
} from '@nestjs/swagger';
import { TournamentsService } from '../services/tournaments.service';
import { CreateTournamentDto } from '../dto/create-tournament.dto';
import { UpdateTournamentDto } from '../dto/update-tournament.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { Roles } from '../../../common/decorators/roles.decorator';
import { TournamentStatus } from '../schemas/tournament.schema';

@ApiTags('Tournaments')
@ApiBearerAuth()
@Controller('tournaments')
export class TournamentsController {
  constructor(private readonly tournamentsService: TournamentsService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  @Roles('admin', 'organizer')
  @ApiOperation({ summary: 'Create a tournament' })
  @ApiBody({ type: CreateTournamentDto })
  @ApiResponse({ status: 201, description: 'Tournament created successfully' })
  create(@Body() createTournamentDto: CreateTournamentDto, @Request() req) {
    return this.tournamentsService.create(createTournamentDto, req.user.id);
  }
  @Get()
  @ApiOperation({ summary: 'Get all tournaments' })
  findAll() {
    return this.tournamentsService.findAll();
  }
  @Get('status/:status')
  @ApiOperation({ summary: 'Get tournaments by status' })
  findByStatus(@Param('status') status: TournamentStatus) {
    return this.tournamentsService.findByStatus(status);
  }
  @UseGuards(JwtAuthGuard)
  @Get('user')
  @ApiOperation({ summary: 'Get tournaments created by logged-in user' })
  findByUser(@Request() req) {
    return this.tournamentsService.findByUser(req.user.id);
  }
  @Get(':id')
  @ApiOperation({ summary: 'Get a tournament by ID' })
  findOne(@Param('id') id: string) {
    return this.tournamentsService.findById(id);
  }
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':id')
  @Roles('admin', 'organizer')
  @ApiOperation({ summary: 'Update a tournament by ID' })
  @ApiBody({ type: UpdateTournamentDto })
  @ApiResponse({ status: 200, description: 'Tournament updated successfully' })
  update(
    @Param('id') id: string,
    @Body() updateTournamentDto: UpdateTournamentDto,
  ) {
    return this.tournamentsService.update(id, updateTournamentDto);
  }
  @Patch('participants/increment/:id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Increment participant count by 1' })
  @ApiResponse({ status: 200, description: 'Participant added' })
  async incrementParticipants(@Param('id') id: string) {
    return this.tournamentsService.incrementParticipants(id);
  }
  @Patch('participants/decrement/:id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Decrement participant count by 1' })
  @ApiResponse({ status: 200, description: 'Participant removed' })
  async decrementParticipants(@Param('id') id: string) {
    return this.tournamentsService.decrementParticipants(id);
  }
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  @Roles('admin', 'organizer')
  @ApiOperation({ summary: 'Delete a tournament by ID' })
  @ApiResponse({ status: 200, description: 'Tournament deleted successfully' })
  remove(@Param('id') id: string) {
    return this.tournamentsService.remove(id);
  }
}
