import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose/dist/mongoose.module';
import { User, UserSchema } from './schemas/user.schema';

@Module({
  // Register the User model with Mongoose, có nghĩa là chúng ta sẽ sử dụng UserSchema để tạo ra một collection trong MongoDB có tên là 'users'
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
