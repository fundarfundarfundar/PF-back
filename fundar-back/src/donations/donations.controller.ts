import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { DonationsService } from './donations.service';
import { CreateDonationDto } from './dto/create-donation.dto';
import { UpdateDonationDto } from './dto/update-donation.dto';

@Controller('donations')
export class DonationsController {
  constructor(private readonly donationsService: DonationsService) {}

  @Post()
  createDonation(@Body() createDonationDto: CreateDonationDto) {
    return this.donationsService.createDonation(createDonationDto);
  }

  @Get()
  getDonations() {
    return this.donationsService.GetDonations();
  }

  @Get(':id')
  getDonationById(@Param('id') id: string) {
    return this.donationsService.getDonationById(id);
  }

  @Put(':id')
  updateDonation(
    @Param('id') id: string,
    @Body() updateDonationDto: UpdateDonationDto,
  ) {
    return this.donationsService.updateDonation(id, updateDonationDto);
  }

  @Delete(':id')
  deleteDonation(@Param('id') id: string) {
    return this.donationsService.deleteDonation(id);
  }
}
