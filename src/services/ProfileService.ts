import UpdateProfileDTO from '@dto/profile/UpdateProfile.dto';
import User from '@models/UserModel';

class ProfileService {


    async getProfile(id: string): Promise<any> {
        try {
            console.log('id:: ', id);
            const profile = await User.findById(id)

            return profile
        } catch (error) {
            throw error
        }
    }

    async updateProfile(resource: UpdateProfileDTO): Promise<any> {
        try {
            console.log('avatar:: ',resource.avatar);
            
            const profile = await User.findOneAndUpdate({ _id: resource.user_id }, resource, { new: true })
            console.log('profile updated: ', profile);
            return profile
        } catch (error) {
            throw error
        }
    }


}
export default ProfileService