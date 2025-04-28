import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateBid } from './dto/bid-dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Bid } from './bid.entity/bid.entity';
import { Not, Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { ProjectsService } from 'src/projects/projects.service';

@Injectable()
export class BidsService {
 
constructor(@InjectRepository(Bid)
private bidrepo:Repository<Bid>,
private userservice:UsersService,
private projectservice:ProjectsService
){}


   async create(userId: number, dto: CreateBid, projectId: number) {

        const user = await this.userservice.findById(userId)
        if(!user){
            throw new NotFoundException('user not found');
        }

        const project =await this.projectservice.findOne(projectId);
        if(!project){
            throw new NotFoundException('project not found');
        }


        // const doubleBidCheck = await this.projectservice.checkIfBidded(userId, projectId);
        // if(doubleBidCheck){
        //     throw new BadRequestException('You Have Aleready Bidded for this project')
        // }


        const repeat= await this.bidrepo.findOne({
            where: {
                freelancer: { id: userId },
                project: { id: projectId }
            }
        });

        if(repeat){
            throw new BadRequestException('You Have Aleready Bidded for this project')
    }


        const {amount,duration,message}=dto;
        const bid=await this.bidrepo.create({
            amount:amount,
            duration:duration,
            message:message,
            freelancer:user,
            project:project,
        })

        const savedBid=await this.bidrepo.save(bid);
        return{message:"Bid Created Succesfully", bid:savedBid}
  
    }

  async getAllBids(projectId: number) {
        
    if(!projectId){
        throw new BadRequestException();
    }

    const bids = await this.bidrepo.find({
        where: { project: { id: projectId } },
        relations: ['freelancer', 'project'],   // 👈 Add this
      });

    if (bids.length === 0) {
        throw new NotFoundException('No bids found');
    }
    

    return {message:"bids for this project ", bids:bids}

    }

    async getBidById(bidId: number) {
        const bid = await this.bidrepo.findOne({
            where: { id: bidId },
            relations: ['freelancer', 'project'],
        });
    
        if (!bid) {
            throw new NotFoundException('Bid not found');
        }
    
        return { message: "Bid", bid: bid };
    }
    
   

    async withdrawBid(bidId: number) {

        const bid= await this.bidrepo.findOne({where:{id:bidId}})

        if(!bid){
            throw new NotFoundException('bid not found');
        }

        const removedBid=await this.bidrepo.remove(bid);

        return {message:"Bid Withdwened Succesfully" ,removedBid:removedBid}

        

    }
  

}
