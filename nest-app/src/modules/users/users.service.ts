import { BadGatewayException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { hashPasswordHelper } from '@/helpers/utils';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
  ) {}

  isEmailExist = async (email: string) => {
    //có thể đếm, nhưng sẽ tốn thời gian hơn, nên sẽ dùng exists để kiểm tra xem email đã tồn tại hay chưa, nếu tồn tại thì trả về true, ngược lại trả về false
    const isExist = await this.userModel.exists({ email }); //email là duy nhất nên sẽ trả về true hoặc false, nếu có email này thì trả về true, ngược lại trả về false - viết tắt của email: email
    return !!isExist; // !! là toán tử phủ định kép, nó sẽ chuyển giá trị của isExist thành boolean. Nếu isExist có giá trị (tức là email tồn tại), thì !!isExist sẽ trả về true. Ngược lại, nếu isExist là null hoặc undefined (tức là email không tồn tại), thì !!isExist sẽ trả về false.
  };

  async create(createUserDto: CreateUserDto) {
    const { name, email, password } = createUserDto;
    // kiểm tra xem email đã tồn tại hay chưa, nếu đã tồn tại thì sẽ trả về lỗi, ngược lại sẽ tiếp tục tạo mới người dùng
    const isExist = await this.isEmailExist(email);
    if (isExist) {
      throw new BadGatewayException(`Email: ${email} already exists`); // BadGatewayException là một exception được cung cấp bởi NestJS, nó sẽ trả về mã lỗi 502 và thông báo lỗi 'Email already exists' khi email đã tồn tại trong database. Việc sử dụng exception này giúp cho việc xử lý lỗi trở nên dễ dàng hơn và đảm bảo rằng client nhận được phản hồi lỗi một cách rõ ràng và chính xác.
    }

    //hash password - có thể viết try and catch ở đây - nên viết một exception tổng quan
    // nếu tư duy theo dependence injection thì sẽ viết một service riêng để hash password
    // , sau đó inject vào đây để sử dụng, nhưng ở đây mình sẽ viết trực tiếp ở đây luôn
    const hashPassword = await hashPasswordHelper(password);
    // sau khi hash xong thì sẽ lưu vào database
    // nên return id của user
    // tầng service sẽ không trả về toàn bộ user mà chỉ trả về id của user mới tạo, để đảm bảo bảo mật thông tin của user
    // tầng controller sẽ nhận id của user mới tạo và trả về cho client, để client có thể sử dụng id này để truy cập các thông tin khác của user nếu cần thiết
    // tầng service là nơi chứa logic kinh doanh, nên sẽ xử lý các thao tác liên quan đến dữ liệu, như tạo mới, lấy danh sách, cập nhật và xóa người dùng. Trong trường hợp này, khi tạo mới một người dùng, service sẽ hash password trước khi lưu vào database để đảm bảo an toàn thông tin của người dùng. Sau đó, service sẽ trả về id của người dùng mới tạo để controller có thể trả về cho client.
    const user = await this.userModel.create({
      name,
      email,
      password: hashPassword,
    });
    return {
      _id: user._id,
    };
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
