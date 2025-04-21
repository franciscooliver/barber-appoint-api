import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Settings } from '../entities/settings.entity';
import { UpdateSettingsDTO } from '../dto/update-settings.dto';

@Injectable()
export class SettingsService {
  constructor(
    @InjectRepository(Settings)
    private settingsRepository: Repository<Settings>,
  ) {}

  async getSettings(): Promise<Settings> {
    const settings = await this.settingsRepository.findOne({ 
      where: { isActive: true } 
    });
    
    if (!settings) {
      // Criar configurações padrão se não existirem
      return this.createDefaultSettings();
    }
    
    return settings;
  }

  private async createDefaultSettings(intervalTime: number = 30): Promise<Settings> {
    const defaultSettings = this.settingsRepository.create({
      workingDays: [1, 2, 3, 4, 5, 6, 7], // Segunda a Sexta por padrão
      workingHours: {
        1: { start: '08:00', end: '20:00', intervals: [], isActive: true },
        2: { start: '08:00', end: '20:00', intervals: [], isActive: true },
        3: { start: '08:00', end: '20:00', intervals: [], isActive: true },
        4: { start: '08:00', end: '20:00', intervals: [], isActive: true },
        5: { start: '08:00', end: '20:00', intervals: [], isActive: true },
        6: { start: '08:00', end: '20:00', intervals: [], isActive: true },
        7: { start: '08:00', end: '20:00', intervals: [], isActive: true }
      },
      intervalTime,
      isActive: true
    });

    // Gerar os intervalos para cada dia
    for (const day of defaultSettings.workingDays) {
      const { start, end } = defaultSettings.workingHours[day];
      defaultSettings.workingHours[day].intervals = this.generateTimeIntervals(start, end, intervalTime);
    }

    return this.settingsRepository.save(defaultSettings);
  }

  async updateSettings(data: UpdateSettingsDTO): Promise<Settings> {
    let settings = await this.settingsRepository.findOne({ 
      where: { isActive: true } 
    });

    if (!settings) {
      settings = this.settingsRepository.create({
        isActive: true
      });
    }
  
    const { intervalTime } = data;
    settings.workingDays = data.workingDays;
    settings.workingHours = {};
    settings.isActive = data.isActive;
    settings.intervalTime = intervalTime;

    // Generate intervals for each working day
    for (const day of data.workingDays) {
      const { start, end, isActive = true } = data.workingHours[day];
      const intervals = isActive ? this.generateTimeIntervals(start, end, intervalTime) : [];
      
      settings.workingHours[day] = {
        start,
        end,
        intervals,
        isActive
      };
    }

    return this.settingsRepository.save(settings);
  }

  private generateTimeIntervals(start: string, end: string, intervalTime: number = 30): string[] {
    const intervals: string[] = [];
    const [startHour, startMinute] = start.split(':').map(Number);
    const [endHour, endMinute] = end.split(':').map(Number);

    // Convert start and end times to minutes for easier calculation
    const startInMinutes = startHour * 60 + startMinute;
    const endInMinutes = endHour * 60 + endMinute;
    
    let currentTimeInMinutes = startInMinutes;

    while (currentTimeInMinutes <= endInMinutes) {
      const hour = Math.floor(currentTimeInMinutes / 60);
      const minute = currentTimeInMinutes % 60;
      
      intervals.push(
        `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`
      );

      currentTimeInMinutes += intervalTime;
    }

    return intervals;
  }
}
