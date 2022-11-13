// import * as jwt from 'jsonwebtoken';

import { Response, Request, NextFunction } from 'express';
import { ProfileService } from '@services/index';
import UpdateProfileDTO from '@dto/profile/UpdateProfile.dto';
import FileStoreServices from '@services/FileStoreServices';

export class ProfileController {
    protected profile: ProfileService;


    constructor() {
        console.log('init profile service');
        this.profile = new ProfileService()
    }

    async getProfile(req: Request, res: Response) {
        try {
            console.log('profile:: ', req.params);
            const data = await this.profile.getProfile(req.params.user_id)
            return res.status(200).send(data)
        } catch (error) {
            return res.status(404);
        }
    }

    async updateProfile(req: Request, res: Response) {
        try {
            console.log('profile:: ', req.body);
            console.log('files:: ', req.file.filename);
            const profileData: UpdateProfileDTO = { ...req.body, avatar: req.file.filename, user_id: req.params.user_id }
            const data = await this.profile.updateProfile(profileData)
            return res.status(200).send(data)
        } catch (error) {
            return res.status(404);
        }
    }

}

export default new ProfileController