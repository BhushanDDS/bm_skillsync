import { BadRequestException, Body, Controller, Delete, Get, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { UserId } from 'src/projects/commons/user.decorator';
import { CreateBid } from './dto/bid-dto';
import { BidsService } from './bids.service';
import { CookieAuthGuard } from 'src/auth/auth.guard';

@UseGuards(CookieAuthGuard)
@Controller('bids')
export class BidsController {


constructor(private bidservice:BidsService){}

@Post('/:projectId')
createBid(@UserId() userId:number, @Body() dto:CreateBid,@Param('projectId',ParseIntPipe)projectId:number){
    if(!userId){
        throw new BadRequestException();
    }
    return this.bidservice.create(userId,dto,projectId);
}


@Get('/project/:projectId')
getAllBidsByProjectId(@Param('projectId',ParseIntPipe)projectId:number){
    try {
        return this.bidservice.getAllBids(projectId);
    } catch (error) {
        throw new BadRequestException()
    }
}


@Get('/single/:bidId')
getBid(@Param('bidId', ParseIntPipe) bidId:number){
    return this.bidservice.getBidById(bidId);

}

@Delete('/withdraw/:bidId')
withdrawBid(@Param('bidId',ParseIntPipe)bidId:number){
    return this.bidservice.withdrawBid(bidId)
}


}
