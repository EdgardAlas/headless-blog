import { decrypt, encrypt } from '@helpers/encrypt';
import crypto from 'crypto';
import { ulid } from 'ulidx';

export const generateApiKey = async () => {
	const apiKeyId = ulid().toLowerCase();
	const randomHex = crypto.randomBytes(32).toString('hex');

	const apiKey = `${apiKeyId}.${encrypt(randomHex)}`;

	return {
		apiKeyId,
		apiKey,
	};
};

export const extractApiKey = (apiKey: string) => {
	const [apiKeyId, encryptedKey] = apiKey.split('.');
	const decryptedKey = decrypt(encryptedKey);

	return {
		apiKeyId,
		encryptedKey,
		decryptedKey,
		apiKey: `${apiKeyId}.${decryptedKey}`,
	};
};
