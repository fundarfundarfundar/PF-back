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
import { ApiTags, ApiBody, ApiResponse } from '@nestjs/swagger';
import { Donation } from './entities/donation.entity';

@ApiTags('donations')
@Controller('donations')
export class DonationsController {
  constructor(private readonly donationsService: DonationsService) {}

  @Post()
  @ApiBody({
    schema: {
      example: {
        amount: 500,
        date: "2025-11-01",
        paymentMethod: "credit_card",
        userId: "83191d4c-3529-4d2e-8663-2d0bb55acbb2",
        projectId: "c896fef0-e647-4273-8891-1a50e7fc57ed"
      }
    }
  })
  @ApiResponse({ status: 201, description: 'Donation created successfully', type: Donation })
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
