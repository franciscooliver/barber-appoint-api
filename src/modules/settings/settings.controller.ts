import { Controller, Get, Put, Body, UseGuards } from '@nestjs/common';
import { SettingsService } from '@modules/settings/services/settings.service';
import { UpdateSettingsDTO } from '@modules/settings/dto/update-settings.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getSettings() {
    return this.settingsService.getSettings();
  }

  @UseGuards(AuthGuard('jwt'))
  @Put()
  async updateSettings(@Body() data: UpdateSettingsDTO) {
    return this.settingsService.updateSettings(data);
  }
}
