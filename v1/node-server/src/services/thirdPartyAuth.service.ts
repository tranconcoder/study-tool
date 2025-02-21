import ThirdPartyAuthModel, {ThirdPartyAuth} from "../models/thirdPartyAuth.model";

export default class ThirdPartyAuthService {
    public static async createOrUpdateByHashInfo(
        hashInfo: string,
        payload: ThirdPartyAuth | Omit<ThirdPartyAuth, 'auth_info_hash'>
    ) {
        return await ThirdPartyAuthModel.findOneAndReplace(
            { auth_info_hash: hashInfo },
            {
                auth_info_hash: hashInfo,
                ...payload,
            },
            {
                upsert: true,
                new: true,
            }
        ).lean();
    }
}
