import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    UseGuards,
} from "@nestjs/common";

import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { AdService } from "./ad.service";
import { CreateAdDto } from "./dto/create-ad.dto";
import { UpdateAdDto } from "./dto/update-ad.dto";

@ApiTags("ads")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller("ads")
export class AdController {
    constructor(private readonly adService: AdService) {}

    @Post()
    create(@Body() createAdDto: CreateAdDto) {
        return this.adService.createAd(createAdDto);
    }

    @Get()
    findAll() {
        return this.adService.ads();
    }

    @Get(":id")
    findOne(@Param("id") id: string) {
        return this.adService.ad(id);
    }

    @Get("user/:id")
    findByUser(@Param("id") id: string) {
        return this.adService.getAdsByUser(id);
    }

    @Patch(":id")
    update(@Param("id") id: string, @Body() updateAdDto: UpdateAdDto) {
        return this.adService.updateAd(id, updateAdDto);
    }

    @Delete(":id")
    remove(@Param("id") id: string) {
        return this.adService.removeAd(id);
    }
}
