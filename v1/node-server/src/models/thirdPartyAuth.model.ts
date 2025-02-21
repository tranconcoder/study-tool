import mongoose, { Schema, InferSchemaType } from 'mongoose';

const thirdPartyAuthSchema = new Schema(
	{
		auth_info_hash: {
			type: String,
			unique: true,
			required: true,
		},
		public_key: {
			type: String,
			required: true,
		},
		private_key: {
			type: String,
			required: true,
		},
		host: {
			type: String,
			enum: ['qldt', 'ems'],
			required: true,
		},
		host_token: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: {
			createdAt: 'created_at',
			updatedAt: 'updated_at',
		},
		expires: '3d',
	}
);

export type ThirdPartyAuth = InferSchemaType<typeof thirdPartyAuthSchema>;

const ThirdPartyAuthModel = mongoose.model<ThirdPartyAuth>('ThirdPartyAuth', thirdPartyAuthSchema);

export default ThirdPartyAuthModel;
